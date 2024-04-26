import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, ...rest } = props;
  return <button type='button' className={styles.button} {...rest}>{children as ReactNode}</button>;
};