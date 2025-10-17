import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@app/providers';
import { router } from '@app/router';
import '@app/global.css';

function render() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </React.StrictMode>
  );
}

const isCypress =
  typeof window !== 'undefined' && (window as any).Cypress;

if (import.meta.env.PROD || isCypress) {
  render();
} else {
  import('@infra/msw/browser')
    .then(({ worker }) =>
      worker.start({ onUnhandledRequest: 'bypass' })
    )
    .catch(() => {})
    .finally(render);
}
