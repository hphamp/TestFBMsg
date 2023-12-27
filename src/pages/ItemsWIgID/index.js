import React, { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import itemGroups from '../../data';
import { Pagination, Rating } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import items from '../../api/itemWithIgID';
import { useState, useEffect } from 'react';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'IPHONE 15 ProMax Titan',
        imgPath: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/11/banner/IP15-720-220-720x220-3.png',
    },
    {
        label: 'Siêu Laptop Gaming',
        imgPath: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/10/banner/LAP-GAMING-720-220-720x220.png',
    },
    {
        label: 'Realme C3 Năm mới',
        imgPath: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/11/banner/C53-HC-720-220-720x220-4.png',
    },
    {
        label: 'Apple Watch Befit B3s',
        imgPath: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/12/banner/dh-befit-720-220-720x220.png',
    },
];

function Items() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const idIg = queryParams.get('idIg');
    const [data, setData] = useState([]);
    const [sortValue, setSortValue] = useState('');
    const [page, setPage] = useState('');
    const [limit, setLimit] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const result = await items(idIg, page, limit);
            if (result) {
                setData(result);
            }
        };

        fetchData();
    }, [page, limit]);
    const onViewItemDetail = (itemId) => {
        // history.push('/item_detail?itemId' + itemId);
        navigate('/item_detail?itemId=' + itemId);
    };

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
        // State để lưu giá trị của select box
     
    const handleSortChange = (event) => {
        setSortValue(event.target.value);
         // Gọi hàm sắp xếp dựa trên giá trị của select box
        if (event.target.value === '1') {
           // Sắp xếp theo Giá Thấp-Cao
           data.sort((a, b) => a.sellPrice - b.sellPrice);
        } else if (event.target.value === '2') {
           // Sắp xếp theo Giá Cao-Thấp
           data.sort((a, b) => b.sellPrice - a.sellPrice);
        }
         // Nếu bạn có thêm các trường hợp sắp xếp khác, bạn có thể thêm vào đây
    };

    const handlePageChange = (event, value) => {
        // Do something with the new page value (value)
        console.log('Page changed to:', value);
        setPage(value);
        // You can make API calls or update your component state here
      };

    const handleLimitChange = (event, value) => {
        setLimit(event.target.value);
        console.log('Limit changed to:', limit);
    };
    

    return (
        <div className="flex flex-col items-center">
            <div className="h-1/4 w-4/5 items-center justify-center flex">
                <Box sx={{ maxWidth: 800, flexGrow: 1 }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default',
                        }}
                    >
                        <Typography>{images[activeStep].label}</Typography>
                    </Paper>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {images.map((step, index) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        component="img"
                                        sx={{
                                            // height: 255,
                                            display: 'block',
                                            // maxWidth: 1000,
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={step.imgPath}
                                        alt={step.label}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                        }
                    />
                </Box>
            </div>
            <div className="w-4/5 ">
                <div className="flex flex-row w-full h-20 bg-redPrimary  items-center text-white ">
                    <div className="w-1/4 h-10 flex flex-row items-center  justify-center">
                        <input type="checkbox" id="sort1" name="sort1" value="1" className="w-5 h-5" />
                        <label for="sort1" className="ml-1">
                            Sản phẩm giảm sâu
                        </label>
                    </div>
                    <div className="w-1/4 h-10 flex flex-row items-center  justify-center">
                        <input type="checkbox" id="sort2" name="sort2" value="2" className="w-5 h-5" />
                        <label for="sort2" className="ml-1">
                            Sản phẩm bán chạy
                        </label>
                    </div>
                    <div className="w-1/4 h-10 flex flex-row items-center  justify-center ">
                        <input type="checkbox" id="sort3" name="sort3" value="3" className="w-5 h-5" />
                        <label for="sort3" className="ml-1 ">
                            Sản phẩm mới
                        </label>
                    </div>
                    <div className="w-1/4 h-10 items-center relative ">
                    <select
                        name="SortItem"
                        id="SortItem"
                        className="absolute right-5 border-1 h-full border-white justify-end outline-none bg-redPrimary px-3"
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
                    <div className="w-1/6 h-10 relative flex flex-row items-center border-1 border-white px-4 mx-3">
                        <p className=''>Số lượng</p>
                        <select
                        className="absolute right-5 outline-none bg-redPrimary"
                        value={limit}
                        onChange={handleLimitChange}
                        defaultValue="12"
                        >
                            <option value="12">12</option>
                            <option value="18">18</option>
                            <option value="24">24</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                </div>
                <div className=" w-full  border-black flex  ">
                    <div className="grid grid-cols-6 gap-4 mt-4 flex-1 ">
                        {data.map((item) => (
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
                <Pagination className="mt-5 flex flex-row justify-center" count={10} variant="outlined" shape="rounded" onChange={handlePageChange}/>
            </div>
        </div>
    );
}

export default Items;
