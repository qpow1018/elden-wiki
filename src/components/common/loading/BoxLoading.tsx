import styles from './BoxLoading.module.scss';

export default function BoxLoading(props: { height?: number | string }) {
  const { height = 360 } = props;

  return (
    <div
      className={styles['box-loading']}
      style={{ height }}
      role="status"
      aria-label="불러오는 중"
    >
      <div className={styles['spinner']} />
    </div>
  );
}
