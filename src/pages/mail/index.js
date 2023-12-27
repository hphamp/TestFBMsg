import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

export function Mail() {
    const sendMail = () => {
        const email = document.getElementById('email').value;
        const baseUrl = 'http://api.shopiec.shop/api/users/forgot-password/' + email;
        console.log('baseUrl' + baseUrl);
        alert('Vui lòng kiểm tra email của bạn');
        return axios
            .get(baseUrl)
            .then((response) => {
                console.log(response.data);
                console.log('1');
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return null;
            });
    };
    return (
        <div className="flex w-screen h-full items-center justify-center  ">
            <div className=" flex-col  flex w-180 h-90 bg-gray-200 border-2 items-center justify-center border-gray-400 rounded-2xl">
                <h1>Confirm Email</h1>
                <div className="flex flex-row h-20 items-center justify-center">
                    <p>Email:</p>
                    <input type="text" className="w-120 h-8 rounded-lg ml-3" id="email"></input>
                </div>

                <button className="w-28 h-8 bg-red-600 rounded-xl" onClick={sendMail}>
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export function NotifyVerified() {
    const location = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const token = queryParams.get('token');

    const sendRequestToServer = async () => {
        const baseUrl = 'http://api.shopiec.shop/api/users/verify-mail?token=' + token;
        console.log('baseUrl' + baseUrl);

        try {
            alert('Vui lòng kiểm tra email!');
            const response = await axios.get(baseUrl);

            console.log(response.data);
            console.log('1');
            // Bạn có thể cập nhật trạng thái hoặc thực hiện các hành động khác với dữ liệu phản hồi nếu cần
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Click vào để tiếp tục xác thực ! </h1>
            <button onClick={sendRequestToServer} className=" w-32 h-8 bg-gray-300 text-xl rounded-lg">
                Xác thực
            </button>
        </div>
    );
}

export function ResetPass() {
    const location = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const email = queryParams.get('email');

    const sendRequestToResetPassword = (password) => {
        const baseUrl = 'http://api.shopiec.shop/api/users/forgot-password/reset?email=' + email;
        console.log('baseUrl' + baseUrl);
        return axios
            .patch(baseUrl, { password: password })
            .then((response) => {
                console.log(response.data);
                console.log('1');
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return null;
            });
    };
    const sendPass = () => {
        if (message === 'validated') {
            alert('Đã gửi yêu cầu reset password!');
            const password = document.getElementById('confirm').value;
            sendRequestToResetPassword(password);
        }
    };
    const [message, setMessage] = useState('');
    function validate() {
        var x = document.getElementById('password');
        var y = document.getElementById('confirm');
        if (x.value == y.value) setMessage('validated');
        else setMessage('not validated');
    }
    return (
        <div className="flex w-screen h-full items-center justify-center  ">
            <div className=" flex-col  flex w-180 h-90 bg-gray-200 border-2 items-center justify-center border-gray-400 rounded-2xl">
                <h1>Reset Password</h1>
                <div className="flex flex-row h-20 w-full items-center justify-around">
                    <p>Password:</p>
                    <input type="password" className="w-120 h-8 rounded-lg " id="password"></input>
                </div>
                <div className="flex flex-row h-20 w-full items-center justify-around">
                    <p className="mt-4">Confirm:</p>
                    <div>
                        <p className="text-red-600 text-xs">{message}</p>
                        <input
                            type="password"
                            className="w-120 h-8 rounded-lg"
                            id="confirm"
                            onChange={validate}
                        ></input>
                    </div>
                </div>

                <button
                    className="w-28 h-8 bg-red-600 rounded-lg"
                    onClick={sendPass}
                    disabled={message !== 'validated'}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
}
