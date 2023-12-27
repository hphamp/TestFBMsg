import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Contact from './Contact';
import FacebookMsg from '../../../pages/FacebookMsg';

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-20">
                <Header />
                <Sidebar />
            </div>
            <Contact />
            <div className="flex-1 container mx-auto">
                <div className="h-7 w-full"></div>
                <div className="content content-wrapper relative z-1">{children}</div>
                <div className="h-7 w-full"></div>
            </div>
            <FacebookMsg/>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
