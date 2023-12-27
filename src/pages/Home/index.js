import images from '~/assets/images';
import { Rating } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { itemsDiscounts9, itemsDiscountsNo9, itemsNew } from '../../api/itemWithID';

function Home() {
    document.title = 'ShoppiEC - Điện thoại, laptop, tablet, phụ kiện ... chính hãng';
    const scrollContainer1 = useRef(null);
    const scrollContainer2 = useRef(null);
    const [itemNew, setItemNew] = useState([]);
    const [itemDiscounts9, setItemDiscounts9] = useState([]);
    const [itemDiscountsN9, setItemDiscountsN9] = useState([]);

    const scrollLeft = (containerNumber) => {
        const scrollDistance = 900;
        const targetScrollLeft =
            containerNumber === 1
                ? scrollContainer1.current.scrollLeft - scrollDistance
                : scrollContainer2.current.scrollLeft - scrollDistance;
        animateScroll(targetScrollLeft, containerNumber);
    };

    const scrollRight = (containerNumber) => {
        const scrollDistance = 900;
        const targetScrollLeft =
            containerNumber === 1
                ? scrollContainer1.current.scrollLeft + scrollDistance
                : scrollContainer2.current.scrollLeft + scrollDistance;
        animateScroll(targetScrollLeft, containerNumber);
    };

    const animateScroll = (targetScrollLeft, containerNumber) => {
        const duration = 400; // Thời gian của animation (miliseconds)
        const scrollContainer = containerNumber === 1 ? scrollContainer1 : scrollContainer2;
        const start = scrollContainer.current.scrollLeft;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const newScrollLeft = start + progress * (targetScrollLeft - start);

            // Set scrollLeft based on the container number
            if (containerNumber === 1) {
                scrollContainer1.current.scrollLeft = newScrollLeft;
            } else if (containerNumber === 2) {
                scrollContainer2.current.scrollLeft = newScrollLeft;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const fetchData = async () => {
            const resultItemNew = await itemsNew();
            if (resultItemNew) {
                setItemNew(resultItemNew);
            }

            const resultItemDiscountNo9 = await itemsDiscountsNo9();
            if (resultItemDiscountNo9) {
                setItemDiscountsN9(resultItemDiscountNo9);
            }

            const resultItemDiscount9 = await itemsDiscounts9();
            if (resultItemDiscount9) {
                setItemDiscounts9(resultItemDiscount9);
            }
        };

        fetchData();
    }, []);

    let index = 0;
    return (
        <div className=" flex flex-col justify-center items-center mb-10">
            <h1 className="fixed top-[-100px]">ShoppiEC - Điện thoại, laptop, tablet, phụ kiện chính hãng</h1>
            <div className="flex items-center justify-center w-9/12 h-auto bg-redPrimary">
                <div className="flex items-center justify-center">
                    <img src={images.bannerHome1} alt="Logo" className="w-10/12 h-auto py-1" />
                </div>
            </div>
            <div className="flex items-center justify-center w-9/12 h-auto">
                <img src={images.bannerHome2} alt="Logo" className="w-full h-auto py-1" />
            </div>

            {/* ==============SẢN PHẨM GIẢM SỐC================ */}

            <div className="flex flex-col h-96 w-9/12 ">
                <div className="mt-10">
                    <h2 className="inline-block border-b-4 mb-4 font-semibold text-2xl border-yellow-400">
                        SẢN PHẨM GIẢM SỐC
                    </h2>
                </div>

                <div className="flex flex-col h-96 w-full  ">
                    <div className="flex flex-row flex-1 h-80 relative container items-center  ">
                        <div className="flex flex-row whitespace-nowrap overflow-hidden mx-3" ref={scrollContainer1}>
                            {itemDiscountsN9.map((item) =>
                                (index += 1) ? (
                                    <Link to={`/item_detail?itemId=${item.id}`}>
                                        <div className="border-1 h-72 w-40 mx-3 px-1 pt-1 border-gray-300 shadow-md font-bold rounded-md bg-white items-center justify-center flex flex-col">
                                            <img
                                                src={item.imagesItem[0].image}
                                                alt=""
                                                className="object-cover w-full rounded-md hover:scale-105 h-1/2"
                                            />
                                            <div className="h-1/2 flex flex-col items-center">
                                                <p className="max-w-[150px] text-center break-all overflow-hidden line-clamp-3 whitespace-normal ">{item.name}</p>
                                                <p className="  text-center text-red-600 ">
                                                    {(
                                                        item.sellPrice -
                                                        (item.sellPrice * item.discount) / 100
                                                    ).toLocaleString()}
                                                    đ
                                                </p>
                                                <p className="  text-center font-normal text-sm text-gray-500 line-through">
                                                    {item.sellPrice.toLocaleString()}đ
                                                </p>
                                                <div className="w-20 h-6 bg-red-500 rounded-3xl">
                                                    <p className=" text-sm font-medium text-center">
                                                        Giảm {item.discount} %
                                                    </p>
                                                </div>

                                                <Rating value={item.rating}></Rating>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    ''
                                ),
                            )}
                        </div>
                        <button
                            onClick={() => scrollLeft(1)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2  bg-gray-300 text-gray-700  hover:bg-gray-400 hover:text-gray-800"
                        >
                            <img src={images.angle_left} alt="" className="w-5 h-10" />
                        </button>
                        <button
                            onClick={() => scrollRight(1)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2  bg-gray-300 text-gray-700  hover:bg-gray-400 hover:text-gray-800"
                        >
                            <img src={images.angle_right} alt="" className="w-5 h-10" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ==============SẢN PHẨM NỔI BẬT================ */}
            <div className="flex flex-col h-96 w-9/12  ">
                <div className="mt-10">
                    <h2 className="inline-block border-b-4 mb-4 font-semibold text-2xl border-yellow-400">
                        SẢN PHẨM MỚI
                    </h2>
                </div>

                <div className="flex flex-col h-96 w-full  ">
                    <div className="flex flex-row flex-1 h-80 relative container items-center  ">
                        <div className="flex flex-row  whitespace-nowrap overflow-hidden mx-3" ref={scrollContainer2}>
                            {itemNew.map((item) =>
                                (index += 1) ? (
                                    <Link to={`/item_detail?itemId=${item.id}`}>
                                        <div className="border-1 h-72 w-40 mx-3 px-1 pt-1 border-gray-300 shadow-md font-bold rounded-md bg-white items-center justify-center  flex flex-col">
                                            <img
                                                src={item.imagesItem[0].image}
                                                alt=""
                                                className="object-cover w-full rounded-md hover:scale-105 h-1/2"
                                            />
                                            <div className="h-1/2 flex flex-col items-center">
                                                <p className=" max-w-[150px] text-center break-all overflow-hidden line-clamp-3 whitespace-normal">{item.name}</p>
                                                <p className="  text-center text-red-600 ">
                                                    {(
                                                        item.sellPrice -
                                                        (item.sellPrice * item.discount) / 100
                                                    ).toLocaleString()}
                                                    đ
                                                </p>
                                                <p className="  text-center font-normal text-sm text-gray-500 line-through">
                                                    {item.sellPrice.toLocaleString()}đ
                                                </p>
                                                <div className="w-20 h-6 bg-red-500 rounded-3xl">
                                                    <p className=" text-sm font-medium text-center">
                                                        Giảm {item.discount} %
                                                    </p>
                                                </div>

                                                <Rating value={item.rating}></Rating>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    ''
                                ),
                            )}
                        </div>
                        <button
                            onClick={() => scrollLeft(2)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2  bg-gray-300 text-gray-700  hover:bg-gray-400 hover:text-gray-800"
                        >
                            <img src={images.angle_left} alt="" className="w-5 h-10" />
                        </button>
                        <button
                            onClick={() => scrollRight(2)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2  bg-gray-300 text-gray-700  hover:bg-gray-400 hover:text-gray-800"
                        >
                            <img src={images.angle_right} alt="" className="w-5 h-10" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center w-9/12 h-auto my-11">
                <img src={images.bannerHome3} alt="Logo" className="w-full h-auto py-1" />
            </div>

            {/* ==============PHỤ KIỆN GIẢM SỐC================ */}

            <div className="flex flex-col h-96 w-9/12  ">
                <div className="mt-1">
                    <h2 className="inline-block border-b-4 mb-4 font-semibold text-2xl border-yellow-400">
                        PHỤ KIỆN GIẢM SỐC
                    </h2>
                </div>
                <div className="flex flex-row items-center justify-center h-80 ">
                    {itemDiscounts9.slice(0, 6).map((item) => (
                        <Link to={`/item_detail?itemId=${item.id}`}>
                            <div className="border-1 h-72 w-40 mx-3 px-1 pt-1 border-gray-300 shadow-md font-bold rounded-md bg-white items-center justify-center  flex flex-col">
                                <img
                                    src={item.imagesItem[0].image}
                                    alt="Img Product"
                                    className="object-cover w-full rounded-md hover:scale-105 h-1/2"
                                />
                                <div className="h-1/2 flex flex-col items-center">
                                    <p className="max-w-[150px] text-center break-all overflow-hidden line-clamp-3 whitespace-normal">{item.name}</p>
                                    <p className="  text-center text-red-600 ">
                                        {(item.sellPrice - (item.sellPrice * item.discount) / 100).toLocaleString()}đ
                                    </p>
                                    <p className="  text-center font-normal text-sm text-gray-500 line-through">
                                        {item.sellPrice.toLocaleString()}đ
                                    </p>
                                    <div className="w-20 h-6 bg-red-500 rounded-3xl">
                                        <p className=" text-sm font-medium text-center">Giảm {item.discount} %</p>
                                    </div>
                                    <Rating value={item.rating}></Rating>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <NavLink to={'/items?idIg=9'} className="text-red-500 my-3 ml-auto">
                    <p className="relative underline font-medium mr-5">Xem thêm +</p>
                </NavLink>
            </div>
        </div>
    );
}

export default Home;
