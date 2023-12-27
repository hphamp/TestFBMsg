import React, { useMemo } from 'react';
import { Rating } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import items from '../../api/itemWithIgID';
import { useState, useEffect } from 'react';



function SearchItem() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const searchText = queryParams.get('searchText');
    const [searchData, setSearchData] = useState([]);
    const [sortValue, setSortValue] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            fetch('http://api.shopiec.shop/api/items/search/' + searchText)
                .then((res) => res.json())
                .then((data) => setSearchData(data));
        };

        fetchData();
    }, []);
    const onViewItemDetail = (itemId) => {
        // history.push('/item_detail?itemId' + itemId);
        navigate('/item_detail?itemId=' + itemId);
    };

     
    const handleSortChange = (event) => {
        setSortValue(event.target.value);
         // Gọi hàm sắp xếp dựa trên giá trị của select box
        if (event.target.value === '1') {
           // Sắp xếp theo Giá Thấp-Cao
           searchData.sort((a, b) => a.sellPrice - b.sellPrice);
        } else if (event.target.value === '2') {
           // Sắp xếp theo Giá Cao-Thấp
           searchData.sort((a, b) => b.sellPrice - a.sellPrice);
        }
         // Nếu bạn có thêm các trường hợp sắp xếp khác, bạn có thể thêm vào đây
    };
    

    return (
        <div className="flex flex-col items-center">
            <div className="w-4/5 ">
                <div className="flex flex-row w-full h-20 bg-redPrimary justify-end items-center text-white ">
                    <div className="w-1/4 h-10 items-center relative ">
                    <select
                        name="SortItem"
                        id="SortItem"
                        className="absolute right-5 border-1 h-full border-white justify-center outline-none bg-redPrimary mx-5 px-3"
                        value={sortValue}
                        onChange={handleSortChange}
                        defaultValue="Sắp xếp"
                        >
                            <option value="" disabled>
                                Sắp xếp
                            </option>
                            <option value="1">Giá Thấp-Cao</option>
                            <option value="2">Giá Cao-Thấp</option>
                        </select>
                    </div>
                </div>
                <div className=" w-full  border-black flex  ">
                    <div className="grid grid-cols-6 gap-4 mt-4 flex-1 ">
                        {searchData.map((item) => (
                            <div
                                className="border-1 h-72 w-full border-gray-300 shadow-md font-bold rounded-xl bg-white items-center justify-center   flex flex-col "
                                onClick={() => onViewItemDetail(item.id)}
                            >
                                <img
                                    src={item.imagesItem[0].image}
                                    className="p-2 hover:scale-105 w-40 h-1/2"
                                    alt="imageIt"
                                />
                                <div className="h-1/2 flex flex-col items-center">
                                    <p className="  text-center ">{item.name}</p>
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
                        ))}
                    </div>
                </div>
                {/* } */}
            </div>
        </div>
    );
}

export default SearchItem;
