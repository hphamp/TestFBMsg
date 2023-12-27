import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import images from '~/assets/images';
import VerificationPage from '../VerifiMail';

import fetchData, { LoginGgApi } from '../../api/Login';

import { LoginApi } from '~/api/Login';
import { toast } from 'react-toastify';
import itemcarts from '../../api/itemcart';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState('');

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, []);

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                alert('Email or password is required');
                toast.error('Email or password is required');
                return;
            }
            const res = await LoginApi(email, password);
            console.log('res:' + JSON.stringify(res));
            if (res && res.message === 'EMAIL IS INCORRECT') {
                setText('Email của bạn không chính xác');
                setIsPopupVisible(true);
            }
            if (res == '') {
                setText('Mật khẩu của bạn không chính xác');
                setIsPopupVisible(true);
            }
            if (res && res.token) {
                await saveUserInfoToLocalStorage(res);

                if (res.roleId === '1') {
                    navigate('/');
                } else {
                    alert('Tài khoản này không khả dụng');
                }
            } else {
                console.error('Login failed:', res);
                toast.error('Login failed. Please check your credentials.');
            }

            const res_count = await itemcarts(localStorage.getItem('userId'), res.token);
            if (res_count) {
                localStorage.setItem('count_cart', res_count.length);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            toast.error('An error occurred during login. Please try again later.');
        }
    };

    const saveUserInfoToLocalStorage = async (userInfo) => {
        return new Promise((resolve) => {
            localStorage.setItem('token', userInfo.token);
            localStorage.setItem('userId', userInfo.id);
            localStorage.setItem('user', JSON.stringify(userInfo));
            resolve();
        });
    };

    function handelCallbackResponse(response) {
        console.log('JWT:', response.credential);
    }
    // useEffect(() => {
    //     // window.google.accounts.id.initialize({
    //     //     client_id: '7198565102-c7t1e3cf79dg39f2bqco4dvpfifqm7k2.apps.googleusercontent.com',
    //     //     callback: handelCallbackResponse,
    //     //     auto_select: true,
    //     // });
    //     // window.google.accounts.id.prompt();
    //     // window.google.accounts.id.renderButton(document.getElementById('signInDiv'), {
    //     //     theme: 'raised',
    //     //     size: 'large',
    //     //     text: 'Google',
    //     //     shape: 'pill',
    //     // });
    // }, []);

    const [googleToken, setGoogleToken] = useState('');

    const onSuccess = (resToken) => {
        setAccount(resToken);
        setGoogleToken(resToken?.credential);
        const jsonString = JSON.stringify(resToken);
        console.log(jsonString);
        // Call api LoginGgApi
        const handleLogin = async () => {
            try {
                const res = await LoginGgApi(resToken?.credential);
                console.log('res:' + JSON.stringify(res));
                if (res && res.message === 'EMAIL IS INCORRECT') {
                    setText('Email của bạn không chính xác');
                    setIsPopupVisible(true);
                }
                if (res && res.token) {
                    await saveUserInfoToLocalStorage(res);
    
                    if (res.roleId === '1') {
                        navigate('/');
                    } else {
                        alert('Tài khoản này không khả dụng');
                    }
                } else {
                    console.error('Login failed:', res);
                    toast.error('Login failed. Please check your credentials.');
                }
    
                const res_count = await itemcarts(localStorage.getItem('userId'), res.token);
                if (res_count) {
                    localStorage.setItem('count_cart', res_count.length);
                }
            } catch (error) {
                console.error('An error occurred during login:', error);
                toast.error('An error occurred during login. Please try again later.');
            }
        };
        handleLogin();
    }
    
    const onFailure = (res) => {
        console.error(res)
    }

    return (
        <div className="flex flex-col justify-center items-center my-14">
            <div className="flex flex-col justify-center items-center">
                <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>
                <div className="flex flex-row">
                    <p className="pr-2">Bạn chưa đăng ký tài khoản?</p>
                    <NavLink to={'/register'} className="font-bold text-blue-600">
                        Đăng ký tại đây
                    </NavLink>
                </div>
            </div>
            <div className="flex flex-col my-4">
                <input
                    className="w-96 h-11 border border-gray-300 rounded-xl p-3 my-4"
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                ></input>
                <input
                    className="w-96 h-11 border border-gray-300 rounded-xl p-3"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                <div className="flex flex-row my-3 justify-end">
                    <p>Quên mật khẩu? Nhấn vào </p>
                    <NavLink to={'/resetpass/mail'} className="font-bold text-blue-600 ml-1">
                        đây
                    </NavLink>
                </div>
                {isPopupVisible && <VerificationPage onClose={() => setIsPopupVisible(false)} text={text} />}
            </div>
            <div className="flex justify-center items-center flex-col mb-3">
                <button
                    className="bg-my-yellow w-40 h-10 justify-center my-3 items-center rounded-xl border-2 border-solid"
                    // onClick={onLogin}

                    onClick={() => handleLogin()}
                >
                    ĐĂNG NHẬP
                </button>
                <p className="text-center text-my-gray font-sans font-normal non-italic leading-normal text-base">
                    Hoặc đăng nhập bằng
                </p>
                <div className="flex flex-row my-4">
                    <button className="flex flex-row w-1/2 mx-5 items-center">
                        <img src={images.google} alt="facebook" width="50px" height="50px"></img>
                        <p className="ml-2">Google</p>

                    </button>
                    <GoogleLogin onSuccess={onSuccess} onFailure={onFailure}></GoogleLogin>
                    {/* <div id="signInDiv"></div> */}

                    <div class="flex items-center justify-center h-screen">
                        <p class="mx-16 max-w-screen-lg">Google Token Login: {googleToken}</p>
                    </div>

                    <button className="flex flex-row  w-1/2 mx-5 items-center">
                        <img src={images.facebook} alt="facebook" width="50px" height="50px"></img>
                        <p className="ml-2">Facebook</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
