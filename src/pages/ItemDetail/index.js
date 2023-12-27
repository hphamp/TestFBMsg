import images from '../../assets/images';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import item from '../../api/itemWithID';
import comments from '../../api/comment';
import { Rating } from '@mui/material';

import Popup from 'reactjs-popup';
import itemcarts, { addItemInCarts } from '../../api/itemcart';

function ItemDetail() {
    // ----------------------------------------------------------------
    //images item
    const location = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const itemId = queryParams.get('itemId');
    console.log('itemId:' + itemId);
    const [data, setData] = useState([]);
    const [comment, setComment] = useState([]);
    const [amount, setAmount] = useState(0);
    let ratingAll = 0;
    const [repCMTMap, setRepCMTMap] = useState(new Map());
    useEffect(() => {
        const fetchData = async () => {
            console.log('2itemId:' + itemId);
            const result = await item(itemId);
            setColorSelected(result.itemDetails[0].color.code);
            setAmount(result.itemDetails[0].amount);
            const comment = await comments(itemId);
            if (result && comment) {
                setData(result);
                setComment(comment);
                console.log(result);
                console.log(comment);
            }
        };

        fetchData();
    }, []);

    const token = localStorage.getItem('token');
    const [count, setCount] = useState(1);
    const [colorSelected, setColorSelected] = useState('');

    console.log('rep2:', repCMTMap.get(2) ? repCMTMap.get(2)[0]?.id : 'N/A');
    const imagess = [];
    if (data && data.imagesItem) {
        data.imagesItem.forEach((element) => {
            imagess.push(element.image);
        });
    }
    if (comment) {
        let totalRating = 0;
        comment.forEach((e) => {
            totalRating += e.rating;
        });
        ratingAll = totalRating / comment.length;
    }
    const formatDateTime = (isoString) => {
        const dateObject = new Date(isoString);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();

        return `${day}-${month}-${year}  ${hours}:${minutes}`;
    };

    var [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagess.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imagess.length - 1 ? 0 : prevIndex + 1));
    };
    const changgImage = (image) => {
        for (let i = 0; i < imagess.length; i++) {
            if (image === imagess[i]) {
                setCurrentIndex(i);
            }
        }
    };
    const scrollContainer = useRef(null);

    const scrollLeft = () => {
        scrollContainer.current.scrollLeft -= 300; // Điều chỉnh khoảng cách cuộn khi nhấn nút "Previous"
    };

    const scrollRight = () => {
        scrollContainer.current.scrollLeft += 300; // Điều chỉnh khoảng cách cuộn khi nhấn nút "Next"
    };

    // ----------------------------------------------------------------
    const [selectedColor, setSelectedColor] = useState(null);
    const handleColorChange = (newColor) => {
        setSelectedColor(newColor);
        data.itemDetails.forEach((element) => {
            if (element.color.code === newColor) {
                setAmount(element.amount);
                setColorSelected(newColor);
            }
        });
    };

    const addItemInCart = () => {
        let item_detail_id = 0;
        data.itemDetails.forEach((item) => {
            if (item.color.code === colorSelected) {
                item_detail_id = item.id;
            }
        });
        const itemcart = {
            userId: localStorage.getItem('userId'),
            itemDetailId: item_detail_id,
            quantity: count,
        };
        const addItem = async () => {
            const res = await addItemInCarts(token, itemcart);
            if (res) {
                console.log(res);
            }
            const res_count = await itemcarts(localStorage.getItem('userId'), token);
            if (res_count) {
                localStorage.setItem('count_cart', res_count.length);
            }
        };

        addItem();
    };
    const decreaseAmount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    const increaseAmount = () => {
        setCount(count + 1);
    };
    return (
        <div className="relative flex flex-col justify-center items-center top-5">
            <div className="relative w-200 h-full">
                <div className="flex flex-row pb-5">
                    <div className="flex flex-row items-center">
                        <button className="mx-2">
                            <img src={images.back} alt="back" width="20px" height="20px"></img>
                        </button>
                        <p className="font-bold text-2xl leading-normal">{data.name}</p>
                        <Rating
                            name="rating"
                            precision={0.01}
                            value={parseFloat(data.rating)}
                            readOnly
                            className="mx-5"
                        />
                        <p className="underline text-xl">{comment ? comment.length + ' đánh giá' : 0}</p>
                    </div>
                    <div className="absolute flex flex-row right-0 mt-1" onClick={() => addItemInCart()}>
                        <button
                            className="bg-my-red flex flex-row rounded-lg h-10 justify-center items-center px-2"
                            disabled={amount === 0 || amount < count}
                        >
                            <p className="mr-2 text-xl text-white">Thêm vào giỏ hàng</p>
                            <img src={images.plus_white} alt="addCart" width="15px" height="15px"></img>
                        </button>
                    </div>
                </div>
                <div className="border-t-1 border-gray-400 flex flex-row mb-5 py-5">
                    <div className="w-1/3 h-80  flex flex-col ">
                        <div className="relative h-3/4 ">
                            <div className=" w-full h-full absolute justify-between items-center ">
                                <img
                                    id="imgItem"
                                    style={{ width: '100%', height: '100%' }}
                                    src={imagess[currentIndex]}
                                    alt={`Image ${currentIndex + 1}`}
                                />
                            </div>
                            <div onClick={goToPrevious} className="absolute left-0 top-24 bg-white hover:bg-gray-300">
                                <img src={images.angle_left} className="w-5 h-10" alt="imagea"></img>
                            </div>
                            <div onClick={goToNext} className="absolute right-0 top-24 bg-white hover:bg-gray-300">
                                <img src={images.angle_right} className="w-5 h-10" alt="imageb"></img>
                            </div>
                        </div>
                        <div className="h-1/4  relative flex justify-center  ">
                            <div className="border w-5/6 border-gray-300 relative container flex items-center justify-center ">
                                <div
                                    className="overflow-x-hidden flex flex-row whitespace-nowrap "
                                    ref={scrollContainer}
                                >
                                    {imagess.map((image) => (
                                        <img
                                            onClick={() => changgImage(image)}
                                            src={image}
                                            width="50px"
                                            height="50px"
                                            className="object-cover hover:scale-105 m-1"
                                            alt=""
                                        ></img>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-300 text-gray-700 rounded-full hover:text-gray-800"
                            >
                                <img src={images.angle_left} className="w-3 h-8" alt="image1"></img>
                            </button>
                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-300 text-gray-700 rounded-full  hover:text-gray-800"
                            >
                                <img src={images.angle_right} className="w-3 h-8" alt="image1"></img>
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full relative">
                        <div className="flex flex-col pt-5 px-5 w-full">
                            <div className="">
                                <p className="font-bold">Giá bán </p>
                            </div>
                            <div className="relative flex flex-row w-full mb-10 items-start">
                                <div className="flex flex-row h-9 items-center">
                                    <p className="text-my-red font-bold mr-10 text-3xl">
                                        {data && data.sellPrice && data.discount !== undefined
                                            ? (
                                                  data.sellPrice -
                                                  (data.sellPrice * data.discount) / 100
                                              ).toLocaleString() + 'VND'
                                            : 'N/A'}
                                    </p>
                                    <p className="line-through text-xl">
                                        {data && data.sellPrice ? data.sellPrice.toLocaleString() + 'VND' : 'N/A'}
                                    </p>
                                </div>
                                <div className="flex flex-row h-9 items-center absolute right-0">
                                    <button
                                        className="block bg-gray-300 p-2 rounded-md"
                                        onClick={() => decreaseAmount()}
                                    >
                                        <img
                                            src={images.minus}
                                            alt="minus"
                                            width="10px"
                                            height="10px"
                                            className="ml-0.5"
                                        ></img>
                                    </button>
                                    <p className="mx-2 text-2xl">{count}</p>
                                    <button
                                        className="className=block bg-gray-300 p-2 rounded-md"
                                        onClick={() => increaseAmount()}
                                    >
                                        <img
                                            src={images.plus_black}
                                            alt="plus"
                                            width="10px"
                                            height="10px"
                                            className="ml-0.5"
                                        ></img>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-row  w-full justify-between ">
                                <div className=" flex flex-row items-center h8 justify-start  ">
                                    <p className="font-bold mr-3">Số lượng còn lại:</p>
                                    <p>{amount}</p>
                                </div>
                                <div className="flex flex-row items-center h-8 justify-end ">
                                    <p className="font-bold mx-5">Màu: </p>
                                    <div className="flex flex-row items-center">
                                        {data &&
                                            data.itemDetails &&
                                            data.itemDetails.map((ItemDetail) => (
                                                <button
                                                    value={ItemDetail.color.code}
                                                    key={ItemDetail.color.code}
                                                    onClick={() => handleColorChange(ItemDetail.color.code)}
                                                    style={{
                                                        backgroundColor: `#${ItemDetail.color.code.trim()}`,
                                                        border: `3px solid ${
                                                            selectedColor === ItemDetail.color.code
                                                                ? 'black'
                                                                : 'transparent'
                                                        }`,
                                                    }}
                                                    className="w-7 h-7 rounded-full mx-2 border-1"
                                                ></button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col ml-5">
                            <p className="font-bold my-3">Thông tin sản phẩm:</p>
                            <p className="">{data.description}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row w-full items-center mt-20">
                        <div className="flex flex-row items-center">
                            <p className="text-my-red text-2xl font-semibold">Đánh giá sản phẩm</p>
                            <p className="underline mx-5 text-xl">{comment ? comment.length + ' đánh giá' : 0}</p>
                        </div>
                    </div>
                    <div className="border-gray-300 border-1 rounded-xl mt-5 p-4 bg-slate-50">
                        {comment.map((comment) => (
                            <div className="flex flex-col border-1 border-gray-200 rounded-2xl mb-3">
                                <div className="w-full flex flex-col px-2 mt-3 ">
                                    <div className="flex flex-row  items-center pb-1">
                                        <div className="items-center h-full ">
                                            <img
                                                src={comment.participantDto.image}
                                                width="40px"
                                                height="40px"
                                                alt="imageg"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className=" pl-2">
                                            <p>
                                                {comment.participantDto.firstName +
                                                    ' ' +
                                                    comment.participantDto.lastName}
                                            </p>
                                            <Rating name="rating" value={comment.rating} readOnly></Rating>
                                        </div>
                                    </div>
                                    <div className="border-gray-300 border-1 rounded-2xl mt-2 p-4 bg-white">
                                        <p className="break-all">{comment.content}</p>
                                    </div>
                                    <div>
                                        <p className="font-thin text-xs ml-1 mt-1">{formatDateTime(comment.time)}</p>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col px-2  ">
                                    {repCMTMap.get(comment.id) &&
                                        Array.isArray(repCMTMap.get(comment.id)) &&
                                        repCMTMap.get(comment.id).map((rep) => (
                                            <div className="w-full flex flex-col pl-16 py-5 ">
                                                <div className="flex flex-row  items-center pb-1">
                                                    <div className="items-center h-full">
                                                        <img
                                                            src={rep.participantDto.image}
                                                            width="40px"
                                                            height="40px"
                                                            alt="imageg"
                                                            className="rounded-full"
                                                        />
                                                    </div>
                                                    <div className="pl-2">
                                                        <p>
                                                            {rep.participantDto.firstName +
                                                                ' ' +
                                                                rep.participantDto.lastName}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="border-gray-300 border-1 rounded-2xl mt-2 p-4 bg-white">
                                                    <p className="break-all">{rep.content}</p>
                                                </div>
                                                <div>
                                                    <p className="font-thin text-xs ml-1 mt-1">
                                                        {formatDateTime(rep.time)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;