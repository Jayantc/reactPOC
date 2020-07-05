import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState={
    items: null,
    totalPrice: 0,
    error: false,
    building: false,
    itemCount: 0
}

const item_PRICES={
    apple: 20,
    banana: 10,
    beetroot: 18,
    carrot: 8,
    coconut: 50,
    cucumber: 5,
    grapes: 40,
    guava: 15,
    jackfruit: 100,
    kiwi: 25,
    lemon: 3,
    mango: 30,
    orange: 18,
    papaya: 40,
    peach: 12,
    pineapple: 40,
    radish: 12,
    sapota: 8,
    strawberry: 8,
    watermelon: 60
}



const additems= (state, action)=> {
    
        const updateditem= {[action.itemName]: state.items[action.itemName]+1}
        
            const updateditems= updateObject(state.items, updateditem)
            const updatedState= {
                items: updateditems,
                totalPrice: state.totalPrice+ item_PRICES[action.itemName],
                itemCount: state.items[action.itemName]+1,
                building:true
            }
            return updateObject(state, updatedState)
}

const removeitems= (state, action)=> {
    const updateditem= {[action.itemName]: state.items[action.itemName]-1}
        const updateditems= updateObject(state.items, updateditem)
        const updatedState= {
            items: updateditems,
            totalPrice: state.totalPrice- item_PRICES[action.itemName],
            itemCount: state.items[action.itemName]-1,
            building: true
        }
        return updateObject(state, updatedState)
}

const setitems= (state, action)=>{
    return updateObject(state, {
        items: {                                     
            apple: action.items.apple,
            beetroot: action.items.beetroot,
            banana: action.items.banana,
            coconut: action.items.coconut,
            carrot: action.items.carrot,
            cucumber: action.items.cucumber,
            grapes: action.items.grapes,
            guava: action.items.guava,
            jackfruit: action.items.jackfruit,
            kiwi: action.items.kiwi,
            lemon: action.items.lemon,
            mango: action.items.mango,
            orange: action.items.orange,
            papaya: action.items.papaya,
            peach: action.items.peach,
            pineapple: action.items.pineapple,
            radish: action.items.radish,
            sapota: action.items.sapota,
            strawberry: action.items.strawberry,
            watermelon: action.items.watermelon
        },
        totalPrice: 0,
        itemCount: 0,
        error: false,
        building: false
    })
}

const fetchitemsFail= (state, action)=>{
    return updateObject(state, {error: true})
}

const reducer=(state= initialState, action)=>{
    switch(action.type){
        case(actionTypes.ADD_item): return additems(state, action)
            
        case(actionTypes.REMOVE_item): return removeitems(state, action)

        case(actionTypes.SET_items): return setitems(state, action)
             
        case(actionTypes.FETCH_items_FAILED): return fetchitemsFail(state, action)
            
        default:
            return state
    }
}

export default reducer