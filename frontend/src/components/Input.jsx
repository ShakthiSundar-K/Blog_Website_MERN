const Input = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error = null,
}) => {
  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={id}
          className='block text-charcoal-800 font-medium mb-2 text-sm'
        >
          {label} {required && <span className='text-coral-500'>*</span>}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
};

export default Input;
