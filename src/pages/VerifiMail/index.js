import React, { useState } from 'react';
import images from '../../assets/images';

const VerificationPage = ({ onClose, text }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 h-full w-full  ">
            <div className="bg-white p-4 flex flex-col items-center justify-center w-1/2 h-1/5 relative rounded-2xl">
                <img src={images.logoRed} className="w-32 h-10"></img>
                <h1 className="text-3xl mb-4 ">{text}</h1>
                <button onClick={onClose} className="absolute text-gray-500 right-4 top-2">
                    <img src={images.close}></img>
                </button>
            </div>
        </div>
    );
};

export default VerificationPage;
