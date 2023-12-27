import Header from '../DefaultLayout/Header';
import Sidebar from '../DefaultLayout/Sidebar';
import Footer from '../DefaultLayout/Footer';
import SidebarR from './SidebarR';
import Contact from '../DefaultLayout/Contact';
function UserInfoLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
              <p className="sticky top-0 z-20">
                <Header />
                <Sidebar />
            </p>
            <Contact />
            <div className="flex-1 my-5 justify-center items-center ">
                <div className="content content-wrapper flex flex-row justify-center relative">
                    <div className="w-2/12 border-gray-200 border-l-1 border-r-1">
                        <SidebarR />
                    </div>
                    <div className="w-7/12 items-center">{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserInfoLayout;
