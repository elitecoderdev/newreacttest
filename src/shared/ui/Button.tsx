import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost' | 'danger';
  }
) {
  const { className, variant = 'primary', ...rest } = props;
  const v =
    variant === 'primary'
      ? 'background: var(--brand); color: white;'
      : variant === 'danger'
      ? 'background: var(--danger); color: white;'
      : 'background: #0e1220; color: var(--text); border: 1px solid var(--border);';
  return (
    <button
      style={{}}
      className={clsx(className)}
      {...rest}
      data-variant={variant}
    />
  );
}
