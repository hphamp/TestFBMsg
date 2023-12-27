import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function SidebarR() {
    const navigate = useNavigate();
    const [activeNavLink, setActiveNavLink] = useState(1);
    const handleLogout = async () => {
        try {
            await new Promise((resolve) => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('userId');
                localStorage.removeItem('count_cart');
                // Cập nhật localStorage trước khi resolve promise
                resolve();
            });
            console.log('localStorage.getItem(token):' + localStorage.getItem('token'));
            console.log('localStorage.getItem(user):' + localStorage.getItem('user'));
            console.log('localStorage.getItem(userId):' + localStorage.getItem('userId'));
            // Tiếp tục với các công việc sau khi cập nhật localStorage
            navigate('/');
            toast.success('Log out successfully');
        } catch (error) {
            console.error('Error during logout:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };

    const handleNavLinkClick = (index) => {
        setActiveNavLink(index);
    };

    return (
        <div className="flex flex-col items-center justify-start">
            <NavLink
                to={'/information'}
                onClick={() => handleNavLinkClick(1)}
                className={`flex items-center  justify-center w-11/12 py-3 font-bold border rounded-xl ${
                    activeNavLink === 1 ? 'border-redPrimary  bg-red-100  text-redPrimary' : ' '
                }`}
            >
                Thông tin tài khoản
            </NavLink>
            <NavLink
                to={'/purchase_history'}
                onClick={() => handleNavLinkClick(2)}
                className={`flex items-center  justify-center w-11/12 my-3 py-3 font-bold  border rounded-xl ${
                    activeNavLink === 2 ? 'border-redPrimary  bg-red-100  text-redPrimary' : ' '
                }`}
            >
                Lịch sử mua hàng
            </NavLink>

            <NavLink
                to={''}
                onClick={() => handleNavLinkClick(3)}
                className={`flex items-center  justify-center w-11/12 my-3 py-3 font-bold  border rounded-xl ${
                    activeNavLink === 3 ? 'border-redPrimary  bg-red-100  text-redPrimary' : ' '
                }`}
            >
                Hỗ Trợ
            </NavLink>

            <NavLink
                to={'/login'}
                onClick={() => handleLogout()}
                className="flex items-center  justify-center w-11/12 my-3 py-3 font-bold  border rounded-xl"
            >
                Đăng xuất
            </NavLink>
        </div>
    );
}

export default SidebarR;
