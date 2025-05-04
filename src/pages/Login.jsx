import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Login = () => {
  const [authMode, setAuthMode] = useState('login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (authMode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const endpoint = authMode === 'signup' 
        ? `${backendUrl}/api/user/register` 
        : `${backendUrl}/api/user/login`;
      
      const payload = authMode === 'signup'
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };
      
      // Using fetch instead of axios
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        alert(`${authMode === 'login' ? 'Login' : 'Registration'} successful!`);
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      alert(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setErrors({});
  };
  
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            {authMode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Fill out the form to get started'}
          </p>
        </div>
        
        <div className="space-y-5">
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none transition-colors
                    ${errors.name ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}
          
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none transition-colors
                  ${errors.email ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={authMode === 'signup' ? "Create a strong password" : "Enter your password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none transition-colors
                  ${errors.password ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'}`}
              />
              <button
                type="button" 
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div className="flex items-center justify-between text-sm pt-2">
            {authMode === 'login' && (
              <button type="button" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Forgot password?
              </button>
            )}
            <button 
              type="button" 
              onClick={toggleAuthMode} 
              className="text-blue-600 hover:text-blue-800 font-medium text-sm ml-auto"
            >
              {authMode === 'login' ? 'Create an account' : 'Already have an account?'}
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 font-medium mt-4"
          >
            {loading ? "Processing..." : authMode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
          
          {authMode === 'login' && (
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          )}
          
          {authMode === 'login' && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Google
              </button>
              <button
                type="button"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Facebook
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;