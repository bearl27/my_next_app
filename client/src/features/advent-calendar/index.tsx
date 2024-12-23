'use client'

import { useState, KeyboardEvent } from 'react';
import styles from './index.module.scss';
import { MailIcon } from '../header/components/mail';

interface CalendarBox {
  id: number;
  isOpen: boolean;
}

const AdventCalendar = (): JSX.Element => {
  const [boxes, setBoxes] = useState<CalendarBox[]>(
    Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      isOpen: false,
    }))
  );

  const handleBoxClick = (id: number): void => {
    setBoxes(boxes.map((box) =>
      box.id === id ? { ...box, isOpen: true } : box
    ));
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLButtonElement>, id: number): void => {
    if (e.key === 'Enter') {
      handleBoxClick(id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.santaHat}>
      <div className={styles.pompom}/>
        <div className={styles.hatTop}>
          <div className={styles.calendar}>
            {boxes.map((box) => (
              <button
                key={box.id}
                className={`${styles.box} ${box.isOpen ? styles.open : ''}`}
                onClick={(): void => handleBoxClick(box.id)}
                onKeyUp={(e): void => handleKeyUp(e, box.id)}
                aria-pressed={box.isOpen}
                type="button"
              >
                {box.id}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.hatBrim} />
      </div>
    </div>
  );
};

export default AdventCalendar;