import Button, { type TButtonColor } from '@/components/common/button/Button';

import styles from '@/app/design-system/DesignSystem.module.scss';

const BUTTON_COLORS: { color: TButtonColor; label: string; token: string }[] = [
  { color: 'teal', label: 'Teal', token: '$teal' },
  { color: 'steel', label: 'Steel', token: '$steel' },
  { color: 'gray', label: 'Gray', token: '$gray-600' },
  { color: 'brass', label: 'Brass', token: '$brass' },
  { color: 'lavender', label: 'Lavender', token: '$lavender' },
  { color: 'error', label: 'Error', token: '$error' },
];

export default function ButtonShowcase() {
  return (
    <>
      <section className={styles['section']} aria-labelledby="button-colors-title">
        <div className={styles['section-heading']}>
          <h2 id="button-colors-title">Color &amp; fill</h2>
          <p>각 색상은 solid와 outline을 제공합니다.</p>
        </div>

        <div className={styles['button-grid']}>
          {BUTTON_COLORS.map((buttonColor) => (
            <article key={buttonColor.color} className={styles['button-card']}>
              <div>
                <h3>{buttonColor.label}</h3>
                <code>{buttonColor.token}</code>
              </div>
              <div className={styles['button-pair']}>
                <Button color={buttonColor.color} fill="solid">
                  Solid
                </Button>
                <Button color={buttonColor.color} fill="outline">
                  Outline
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles['section']} aria-labelledby="button-states-title">
        <div className={styles['section-heading']}>
          <h2 id="button-states-title">Size &amp; state</h2>
          <p>크기와 상태는 색상·fill과 독립적으로 조합합니다.</p>
        </div>

        <div className={styles['state-card']}>
          <div className={styles['button-pair']}>
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </div>
          <div className={styles['button-pair']}>
            <Button color="lavender" fill="outline" isLoading>
              Loading
            </Button>
            <Button color="gray" fill="outline" isDisabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
