import { NavLink } from 'react-router-dom';
import images from '../../assets/images';
import PapalCheckoutButton from '~/pages/PayPal';
import { useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import paymentOrder from '../../api/paymentVnpay';
import { addDays, format } from 'date-fns';
import itemcarts from '../../api/itemcart';
import paymentOrderPaypal from '../../api/paymentPaypal';
import { paymentOrderPayLive } from '../../api/order';

const shipFee = 25000;
function Payment() {
    const location = useLocation();
    const { selectedItemsArray } = location.state ?? { selectedItemsArray: [] };

    const itemPayment = JSON.parse(JSON.stringify(selectedItemsArray));
    const orderDetailDto = [];
    console.log('ALOOODDWYY:', itemPayment);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user:', user);
    const name = user.firstName + ' ' + user.lastName;
    const phone = user.phone;
    const address = user.address;
    console.log('user:', name + ' ' + phone + ' ' + address);

    const totalPrice = itemPayment.reduce(
        (total, current) =>
            total +
            current.quantity *
                (current.itemDetail.item.sellPrice -
                    (current.itemDetail.item.sellPrice * current.itemDetail.item.discount) / 100),
        0,
    );
    console.log('totalPrice:' + totalPrice);

    const [paymentMethod, setPaymentMethod] = useState('');
    let token = localStorage.getItem('token');

    const product = {
        desc: 'Design + Code React',
        price: 20,
    };
    function handleSelectedPM(PM) {
        if (PM === 'VNPAY') {
            setPaymentMethod('VNPAY');
        }
        if (PM === 'PAYPAL') {
            console.log('Vao day paypal');
            setPaymentMethod('PAYPAL');
        }
        if (PM === 'PAYLIVE') {
            console.log('Vao day PAYLIVE');
            setPaymentMethod('PAYLIVE');
        }
    }

    function handlePayment() {
        const currentTimeMillis = new Date().getTime();
        const createAt = format(currentTimeMillis, "yyyy-MM-dd'T'HH:mm:ss");
        const deliveryDateNotFormat = addDays(new Date(createAt), 2);
        const deliveryDate = format(deliveryDateNotFormat, 'yyyy-MM-dd');
        const note = document.getElementById('note').value;
        const nameReceiver = document.getElementById('nameReceiver').value;
        const addressReceiver = document.getElementById('addressReceiver').value;
        const phoneReceiver = document.getElementById('phoneReceiver').value;
        itemPayment.forEach((item) => {
            const element = {
                itemDetailDtoId: item.itemDetail.id,
                amount: item.quantity,
                note: note,
                itemCartId: item.id,
            };
            orderDetailDto.push(element);
        });
        const order = {
            deliveryAddress: addressReceiver,
            totalFee: totalPrice + shipFee,
            deliveryDate: deliveryDate,
            createAt: createAt,
            customerId: user.id,
            paymentMethodId: paymentMethod === 'VNPAY' ? 3 : paymentMethod === 'PAYPAL' ? 2 : 1,
            phone: phoneReceiver,
            name: nameReceiver,
            orderDetailDtos: orderDetailDto,
        };
        if (paymentMethod === 'VNPAY') {
            console.log('orderDetail:', order.orderDetailDtos);
            const paymentVnpay = async () => {
                const result = await paymentOrder(order);
                if (result) {
                    console.log('result:' + result);
                    window.open(result, '_blank');
                }
            };
            paymentVnpay();
        }
        if (paymentMethod === 'PAYPAL') {
            const paymentPaypal = async () => {
                const result = await paymentOrderPaypal(order);
                if (result) {
                    console.log('result:' + result);
                    window.open(result, '_blank');
                }
            };
            paymentPaypal();
        }
        if (paymentMethod === 'PAYLIVE') {
            const paymentPaypal = async () => {
                const result = await paymentOrderPayLive(order, localStorage.getItem('token'));
                console.log('result' + result.data);
            };
            paymentPaypal();
        }
    }

    return (
        <div className="w-full flex items-center justify-center" id="payment">
            <div className="w-4/6 flex flex-col items-center justify-center">
                <div className="relative flex flex-row items-center justify-start w-full bg-redPrimary text-white">
                    <NavLink to={''} className={'m-3 '}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                            style={{ fill: 'white' }}
                        >
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>
                    </NavLink>
                    <h1 className="w-11/12 flex justify-start">Thông tin nhận hàng</h1>
                </div>
                <div className="w-full flex flex-col">
                    <div className="flex flex-row mt-5">
                        <div className="w-1/2">
                            <div className="w-4/5 relative left-0">
                                <p className="flex flex-row font-medium text-gray-500">
                                    Tên người nhận <p className="text-red-500 mb-2">*</p>
                                </p>
                                <input
                                    id="nameReceiver"
                                    type="text"
                                    placeholder="Tên khách hàng"
                                    className="border-b-1 border-gray-300 w-full h-8 pl-2 outline-none"
                                    defaultValue={name}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 relative ">
                            <div className="w-4/5 absolute right-0">
                                <p className="flex flex-row font-medium text-gray-500">
                                    Số điện thoại<p className="text-red-500 mb-2">*</p>
                                </p>
                                <input
                                    id="phoneReceiver"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    className="border-b-1 border-gray-300 w-full h-8 pl-2 outline-none"
                                    defaultValue={phone}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <div>
                            <p className="flex flex-row font-medium  text-gray-500">
                                Địa chỉ nhận hàng <p className="text-red-500 mb-2">*</p>
                            </p>
                            <input
                                id="addressReceiver"
                                type="text"
                                placeholder="Địa chỉ nhận hàng"
                                className="border-b-1 border-gray-300 h-8 w-full pl-2 outline-none"
                                defaultValue={address}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-10">
                    <div className="w-full">
                        <p className="flex flex-row font-medium  text-gray-500">
                            Sản phẩm đặt mua<p className="text-red-500 mb-2">*</p>
                        </p>
                    </div>
                    <div className="w-full">
                        {itemPayment.map((item) => (
                            <div className="border-gray-200 border-1  mb-2 h-44 flex flex-row rounded-md">
                                <div className="flex h-full flex-row w-5/6 items-center">
                                    <div className="border-gray-200 border-1 flex items-center justify-center mx-6">
                                        <img
                                            src={item.itemDetail.item.imagesItem[0].image}
                                            className="h-36 w-36 object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <div className=" w-3/4  flex-col inline-block font-medium mt-1 ">
                                        <p className="w-96 break-all mb-1">{item.itemDetail.item.name}</p>
                                        <p className="mb-1">Số lượng: {item.quantity}</p>
                                        <p className="mb-1">Note:</p>
                                        <textarea
                                            className="border-1 border-gray-200 w-90 h-20 mb-1"
                                            id="note"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="w-1/6  flex flex-col justify-center items-center">
                                    <p className="text-red-500 h-10 font-bold">
                                        {(
                                            item.itemDetail.item.sellPrice -
                                            (item.itemDetail.item.sellPrice * item.itemDetail.item.discount) / 100
                                        ).toLocaleString()}
                                        đ
                                    </p>
                                    <p className="text-gray-400 h-10 font-normal line-through">
                                        {item.itemDetail.item.sellPrice.toLocaleString()}đ
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full flex justify-end mt-5 bg-gray-100">
                    <div className="w-96 flex flex-col ">
                        <div className="flex  w-full items-center font-medium flex-col ">
                            <div className="w-4/5 flex flex-row h-8 items-center relative my-3">
                                <img src={images.clinical_notes} alt="" />
                                <p>Chi tiết thanh toán</p>
                            </div>
                            <div className="w-4/5 flex flex-row h-8 relative">
                                <p className="absolute left-0">Tổng tiền hàng:</p>
                                <p className="absolute right-0 text-red-600">{totalPrice.toLocaleString()}đ</p>
                            </div>
                            <div className="flex flex-row w-4/5 h-8 relative ">
                                <p className="absolute left-0">Phí vận chuyển:</p>
                                <p className="absolute right-0 text-red-600">{shipFee.toLocaleString()}đ</p>
                            </div>
                        </div>
                        <div className=" w-full h-10  flex justify-center">
                            <div className="flex flex-row w-4/5 h-8 relative  font-bold  text-xl items-center">
                                <p className="absolute left-0">Tổng thanh toán:</p>
                                <p className=" absolute right-0">{(totalPrice + shipFee).toLocaleString()}đ</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full mt-6">
                    <div className="my-2">
                        <p className="font-medium">Phương thức thanh toán</p>
                    </div>
                    <div className="grid grid-cols-2 border-b-1 border-gray-300 pb-5 ">
                        <div className="w-full relative my-5">
                            <button
                                className="w-full h-11 bg-white right-0 top-10 rounded-md flex items-center justify-center text-xl border-1 hover:bg-gray-100 hover:opacity-90 focus:bg-gray-400"
                                onClick={() => handleSelectedPM('VNPAY')}
                            >
                                <img className="w-auto h-8 mx-3" src={images.vnpay} alt=""></img>
                            </button>
                        </div>
                        <div className="w-full relative my-5 px-3">
                            <button
                                className="w-full h-11 bg-white right-0 top-10 rounded-md flex items-center justify-center text-xl border-1 hover:bg-gray-100 hover:opacity-90 focus:bg-gray-400"
                                onClick={() => handleSelectedPM('PAYPAL')}
                            >
                                <label className=" left-3 text-black">Credit Card</label>
                                <img className="w-auto h-full mx-3 py-1" src={images.visa} alt=""></img>
                            </button>
                        </div>
                        <div className="w-full relative">
                            <button
                                className="w-full h-11 bg-green-600 right-0 top-10 rounded-md flex items-center justify-center text-xl hover:opacity-90 focus:bg-gray-400"
                                onClick={() => handleSelectedPM('PAYLIVE')}
                            >
                                <label className=" left-3 text-white">Thanh toán khi nhận hàng</label>
                                <img className="w-5 h-5 mx-3" src={images.currency_exchange} alt=""></img>
                            </button>
                        </div>

                        <div className="px-3">
                            {/* <PapalCheckoutButton product={product}></PapalCheckoutButton> */}
                        </div>
                    </div>
                    <div className="w-full relative pt-2 pb-16">
                        <button
                            className="absolute w-40 h-10 bg-green-600 right-0 top-10 rounded-md flex items-center justify-center text-xl"
                            onClick={handlePayment}
                            disabled={itemPayment.length === 0}
                        >
                            <label className="absolute left-3 text-white">Thanh toán</label>
                            <img
                                className="w-5 h-5 absolute bottom-2 right-3"
                                src={images.currency_exchange}
                                alt=""
                            ></img>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Payment;
