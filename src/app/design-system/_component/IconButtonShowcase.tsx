import IconButton from '@/components/common/button/IconButton';
import type { TButtonTheme } from '@/components/common/button/Button';

import styles from '@/app/design-system/DesignSystem.module.scss';

import { MdAdd, MdDeleteOutline } from 'react-icons/md';

const THEMES: readonly TButtonTheme[] = ['steel', 'teal', 'brass', 'lavender', 'gray', 'error'];

export default function IconButtonShowcase() {
  return (
    <section className={styles['section']} aria-labelledby="icon-button-title">
      <div className={styles['section-heading']}>
        <h2 id="icon-button-title">Icon Button</h2>
        <p>원형 gray 아이콘 버튼은 빠른 문맥 조작에 사용합니다.</p>
      </div>

      <div className={styles['state-card']}>
        <div className={styles['button-pair']}>
          <IconButton size="small" aria-label="항목 추가">
            <MdAdd />
          </IconButton>
          <IconButton aria-label="항목 추가">
            <MdAdd />
          </IconButton>
          <IconButton size="large" aria-label="항목 추가">
            <MdAdd />
          </IconButton>
        </div>
        <div className={styles['button-pair']}>
          {THEMES.map((theme) => (
            <IconButton key={theme} theme={theme} aria-label={`${theme} 아이콘 버튼`}>
              <MdAdd />
            </IconButton>
          ))}
        </div>
        <div className={styles['button-pair']}>
          <IconButton aria-label="삭제" disabled>
            <MdDeleteOutline />
          </IconButton>
        </div>
      </div>
    </section>
  );
}
