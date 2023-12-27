import axios from 'axios';

const InfoUserApi = (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .get('http://api.shopiec.shop/api/users/user/' + id, config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            return null;
        });
};

const SaveInfoUser = (userId, userInfo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .put('http://api.shopiec.shop/api/users/user/' + userId, userInfo, config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            return null;
        });
};

export { InfoUserApi, SaveInfoUser };
