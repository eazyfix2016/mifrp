
import React from 'react';

interface ActionButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  icon?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, className, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 transition-transform transform hover:scale-105";
  
  return (
    <a
      {...props}
      className={`${baseClasses} ${className}`}
    >
      {text}
      {icon}
    </a>
  );
};

export default ActionButton;