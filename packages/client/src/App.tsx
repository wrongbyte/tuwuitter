import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from './relay/RelayEnvironment';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AppRoutes />
    </RelayEnvironmentProvider>
  );
}
