import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'btn-base btn-hover-scale';
  
  const variantClasses = {
    primary: 'btn-primary bg-gp-pastel text-white hover:bg-gp-dark',
    secondary: 'btn-secondary bg-gp-light text-gp-dark hover:bg-gp-pastel hover:text-white',
    danger: 'bg-[#7f0000] text-white hover:bg-[#5a0000] btn-hover-scale',
    outline: 'bg-white border-2 border-gp-dark text-gp-dark hover:bg-gp-dark hover:text-white btn-hover-scale',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}
