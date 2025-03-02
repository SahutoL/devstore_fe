import { useEffect } from 'react'
import axios from 'axios'

const VAPID_PUBLIC_KEY = "your_vapid_public_key"  // ここに実際の公開鍵を設定

/**
 * PushManager コンポーネント
 * サービスワーカー登録後、Push API によるプッシュ通知購読を行いサーバに登録する
 */
export default function PushManager() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(swReg => {
        swReg.pushManager.getSubscription().then(subscription => {
          if (!subscription) {
            // 未購読の場合、新たに購読を登録
            swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            })
            .then(newSub => {
              // 購読情報をサーバへ送信
              axios.post('http://127.0.0.1:8000/api/users/push/subscribe/', newSub.toJSON())
                .then(() => console.log('Push購読情報を登録しました。'))
                .catch(err => console.error('購読登録エラー：', err))
            })
          }
        })
      })
    }
  }, [])

  return null
}

/**
 * VAPID 公開鍵を Uint8Array に変換する関数
 * @param {string} base64String - VAPID 公開鍵（Base64形式）
 */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
