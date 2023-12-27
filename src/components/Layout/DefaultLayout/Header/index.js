import images from '~/assets/images';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faMagnifyingGlass,
    faPhoneVolume,
    faTruckArrowRight,
    faCircleUser,
    faBagShopping,
} from '@fortawesome/free-solid-svg-icons';
import '~/index.css';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const [iccount, setIcCount] = useState(0);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const intervalId = setInterval(() => {
            const updatedUser = localStorage.getItem('user');
            if (updatedUser) {
                setUser(JSON.parse(updatedUser));
            }
            const count_cart = localStorage.getItem('count_cart');
            if (count_cart) {
                setIcCount(JSON.parse(count_cart));
            }
        }, 500);

        if (search !== '') {
            fetch('http://api.shopiec.shop/api/items/item-search/' + search)
                .then((res) => res.json())
                .then((data) => setSearchData(data));
        }
        // Hàm cleanup sẽ chạy khi component unmount
        return () => clearInterval(intervalId);
    }, [search]);
    let nameUsser = user.firstName + ' ' + user.lastName;
    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const clearSearchText = () => {
        setSearch('');
    };

    const handleSearch = () => {
        navigate(`/search?searchText=${search}`);
        setSearch('');
      };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
    return (
        <header className="flex justify-center w-full h-28 bg-redPrimary shadow-md">
            <div className="flex justify-center w-full h-7 bg-yellowPrimary ">
                <img className="h-7" src={images.bannerHeader} alt="Banner" />
            </div>
            <div className="absolute top-7">
                <div className="flex justify-center items-center h-20">
                    <div className="w-46 h-auto ">
                        <img src={images.logo} alt="ShopiEC" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex bg-white relative items-center w-80 h-8 rounded-xl mt-2 pl-2">
                            <input
                                className="flex-1 text-size ml-2 w-64 h-auto text-base border-none outline-none "
                                placeholder="Bạn cần tìm gì ?"
                                spellCheck="false"
                                value={search}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            ></input>
                            {search && (
                                <button className="m-3 text-gray-400" onClick={clearSearchText}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            )}
                            <button onClick={handleSearch} className="w-8 h-8 rounded-tr-xl rounded-br-xl hover:bg-gray-200 after:absolute after:content-[''] after:w-px after:h-5 after:bg-gray-600 after:right-8">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                        <div>
                            {search && (
                                <div className="flex flex-col absolute bg-white z-100 mt-1 border border-gray-300 rounded-md shadow-md">
                                    {searchData && searchData.length > 0 && (
                                        <p className="m-2 font-medium italic text-red-500 ">Sản phẩm gợi ý</p>
                                    )}
                                    {searchData.map((data) => (
                                        <NavLink
                                            key={data.id}
                                            to={`http://shopiec.shop/item_detail?itemId=${data.id}`}
                                            className="p-2 hover:bg-gray-200 overflow-hidden whitespace-nowrap max-w-[320px] overflow-ellipsis font-normal"
                                        >
                                            {data.name}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row text-white mt-2 relative left-24">
                        <NavLink to={''} className="flex items-center rounded-xl hover:bg-red-500">
                            <FontAwesomeIcon className="m-3" icon={faPhoneVolume} />
                            <p className="mr-3">
                                Gọi mua hàng
                                <br />
                                1900.9999{' '}
                            </p>
                        </NavLink>

                        <NavLink to={''} className="flex items-center ml-6 rounded-xl hover:bg-red-500">
                            <FontAwesomeIcon className="m-3" icon={faTruckArrowRight} />
                            <p className="mr-3">
                                Tra cứu
                                <br />
                                đơn hàng{' '}
                            </p>
                        </NavLink>

                        <NavLink to={'/cart'} className="flex  items-center ml-6 rounded-xl hover:bg-red-500">
                            <div className="flex justify-center relative  items-center">
                                {iccount >= 0 ? (
                                    <p className="absolute font-bold  text-red-500 top-6 text-xs">{iccount}</p>
                                ) : (
                                    ''
                                )}
                                <FontAwesomeIcon className="m-3 w-8 h-8 " icon={faBagShopping}></FontAwesomeIcon>
                            </div>

                            <p className="mr-3 ">
                                Giỏ
                                <br />
                                hàng
                            </p>
                        </NavLink>

                        {token === null && (
                            <NavLink
                                to={'/login'}
                                className="flex flex-col justify-center items-center ml-6 rounded-xl px-2 py-2 hover:bg-red-500"
                            >
                                <FontAwesomeIcon icon={faCircleUser} />
                                <p className="mt-1">Đăng nhập</p>
                            </NavLink>
                        )}

                        {token !== null && (
                            <NavLink
                                to={'/information'}
                                className="flex flex-col justify-center items-center ml-6 rounded-xl px-2 py-2 hover:bg-red-500"
                            >
                                <FontAwesomeIcon icon={faCircleUser} />
                                <p className="mt-1">{nameUsser}</p>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
