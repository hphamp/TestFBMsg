import { useNavigate } from 'react-router-dom';
import itemcarts, { removeItemInCart } from '../../api/itemcart';
import images from '../../assets/images';
import { useEffect, useState } from 'react';
import React from 'react';

function Cart() {
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const [itemCart, setItemCart] = useState([]);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [checked, setChecked] = useState(false);

    const onChange = () => {
        const updatedItemCart = [...itemCart];
        var list = document.querySelectorAll('.select-checkbox');
        if (checked === false) {
            setChecked(true);
            list.forEach((item) => (item.checked = true));
            updatedItemCart.forEach((item) => (item.isDelete = true));
        } else if (checked === true) {
            setChecked(false);
            list.forEach((item) => (item.checked = false));
            updatedItemCart.forEach((item) => (item.isDelete = false));
        }
        setItemCart(updatedItemCart);
        console.log(updatedItemCart);
    };

    const onChangeItem = (index) => {
        const updatedItemCart = [...itemCart];
        const list = document.querySelectorAll('.select-checkbox');
        let allChecked = true;

        list.forEach((element, currentIndex) => {
            if (currentIndex === index) {
                updatedItemCart[index].isDelete = element.checked;
            }

            if (!element.checked) {
                allChecked = false;
            }
        });

        // Cập nhật state checked dựa trên trạng thái của tất cả các checkbox con
        setChecked(allChecked);
        setItemCart(updatedItemCart);
    };
    useEffect(() => {
        console.log('itemCart:', JSON.stringify(itemCart));
        const selectedItemsArray = itemCart.filter((item) => item.isDelete);
        console.log(selectedItemsArray);
        localStorage.setItem('myJsonArray', JSON.stringify(selectedItemsArray));
    }, [itemCart]);

    const deleteAll = () => {
        setItemCart([]);
    };
    const deleteItem = (index) => {
        const id = itemCart[index].id;

        const removeItem = async () => {
            const result = await removeItemInCart(token, id);
            if (result) {
                console.log('result:' + { result });
            }
            const res_count = await itemcarts(localStorage.getItem('userId'), token);
            if (res_count) {
                localStorage.setItem('count_cart', res_count.length);
            }
            fetchData();
        };
        var list = document.querySelectorAll('.select-checkbox');
        console.log('first: ' + list.length);
        const updatedItemCart = [...itemCart]; // Tạo một bản sao của mảng itemCart
        updatedItemCart.splice(index, 1);
        setItemCart(updatedItemCart);
        list = document.querySelectorAll('.select-checkbox');
        console.log('second:' + list.length);
        removeItem();
    };
    const fetchData = async () => {
        try {
            const result = await itemcarts(userId, token);
            if (result === null) {
                // navigate('/login');
            }
            if (result) {
                setItemCart(result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const calculateTotalPrice = () => {
        let priceTemp = 0;
        itemCart.forEach((element) => {
            if (element.isDelete === true) {
                const sellPrice = element.itemDetail.item.sellPrice;
                const discount = element.itemDetail.item.discount;
                const sellPriceAfterDiscount = sellPrice - (sellPrice * discount) / 100;
                priceTemp += sellPriceAfterDiscount * element.quantity;
            }
        });
        setPrice(priceTemp);
    };

    // Sử dụng useEffect để theo dõi sự thay đổi của itemCart và tính lại tổng giá tiền
    useEffect(() => {
        calculateTotalPrice();
    }, [itemCart]);

    const handleButtonClick = () => {
        const storedJsonString = localStorage.getItem('myJsonArray');
        const storedJsonArray = JSON.parse(storedJsonString);
        console.log(storedJsonArray);
        navigate('/payment', { state: { selectedItemsArray: storedJsonArray } });
    };

    return (
        <div className="flex flex-col justify-center items-center relative">
            <div className="w-3/5">
                <div className="w-full flex flex-row  bg-redPrimary relative">
                    <h1 className="font-medium text-3xl text-white mx-5"> GIỎ HÀNG</h1>
                </div>
                {itemCart.length > 0 ? (
                    <div className="w-full relative mt-10">
                        <div className="h-5 my-3">
                            <div className="absolute left-0 ">
                                <input
                                    type="checkbox"
                                    value="selectedAll"
                                    id="selectedAll"
                                    checked={checked}
                                    onChange={() => onChange()}
                                ></input>
                                <label className="ml-2">Chọn tất cả</label>
                            </div>
                            <div className="absolute right-0">
                                <button onClick={() => deleteAll()}>
                                    <label className="underline">Xóa tất cả</label>
                                </button>
                            </div>
                        </div>
                        <div>
                            {itemCart.map((item, index) => (
                                <div className="h-40 relative border-1 rounded-md border-gray-200 my-3">
                                    <div className=" absolute left-0 flex flex-row items-center w-5/6 h-full">
                                        <div className="w-2/6 absolute left-0 h-full">
                                            <div className="w-1/6 absolute h-full flex justify-center">
                                                <div className="mt-4">
                                                    <input
                                                        type="checkbox"
                                                        key={index}
                                                        className="select-checkbox"
                                                        checked={item.isDelete}
                                                        onChange={() => onChangeItem(index)}
                                                    ></input>
                                                </div>
                                            </div>
                                            <div className="flex flex-row absolute right-0 h-full w-5/6 items-center">
                                                <div className=" border-1 w-4/6 h-5/6 border-gray-100">
                                                    <img
                                                        src={item.itemDetail.item.imagesItem[0].image}
                                                        className="w-full h-full"
                                                        alt=""
                                                    />
                                                </div>
                                                <div></div>
                                            </div>
                                        </div>
                                        <div className="w-4/6 absolute  top-2 right-0 font-medium text-xl">
                                            <div>
                                                <p className="break-all">{item.itemDetail.item.name}</p>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <div className="text-red-500">
                                                    {(
                                                        item.itemDetail.item.sellPrice -
                                                        (item.itemDetail.item.sellPrice *
                                                            item.itemDetail.item.discount) /
                                                            100
                                                    ).toLocaleString()}
                                                    đ
                                                </div>
                                                <div className="ml-5 text-base line-through items-center text-gray-500">
                                                    <p>{item.itemDetail.item.sellPrice.toLocaleString()}đ</p>
                                                </div>
                                            </div>
                                            <div className="font-normal flex flex-row text-sm  my-2 ">
                                                <p>Màu sắc :</p>
                                                <div
                                                    style={{ background: `#${item.itemDetail.color.code.trim()}` }}
                                                    className="w-7 h-7 rounded-full mx-2 border-1"
                                                ></div>
                                            </div>
                                            <div className="flex flex-row items-center font-normal text-sm my-2">
                                                <p className="">Số lượng :</p>
                                                <p className="mx-2">{item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col absolute right-0 items-center justify-center w-1/6 h-full ">
                                        <div className="absolute right-2 top-2">
                                            <button onClick={() => deleteItem(index)}>
                                                <img src={images.delete} alt=""></img>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-center py-10 bg-gray-100 fixed bottom-0 left-0 w-full z-50">
                                <div className="absolute flex flex-row items-center left-32 text-2xl font-semibold">
                                    <p>Tạm tính:</p>
                                    <p className="text-red-500 text-xl ml-5 font-medium">{price.toLocaleString()}đ</p>
                                </div>
                                <button
                                    className="w-36 h-10 bg-green-600 absolute right-32 rounded-md flex items-center justify-center text-xl"
                                    onClick={handleButtonClick}
                                >
                                    <label className="absolute left-3 text-white">Mua hàng</label>
                                    <img
                                        className="w-5 h-5 absolute bottom-2 right-3"
                                        src={images.currency_exchange}
                                        alt=""
                                    ></img>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className=" w-full h-80 flex justify-center items-center">
                        <p className="font-medium text-2xl">Không có sản phẩm trong giỏ hàng</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
