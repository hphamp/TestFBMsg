import axios from 'axios';

const comments = (itemId) => {
    const baseUrl = 'http://api.shopiec.shop/api/comments/checked/' + itemId;
    console.log('baseUrl' + baseUrl);
    return axios
        .get(baseUrl)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};

const sendReviewApi = (token, comment) => {
    const baseUrl = 'http://api.shopiec.shop/api/comments';
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .post(baseUrl, comment, config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};
export { sendReviewApi };
export default comments;
