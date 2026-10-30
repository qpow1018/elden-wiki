'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import styles from './Header.module.scss';

export type THeaderMenu = { name: string; link: string };

export default function Header({ menus }: { menus: readonly THeaderMenu[] }) {
  const pathname = usePathname();

  return (
    <header className={styles['header']}>
      <Link href="/" className={styles['logo']} aria-label="엘든 위키 홈">
        엘든 위키
      </Link>
      <nav aria-label="주요 메뉴">
        {menus.map((menu) => {
          const isActive = pathname === menu.link;
          return (
            <Link
              key={menu.link}
              href={menu.link}
              className={styles['navigation-link']}
              aria-current={isActive ? 'page' : undefined}
            >
              {menu.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
