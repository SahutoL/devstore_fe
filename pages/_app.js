import '../styles/globals.css'
import PushManager from '../components/PushManager'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* PushManager：PWAプッシュ通知購読の登録 */}
      <PushManager />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
