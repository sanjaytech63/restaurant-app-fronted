import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container min-h-screen mx-auto py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;