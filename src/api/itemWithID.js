import axios from 'axios';

const item = (id) => {
    const baseUrl = 'http://api.shopiec.shop/api/items/item/' + id;
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


const itemsNew = () => {
    const baseUrl = 'http://api.shopiec.shop/api/items/item/new';
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

const itemsDiscounts = () => {
    const baseUrl = 'http://api.shopiec.shop/api/items/item/discounts';
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

const itemsDiscountsNo9 = () => {
    const baseUrl = 'http://api.shopiec.shop/api/items/item/discountsN9';
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

const itemsDiscounts9 = () => {
    const baseUrl = 'http://api.shopiec.shop/api/items/item/discounts9';
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
export { itemsNew, itemsDiscounts, itemsDiscounts9, itemsDiscountsNo9 };
export default item;