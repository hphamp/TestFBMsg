import axios from 'axios';

const baseUrl = ' http://api.shopiec.shop/api/users/register';

const register = (user) => {
    return axios
        .post(baseUrl, user)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};
export default register;
