'use client';
import useGlobalStore from '@/app/stores/globalStore';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleLogout = () => {
    useGlobalStore.getState().resetState()
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    signOut({ callbackUrl: '/' }); // hoặc về trang login
  };

  return <button className='flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-500 hover:bg-gray-800/50 cursor-pointer' onClick={handleLogout}><div className='flex gap-x-2'><LogOutIcon className='w-4 h-4 self-center' /> Đăng xuất</div></button>;
}