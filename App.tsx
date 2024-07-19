import React from 'react'
import { AppContextProvider } from './src/app/Appcontext';
import MainNavigate from './src/app/main/MainNavigate';
import { Provider } from 'react-redux'
import store from './src/redux/store/store';
import LoadingComponent from './src/common/LoadingComponent';
import Screen from './src/lap/lap5/Screen';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <AppContextProvider>
        <MainNavigate />
      </AppContextProvider>
      {/* <Screen/> */}
    </Provider>
  )
}

export default App
