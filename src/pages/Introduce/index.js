import images from '~/assets/images';

function Introduce() {
    return (
        <div className="relative flex flex-col justify-center items-center">
            <div className="w-9/12">
                <h1>GIỚI THIỆU CỬA HÀNG SHOPIEC</h1>
            </div>
            <div className="flex flex-col justify-center items-center w-9/12 ">
                <h2 className="font-bold italic my-5 justify-center items-center">VỀ CHÚNG TÔI</h2>
                <h3 className="italic leading-6">
                    Cửa hàng SHOPPIEC được thành lập với định hướng là quản lý một hệ thống bán lẻ trực tuyến lớn mạnh,
                    uy tín, tiện lợi hàng đầu Việt Nam. Để tiếp cận trực tiếp với kháchhàng qua thương mại điện tử
                    shoppiec.shop ra đời với sứ mệnh là một website bán hàng Chính hãng trực tuyến với chất lượng tốt
                    nhất - giao hàng nhanh nhất - giá cả rẻ nhất tới tay khách hàng. Với sự phát triển bùng nổ của
                    Thương mại điện tử, việc mua hàng trực tuyến ngày nay không còn quá xa lạ với tất cả mọi người. Việc
                    mua hàng trực tuyến không chỉ mang lại sự tiện lợi, nhanh chóng mà còn đem lại cho khách hàng sự lựa
                    chọn mặt hàng cùng với các dịch vụ đa dạng hơn rất nhiều. Chính vì vậy, cửa hàng đã triển khai
                    shoppiec.shop với mong muốn trở thành cửa hàng thiết bị chính hãng trực tuyến lớn nhất, nơi bạn có
                    thể trải nghiệm việc mua sắm mọi thiết bị Xiaomi mình cần chỉ với 1 click chuột. Do đặc thù của
                    ngành kinh doanh nên chúng tôi đặt tiêu chí chất lượng lên hàng đầu, đi kèm với đó là giá cả cạnh
                    tranh của sản phẩm, kết hợp nhằm mang lại những giá trị tốt nhất cho khách hàng. chúng tôi luôn nỗ
                    lực hết mình để khách hàng là người được hưởng dịch vụ tốt nhất, cung cấp tới tận tay khách hàng các
                    sản phẩm có chất lượng , giá cả cạnh tranh. Xây dựng và đào tạo một mạng lưới dịch vụ kỹ thuật sau
                    bán hàng một cách hoàn hảo. Luôn giữ chữ “tín” và lấy lợi ích của khách hàng làm trọng. Điểm mạnh
                    của Cửa hàng, chúng tôi hy vọng trong tương lai gần shoppiec.shop sẽ trở thành đối tác truyền thống
                    của Quý khách hàng với tư cách là một nhà bán hàng các thiết bị có giá cả hợp lý, chất lượng tốt và
                    dịch vụ sau bán hàng hoàn hảo.
                </h3>
            </div>

            <div className="flex flex-row py-6 items-center w-9/12">
                <div className="border border-gray-300 p-4">
                    <h2 className="font-bold italic my-5 justify-center items-center">LIÊN HỆ CHÚNG TÔI</h2>
                    <h3>SĐT : 0999.9999.999</h3>
                    <h3>Email : shopiecmedia@gmail.com</h3>
                </div>
                <div className="ml-auto">
                    <img className="w-28 h-auto rounded-md" src={images.logoApp} alt="logo App" />
                </div>
            </div>
        </div>
    );
}

export default Introduce;
