import { useState, useEffect } from 'react';
import CloudinaryUploadWidget from './uploadImage';
import { Cloudinary } from '@cloudinary/url-gen';
import { InfoUserApi } from '~/api/User';
import { useNavigate } from 'react-router-dom';
import { SaveInfoUser } from '../../api/User';
import VerificationPage from '../VerifiMail';
function Infomation() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const [publicId, setPublicId] = useState('');
    const [url, setUrl] = useState('');
    const [infoUser, setInfoUsser] = useState('');
    // Replace with your own cloud name
    const [cloudName] = useState('dte2ps5qs');
    // Replace with your own upload preset
    const [uploadPreset] = useState('jfxz5xk3');
    const [checkGenderM, setCheckGenderM] = useState(false);
    const [checkGenderF, setCheckGenderF] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const result = await InfoUserApi(userId, token);

            if (result === null) {
                navigate('/login');
            }

            if (result) {
                setInfoUsser(result);
                setUrl(result.image);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Chỉ thực hiện các hành động khi infoUser thay đổi
        if (infoUser.gender === 1) {
            // Nếu gender là 1 (nam)
            setCheckGenderM(true);
            setCheckGenderF(false);
            console.log('Nam');
        } else {
            // Nếu gender không phải là 1 (nữ hoặc giá trị khác)
            setCheckGenderM(false);
            setCheckGenderF(true);
            console.log('Nữ hoặc giá trị khác');
        }
    }, [infoUser]);

    const [uwConfig] = useState({
        cloudName,
        uploadPreset,
    });

    const [display, setDisplay] = useState('none');
    const openUpload = () => {
        setDisplay('block');
    };

    const onCloseUpload = () => {
        setDisplay('none');
    };

    function handleButtonSave() {
        const firstNameN = document.getElementById('firstName').value;
        const lastNameN = document.getElementById('lastName').value;
        const dateOfBirthN = document.getElementById('dateOfBirth').value;
        const phoneN = document.getElementById('phone').value;
        const addressN = document.getElementById('address').value;
        const emailN = document.getElementById('email').value;
        const upload_imageN = document.getElementById('upload_image').src;
        const userInfo = {
            firstName: firstNameN,
            lastName: lastNameN,
            dateOfBirth: dateOfBirthN,
            gender: checkGenderF ? 1 : 0,
            phone: phoneN,
            address: addressN,
            image: upload_imageN,
            email: emailN,
        };
        console.log(userInfo);
        const SaveOfInfoUser = async () => {
            let token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const result = await SaveInfoUser(userId, userInfo, token);
            console.log('result.data:' + result.message);
            if (result.message === 'SUCCESS') {
                setText('Cập nhật thông tin thành công!');
                setIsPopupVisible(true);
            }
        };
        SaveOfInfoUser();
    }
    return (
        <div className="flex flex-col ">
            {isPopupVisible && <VerificationPage onClose={() => setIsPopupVisible(false)} text={text} />}
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/4 justify-center items-center ">
                    <div className="w-5/6">
                        <img
                            id="upload_image"
                            className="rounded-full w-44 h-44"
                            src={url}
                            alt="Avatar"
                            onClick={openUpload}
                        ></img>

                        <CloudinaryUploadWidget
                            uwConfig={uwConfig}
                            setPublicId={setPublicId}
                            setUrl={setUrl}
                            display={display}
                            onCloseUpload={onCloseUpload}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center text-gray-500 italic my-4">
                        <h5>Ngày tham gia: </h5>
                        <h5>11/12/2022</h5>
                    </div>
                </div>
                <div className="w-3/4">
                    <div className="relative mt-8 left-0 w-4/5">
                        <div className="text-black  w-full text-center justify-center items-center flex flex-col font-normal font-sans leading-normal">
                            <div className=" flex  flex-row h-6 justify-center  text-base mb-0">
                                <p className=" flex flex-row  w-52 h-8 mx-3">
                                    Họ<p className="text-red-600">*</p>
                                </p>
                                <p className=" flex  flex-row w-72  mx-3">
                                    Tên<p className="text-red-600">*</p>
                                </p>
                            </div>
                            <div className=" flex flex-row mb-3 w-full  justify-center">
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Họ"
                                    className=" flex w-52 h-8 mx-3 border-b-1 border-gray-300 pl-1 outline-none"
                                    defaultValue={infoUser.firstName}
                                ></input>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Tên"
                                    className="flex w-72 h-8 mx-3 border-b-1 border-gray-300 pl-1 outline-none"
                                    defaultValue={infoUser.lastName}
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
                            <div className=" flex flex-row  mb-3 w-full  justify-center">
                                <input
                                    id="phone"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    className="flex w-52 h-8 mx-3 border-b-1 border-gray-300 pl-1 outline-none"
                                    defaultValue={infoUser.phone}
                                ></input>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    className="flex w-72 mx-3 border-b-1  border-gray-300 pl-1 outline-none"
                                    defaultValue={infoUser.email}
                                ></input>
                            </div>
                            <div className=" flex  flex-row h-6 justify-center  text-base mb-0">
                                <p className=" flex flex-row  w-52 h-8 mx-3">
                                    Ngày sinh<p className="text-red-600">*</p>
                                </p>
                                <p className=" flex  flex-row w-72  mx-3">
                                    Giới tính<p className="text-red-600">*</p>
                                </p>
                            </div>
                            <div className=" flex flex-row  mb-3 w-full  justify-center ">
                                <div className=" flex flex-row items-center mx-11 w-44 h-8 border-b-1 border-gray-300">
                                    <input
                                        id="dateOfBirth"
                                        type="date"
                                        placeholder="Ngày Sinh"
                                        className="w-full h-full rounded-md outline-none"
                                        defaultValue={infoUser.dateOfBirth}
                                    ></input>
                                </div>
                                <div className="mx-3 flex flex-row w-80 h-8 items-center">
                                    <div className="flex flex-row ">
                                        <input
                                            type="checkbox"
                                            name="gender"
                                            checked={checkGenderM}
                                            onChange={() => {
                                                // Cập nhật giới tính khi checkbox thay đổi
                                                setInfoUsser((prevInfoUser) => ({
                                                    ...prevInfoUser,
                                                    gender: checkGenderM ? 0 : 1,
                                                }));
                                            }}
                                        />
                                        <label className="mx-2">Nam</label>
                                    </div>
                                    <div className="flex flex-row">
                                        <input
                                            type="checkbox"
                                            name="gender"
                                            checked={checkGenderF}
                                            onChange={() => {
                                                // Cập nhật giới tính khi checkbox thay đổi
                                                setInfoUsser((prevInfoUser) => ({
                                                    ...prevInfoUser,
                                                    gender: checkGenderF ? 1 : 0,
                                                }));
                                            }}
                                        />
                                        <label className="mx-2">Nữ</label>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex  flex-row h-6 justify-center  text-base mb-0">
                                <p className=" flex flex-row  w-52 h-8 -ml-76">
                                    Địa chỉ<p className="text-red-600">*</p>
                                </p>
                            </div>
                            <div className=" flex  mb-3 w-full justify-center">
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="Địa chỉ"
                                    className="w-79 h-8 -ml-52 border-b-1 border-gray-300 pl-1 outline-none"
                                    defaultValue={infoUser.address}
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-8 my-5">
                <div className="relative flex flex-row justify-end w-4/5 left-5 my-5">
                    <button
                        onClick={() => handleButtonSave()}
                        className="bg-blue-600 py-2 px-6 font-bold text-white rounded-3xl"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Infomation;
