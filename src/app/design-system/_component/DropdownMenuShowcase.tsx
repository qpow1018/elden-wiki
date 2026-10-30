'use client';

import toast from '@/utils/toast';

import IconButton from '@/components/common/button/IconButton';
import DropdownMenu from '@/components/common/dropdownMenu/DropdownMenu';

import styles from '@/app/design-system/DesignSystem.module.scss';

import { MdMoreHoriz } from 'react-icons/md';

export default function DropdownMenuShowcase() {
  return (
    <section className={styles['section']} aria-labelledby="dropdown-menu-title">
      <div className={styles['section-heading']}>
        <h2 id="dropdown-menu-title">Dropdown Menu</h2>
        <p>문맥에 맞는 짧은 작업 목록을 제공합니다.</p>
      </div>

      <div className={styles['state-card']}>
        <div className={styles['dropdown-menu-showcase']}>
          <DropdownMenu
            trigger={({ toggle }) => (
              <IconButton size="small" aria-label="더 보기" onClick={toggle}>
                <MdMoreHoriz />
              </IconButton>
            )}
            items={[
              { label: '수정하기', onClick: () => toast.info('수정하기를 선택했습니다.') },
              { label: '복사하기', onClick: () => toast.info('복사하기를 선택했습니다.') },
              { label: '삭제하기', onClick: () => toast.info('삭제하기를 선택했습니다.') },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
