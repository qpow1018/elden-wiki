'use client';

import { useState } from 'react';

import Checkbox from '@/components/common/form/Checkbox';
import Button from '@/components/common/button/Button';
import Select from '@/components/common/form/Select';
import Textarea from '@/components/common/form/Textarea';
import TextInput from '@/components/common/form/TextInput';

import styles from '@/app/design-system/DesignSystem.module.scss';

const SELECT_OPTIONS = [
  { value: 'sword', label: '직검' },
  { value: 'greatsword', label: '대검' },
  { value: 'katana', label: '도' },
  { value: 'disabled', label: '선택 불가 예시', isDisabled: true },
] as const;

export default function FormShowcase() {
  const [text, setText] = useState('입력값');
  const [edgeOption, setEdgeOption] = useState('');
  const [selectedOption, setSelectedOption] = useState('sword');
  const [textarea, setTextarea] = useState('여러 줄로 입력할 수 있는 설명입니다.');
  const [isChecked, setIsChecked] = useState(true);
  const [isCursorExampleVisible, setIsCursorExampleVisible] = useState(false);

  return (
    <section className={styles['section']} aria-labelledby="form-title">
      <div className={styles['section-heading']}>
        <h2 id="form-title">Form</h2>
        <p>입력, 선택, 여러 줄 입력, 확인 요소를 같은 맥락에서 비교합니다.</p>
      </div>

      <div className={styles['state-card']}>
        <div className={styles['form-grid']}>
          <label className={styles['form-field']}>
            <span>텍스트 입력</span>
            <TextInput value={text} onChange={setText} placeholder="내용을 입력하세요" />
          </label>

          <div className={styles['form-field']}>
            <span id="form-showcase-select-label">장비 분류</span>
            <Select
              labelId="form-showcase-select-label"
              options={SELECT_OPTIONS}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          </div>

          <label className={`${styles['form-field']} ${styles['textarea-field']}`}>
            <span>설명</span>
            <Textarea
              value={textarea}
              onChange={setTextarea}
              placeholder="설명을 입력하세요"
              rows={3}
            />
          </label>

          <div className={styles['checkbox-field']}>
            <span>선택</span>
            <Checkbox checked={isChecked} onChange={setIsChecked} label="이 옵션을 적용합니다" />
            <Checkbox checked={false} onChange={() => undefined} label="비활성 선택" disabled />
            <Checkbox checked={isChecked} size="small" onChange={setIsChecked} label="작은 크기" />
            <Checkbox defaultChecked label="비제어 선택" />
          </div>
          <label className={styles['form-field']}>
            <span>자동 높이 · 제어 입력</span>
            <Textarea
              aria-label="자동 높이 제어 입력"
              value={textarea}
              onChange={setTextarea}
              isAutoHeight
            />
          </label>
          <label className={styles['form-field']}>
            <span>자동 높이 · 비제어 입력</span>
            <Textarea defaultValue="줄을 추가하거나 지워보세요." isAutoHeight />
          </label>
          <label className={styles['form-field']}>
            <span>읽기 전용 설명</span>
            <Textarea value="수정할 수 없는 설명입니다." readOnly />
          </label>
          <label className={styles['form-field']}>
            <span>비활성 설명</span>
            <Textarea defaultValue="비활성 상태입니다." disabled />
          </label>
          <div className={styles['form-field']}>
            <Button onClick={() => setIsCursorExampleVisible(!isCursorExampleVisible)}>
              {isCursorExampleVisible ? '커서 예시 닫기' : '커서 끝 이동 예시 열기'}
            </Button>
            {isCursorExampleVisible && (
              <Textarea
                aria-label="커서 끝 이동"
                defaultValue="커서가 이 문장의 끝에 놓입니다."
                autoFocus
                isCursorAtEndOnAutoFocus
              />
            )}
          </div>
          <label className={styles['form-field']}>
            <span>읽기 전용</span>
            <TextInput value="수정할 수 없는 입력값" readOnly />
          </label>
          <div className={styles['form-field']}>
            <span id="disabled-select-label">비활성 선택</span>
            <Select
              labelId="disabled-select-label"
              options={SELECT_OPTIONS}
              value="sword"
              onChange={() => undefined}
              disabled
            />
          </div>
          <div className={styles['form-field']}>
            <span>첫 항목 비활성 · 선택값 없음</span>
            <Select
              aria-label="선택 가능한 항목 탐색"
              options={[
                { value: 'disabled', label: '선택 불가', isDisabled: true },
                { value: 'first', label: '첫 선택 가능' },
                { value: 'second', label: '두 번째 선택 가능' },
              ]}
              value={edgeOption}
              onChange={setEdgeOption}
            />
          </div>
          <div className={styles['form-field']}>
            <span>빈 선택 목록</span>
            <Select aria-label="빈 선택 목록" options={[]} value="" onChange={() => undefined} />
          </div>
          <div className={styles['form-field']}>
            <span>모든 항목 비활성</span>
            <Select
              aria-label="모든 항목 비활성"
              options={[{ value: 'disabled', label: '선택 불가', isDisabled: true }]}
              value=""
              onChange={() => undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
