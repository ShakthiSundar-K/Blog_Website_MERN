import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "py-3 px-6 rounded-lg font-medium transition-all duration-200 text-center";

  const variantStyles = {
    primary: "bg-teal-700 hover:bg-teal-800 text-white shadow-sm",
    secondary: "bg-coral-500 hover:bg-coral-600 text-white shadow-sm",
    outline:
      "bg-transparent border border-teal-700 text-teal-700 hover:bg-teal-50",
    link: "bg-transparent text-teal-700 hover:text-teal-800 underline p-0",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
