import '../styles/index.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../redux/configureStore'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </div>
  )
}

export default MyApp
