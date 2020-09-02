import {curry} from '@geekagency/composite-js'
import {filter} from '@geekagency/composite-js'
import {assign2} from '@geekagency/composite-js'
import {not,_either,identity,map} from '@geekagency/composite-js'


export const delete_list_item = curry((state,action) => filter(item=> item.id !=action.payload,state));

export const add_list_item = curry((state,action)=> [...state,action.payload]);

export const item_prop_is_equal = curry((prop,value,item)=>item[prop]==value);

export const add_to_list = curry((state,action)=> [...state,action.payload]);

// del_from_list :: List -> Object-> List
export const del_from_list_by_prop_id = curry((state,action) => filter(item=> item.id !=action.payload,state));

// update_object :: Object->Object->Object
export const updateObject = assign2

// update_list_by_prop_id :: List -> a -> Fn -> List
export const update_list_by_prop_id = curry((list,itemIdValue,updateFn)=> update_list(list,item_prop_is_equal('id',itemIdValue),updateFn))

// update_list :: List -> Fn -> Fn -> List
export const update_list = curry((list,itemPredicate, updateFn)=> list.map(item=>_either(itemPredicate,identity,updateFn,item)))



// String -> ? -> ? -> Bool
export const propIsEqual = curry( (prop,value,item)=> item[prop]===value );

// String -> ? -> ? -> Bool
export const propIsNotEqual = curry( (prop,value,item)=> item[prop]!==value );

// String -> List -> ? -> List
export const delByProp = curry ( (prop,list,val)=> filter(propIsNotEqual(prop,val),list))

// List -> ? -> List
export const delByPropId = delByProp('id')

// String -> List -> ? -> List
export const getByProp = curry((prop,list,val)=> filter(propIsEqual(prop,val),list))

// String-> List -> ?  -> List
//add an item into array which must be unique by its prop value
export const addUniqByProp = curry((prop,list,item) => add(delByProp(prop,list,item[prop]),item))
export const del = curry ( (list,val)=> filter(x=> x !== val,list))
export const addUniq = curry( (list,val)=> add(del(list,val),val))
// List -> ? -> List
export const add = curry((list,item)=> [...list,item]);






// String -> Object -> ? -> Object
export const updateProp = curry((prop,obj,value)=> updateObject(obj, {[prop]: value}))

export const updateListWhereCondIsMet = curry((cond,val,list,fn) => map(_either(cond(val),identity,fn))(list))

export const updateListIfPropEqual =curry((prop,val,list,fn) => updateListWhereCondIsMet(propIsEqual(prop),val,list,fn)  )
