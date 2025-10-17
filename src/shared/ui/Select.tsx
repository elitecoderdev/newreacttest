import { SelectHTMLAttributes, forwardRef } from 'react';
export default forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function Select(props, ref) {
  return <select ref={ref} className="select" {...props} />;
});
