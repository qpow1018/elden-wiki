import styles from '@/app/design-system/DesignSystem.module.scss';

const PALETTES = ['gray', 'steel', 'teal', 'brass', 'lavender'] as const;
const STEPS = ['100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

export default function FoundationShowcase() {
  return (
    <section className={styles['section']} aria-labelledby="palette-title">
      <div className={styles['section-heading']}>
        <h2 id="palette-title">Color palette & surfaces</h2>
        <p>각 색상의 100~900 단계와 텍스트·배경·경계·오류 토큰입니다.</p>
      </div>
      <div className={styles['palette-list']}>
        {PALETTES.map((palette) => (
          <div key={palette}>
            <h3>{palette}</h3>
            <div className={styles['palette-scale']}>
              {STEPS.map((step) => (
                <div key={step} className={styles['palette-swatch']}>
                  <div className={styles[`swatch-${palette}-${step}`]} />
                  <span>{step}</span>
                  <code className={styles[`value-${palette}-${step}`]} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles['semantic-colors']}>
        {[
          'error',
          'error-light',
          'error-accent',
          'error-tint',
          'error-surface',
          'text-primary',
          'text-secondary',
          'text-muted',
          'border-soft',
          'border',
          'border-strong',
          'border-focus',
          'bg-dark',
          'bg',
          'bg-light',
          'bg-accent',
        ].map((name) => (
          <div key={name} className={styles['semantic-swatch']}>
            <div className={styles[`swatch-${name}`]} />
            <code>${name}</code>
          </div>
        ))}
      </div>
    </section>
  );
}
