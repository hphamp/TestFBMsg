import axios from 'axios';
const orderPurchaseHistory = (customerId, token) => {
    const baseUrl = 'http://api.shopiec.shop/api/orders/user/' + customerId;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .get(baseUrl, config)
        .then((response) => {
            console.log(response.data);
            console.log('response.data:' + response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};

const paymentOrderPayLive = (order, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .post('http://api.shopiec.shop/api/orders/paylive', order, config)
        .then((response) => {
            // console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};
export { paymentOrderPayLive };
export default orderPurchaseHistory;
