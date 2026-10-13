'use client';

import React from 'react';
import { StoreProvider } from '../context/StoreContext';
import CartDrawer from './user/CartDrawer';
import QuickViewModal from './user/QuickViewModal';
import Toast from './common/Toast';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <CartDrawer />
      <QuickViewModal />
      <Toast />
    </StoreProvider>
  );
}
