import type { ReactNode } from 'react';

import styles from './Header.module.scss';

export default function Header({
  title,
  rightComponents,
}: {
  title: string;
  rightComponents?: ReactNode;
}) {
  return (
    <header className={styles['header']}>
      <h1>{title}</h1>
      {rightComponents && <div className={styles['right-components']}>{rightComponents}</div>}
    </header>
  );
}
