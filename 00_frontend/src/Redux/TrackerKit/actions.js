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

export const KIT_GENERATION_STARTED = 'KIT_GENERATION_STARTED'
export const KIT_GENERATION_SUCCESS = 'KIT_GENERATION_SUCCESS'
export const KIT_GENERATION_FAILURE = 'KIT_GENERATION_FAILURE'

export const STATUS = {
  IDLE: 0,
  WORKING: 1,
  COMPLETE: 2,
  ERROR: 4
}

export const create_tracker_id = _ => makeActionCreator(GENERATE_TRACKER_ID, uuid());

export const create_tracker_api = (tracker_id, pub_key,event_date) => {
  return async (dispatch, getState) => {
    dispatch(makeActionCreator(REMOTE_TRACKER_CREATION_BEGAN, '', null));
    return dispatch(PromiseThunkDispatcher(
      makeActionCreator(REMOTE_TRACKER_CREATION_FAILURE),
      makeActionCreator(REMOTE_TRACKER_CREATION_SUCCESS),
      createTracker(tracker_id, pub_key,event_date)
    ))

  }
}
export const create_kit = (identities, passphrase,event_date) => (dispatch, getState) => {
  dispatch(makeActionCreator(KIT_GENERATION_STARTED, ''));

  const tracker_id = dispatch(create_tracker_id());

  return dispatch(generate_key_pair(identities, passphrase)).then(key => {


    return dispatch(create_tracker_api(tracker_id.payload, key.payload.publicKeyArmored,event_date)).then(
      _ => dispatch(makeActionCreator(KIT_GENERATION_SUCCESS, ''))
    ).catch(
      _ => dispatch(makeActionCreator(KIT_GENERATION_FAILURE, ''))
    )

  }).catch(
    _ => dispatch(makeActionCreator(KIT_GENERATION_FAILURE, ''))
  )
}
