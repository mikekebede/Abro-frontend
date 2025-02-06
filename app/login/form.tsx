'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const LoginForm = () => {
  return (
    <form className='space-y-12 w-[400px]'>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email"  />
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password"  />
    </div>
    <div className='w-full'>
      <Button className='w-full  bg-blue-600 text-white ' size='lg' >Log in</Button>
    </div>
    </form>
  )
}

export default LoginForm
