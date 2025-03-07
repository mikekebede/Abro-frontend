'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LoginForm = () => {
  const{login, isLoggingIn}=useAuthStore();
  const [formData,setFormData]=useState({
    email:"",
    password:""  
  })
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    login(formData);
    console.log("login successfull!");
    
  }
  return (
    <form onSubmit={handleSubmit} className='space-y-12 w-[400px]'>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input 
      value={formData.email}
      onChange={(e)=>setFormData({...formData,email:e.target.value})}
      type="email" id="email"  />
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input 
      value={formData.password}
      onChange={(e)=>setFormData({...formData,password:e.target.value})}
      type="password" id="password"  />
    </div>
    <div className='w-full'>
      <Button className='w-full  bg-blue-600 text-white ' size='lg' disabled={isLoggingIn}>Log in</Button>
    </div>
    </form>
  )
}

export default LoginForm
