import axios from 'axios';

const itemcarts = (userId, token) => {
    const baseUrl = 'http://api.shopiec.shop/api/itemcarts/' + userId;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .get(baseUrl, config)
        .then((response) => {
            // console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};

const addItemInCarts = (token, itemcart) => {
    const baseUrl = 'http://api.shopiec.shop/api/itemcarts';
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .post(baseUrl, itemcart, config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};

const removeItemInCart = (token, id) => {
    const baseUrl = 'http://api.shopiec.shop/api/itemcarts/' + id;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .delete(baseUrl, config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};
export { addItemInCarts, removeItemInCart };
export default itemcarts;
