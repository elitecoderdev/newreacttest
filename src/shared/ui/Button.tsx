import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost' | 'danger';
  }
) {
  const { className, variant = 'primary', style, ...rest } = props;
  const variantStyle =
    variant === 'primary'
      ? { background: 'var(--brand)', color: 'white' }
      : variant === 'danger'
      ? { background: 'var(--danger)', color: 'white' }
      : {
          background: '#0e1220',
          color: 'var(--text)',
          border: '1px solid var(--border)',
        };
  return (
    <button
      className={clsx(className)}
      style={{ ...variantStyle, ...style }}
      {...rest}
      data-variant={variant}
    />
  );
}
