import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <sidebar>
            <div className="flex flex-row justify-center items-center h-7 shadow-md  bg-white">
                <NavLink to={'/'} className="px-6 py-1 font-bold hover:bg-gray-200">
                    Trang chủ
                </NavLink>
                <p>|</p>
                <NavLink to={'/introduce'} className="px-6 py-1 font-bold hover:bg-gray-200">
                    Giới thiệu
                </NavLink>
                <p>|</p>
                <NavLink to={'/item_group'} className="px-6 py-1 font-bold hover:bg-gray-200">
                    Sản phẩm
                </NavLink>
                <p>|</p>
                <NavLink to={'/contact'} className="px-6 py-1 font-bold hover:bg-gray-200">
                    Liên hệ
                </NavLink>
                <p>|</p>
                <NavLink to={''} className="px-6 py-1 font-bold hover:bg-gray-200">
                    Tin công nghệ
                </NavLink>
            </div>
        </sidebar>
    );
}

export default Sidebar;
