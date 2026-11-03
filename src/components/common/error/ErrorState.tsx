import Button from '@/components/common/button/Button';

import styles from './ErrorState.module.scss';

export default function ErrorState(props: { message?: string; onRetry: () => void }) {
  const { message = '정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.', onRetry } = props;

  return (
    <div className={styles['error-state']} role="status">
      <p>{message}</p>
      <Button theme="brass" fill="outline" onClick={onRetry}>
        다시 불러오기
      </Button>
    </div>
  );
}
