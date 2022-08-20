import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from './relay/RelayEnvironment';
import { AuthProvider } from './auth/AuthContext';
import AppRoutes from './AppRoutes';
import { Suspense } from 'react';

export default function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AuthProvider>
        <Suspense fallback={<h1 className="text-white">Loading...</h1>}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </RelayEnvironmentProvider>
  );
}
