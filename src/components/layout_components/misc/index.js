import React from 'react';
import styles from './style.module.scss';

export function Card({ children, style }) {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}

export function Wrapper({ children, style }) {
  return (
    <div className={styles.wrapper} style={style}>
      {children}
    </div>
  );
}

export function Header({ children, style, title }) {
  return (
    <div className={styles.header_wrapper} style={style}>
      <h1 className={styles.header_title}>{title}</h1>
      <div className={styles.header_right}>{children}</div>
    </div>
  );
}
