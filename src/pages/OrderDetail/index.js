import images from '~/assets/images';
import itemGroups from '~/data';
import { NavLink } from 'react-router-dom';
import { Rating } from '@mui/material';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import { sendReviewApi } from '../../api/comment';
import { addDays, format } from 'date-fns';
import { useLocation } from 'react-router-dom';

function OrderDetails() {
    const labels = {
        1: 'Rất tệ',
        2: 'Tệ',
        3: 'Tạm ổn',
        4: 'Tốt',
        5: 'Rất tốt',
    };
    // const [data, setData] = useState([]);
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const sendReview = async (close, itemDetailId) => {
        const currentTimeMillis = new Date().getTime();
        const createAt = format(currentTimeMillis, 'yyyy-MM-dd HH:mm:ss');
        const comment = {
            content: document.getElementById('contentPopup').value,
            time: createAt,
            rating: value,
            userId: localStorage.getItem('userId'),
            itemId: itemDetailId,
        };
        const token = localStorage.getItem('token');
        close();
        try {
            const res = await sendReviewApi(token, comment);
            console.log(res);
            if (res.message === 'SUCCESS') {
                close();
                setShowSuccessPopup(true);
            } else {
                close();
                setShowErrorPopup(true);
            }
        } catch (error) {
            console.error('Error:', error);
            close();
            setShowErrorPopup(true);
        }
    };
    const location = useLocation();
    const { orderSelected } = location.state ?? { orderSelected: [] };
    console.log('orderSelected:' + orderSelected.orderDetails[0].id);
    const shipFee = 25000;
    const totalFee = orderSelected.orderDetails.reduce((total, element) => {
        return (
            total +
            (element.itemDetailDto.itemDto.sellPrice -
                (element.itemDetailDto.itemDto.sellPrice * element.itemDetailDto.itemDto.discount) / 100) *
                element.amount
        );
    }, 0);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col my-5 w-10/12">
                <div className="relative flex flex-row h-32 w-full justify-start">
                    <div className="flex items-start justify-end w-1/12 my-1 mr-3">
                        <NavLink to={'/purchase_history'} className=" my-1 w-1/3">
                            <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
                                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                            </svg>
                        </NavLink>
                    </div>
                    <div className="flex-1 flex-col">
                        <p className="font-bold text-3xl leading-normal bg-white">Chi tiết đơn hàng</p>
                        <p className="text-lg leading-normal bg-white">Mã đơn hàng: {orderSelected.id}</p>
                        <p className="text-lg leading-normal bg-white">
                            {format(new Date(orderSelected.createAt), 'dd-MM-yyyy HH:mm:ss')}
                        </p>
                    </div>
                    <div className="flex justify-center items-center w-1/6">
                        <p className="text-green-900 bg-green-200 p-2 rounded-xl">
                            {(() => {
                                switch (orderSelected.orderDeliveryStatusDetails.deliveryStatusId) {
                                    case 1:
                                        return 'Chờ xác nhận';
                                    case 2:
                                        return 'Đang giao hàng';
                                    case 3:
                                        return 'Đã giao hàng';
                                }
                            })()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-10/12">
                {orderSelected.orderDetails.map((orderDetail) => (
                    <div className="relative flex flex-row left-5 mx-8 bg-gray-100 my-2 rounded-2xl">
                        <img
                            src={orderDetail.itemDetailDto.itemDto.imagesItem[0].image}
                            className="p-2 hover:scale-105 w-1/6 h-1/2 rounded-2xl"
                            alt="AnhSP"
                        />
                        <div className="flex-1 flex-col my-5 mx-5">
                            <p className="font-bold text-2xl ">{orderDetail.itemDetailDto.itemDto.name}</p>
                            <p className="text-lg ">Số lượng: {orderDetail.amount}</p>
                            <div className="flex flex-row">
                                <p className="text-xl text-red-600">
                                    {(orderDetail.itemDetailDto.itemDto.sellPrice -
                                        (orderDetail.itemDetailDto.itemDto.sellPrice *
                                            orderDetail.itemDetailDto.itemDto.discount) /
                                            100).toLocaleString()}
                                    đ
                                </p>
                                <div className="flex flex-row mx-2 my-2">
                                    <p className="text-sm text-gray-500 line-through">
                                        {orderDetail.itemDetailDto.itemDto.sellPrice.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">đ</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-3/12 items-end justify-end mx-8 my-4">
                            <NavLink
                                to={'/item_detail?itemId=' + orderDetail.itemDetailDto.itemId}
                                className="flex text-redPrimary px-4 underline"
                            >
                                Xem lại sản phẩm
                            </NavLink>
                        </div>
                        {orderSelected.orderDeliveryStatusDetails.deliveryStatusId === 3 ? (
                            <div className="flex rounded-lg m-3 h-8 w-48 justify-center items-center  bg-btnGreen">
                                <Popup
                                    trigger={
                                        <button className="flex flex-row items-center justify-center mb-1">
                                            <p className="mr-2 text-sm text-white">Thêm đánh giá</p>
                                            <img
                                                src={images.plus_white}
                                                alt="addCart"
                                                width="15px"
                                                height="15px"
                                            ></img>{' '}
                                        </button>
                                    }
                                    modal
                                    nested
                                >
                                    {(close) => (
                                        <div className="modal bg-white border-1 rounded-xl w-180 border-gray-200 flex flex-col justify-around items-center">
                                            <div className="border-b-1 border-gray-200 w-full flex items-center justify-center">
                                                <p className="font-bold my-6 ">Đánh giá sản phẩm</p>
                                                <div className="absolute right-5">
                                                    <img src={images.close} onClick={() => close()} />
                                                </div>
                                            </div>
                                            <img
                                                src={orderDetail.itemDetailDto.itemDto.imagesItem[0].image}
                                                width="140px"
                                                height="140px"
                                                className="my-2"
                                            ></img>
                                            <p className="font-bold text-2xl my-2">
                                                {orderDetail.itemDetailDto.itemDto.name}
                                            </p>
                                            <Rating
                                                name="rating"
                                                value={value}
                                                className="mx-5 my-2"
                                                size="large"
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                            />
                                            <p className="my-2">{labels[hover !== -1 ? hover : value]}</p>
                                            <textarea
                                                className="p-5 outline-none w-144 border-1 h-40 border-gray-200 rounded-xl "
                                                id="contentPopup"
                                            ></textarea>
                                            <div className="my-6">
                                                <button
                                                    className="p-2 bg-btnGreen rounded-xl"
                                                    onClick={() =>
                                                        sendReview(close, orderDetail.itemDetailDto.itemDto.id)
                                                    }
                                                >
                                                    Gửi đánh giá
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                                <Popup open={showSuccessPopup} modal>
                                    <div className="w-80 h-32 border-1 bg-gray-100 border-gray-200 rounded-xl flex justify-center items-center">
                                        <p className="font-bold">Đánh giá thành công!</p>
                                    </div>
                                </Popup>

                                <Popup open={showErrorPopup} modal className="w-44 h-24 bg-orange-200 rounded-xl">
                                    <div className="w-80 h-32 border-1 bg-gray-100 border-gray-200 rounded-xl flex justify-center items-center">
                                        <p className="font-bold">Đánh giá thất bại. Vui lòng thử lại sau!</p>
                                    </div>
                                </Popup>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            <div className="flex flex-col my-5 w-10/12">
                <div className="relative flex flex-row h-32 w-full justify-start">
                    <div className="flex items-start justify-end w-1/12 mr-3 ">
                        <button className="my-2 w-1/4  fill-redPrimary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex-col">
                        <p className="font-bold text-xl text-redPrimary">Chi tiết thanh toán</p>
                        <div className="flex flex-row my-2 ">
                            <div>
                                <p className="text-lg leading-normal ">Tổng tiền hàng:</p>
                                <p className="text-lg leading-normal ">Phí vận chuyển:</p>
                                <p className="text-lg leading-normal font-bold">Tổng thanh toán:</p>
                            </div>
                            <div className="mx-8 flex flex-col items-end justify-end">
                                <p className="text-lg leading-normal ">{totalFee.toLocaleString()}đ</p>
                                <p className="text-lg leading-normal ">{shipFee.toLocaleString()}đ</p>
                                <p className="text-lg leading-normal font-bold text-green-700">
                                    {(totalFee + shipFee).toLocaleString()}đ
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col my-5 w-10/12">
                <div className="relative flex flex-row h-32 w-full justify-start">
                    <div className="flex items-start justify-end w-1/12 mr-3">
                        <button className="my-2 w-1/4 fill-redPrimary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                                <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h89.9c-6.3-10.2-9.9-22.2-9.9-35.1c0-46.9 25.8-87.8 64-109.2V271.8 48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zM576 272a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM352 477.1c0 19.3 15.6 34.9 34.9 34.9H605.1c19.3 0 34.9-15.6 34.9-34.9c0-51.4-41.7-93.1-93.1-93.1H445.1c-51.4 0-93.1 41.7-93.1 93.1z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex-col">
                        <p className="font-bold text-xl text-redPrimary">Thông tin người nhận</p>
                        <div className="flex flex-col my-2 ">
                            <div className="flex flex-row">
                                <div className="m-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                    </svg>
                                </div>
                                <p className="text-lg leading-normal mx-1">Người nhận hàng:</p>
                                <p className="text-lg leading-normal mx-1 text-gray-600 font-bold">
                                    {orderSelected.name}
                                </p>
                            </div>
                            <div className="flex flex-row">
                                <div className="m-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                    </svg>
                                </div>
                                <p className="text-lg leading-normal mx-1">Số điện thoại :</p>
                                <p className="text-lg leading-normal mx-1 text-gray-600 font-bold">
                                    {orderSelected.phone}
                                </p>
                            </div>
                            <div className="flex flex-col my-2">
                                <div className="m-1 flex flex-row">
                                    <svg
                                        className="m-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 384 512"
                                    >
                                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                    </svg>
                                    <p className="text-lg leading-normal mx-1">Địa chỉ nhận hàng :</p>
                                </div>
                                <p className="text-lg leading-normal mx-6 text-gray-600">
                                    {orderSelected.deliveryAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;