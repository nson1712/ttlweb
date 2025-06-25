'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    signOut({ callbackUrl: '/' }); // hoặc về trang login
  };

  return <button className='bg-red-500' onClick={handleLogout}>Đăng xuất</button>;
}