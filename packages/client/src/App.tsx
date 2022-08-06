import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from './relay/RelayEnvironment';
import { AuthProvider } from './auth/AuthContext';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </RelayEnvironmentProvider>
  );
}
