const AuthCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`}>
      {children}
    </div>
  );
};

export default AuthCard;
