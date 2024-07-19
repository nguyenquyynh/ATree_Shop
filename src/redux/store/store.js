import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { cartReducer } from '../reducer/CartReducer'
import { userReducer } from '../reducer/UserReducer'
import { historyReducer } from '../reducer/HistoryReducer'
import { Calculator } from '../reducer/Lap5Reducer'
const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    history: historyReducer,
    calculator: Calculator,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store