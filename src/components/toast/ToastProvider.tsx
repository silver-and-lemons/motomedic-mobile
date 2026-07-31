import { type ReactNode } from 'react';
import { View } from 'react-native';
import { ToastContainer } from './ToastContainer';

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      <ToastContainer />
    </View>
  );
}
