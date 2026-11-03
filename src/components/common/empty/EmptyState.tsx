import styles from './EmptyState.module.scss';

export default function EmptyState(props: { message?: string }) {
  const { message = '표시할 내용이 없습니다.' } = props;

  return (
    <div className={styles['empty-state']} role="status">
      <p>{message}</p>
    </div>
  );
}
