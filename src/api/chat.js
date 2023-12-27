import axios from 'axios';

const getChatId = (adminId, userId, token) => {
    const baseUrl = 'http://api.shopiec.shop/api/chats/room-chat/' + adminId + '/' + userId;
    console.log('baseUrl' + baseUrl);
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
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};
const createChat = (chat, token) => {
    const baseUrl = 'http://api.shopiec.shop/api/chats/room-chat';
    console.log('baseUrl' + baseUrl);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .post(baseUrl, chat, config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};

const getMessages = (token, chatId) => {
    const baseUrl = 'http://api.shopiec.shop/api/messages/' + chatId;
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
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};
const saveMessages = (messages, token) => {
    const baseUrl = 'http://api.shopiec.shop/api/messages';
    console.log('baseUrl' + baseUrl);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios
        .post(baseUrl, messages, config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
};
export { getChatId, createChat, saveMessages, getMessages };