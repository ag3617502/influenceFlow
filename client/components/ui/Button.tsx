import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  fullWidth,
  className = '',
  disabled,
  ...props
}) => {
  const buttonClass = [
    styles.button,
    styles[variant],
    styles[size],
    isLoading ? styles.loading : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].join(' ');

  return (
    <button 
      className={buttonClass} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading && (
        <span className={styles.spinner}></span>
      )}
      <div className={`${styles.content} ${isLoading ? styles.hidden : ''}`}>
        {children}
      </div>
    </button>
  );
};

export default Button;
