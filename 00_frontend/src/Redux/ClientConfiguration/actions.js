import create from '../utils/make-action'
import crypto from 'crypto'
// defining actions.
export const CONFIGURE_CLIENT              = 'CONFIGURE_CLIENT';



const encodePassword= (password,salt)=>{
   return  crypto.pbkdf2Sync(password,salt, 100, 64, 'sha512').toString('hex');
}



export const configure_client = (payload,remotePeer) => create(CONFIGURE_CLIENT,{
  password:encodePassword(payload,remotePeer),
  remotePeer
})
