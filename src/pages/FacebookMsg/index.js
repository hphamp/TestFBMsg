import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    return (
        <FacebookProvider appId="1101261654362371" chatSupport>
          <CustomChat pageId="105325745683648" minimized={true}/>
        </FacebookProvider>    
      );
}
export default FacebookMsg;