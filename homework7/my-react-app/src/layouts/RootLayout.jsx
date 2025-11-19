import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function RootLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <NavBar />
      <main style={{ padding: '1rem', flex: 1, width: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
}