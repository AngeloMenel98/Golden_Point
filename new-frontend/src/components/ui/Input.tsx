import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gp-gray mb-1">
          {label}
        </label>
      )}
      <input
        className={`input-field ${error ? 'border-gp-red focus:border-gp-red' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-gp-red text-xs">{error}</p>
      )}
    </div>
  );
}
