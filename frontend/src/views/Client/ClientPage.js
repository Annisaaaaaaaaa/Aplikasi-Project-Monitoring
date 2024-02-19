// ClientPage.js

import React from 'react';
import { ClientProvider } from '../../context/ClientContext';
import ClientTable from '../../component/Client/ClientTable';

function ClientPage() {
  return (
    <ClientProvider>
      <div>
        <h1>Client Management Page</h1>
        <ClientTable />
      </div>
    </ClientProvider>
  );
}

export default ClientPage;