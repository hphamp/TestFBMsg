import React, { useEffect, useState } from 'react';
import images from '../../assets/images';
import itemcarts from '../../api/itemcart';
import { useNavigate, useHref } from 'react-router-dom';

const PopUpPayMent = ({ status, isShow }) => {
    console.log('PopUpPayMent vào đây rồi ');
    const [show, setShow] = useState(isShow);
    let token = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            const res_count = await itemcarts(localStorage.getItem('userId'), token);
            if (res_count) {
                localStorage.setItem('count_cart', res_count.length);
            }
        };
        fetchData();
    }, []);

    const handleClose = () => {
        setShow(false);
        console.log('handle');
        window.location.pathname = '/';
    };

    return (
        <div className=" flex justify-center items-center" style={{ display: !show ? 'none' : 'block' }}>
            <div className="w-80 h-32 border-1 bg-gray-100 border-gray-200 rounded-xl flex justify-center items-center relative z-50">
                <button className="absolute left-3 top-3">
                    {' '}
                    <img alt="" src={images.close} onClick={() => handleClose()} />
                </button>
                <p className="font-bold text-center">
                    {status === 'VNPAY SUCCESS' || status === 'PAYPAL SUCCESS' || status === 'PAYLIVE SUCCESS'
                        ? 'THANH TOÁN HÓA ĐƠN THÀNH CÔNG'
                        : 'THANH TOÁN HÓA ĐƠN KHÔNG THÀNH CÔNG'}
                </p>
            </div>
        </div>
    );
};
export default PopUpPayMent;
