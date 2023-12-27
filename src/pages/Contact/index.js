import images from '../../assets/images';
function Contact() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative rounded-xl border-1 border-gray-200 w-200 flex justify-center items-center my-5">
                <div className="w-5/6 h-full flex flex-col ">
                    <h1 className="my-3 font-semibold text-3xl">Liên hệ</h1>
                    <p className="my-3">
                        Hãy điền thông tin chúng tôi sẽ liên hệ với bạn sớm nhất có thể, Thông tin của bạn sẽ được bảo
                        mật tuyệt đối !
                    </p>
                    <div className="flex flex-col my-3">
                        <div>
                            <input
                                type="text"
                                placeholder="Họ và tên *"
                                className="rounded-md border-2 border-gray-300 w-1/2 h-8 pl-1 outline-none"
                            ></input>
                        </div>
                        <div className="my-5">
                            <input
                                type="text"
                                placeholder="Số điện thoại *"
                                className="rounded-md border-2 border-gray-300 w-1/2 h-8 pl-1 outline-none"
                            ></input>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Email *"
                                className="rounded-md border-2 border-gray-300 w-1/2 h-8 pl-1 outline-none"
                            ></input>
                        </div>
                    </div>
                    <div className="flex mb-2 ">
                        <textarea
                            placeholder="Nội dung *"
                            className=" border-2 border-gray-300 w-full h-44 pl-1 outline-none"
                        ></textarea>
                    </div>
                    <div className="items-end justify-end my-5 ml-auto">
                        <button className="bg-my-yellow w-32 h-10 rounded-lg font-bold">Gửi liên hệ</button>
                    </div>
                </div>
            </div>
            <div className=" flex w-200  h-20 mt-3 item-start my-4">
                <div className="flex flex-col items-center justify-center rounded-sm border-1 border-border-gray-200 h-full w-96">
                    <input type="text" value="LIÊN HỆ CHÚNG TÔI" disabled className="w-4/5 h-6" />
                    <input type="text" value="SĐT : 0999.888.777" disabled className="w-4/5 h-6" />
                    <input type="text" value="Email : shopiecmedia@gmail.com" disabled className="w-4/5 h-6" />
                </div>
            </div>
            <div className="flex h-20 bg-my-red w-full justify-center items-center mt-3">
                <div className="flex w-200 flex-row  h-full">
                    <div className="w-1/4  flex flex-row justify-center items-center">
                        <div className="border-2 rounded-s-3xl rounded-e-3xl w-12 h-12 justify-center items-center flex">
                            <img src={images.truck} alt="truck" width="35px" height="35px" />
                        </div>
                        <p className="w-40 text-white mx-3">GIAO HÀNG COD TOÀN QUỐC</p>
                    </div>
                    <div className="w-1/4 flex flex-row justify-center items-center">
                        <div
                            className="border-2 rounded-s-3xl rounded-e-3xl w-12 h-12 justify-center items-center flex
                        "
                        >
                            <img src={images.hand_shake} alt="hand_shake" width="35px" height="35px" />
                        </div>
                        <p className="w-40 text-white mx-3">CAM KẾT CHÍNH HÃNG 100%</p>
                    </div>
                    <div className="w-1/4 flex flex-row justify-center items-center">
                        <div
                            className="border-2 rounded-s-3xl rounded-e-3xl w-12 h-12 justify-center items-center flex
                        "
                        >
                            <img src={images.bag} alt="bag" width="30px" height="30px" />
                        </div>
                        <p className="w-40 text-white mx-3">ĐẶT HÀNG NHANH</p>
                    </div>
                    <div className="w-1/4 flex flex-row justify-center items-center">
                        <div className="border-2 rounded-s-3xl rounded-e-3xl w-12 h-12 justify-center items-center flex">
                            <img src={images.open_door} alt="open_door" width="30px" height="30px" />
                        </div>
                        <p className="w-40 text-white mx-3">MỞ CỬA 8H30-20H30 Từ T2 đến CN</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact;
