import ButtonShowcase from './_component/ButtonShowcase';
import ButtonGroupShowcase from './_component/ButtonGroupShowcase';
import IconButtonShowcase from './_component/IconButtonShowcase';
import DropdownMenuShowcase from './_component/DropdownMenuShowcase';
import FormShowcase from './_component/FormShowcase';
import ModalShowcase from './_component/ModalShowcase';
import TabsShowcase from './_component/TabsShowcase';
import ToastShowcase from './_component/ToastShowcase';
import FoundationShowcase from './_component/FoundationShowcase';
import UtilityShowcase from './_component/UtilityShowcase';

import styles from './DesignSystem.module.scss';

export default function DesignSystemPage() {
  return (
    <main className={styles['design-system-page']}>
      <div className={styles['content']}>
        <header className={styles['page-header']}>
          <h1>디자인 시스템</h1>
          <span>청철 팔레트와 공용 컴포넌트의 색상·크기·상태를 확인합니다.</span>
        </header>

        <FoundationShowcase />
        <ButtonShowcase />
        <IconButtonShowcase />
        <ButtonGroupShowcase />
        <DropdownMenuShowcase />
        <FormShowcase />
        <TabsShowcase />
        <ToastShowcase />
        <ModalShowcase />
        <UtilityShowcase />
      </div>
    </main>
  );
}
