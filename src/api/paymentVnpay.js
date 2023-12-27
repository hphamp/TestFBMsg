import axios from 'axios';

const paymentOrder = (order, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .post('http://api.shopiec.shop/submitOrder', order)
        .then((response) => {
            // console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};

export default paymentOrder;
