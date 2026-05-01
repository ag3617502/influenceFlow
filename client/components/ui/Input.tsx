import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <div className={styles.wrapper}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        <input
          id={inputId}
          className={`${styles.input} ${error ? styles.inputError : ''} ${icon ? styles.withIcon : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
