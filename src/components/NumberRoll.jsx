import { formatNum } from '../data/site';

const DIGITS = [...'0123456789'];

/**
 * Animated number: every digit is a 0–9 column that slides to its value (CSS only, see .roll in index.css).
 * Columns are keyed by place value from the right, so units stay units and only changed digits move.
 */
export const NumberRoll = ({ value, className = '' }) => {
  const s = formatNum(value);
  const chars = [...s];
  return (
    <span className={`roll ${className}`} data-value={s}>
      <span className="sr-only">{s}</span>
      {chars.map((ch, i) => {
        const key = chars.length - i;
        return /\d/.test(ch) ? (
          <span key={key} className="roll-col" aria-hidden="true">
            <span style={{ '--v': ch }}>{DIGITS.map((d) => <i key={d}>{d}</i>)}</span>
          </span>
        ) : (
          <span key={key} aria-hidden="true">{ch}</span>
        );
      })}
    </span>
  );
};
