import axios from 'axios';

const paymentOrderPaypal = (order, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .post('http://api.shopiec.shop/subPaymentPaypal', order)
        .then((response) => {
            // console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};

export default paymentOrderPaypal;
