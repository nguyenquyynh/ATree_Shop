import { createAction, createReducer } from "@reduxjs/toolkit";


const plus = createAction('PLUS')
const minus = createAction('MINUS')
const divide = createAction('DIVIDE')
const core = createAction('CORE')
const innittable = 0

const Calculator = createReducer(innittable, (builder) => {
    builder
        .addCase(plus, (state, action) => {
            return parseInt(action.payload.num1) + parseInt(action.payload.num2)
        })
        .addCase(minus, (state, action) => {
            return parseInt(action.payload.num1) - parseInt(action.payload.num2)
        })
        .addCase(core, (state, action) => {
            return parseInt(action.payload.num1) * parseInt(action.payload.num2)
        })
        .addCase(divide, (state, action) => {
            return parseInt(action.payload.num1) / parseInt(action.payload.num2)
        })
})

export { Calculator, minus, plus, core, divide }