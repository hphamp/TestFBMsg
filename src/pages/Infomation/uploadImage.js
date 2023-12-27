import { createContext, useEffect, useState } from 'react';
import images from '../../assets/images';

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId, setUrl, display, onCloseUpload }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Check if the script is already loaded
        if (!loaded) {
            const uwScript = document.getElementById('uw');
            if (!uwScript) {
                // If not loaded, create and load the script
                const script = document.createElement('script');
                script.setAttribute('async', '');
                script.setAttribute('id', 'uw');
                script.src = 'https://upload-widget.cloudinary.com/global/all.js';
                script.addEventListener('load', () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                // If already loaded, update the state
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if (loaded) {
            var myWidget = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
                if (!error && result && result.event === 'success') {
                    console.log('Done! Here is the image info: ', result.info);
                    setPublicId(result.info.public_id);
                    setUrl(result.info.url);
                    console.log(result.info.url);
                }
            });

            document.getElementById('upload_widget').addEventListener(
                'click',
                function () {
                    myWidget.open();
                },
                false,
            );
        }
    };
    const popup = document.getElementById('upload_widget');

    if (popup != null) {
        document.addEventListener('mousedown', function (event) {
            if (!popup.contains(event.target)) {
                console.log('popup');
                onCloseUpload();
            }
        });
    }

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <div
                style={{ display: display }}
                id="upload_widget"
                className=" bg-white flex items-center justify-center cursor-pointer mt-1  flex-col  fixed z-10 "
            >
                <div class="relative w-0 h-0 border-l-0 border-r-8 border-b-8 border-b-gray-300 border-transparent transform left-1/2"></div>
                <div
                    className="h-10 w-46 flex items-center justify-center  border-2 border-gray-300 rounded-md"
                    onClick={initializeCloudinaryWidget}
                >
                    <p>Cập nhật ảnh đại diện</p>
                </div>
            </div>
        </CloudinaryScriptContext.Provider>
    );
}
export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
