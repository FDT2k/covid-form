
export {useSelector} from 'react-redux';

export const getMyStoredPeerId = state=> state.peerJS.myPeerId
export const incomingCall = state=> state.calls

export const getIdentity = state=> state.configuration.identity
export const isAppConfigured = state=>state.configuration.configured


export const getListGuests = state=> state.session.guests
export const getServerConfig = state=> state.configuration.config

export const getContacts = state=> state.session.reconciliated



export const peerJSStatus = state=> state.peerJS.status;
