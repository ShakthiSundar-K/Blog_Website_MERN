const FormGroup = ({ children, className = "" }) => {
  return <div className={`space-y-6 ${className}`}>{children}</div>;
};

export default FormGroup;
