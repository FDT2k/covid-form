import create from '../utils/make-action'
import uid from 'uid'
import msgpack from 'msgpack-lite'

export const ADD_GUEST ='ADD_GUEST'
export const DEL_GUEST ='DEL_GUEST'
export const UPDATE_GUEST ='UPDATE_GUEST'



export const add_guest    = (guest={},config={},peer,organiser_name) => {
  const g = {...guest}
  if (!g.id){
    g.id = uid()

    const  link = msgpack.encode({
      peer,
      n:organiser_name,
      ...config,
      identifier:g.id
    });
    g.link = link.toString('hex');
  }



  return create(ADD_GUEST,g)
}

export const update_guest = create(UPDATE_GUEST);

export const del_guest          = create(DEL_GUEST);
