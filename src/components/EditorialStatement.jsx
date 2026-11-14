import React from 'react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

const STATS = [
  { value: '0.8 s', label: 'O‘rtacha chek chiqarish tezligi' },
  { value: '900+', label: 'Faol savdo nuqtalari' },
  { value: '100%', label: 'Davlat Soliq integratsiyasi' },
  { value: '1 kun', label: '1C va Exceldan to‘liq ko‘chish' },
];

export const EditorialStatement = ({ t }) => {
  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50 py-16 sm:py-20 lg:py-24 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="container-page">

        <Reveal className="eyebrow mb-8">
          <span>{t?.features?.eyebrow || 'BIZNES VA NAZORAT'}</span>
        </Reveal>

        <Reveal
          as="h2"
          delay={0.08}
          className="display-lg mb-8 max-w-4xl text-zinc-950 [text-wrap:balance] dark:text-zinc-50"
        >
          Do‘koningizdagi har bir tovar, har bir tranzaksiya va har bir so‘m —{' '}
          <span className="text-emerald-600 dark:text-emerald-400">doim aniq hisobda</span>{' '}
          bo‘lishi shart.
        </Reveal>

        <Reveal as="p" delay={0.18} className="lede max-w-3xl">
          Eski daftarlar, Excel jadvallari va kassadagi uzundan-uzoq navbatlar davri tugadi.
          Siz qayerda bo‘lishingizdan qat’i nazar, IDO‘KON orqali barcha savdo nuqtalaringizni bitta qulay ekranda boshqarasiz.
        </Reveal>

        <Stagger className="divider mt-12 grid grid-cols-2 gap-6 pt-12 sm:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.value}>
              <div className="font-sans text-3xl font-semibold tracking-tight tabular-nums text-zinc-950 sm:text-5xl dark:text-zinc-50">
                {stat.value}
              </div>
              <div className="mt-2 font-sans text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </section>
  );
};
