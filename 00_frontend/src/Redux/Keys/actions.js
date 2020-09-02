import { curry } from '@geekagency/composite-js'

import PromiseThunkDispatcher from 'Redux/utils/async-dispatch';
import makeActionCreator from 'Redux/utils/make-action'

import openpgp from 'openpgp'

export const GENERATE_PRIVATE_KEY_BEGAN = 'GENERATE_PRIVATE_KEY_BEGAN'
export const GENERATE_PRIVATE_KEY_SUCCESS = 'GENERATE_PRIVATE_KEY_SUCCESS'
export const GENERATE_PRIVATE_KEY_FAILURE = 'GENERATE_PRIVATE_KEY_FAILURE'



// (List,String) -> Promise
export const make_keypair = (identities, passphrase) =>
  () =>
    openpgp.generateKey({
      userIds: identities,
      curve: 'brainpoolP512r1',
    //  rsaBits: 2048,   // ECC curve name
      passphrase: passphrase  // protects the private key
    })



export const generate_key_pair = (identities, passphrase) => {
  return async (dispatch, getState) => {
    dispatch(makeActionCreator(GENERATE_PRIVATE_KEY_BEGAN, '', null))
    return dispatch(PromiseThunkDispatcher(
      makeActionCreator(GENERATE_PRIVATE_KEY_FAILURE),
      makeActionCreator(GENERATE_PRIVATE_KEY_SUCCESS),
      make_keypair(identities, passphrase))
    )
  }
}
