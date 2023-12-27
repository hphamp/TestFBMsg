import axios from 'axios';

const baseUrl = 'http://api.shopiec.shop/api/itemgroups';

const itemgroups = () => {
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
export default itemgroups;
