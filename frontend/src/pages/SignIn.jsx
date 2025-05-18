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

const SignIn = () => {
  const navigate = useNavigate();
  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
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
      const response = await api.post(ApiRoutes.SignIn.path, formData, {
        authentictate: ApiRoutes.SignIn.authenticate,
      }); // Send POST request to the API
      console.log("Response:", response);

      // Store the token and user info in localStorage or context
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response.user));
      toast.success("Signed in successfully!");
      navigate("/"); // Redirect to dashboard or home page
    } catch (err) {
      let errorMessage = "Network error. Please try again.";

      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = "User not found. Please check your email.";
        } else if (err.response.status === 400) {
          errorMessage = "Invalid password. Please try again.";
        }
      }

      setErrors({ server: errorMessage });
      toast.error(errorMessage);
      console.error("Error during sign in:", err);
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
          Sign in to your account
        </h1>
        <p className='mt-2 text-center text-base text-gray-600'>
          Welcome back! Please enter your details
        </p>
      </div>

      <div
        className='sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn'
        style={{ animationDelay: "0.1s" }}
      >
        <Card className='py-8 px-4 sm:px-10'>
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
                label='Email Address'
                id='email'
                name='email'
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
                name='password'
                type='password'
                placeholder='••••••••'
                value={formData.password}
                onChange={handleChange}
                required
                error={errors.password}
              />
            </FormGroup>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-700'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a
                  href='/forgot-password'
                  className='font-medium text-teal-700 hover:text-teal-600 transition-colors'
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className='pt-2'>
              <Button
                type='submit'
                variant='primary'
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </div>

            <div className='flex items-center justify-center mt-4'>
              <div className='text-sm'>
                Don't have an account?{" "}
                <a
                  href='/sign-up'
                  className='font-medium text-teal-700 hover:text-teal-600 transition-colors'
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </Card>

        <p className='mt-8 text-center text-sm text-gray-500'>
          By signing in, you agree to our{" "}
          <a
            href='/terms'
            className='font-medium text-teal-700 hover:text-teal-600 transition-colors'
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href='/privacy'
            className='font-medium text-teal-700 hover:text-teal-600 transition-colors'
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
