import {createSelector} from 'reselect';
export {useSelector} from 'react-redux';



export const base_sel_pgp = state => state.pgp;


export const base_sel_tracker = state => state.ecov.tracker;



export const sel_tracker_id = createSelector(base_sel_tracker, state => state.tracker.tracker_id);
export const sel_pgp_status = createSelector(base_sel_pgp, state=> state.status );
export const sel_pgp_key = createSelector(base_sel_pgp, state=> state.key );
export const sel_pgp_key_generating =  createSelector(sel_pgp_status,state=> state !=='idle')
export const sel_pgp_key_generated=  createSelector(sel_pgp_key_generating,sel_pgp_key, (generating,key) => !generating && key !==null)
