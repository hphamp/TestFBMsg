import { Rating } from '@mui/material';
import images from '../../assets/images';
import { Link, NavLink } from 'react-router-dom';
import itemGroups from '../../data';

import React, { useState, useEffect, useRef } from 'react';
import itemgroups from '../../api/itemgroup';
import { itemsDiscountsNo9 } from '../../api/itemWithID';
import items from '../../api/itemWithIgID';

function ItemGroup() {
    const [data, setData] = useState([]);
    const [itemDiscountsN9, setItemDiscountsN9] = useState([]);
    const [itemGroupsItems, setItemGroupsItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await itemgroups();
            if (result) {
                setData(result);
                const itemsPromises = result.map(async (itemGroup) => {
                    const itemsResult = await items(itemGroup.id, 1, 6);
                    return {
                        id: itemGroup.id,
                        name: itemGroup.name,
                        items: itemsResult.slice(0, 6), 
                    };
                });

                const itemsData = await Promise.all(itemsPromises);
                setItemGroupsItems(itemsData);
                console.log("testt ===> " + itemGroupsItems)
            }

            const resultItemDiscountNo9 = await itemsDiscountsNo9();
            if (resultItemDiscountNo9) {
                setItemDiscountsN9(resultItemDiscountNo9);
            }
        };

        fetchData();
    }, []);
    let index = 0;

    const scrollContainer = useRef(null);

    const scrollLeft = () => {
        const scrollDistance = 900;
        const targetScrollLeft = scrollContainer.current.scrollLeft - scrollDistance;
        animateScroll(targetScrollLeft);
    };

    const scrollRight = () => {
        const scrollDistance = 900;
        const targetScrollLeft = scrollContainer.current.scrollLeft + scrollDistance;

        animateScroll(targetScrollLeft);
    };

    const animateScroll = (targetScrollLeft) => {
        const duration = 400; // Thời gian của animation (miliseconds)
        const start = scrollContainer.current.scrollLeft;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            scrollContainer.current.scrollLeft = start + progress * (targetScrollLeft - start);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };
    return (
        <div className=" flex flex-col justify-center items-center">
            <div className=" flex flex-wrap items-center justify-center w-10/12 mb-5">
                {data.map((itemGroup) => (
                    <NavLink to={'/items?idIg=' + itemGroup.id}>
                        <div className="w-28 h-40 items-center flex flex-col mx-3 ">
                            <div className="rounded-xl border-1 border-gray-300 shadow-md">
                                <img src={itemGroup.image} className="w-28 rounded-xl h-28" alt=""></img>
                            </div>
                            <div className="w-4/5 items-center ">
                                <p className="text-center">{itemGroup.name}</p>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className="w-4/5  flex  flex-col  mx-4">
                <div className="flex flex-col h-96 w-full  ">
                    <img src={images.hot_banner} className="w-full h-11"></img>
                    <div className="flex flex-row  flex-1 h-80 w-full  relative container bg-orange-600 rounded-2xl items-center  ">
                        <div className="flex flex-row  whitespace-nowrap overflow-hidden mx-5" ref={scrollContainer}>
                        {itemDiscountsN9.map((item) =>
                                (index += 1) ? (
                                    <Link to={`/item_detail?itemId=${item.id}`}>
                                        <div className="border-1 h-72 mx-1 w-40 px-1 pt-1 border-gray-300 shadow-md font-bold rounded-xl bg-white items-center justify-center  flex flex-col">
                                            <img   src={item.imagesItem[0].image} alt="" className="object-cover w-full rounded-md hover:scale-105 h-1/2" />
                                            <div className="h-1/2 flex flex-col items-center">
                                                <p className="max-w-[150px] text-center break-all overflow-hidden line-clamp-3 whitespace-normal">
                                                    {item.name}
                                                </p>
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
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2  bg-gray-300 text-gray-700  hover:bg-gray-400 hover:text-gray-800"
                        >
                            <img src={images.angle_left} className="w-5 h-10" />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2  bg-gray-300 text-gray-700  hover:bg-gray-400 hover:text-gray-800"
                        >
                            <img src={images.angle_right} className="w-5 h-10" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    {itemGroupsItems.map((itemGroup) => (
                        <div className=" flex flex-col h-96 w-full mt-7">
                            <div>
                                <p className="inline-block text-xl border-b-4 mb-4 font-bold border-yellow-400">
                                    {itemGroup.name.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex flex-col ">
                                <div className="grid grid-cols-6 gap-4 mt-4 flex-1">
                                    {itemGroup.items.map((item) => (
                                        <Link to={`/item_detail?itemId=${item.id}`}>
                                            <div className="border-1 h-80 w-full pt-1 px-1 border-gray-300 shadow-md font-bold rounded-xl bg-white items-center justify-center  flex flex-col mx-1">
                                                <img
                                                    src={item.imagesItem[0].image}
                                                    className="object-cover w-full rounded-md hover:scale-105 h-1/2"
                                                    alt="imageIt"
                                                />
                                                <div className="h-1/2 flex flex-col items-center">
                                                    <p className="max-w-[150px] text-center break-all overflow-hidden line-clamp-2 whitespace-pre-line">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-center text-red-600 mt-1">
                                                        {(item.sellPrice - (item.sellPrice * item.discount) / 100).toLocaleString()}đ
                                                    </p>
                                                    <p className="text-center font-normal text-sm text-gray-500 line-through">
                                                        {item.sellPrice.toLocaleString()}đ
                                                    </p>
                                                    <div className="w-20 h-6 bg-red-500 rounded-3xl">
                                                        <p className="text-sm font-medium text-center">
                                                            Giảm {item.discount.toLocaleString()} %
                                                        </p>
                                                    </div>
                                                    <Rating value={item.rating}></Rating>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <NavLink to={'/items?idIg=' + itemGroup.id + ''} className="text-red-500  relative ">
                                    <p className="absolute text-lg right-0 underline font-medium m-5">Xem thêm +</p>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    // }
}
export default ItemGroup;
