import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/AuthCard";
import FormGroup from "../components/FormGroup";
import Logo from "../components/Logo";
import api from "../services/ApiService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(ApiRoutes.SignUp.path, formData, {
        authentictate: ApiRoutes.SignUp.authenticate,
      }); // Send POST request to the API
      toast.success(response.message);
      setSubmitSuccess(true);
    } catch (err) {
      setErrors({ server: "Network error. Please try again." });
      toast.error("Error occured. Please try again.");
      console.error("Error during signup:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-pattern flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md mb-8 animate-fadeIn'>
        <div className='flex justify-center'>
          <Logo size='large' />
        </div>
        <h1 className='mt-6 text-center text-4xl font-bold text-charcoal-800'>
          Create your account
        </h1>
        <p className='mt-2 text-center text-base text-gray-600'>
          Join our community and start sharing your ideas
        </p>
      </div>

      <div
        className='sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn'
        style={{ animationDelay: "0.1s" }}
      >
        <Card className='py-8 px-4 sm:px-10'>
          {submitSuccess ? (
            <div className='text-center'>
              <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4'>
                <svg
                  className='h-6 w-6 text-green-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Registration successful!
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Your account has been created successfully. You can now log in
                  with your credentials.
                </p>
              </div>
              <div className='mt-5'>
                <Button
                  variant='primary'
                  fullWidth
                  onClick={() => navigate("/sign-in")}
                >
                  Proceed to Login
                </Button>
              </div>
            </div>
          ) : (
            <form className='space-y-6' onSubmit={handleSubmit}>
              {errors.server && (
                <div
                  className='p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'
                  role='alert'
                >
                  {errors.server}
                </div>
              )}

              <FormGroup>
                <Input
                  label='Full Name'
                  id='name'
                  type='text'
                  placeholder=''
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={errors.name}
                />

                <Input
                  label='Email Address'
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                />

                <Input
                  label='Password'
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={errors.password}
                />

                <Input
                  label='Confirm Password'
                  id='confirmPassword'
                  type='password'
                  placeholder='••••••••'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  error={errors.confirmPassword}
                />
              </FormGroup>

              <div className='pt-2'>
                <Button
                  type='submit'
                  variant='primary'
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </Button>
              </div>

              <div className='flex items-center justify-center mt-4'>
                <div className='text-sm'>
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/sign-in")}
                    className='font-medium text-teal-700 hover:text-teal-600 transition-colors cursor-pointer'
                  >
                    Sign in
                  </span>
                </div>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
