import images from '~/assets/images';
import { useState } from 'react';
import VerificationPage from '../VerifiMail';
import register from '../../api/register';
import { Alert } from '@mui/material';

const urlImageUser = 'https://res.cloudinary.com/dte2ps5qs/image/upload/v1700431912/zo74ugufya9ayvuntmvn.png';
function Register() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [text, setText] = useState('');
    const handleLoginClick = () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const gender = document.getElementsByName('gender').value == 'male' ? 1 : 0;
        const address = document.getElementById('address').value;
        const password = document.getElementById('password').value;
        const image = urlImageUser;
        const user = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            phone: phone,
            address: address,
            email: email,
            password: password,
            image: image,
        };
        console.log(user);
        register(user)
            .then((res) => {
                console.log('res:', res.message);
                if (res.message === 'CHECK MAIL!') {
                    setIsPopupVisible(true);
                    setText('Kiểm tra hộp thoại email!');
                }
                if (res.message === 'EMAIL IS EXIST!') {
                    setIsPopupVisible(true);
                    setText('Email này đã tồn tại!');
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
            });
    };
    return (
        <div className="relative text-center justify-center items-center h-full flex flex-col">
            <div>
                <h1 className="text-black font-sans font-normal non-italic leading-normal text-2xl ">
                    ĐĂNG KÍ TÀI KHOẢN
                </h1>
                <p className="text-black font-sans font-normal non-italic leading-normal text-xl">
                    Bạn đã đăng kí tài khoản? <a className="text-blue-700 underline">Đăng nhập tại đây</a>
                </p>
            </div>
            <div className="text-black w-5/12 text-center justify-center items-center flex flex-col font-normal font-sans leading-normal">
                <div className=" flex  flex-row h-6 justify-center  text-base mb-0">
                    <p className=" flex flex-row  w-52 h-8 mx-3">
                        Họ<p className="text-red-600">*</p>
                    </p>
                    <p className=" flex  flex-row w-72  mx-3">
                        Tên<p className="text-red-600">*</p>
                    </p>
                </div>
                <div className="flex flex-row mb-3 w-full justify-center">
                    <input
                        type="text"
                        placeholder="Họ"
                        className="flex w-52 h-8 mx-3 border-2 border-gray-300 rounded-md pl-1 outline-none"
                        id="firstName"
                    ></input>
                    <input
                        type="text"
                        placeholder="Tên"
                        className="flex w-72 h-8 mx-3 border-2 border-gray-300 rounded-md pl-1 outline-none"
                        id="lastName"
                    ></input>
                </div>
                <div className=" flex  flex-row h-6 justify-center  text-base mb-0">
                    <p className=" flex flex-row  w-52 h-8 mx-3">
                        Số điện thoại<p className="text-red-600">*</p>
                    </p>
                    <p className=" flex  flex-row w-72  mx-3">
                        Email<p className="text-red-600">*</p>
                    </p>
                </div>
                <div className="flex flex-row mb-3 w-full justify-center">
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        className="flex w-52 h-8 mx-3 border-2 border-gray-300 rounded-md pl-1 outline-none"
                        id="phone"
                    ></input>
                    <input
                        type="text"
                        placeholder="Email"
                        className="flex w-72 mx-3 border-2 rounded-md pl-1 outline-none"
                        id="email"
                    ></input>
                </div>
                <div className="flex flex-row w-full h-8 justify-center text-base mb-0">
                    <p className=" flex flex-row  w-52 h-8 mx-3">
                        Ngày sinh<p className="text-red-600 ">*</p>
                    </p>
                    <p className=" flex  flex-row w-72  mx-3">
                        Giới tính<p className="text-red-600 outline-none">*</p>
                    </p>
                </div>
                <div className="flex flex-row mb-3 w-full justify-cente">
                    <div className="flex flex-row mb-3 w-full justify-center">
                        <input
                            type="date"
                            placeholder="Ngày Sinh"
                            className="flex w-52 h-8 mx-3 border-2 border-gray-300 rounded-md pl-1 outline-none"
                            id="dateOfBirth"
                        ></input>
                        <div className="flex flex-row w-72 h-8 mx-3 rounded-md pl-1">
                            <div className="flex flex-row">
                                <input type="radio" name="gender" value="male"></input>
                                <label className="mx-2">Name</label>
                            </div>
                            <div className="flex flex-row">
                                <input type="radio" name="gender" value="female"></input>
                                <label className="mx-2">Nữ</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex  flex-row h-6 justify-center  text-base mb-0">
                    <p className=" flex flex-row  w-52 h-8 -ml-76">
                        Địa chỉ<p className="text-red-600">*</p>
                    </p>
                </div>
                <div className="flex px-2 mb-3 w-10/12 justify-cente">
                    <input
                        type="text"
                        placeholder="Địa chỉ"
                        className="w-full h-8 border-2 rounded-md pl-1 outline-none"
                        id="address"
                    ></input>
                </div>
                <div className=" flex  flex-row h-6 justify-center  text-base mb-0">
                    <p className=" flex flex-row  w-52 h-8 mx-3">
                        Mật khẩu<p className="text-red-600">*</p>
                    </p>
                    <p className=" flex  flex-row w-72  mx-3">
                        Xác nhận lại mật khẩu<p className="text-red-600">*</p>
                    </p>
                </div>
                <div className=" flex flex-row  mb-3 w-full  justify-center">
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="flex w-52 h-8 mx-3  border-2 rounded-md pl-1 "
                        id="password"
                    ></input>
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu  "
                        className="flex w-72 mx-3 border-2 rounded-md pl-1"
                        id="replaypassword"
                    ></input>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col my-3">
                <button
                    className="bg-my-yellow w-40 h-10 justify-center my-3 items-center rounded-xl border-2 border-solid"
                    onClick={handleLoginClick}
                >
                    ĐĂNG KÍ
                </button>
                {isPopupVisible && <VerificationPage onClose={() => setIsPopupVisible(false)} text={text} />}
                <p className="text-center text-my-gray font-sans font-normal non-italic leading-normal text-base">
                    Hoặc đăng nhập bằng
                </p>
                <div className="flex flex-row my-4">
                    <button className="flex flex-row w-1/2 mx-5 items-center">
                        <img src={images.google} alt="facebook" width="50px" height="50px"></img>
                        <p className="ml-2">Google</p>
                    </button>
                    <button className="flex flex-row  w-1/2 mx-5 items-center">
                        <img src={images.facebook} alt="facebook" width="50px" height="50px"></img>
                        <p className="ml-2">Facebook</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
