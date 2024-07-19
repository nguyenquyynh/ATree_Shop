import { createAction, createReducer } from '@reduxjs/toolkit'

let initable = []

const loadcart = createAction('CART/LOAD');
const addcart = createAction('CART/ADD');
const removeonecart = createAction('REMOVE');
const deleteallart = createAction('DELETE/ALL');
const updatecart = createAction('UPDATE');
const removeafterbuy = createAction('CART/REMOVEAFTERBUY');

const cartReducer = createReducer(initable, (builder) => {
    builder
        .addCase(loadcart, (state, action) => {
            console.log("đang thực hiện loadcart")
            return action.payload
        })
        .addCase(removeafterbuy, (state, action) => {
            console.log("đang thực hiện remove àter buy")
            const temp = state.filter((el) => el.check == false && el )
            return temp
        })
        .addCase(addcart, (state, action) => {
            console.log("đang thực hiện addcart")
            const index = state.findIndex((el) => el.product._id == action.payload.product._id)
            console.log(index)
            if (index != -1) {
                state[index].quantity = action.payload.quantity
            } else state.push(action.payload)
            return state
        })
        .addCase(removeonecart, (state, action) => {
            console.log("đang thực hiện removecart")
            let newarr = state.filter((el) => el._id != action.payload)
            return newarr
        })
        .addCase(deleteallart, (state) => {
            console.log("đang thực hiện deletecart")
            return []
        })
        .addCase(updatecart, (state, action) => {
            console.log("đang thực hiện updatecart")
            const arr = state.map((el) => {
                return el._id == action.payload.id ? { ...el, check: action.payload.check, quantity: action.payload.quantity }
                    : el
            })
            console.log(arr)
            return arr
        })
        .addDefaultCase((state, action) => {
            console.log("đang thực hiện cart")
            return state
        })
})

export { loadcart, cartReducer, updatecart, addcart, deleteallart, removeonecart, removeafterbuy }