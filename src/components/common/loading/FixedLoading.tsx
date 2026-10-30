import styles from './FixedLoading.module.scss';

export default function FixedLoading() {
  return (
    <div className={styles['fixed-loading']} role="status" aria-label="불러오는 중">
      <div className={styles['spinner']} />
    </div>
  );
}
