
import React, { createContext, useReducer, useState } from 'react'


export const AppContext = createContext()
export const AppContextProvider = (props) => {
    const { children } = props;
    const [login, setLogin] = useState(false);
    const [order, setOrder] = useState({});
    return (
        <AppContext.Provider value={{
            login, setLogin, order, setOrder
        }}>
            {children}
        </AppContext.Provider>
    )
}
