'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { register, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "" // ✅ Add Confirm Password to state
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    
    // ✅ Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const success = validateForm();
  
    if (success === true) {
      const { confirmPassword, ...dataToSend } = formData; // Remove confirmPassword before sending it to the backend
      register(dataToSend); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-12 w-[400px]'>

      <div className="grid w-full max-w-sm items-center gap-1.0">
        <Label htmlFor="fullName">Full Name</Label>
        <Input 
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          type="text" id="fullName"  
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.0">
        <Label htmlFor="email">Email</Label>
        <Input 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="email" id="email"  
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.0">
        <Label htmlFor="password">Password</Label>
        <Input 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          type="password" id="password"  
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.0">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} // ✅ Add onChange handler
          type="password" id="confirmPassword"  
        />
      </div>

      <div className='w-full'>
        <Button className='w-full bg-blue-600 text-white' size='lg' disabled={isSigningUp}>
          Register
        </Button>
      </div>
      
    </form>
  );
}

export default RegisterForm;
