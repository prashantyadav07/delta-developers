import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="relative z-10 w-full">
        {/* We use Outlet to render the nested routes */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
