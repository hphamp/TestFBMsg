import axios from 'axios';
const LoginApi = (email, password) => {
    return axios
        .post('http://api.shopiec.shop/api/auth', { email, password })
        .then((response) => {
            // Trả về dữ liệu thành công
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response.data;
            }
            // } else if (error.request) {
            //     console.log(error.request);
            // } else {
            //     console.log('Error', error.message);
            //     return null;
            // }
            // // Trả về null hoặc một giá trị khác để biểu thị lỗi
            // return null;
        });
};

const LoginGgApi = (tokenGg) => {
    const body = {
        "authToken": tokenGg
      }
      
    return axios
    .post('http://localhost:8080/api/auth/google', body)
    .then((response) => {
        // Trả về dữ liệu thành công
        return response.data;
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return error.response.data;
        }
    });
};

export { LoginApi, LoginGgApi };
