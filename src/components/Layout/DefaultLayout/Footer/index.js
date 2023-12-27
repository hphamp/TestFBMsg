import images from '../../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
function Footer() {
    return (
        <footer>
            <div className="flex flex-row justify-center h-90 bg-white bottom-0 border-t border-gray-200">
                <div className="m-14">
                    <h2>TỔNG ĐÀI HỖ TRỢ MIỄN PHÍ (8h-20h)</h2>
                    <div className="h-px w-60 bg-gray-200 my-3"></div>
                    <div className="flex flex-row ">
                        <h3>Gọi mua hàng:</h3>
                        <h3 className="ml-2 text-redPrimary font-bold underline">0999999999</h3>
                    </div>
                    <div className="flex flex-row my-3">
                        <h3>Gọi bảo hành:</h3>
                        <h3 className="ml-2 text-redPrimary font-bold underline">0999999999</h3>
                    </div>
                    <div className="flex flex-row mb-7">
                        <h3>Gọi khiếu nại:</h3>
                        <h3 className="ml-2 text-redPrimary font-bold underline">0999999999</h3>
                    </div>

                    <h2>PHƯƠNG THỨC THANH TOÁN</h2>
                    <div className="h-px w-60 bg-gray-200 my-3"></div>
                    <img className="h-10 w-auto" src={images.methodPay} alt="Method Pay" />
                </div>

                <div className="m-14">
                    <h2>THÔNG TIN CHÍNH SÁCH</h2>
                    <div className="h-px w-60 bg-gray-200 my-3"></div>
                    <div className="flex flex-col  text-blue-900 font-bold">
                        <h3 className="mb-3">Chính sách giao hàng</h3>
                        <h3 className="mb-3">Chính sách bảo mật</h3>
                        <h3 className="mb-3">Chính sách bảo hành</h3>
                        <h3 className="mb-3">Chính sách đổi trả</h3>
                    </div>
                </div>

                <div className="m-14">
                    <img className="h-28 w-auto" src={images.logoRed} alt="Logo Red" />
                    <div className="flex flex-row mb-3">
                        <FontAwesomeIcon className="m-2" icon={faMapLocationDot} />
                        <h3 className="mt-2">345 Tôn Đức Thắng, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng</h3>
                    </div>
                    <div className="flex flex-row ">
                        <FontAwesomeIcon className="ml-2" icon={faEnvelope} />
                        <h3 className="mx-2">shopiecmedia@gmail.com</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center h-10 bg-redPrimary bottom-0" />
        </footer>
    );
}

export default Footer;
