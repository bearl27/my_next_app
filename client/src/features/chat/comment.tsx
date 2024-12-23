import React from 'react';
import styles from './style/Comment.module.scss';

interface CommentProps {
  id: string;
  text: string;
  isSelf: boolean;
  timestamp: string;
}

const Comment: React.FC<CommentProps> = ({ id, text, isSelf, timestamp }) => {
  return (
    <div key={id} className={`${styles.commentContainer} ${isSelf ? styles.self : styles.other}`}>
      <div className={`${styles.messageBox} ${isSelf ? styles.self : styles.other}`}>
        <p className={styles.messageText}>{text}</p>
      </div>
      <span className={styles.timestamp}>
        {timestamp}
      </span>
    </div>
  );
};

export default Comment;