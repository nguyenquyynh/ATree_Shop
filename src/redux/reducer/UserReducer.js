import { createAction, createReducer } from '@reduxjs/toolkit'

const user = {}

const loaduser = createAction('USER/LOAD')
const userReducer = createReducer(user, (builder) => {
    builder
        .addCase(loaduser, (state, action) => {
            console.log("đang thực hiện loauser")
            return action.payload
        })
        .addDefaultCase((state, action) => {
            console.log("đang thực hiện user")
            return state
        })
})

export { loaduser, userReducer }