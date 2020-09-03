import { curry } from '@geekagency/composite-js'

import PromiseThunkDispatcher from 'Redux/utils/async-dispatch';
import makeActionCreator from 'Redux/utils/make-action'
import uuid from 'uuid/v4';

import { generate_key_pair } from 'Redux/Keys/actions'

import { createTracker } from 'RemoteTasks'

export const GENERATE_TRACKER_ID = 'GENERATE_TRACKER_ID'
export const REMOTE_TRACKER_CREATION_BEGAN = 'REMOTE_TRACKER_CREATION_BEGAN'
export const REMOTE_TRACKER_CREATION_SUCCESS = 'REMOTE_TRACKER_CREATION_SUCCESS'
export const REMOTE_TRACKER_CREATION_FAILURE = 'REMOTE_TRACKER_CREATION_FAILURE'


export const create_tracker_id = _ => {
  return {
    type: GENERATE_TRACKER_ID,
    payload: uuid()
  }
}

export const create_tracker_api = (tracker_id, pub_key) => {
  return async (dispatch, getState) => {
    dispatch(makeActionCreator(REMOTE_TRACKER_CREATION_BEGAN, '', null));
    return dispatch(PromiseThunkDispatcher(
      makeActionCreator(REMOTE_TRACKER_CREATION_FAILURE),
      makeActionCreator(REMOTE_TRACKER_CREATION_SUCCESS),
      createTracker(tracker_id, pub_key)
    ))

  }
}
export const create_kit = (identities, passphrase) => (dispatch, getState) => {
  const tracker_id = dispatch(create_tracker_id());

  return dispatch(generate_key_pair(identities, passphrase)).then(key => {
    console.log(getState().pgp.key)
    return dispatch(create_tracker_api(tracker_id.payload, key.payload.publicKeyArmored))

  })
}
