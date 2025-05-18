import React from "react";

const Logo = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "h-8",
    medium: "h-12",
    large: "h-16",
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center`}>
      <svg
        className={`${sizeClasses[size]}`}
        viewBox='0 0 120 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20 10C31.046 10 40 18.954 40 30H0C0 18.954 8.954 10 20 10Z'
          fill='#1A7B88'
        />
        <rect x='80' y='10' width='40' height='20' rx='10' fill='#FF7F5C' />
        <circle cx='60' cy='20' r='10' fill='#D4AF37' />
      </svg>
      <span className='ml-2 text-2xl font-bold text-charcoal-800 font-serif'>
        Blogify
      </span>
    </div>
  );
};

export default Logo;
