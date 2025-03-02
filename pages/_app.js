import '../styles/globals.css'
import PushManager from '../components/PushManager'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PushManager />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
