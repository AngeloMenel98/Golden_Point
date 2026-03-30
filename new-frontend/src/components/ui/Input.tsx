import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  style?: React.CSSProperties;
}

export function Input({ label, error, className = '', style, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-medium text-gp-gray mb-0.5">
          {label}
        </label>
      )}
      <input
        className={`input-field ${error ? 'border-gp-red focus:border-gp-red' : ''} ${className}`}
        style={style}
        {...props}
      />
      {error && (
        <p className="text-gp-red text-xs">{error}</p>
      )}
    </div>
  );
}
