import '../styles/sass/index.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store, { persistor } from '../redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
