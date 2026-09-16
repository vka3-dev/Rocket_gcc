import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { ToastContainer } from '../common/ToastContainer';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <ToastContainer />
      <main className="flex-grow pt-16 pb-24 min-h-screen w-full">
        <Outlet />
      </main>
      <BottomNav />
      <RoleSwitcher />
    </div>
  );
};
