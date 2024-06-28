import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'submit',
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-2 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold outline-2 outline-offset-2 focus:outline-black bg-primary text-white focus:outline-none text-sm ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
