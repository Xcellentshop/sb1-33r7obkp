import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ButtonSettings from '../../components/admin/ButtonSettings';
import { AdminProvider } from '../../contexts/AdminContext';

export default function ButtonsPage() {
  return (
    <AdminProvider>
      <AdminLayout title="Configurações dos Botões">
        <ButtonSettings />
      </AdminLayout>
    </AdminProvider>
  );
}
