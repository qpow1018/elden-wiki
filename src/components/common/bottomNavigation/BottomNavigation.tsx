'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './BottomNavigation.module.scss';

import { MdMap, MdMenuBook } from 'react-icons/md';

export default function BottomNavigation() {
  const pathname = usePathname();
  const isCatalog = pathname === '/catalog' || pathname.startsWith('/catalog/');
  const isMaps = pathname === '/maps';

  if (!isCatalog && !isMaps) return null;

  return (
    <nav className={styles['bottom-navigation']} aria-label="주 메뉴" data-bottom-navigation>
      <Link href="/catalog" aria-current={isCatalog ? 'location' : undefined}>
        <MdMenuBook size={16} aria-hidden="true" />
        도감
      </Link>
      <Link href="/maps" aria-current={isMaps ? 'page' : undefined}>
        <MdMap size={16} aria-hidden="true" />
        맵스
      </Link>
    </nav>
  );
}
