import { createAction, createReducer } from '@reduxjs/toolkit'

const history = []

const loadhistory = createAction('HISTORY/LOAD');
const addhistory = createAction('HISTORY/ADD');

const historyReducer = createReducer(history, (builder) => {
    builder
        .addCase(loadhistory, (state, action) => {
            console.log("đang thực hiện loadhistory")
            return action.payload
        })
        .addCase(addhistory, (state, action) => {
            console.log("-----------> 1 ", state)
            state.push(action.payload)
            console.log("-----------> 2 ", state)
            return state
        })
        .addDefaultCase((state, action) => {
            console.log("đang thực hiện history")
            return state
        })
})

export { loadhistory, historyReducer, addhistory }