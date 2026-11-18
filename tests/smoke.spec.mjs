import { test, expect } from '@playwright/test';
import { SITE } from '../src/data/site.js';

const SECTION_LINKS = ['features', 'equipment', 'integrations', 'pricing', 'course', 'contact'];

test('loads without console errors at 375 and 1440', async ({ page }) => {
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  }
  expect(errors.filter((e) => !/fonts\.(googleapis|gstatic)|ERR_|Failed to load resource/.test(e))).toEqual([]);
});

test('language switch changes h1 and html lang', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const seen = new Set([await page.locator('h1').innerText()]);
  for (const [label, code] of [['Русский', 'ru'], ['English', 'en']]) {
    await page.locator('header button[aria-haspopup="true"]').first().click();
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    seen.add(await page.locator('h1').innerText());
  }
  expect(seen.size).toBe(3);
});

test('nav links scroll to sections', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  for (const id of SECTION_LINKS) {
    await page.locator('header nav[aria-label=Main]').locator(`a[href="#${id}"]`).click();
    await expect.poll(() => page.evaluate((i) => Math.abs(document.getElementById(i)?.getBoundingClientRect().top ?? 9999) < 200, id), { timeout: 10000 }).toBe(true);
  }
});

const fillContact = async (page, phone) => {
  const form = page.locator('#contact form');
  await form.getByLabel(/Ismingiz/).fill('Jasur');
  await form.getByLabel(/Telefon/).fill(phone);
  await form.locator('button[type=submit]').click();
  return form;
};

test('offline mode: contact shows call and Telegram, no form', async ({ page }) => {
  test.skip(SITE.leadsEnabled, 'leads are enabled');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('#contact form')).toHaveCount(0);
  await expect(page.locator('#contact a[href^="tel:"]').first()).toBeVisible();
  await expect(page.locator('#contact a[href^="https://t.me/"]').first()).toBeVisible();
});

test('contact form: invalid phone, success, failure fallback', async ({ page }) => {
  test.skip(!SITE.leadsEnabled, 'leads are disabled (offline mode)');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  let form = await fillContact(page, '901234');
  await expect(page.locator('#contact [role=alert]')).toBeVisible();

  await page.route('**/api/lead', (r) => r.fulfill({ status: 200, json: { ok: true } }));
  await form.getByLabel(/Telefon/).fill('901234567');
  await form.locator('button[type=submit]').click();
  await expect(page.locator('#contact [role=status]')).toBeVisible();

  await page.unroute('**/api/lead');
  await page.reload();
  await page.route('**/api/lead', (r) => r.fulfill({ status: 502, json: { ok: false, error: 'delivery' } }));
  await fillContact(page, '901234567');
  await expect(page.locator('#contact a[href^="tel:"]').first()).toBeVisible();
  await expect(page.locator('#contact form [role=alert] a[href^="tel:"]').first()).toBeVisible();
});

test('hardware: selecting devices rolls the total, no cart', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const eq = page.locator('#equipment');
  await eq.scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: /savat|cart/i })).toHaveCount(0);
  const total = eq.locator('[aria-live=polite] .roll');
  await expect(total).toHaveAttribute('data-value', '0');
  await eq.locator('li button[aria-pressed]').first().click();
  await expect(total).not.toHaveAttribute('data-value', '0');
  await eq.locator('li button[aria-pressed]').first().click();
  await expect(total).toHaveAttribute('data-value', '0');
});

test('pricing: period switch rolls the price, Premium is the highlighted plan', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const price = () => page.locator('#pricing article').first().locator('.roll').getAttribute('data-value');
  const before = await price();
  await page.locator('#pricing').getByRole('button', { name: /^12 oy/ }).click();
  await expect.poll(price).not.toBe(before);
  await expect(page.locator('#pricing article').nth(2)).toHaveAttribute('aria-label', /Premium · Ommabop/);
});

test('sticky bar appears after the hero at 375, hidden at 1024', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.evaluate(() => scrollTo(0, 1200));
  await expect(page.locator('.sticky-bar')).toBeInViewport();
  await page.setViewportSize({ width: 1024, height: 800 });
  await expect(page.locator('.sticky-bar')).toBeHidden();
});

for (const width of [360, 375, 768, 1024, 1440]) {
  test(`no horizontal scroll at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

test('hero: no rating claim, contact button scrolls instead of dialing', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(page.locator('#home')).not.toContainText('/ 5');
  await expect(page.locator('#home a[href^="tel:"]')).toHaveCount(0);
  await page.locator('#home').getByRole('link', { name: /Bog/ }).click();
  await expect.poll(() => page.evaluate(() => document.getElementById('contact')?.getBoundingClientRect().top ?? 9999), { timeout: 8000 }).toBeLessThan(200);
});

test('brand is spelled iDokon everywhere', async ({ page }) => {
  await page.goto('/');
  await page.locator('#faq').waitFor();
  expect(await page.evaluate(() => document.body.innerText + document.title)).not.toMatch(/IDO['‘]KON|Ido['‘]kon|I-Do['‘]kon/i);
});

test('software tabs: arrow keys switch the screen', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const tabs = page.locator('#software [role=tab]');
  await tabs.first().waitFor();
  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  const shown = page.locator('#software [role=tabpanel] img[data-active=true]');
  await expect(shown).toHaveAttribute('src', /savdo/);
  await expect(shown).toHaveCSS('opacity', '1');
  await tabs.nth(3).click();
  await expect(shown).toHaveAttribute('src', /analitika/);
  await expect(shown).toHaveCSS('opacity', '1');
});

test('feature cards: hover moves the highlighted card', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const cards = page.locator('#features article');
  await cards.first().waitFor();
  await cards.nth(3).hover();
  // the hovered card takes the deep colour, whichever theme is active
  const bg = (i) => cards.nth(i).evaluate((el) => getComputedStyle(el).backgroundColor);
  await expect.poll(async () => (await bg(3)) !== (await bg(0))).toBe(true);
});

test('deep link to a section lands on it even though sections load late', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/#pricing');
  await expect.poll(() => page.evaluate(() => document.getElementById('pricing')?.getBoundingClientRect().top ?? 9999), { timeout: 8000 }).toBeLessThan(200);
});
