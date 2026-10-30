'use client';

import { useState } from 'react';

import Checkbox from '@/components/common/form/Checkbox';
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
  const [selectedOption, setSelectedOption] = useState('sword');
  const [textarea, setTextarea] = useState('여러 줄로 입력할 수 있는 설명입니다.');
  const [isChecked, setIsChecked] = useState(true);

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
            <Checkbox isChecked={isChecked} onChange={setIsChecked} label="이 옵션을 적용합니다" />
            <Checkbox isChecked={false} onChange={() => undefined} label="비활성 선택" isDisabled />
            <Checkbox
              isChecked={isChecked}
              size="small"
              onChange={setIsChecked}
              label="작은 크기"
            />
          </div>
          <label className={styles['form-field']}>
            <span>읽기 전용</span>
            <TextInput value="수정할 수 없는 입력값" isReadonly />
          </label>
          <div className={styles['form-field']}>
            <span id="disabled-select-label">비활성 선택</span>
            <Select
              labelId="disabled-select-label"
              options={SELECT_OPTIONS}
              value="sword"
              onChange={() => undefined}
              isDisabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}
