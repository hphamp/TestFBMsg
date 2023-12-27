import axios from 'axios';

const items = (igId, page, limit) => {
    const baseUrl = 'http://api.shopiec.shop/api/items/' + igId + '?page=' + page + '&size=' + limit;
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
export default items;
