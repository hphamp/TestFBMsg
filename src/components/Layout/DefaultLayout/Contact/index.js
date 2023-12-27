import React, { useEffect } from 'react';
import images from '../../../../assets/images';
import Chat from '../../../../pages/Chat';
import { useState } from 'react';
import { createChat, getChatId } from '../../../../api/chat';

export default function Contact() {
    const [display, setDisplay] = useState('none');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    let chatId;
    const openChat = async () => {
        console.log('openChat');
        try {
            // Hiển thị chat
            setDisplay('block');
            // Gọi getChatId để lấy thông tin chat
            const chatIdData = await getChatId(91, userId, token);

            // Kiểm tra nếu chatIdData không tồn tại hoặc không có idChat
            if (!chatIdData || !chatIdData.idChat) {
                // Nếu không có, thực hiện tạo mới chat
                await createChat({ participantId1: 91, participantId2: userId }, token);

                // Sau khi tạo mới chat, gọi lại getChatId để lấy thông tin chat
                const newChatIdData = await getChatId(1, userId, token);

                // Gán chatId mới vào localStorage
                localStorage.setItem('chatId', newChatIdData.idChat);
            } else {
                // Nếu có chatId, gán vào localStorage
                localStorage.setItem('chatId', chatIdData.idChat);
            }
        } catch (error) {
            console.error('Error in openChat:', error);
        }
    };

    // setDisplay('block');
    const onCloseChat = () => {
        setDisplay('none');
    };
    return (
        <contact className=" z-10 fixed right-2 top-1/2 " id="containerChat">
            <button className="bg-lime-600 w-14 h-14 rounded-full justify-center items-center flex" onClick={openChat}>
                <img src={images.chat} width="40px" height="440px" alt="Chat" className="mt-1" />
            </button>
            <button></button>
            <Chat display={display} onCloseChat={onCloseChat}></Chat>
        </contact>
    );
}
