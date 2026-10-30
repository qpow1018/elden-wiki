import Button, { type TButtonTheme } from '@/components/common/button/Button';

import styles from '@/app/design-system/DesignSystem.module.scss';

const BUTTON_THEMES: { theme: TButtonTheme; label: string; token: string }[] = [
  { theme: 'teal', label: 'Teal', token: '$teal' },
  { theme: 'steel', label: 'Steel', token: '$steel' },
  { theme: 'gray', label: 'Gray', token: '$gray-600' },
  { theme: 'brass', label: 'Brass', token: '$brass' },
  { theme: 'lavender', label: 'Lavender', token: '$lavender' },
  { theme: 'error', label: 'Error', token: '$error' },
];

export default function ButtonShowcase() {
  return (
    <>
      <section className={styles['section']} aria-labelledby="button-themes-title">
        <div className={styles['section-heading']}>
          <h2 id="button-themes-title">Theme &amp; fill</h2>
          <p>각 색상은 solid와 outline을 제공합니다.</p>
        </div>

        <div className={styles['button-grid']}>
          {BUTTON_THEMES.map((buttonTheme) => (
            <article key={buttonTheme.theme} className={styles['button-card']}>
              <div>
                <h3>{buttonTheme.label}</h3>
                <code>{buttonTheme.token}</code>
              </div>
              <div className={styles['button-pair']}>
                <Button theme={buttonTheme.theme} fill="solid">
                  장비 보기
                </Button>
                <Button theme={buttonTheme.theme} fill="outline">
                  장비 보기
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
            <Button size="small">장비 보기</Button>
            <Button>장비 보기</Button>
            <Button size="large">장비 보기</Button>
          </div>
          <div className={styles['button-pair']}>
            <Button theme="lavender" fill="outline" isLoading>
              불러오기
            </Button>
            <Button theme="gray" fill="outline" disabled>
              선택 불가
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
