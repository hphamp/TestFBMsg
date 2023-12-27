import React, { useEffect, useState } from 'react';
import images from '../../assets/images';

import { getMessages, saveMessages } from '../../api/chat';
import format from 'date-fns/format';
import ReactDOM from 'react-dom';

import PopUpPayMent from '../PopupResultPayment';

const SockJS = require('sockjs-client');
const Stomp = require('stompjs');
let stompClient;
const Chat = ({ display, onCloseChat }) => {
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('token');
    const chatId = localStorage.getItem('chatId');
    const userId = localStorage.getItem('userId');
    const user = JSON.parse(localStorage.getItem('user'));
    const dataMessageCurrent = [];
    // const [message, contentMessage] = useState(new Map());
    const sendMessage = () => {
        var inputMes = document.getElementById('textAreaExample');
        var timeSendMes = format(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss');
        var message = {
            time: timeSendMes,
            senderId: userId,
            message: inputMes.value,
            chatId: chatId,
        };
        dataMessageCurrent.push(message);
        stompClient.send('/app/chat/' + 91, {}, JSON.stringify(message));
        var contentMessage = document.getElementById('contentMessage');
        console.log(inputMes.value);
        var div = document.createElement('div');
        div.className = ' flex justify-end mb-4   ';
        var pTime = document.createElement('p');
        pTime.className = ' flex justify-end mb-1 text-xs text-gray-400';
        pTime.textContent = timeSendMes;
        var p = document.createElement('p');
        p.className = ' text-sm break-all p-3 font-light border bg-gray-100 rounded mr-4';
        p.textContent = inputMes.value;
        var img = document.createElement('img');
        img.src = user.image;
        img.alt = 'avatar 1';
        img.style.width = '45px';
        img.style.height = '45px';
        img.style.borderRadius = '100%';
        div.appendChild(p);
        contentMessage.appendChild(pTime);
        div.appendChild(img);
        contentMessage.appendChild(div);
        lisMessage.push(message);
        console.log('length:' + lisMessage.length);
        inputMes.value = '';
    };
    const closeChat = () => {
        onCloseChat();
        stompClient.disconnect();
        const saveMessageCurrent = async () => {
            await saveMessages(dataMessageCurrent, token);
        };
    };

    useEffect(() => {
        if (chatId !== null || chatId !== undefined) {
            const fetchMessages = async () => {
                const messagesData = await getMessages(token, chatId);
                setMessages(messagesData);
            };

            fetchMessages();
        }
    }, []);
    return (
        <div className=" flex justify-center fixed bottom-0 right-20 " id="chatbox" style={{ display: display }}>
            <div className="md:w-2/3 lg:w-1/2 xl:w-90 ">
                <div className="bg-white rounded-lg shadow-md">
                    <div className=" bg-redPrimary p-3 rounded-t-lg flex justify-between items-center">
                        <p className="font-bold text-white">ADMIN</p>
                        <div className="w-1/5 flex items-center relative">
                            <button className="my-4 absolute right-3" id="btnClose" onClick={closeChat}>
                                <img src={images.close} alt="avata" />
                            </button>
                        </div>
                    </div>
                    <div className="p-4 overflow-auto relative h-90 " id="contentMessage">
                        {messages !== null
                            ? messages.map((e) => {
                                  return e.senderId === 91 ? (
                                      <div className="flex flex-row justify-start mb-4">
                                          <img
                                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                              alt="avatar 1"
                                              style={{ width: '45px', height: '100%' }}
                                          />
                                          <div className="p-3 ms-3 bg-gray-100 rounded">
                                              <p className="text-sm">
                                                  Hello and thank you for visiting MDBootstrap. Please click the video
                                                  below.
                                              </p>
                                          </div>
                                      </div>
                                  ) : e.senderId === userId ? (
                                      <div className="flex flex-row justify-end mb-4">
                                          <div className="p-3 me-3 border bg-blue-400 rounded">
                                              <p className="text-sm">Thank you, I really like your product.</p>
                                          </div>
                                          <img
                                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                              alt="avatar 1"
                                              style={{ width: '45px', height: '100%' }}
                                          />
                                      </div>
                                  ) : null;
                              })
                            : null}
                    </div>
                    <div className=" flex flex-row border-gray-400 border-1">
                        <div className="w-4/5 justify-center flex">
                            <textarea
                                className=" h-8 w-5/6 border rounded-lg pt-1 pl-1  my-4  overflow-hidden "
                                placeholder="Type your message"
                                id="textAreaExample"
                            />
                        </div>

                        <div className="w-1/5 flex items-center relative">
                            <button className="my-4 absolute right-5" onClick={sendMessage} id="btnSend">
                                <img src={images.send} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

var lisMessage = [];
const url = 'http://api.shopiec.shop';

// const url = 'http://localhost:8080';

let socket = new SockJS(url + '/chat');
stompClient = Stomp.over(socket);
console.log('connecting to chat...');

const userId = localStorage.getItem('userId');
const chatId = localStorage.getItem('chatId');

stompClient.connect({ withCredentials: true }, function (frame) {
    console.log('connected to: ' + frame);
    console.log('Log::::' + frame);
    console.log('userId' + userId);
    if (userId != null) {
        stompClient.subscribe('/topic/messages/' + userId, async function (response) {
            console.log('respose:' + response);
            let data = JSON.parse(response.body);
            // console.log('data:' + data);
            console.log('data.message:' + data.message);
            if (
                data.message === 'VNPAY SUCCESS' ||
                data.message === 'VNPAY ERROR' ||
                data.message === 'PAYPAL SUCCESS' ||
                data.message === 'PAYPAL ERROR' ||
                data.message === 'PAYLIVE SUCCESS' ||
                data.message === 'PAYLIVE ERROR'
            ) {
                console.log('Đây popup');
                const element = <PopUpPayMent status={data.message} isShow={true} />;
                const root = document.getElementById('payment');
                if (root) {
                    ReactDOM.render(element, root); // Sử dụng ReactDOM.render
                }
            } else {
                var contentMessage = document.getElementById('contentMessage');

                var div = document.createElement('div');
                div.className = ' flex flex-row justify-start my-4';

                var p = document.createElement('p');
                p.className = 'text-sm break-all p-3 ms-3 bg-blue-300 rounded';
                p.textContent = data.message;

                var img = document.createElement('img');
                img.src = 'https://res.cloudinary.com/dte2ps5qs/image/upload/v1700431912/zo74ugufya9ayvuntmvn.png';
                img.alt = 'avatar 1';
                img.style.width = '45px';
                img.style.height = '100%';
                img.style.borderRadius = '100%';

                div.appendChild(img);
                div.appendChild(p);
                contentMessage.appendChild(div);
            }
        });
    }
});

export default Chat;
