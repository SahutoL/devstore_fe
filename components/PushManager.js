import { useEffect } from 'react'
import axios from 'axios'

const VAPID_PUBLIC_KEY = process.env.PUBLIC_KEY

export default function PushManager() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(swReg => {
        swReg.pushManager.getSubscription().then(subscription => {
          if (!subscription) {
            swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            })
            .then(newSub => {
              axios.post('https://devstore-be.onrender.com/api/users/push/subscribe/', newSub.toJSON())
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
