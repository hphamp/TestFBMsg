import React, { useEffect, useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import orderPurchaseHistory from '../../api/order';
import images from '../../assets/images';

function PurchaseHistory() {
    const navigate = useNavigate();
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const result = await orderPurchaseHistory(userId, token);
            if (result === null) {
                navigate('/login');
            }

            if (result) {
                setPurchaseHistory(result);
            }
        };

        fetchData();
    }, []);

    const [activeButton, setActiveButton] = useState(1);

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getThirtyDaysAgo = () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [startDate, setStartDate] = useState(getThirtyDaysAgo());
    const [endDate, setEndDate] = useState(getCurrentDate());

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    const [purchaseHistoryValid, setPurchaseHistoryValid] = useState([]);
    const totalOrdered = purchaseHistory.length;
    const [totalMoneyOrdered, setTotalMoneyOrdered] = useState(0);

    useEffect(() => {
        let tempTotalMoneyOrdered = 0;
        purchaseHistory.forEach((Element) => {
            tempTotalMoneyOrdered += Element.totalFee;
        });
        setTotalMoneyOrdered(tempTotalMoneyOrdered);
    }, [purchaseHistory, totalMoneyOrdered]);

    useEffect(() => {
        const newStartDate = new Date(startDate).setHours(0, 0, 0, 0);
        const newEndDate = new Date(endDate).setHours(23, 59, 59, 0);

        const datas = [];
        purchaseHistory.forEach((order) => {
            const newCreateAt = Date.parse(order.createAt);
            const condition1 = order.orderDeliveryStatusDetails.deliveryStatusId === activeButton;
            const condition2 = newCreateAt >= newStartDate;
            const condition3 = newCreateAt <= newEndDate;
            if (condition1 && condition2 && condition3) {
                datas.push(order);
            }
        })

        setPurchaseHistoryValid(datas);
    }, [purchaseHistory,startDate,endDate,activeButton]);

    const viewOrderDetail = (orderId) => {
        let data = null;
        purchaseHistory.forEach((order) => {
            console.log('orderId' + orderId);
            if (order.id === orderId) {
                data = order;
            }
        });
        navigate('/order_detail', { state: { orderSelected: data } });
    };

    return (
        <div className="flex flex-col ">
            <div className="flex flex-col mx-8 my-5">
                <div className="relative flex flex-row h-32 w-full left-5 border-1 border-gray-600 rounded-3xl">
                    <div className="flex flex-col justify-center items-center w-1/3 border-right">
                        <h2 className="text-4xl font-bold mb-2">{totalOrdered}</h2>
                        <h4 className="text-base font-semibold">Đơn hàng đã đặt</h4>
                    </div>
                    <div className="w-px h-28 my-auto bg-gray-600"></div>
                    <div className="flex flex-col justify-center items-center w-2/3">
                        <h2 className="text-4xl font-bold mb-2">{totalMoneyOrdered.toLocaleString()}đ</h2>
                        <h4 className="text-base font-semibold">Tổng tiền đã mua sắm</h4>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end ">
                <div className="flex flex-row w-auto py-2 px-4 border-1 border-gray-600 rounded-md mx-4">
                    <input
                        type="date"
                        placeholder="Ngày Bắt Đầu"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-auto h-full"
                    ></input>
                    <p className="mx-3">-</p>
                    <input
                        type="date"
                        placeholder="Ngày Kết Thúc"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="w-auto h-full"
                    ></input>
                </div>
            </div>
            <div className="relative flex flex-row w-4/5 left-12 my-5">
                <div>
                    <button
                        onClick={() => handleButtonClick(1)}
                        className={`py-2 px-6 rounded-lg ${
                            activeButton === 1 ? 'bg-red-600 text-white ' : 'border-1 bg-grayPrimary rounded-lg'
                        }`}
                    >
                        Đang chờ xác nhận
                    </button>
                    <button
                        onClick={() => handleButtonClick(2)}
                        className={`py-2 px-6 mx-4  rounded-lg ${
                            activeButton === 2 ? 'bg-red-600  text-white' : 'border-1 bg-grayPrimary rounded-lg'
                        }`}
                    >
                        Đanng vận chuyển
                    </button>
                    <button
                        onClick={() => handleButtonClick(3)}
                        className={`py-2 px-6 rounded-lg ${
                            activeButton === 3 ? 'bg-red-600  text-white' : 'border-1 bg-grayPrimary rounded-lg'
                        }`}
                    >
                        Đã giao hàng
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                {purchaseHistoryValid.map((order) => (
                    <div className="bg-gray-100 rounded-2xl">
                        {order.orderDetails.map((orderDetail) => (
                            <div className="relative flex flex-row left-5 mx-8 bg-gray-200 my-2 rounded-2xl">
                                <img
                                    src={orderDetail.itemDetailDto.itemDto.imagesItem[0].image}
                                    className="p-2 hover:scale-105 w-1/6 h-1/2 rounded-2xl"
                                    alt="AnhSP"
                                />
                                <div className="flex-1 flex-col my-5 mx-5">
                                    <p className="font-bold text-2xl ">{orderDetail.itemDetailDto.itemDto.name}</p>
                                    <div className="flex flex-row">
                                        <p className="text-xl text-red-600">
                                            {orderDetail.itemDetailDto.itemDto.sellPrice -
                                                (orderDetail.itemDetailDto.itemDto.sellPrice *
                                                    orderDetail.itemDetailDto.itemDto.discount) /
                                                    100}
                                            đ
                                        </p>
                                        <div className="flex flex-row mx-2 my-2 ">
                                            <p className="text-xs text-gray-500 line-through">
                                                {orderDetail.itemDetailDto.itemDto.sellPrice}
                                            </p>
                                            <p className="text-xs text-gray-500">đ</p>
                                        </div>
                                    </div>
                                    <p className="text-lg ">Số lượng: {orderDetail.amount}</p>
                                </div>
                            </div>
                        ))}
                        <div className=" flex rounded-lg mb-2 justify-center items-center">
                            <button
                                className="flex flex-row bg-redPrimary text-xl text-white border px-4 rounded-lg h-8 w-48  justify-center items-center "
                                onClick={() => viewOrderDetail(order.id)}
                            >
                                <p className="mr-2 text-xl text-white">Xem thêm</p>
                                <img src={images.plus_white} alt="addCart" width="15px" height="15px" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PurchaseHistory;
