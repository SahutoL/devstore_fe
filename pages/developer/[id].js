import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '../../components/Modal'
import Link from 'next/link'

export default function DeveloperDetail() {
  const router = useRouter()
  const { id } = router.query
  const [developer, setDeveloper] = useState(null)
  const [selectedApp, setSelectedApp] = useState(null)
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  useEffect(() => {
    if (!id || !accessToken) return
    axios.get(`http://127.0.0.1:8000/api/developers/${id}/`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => setDeveloper(res.data))
      .catch(err => console.error(err))
  }, [id, accessToken])

  const handleDelete = async () => {
    if (confirm('このデベロッパーを削除してもよろしいですか？')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/developers/delete/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        router.push('/home')
      } catch (err) {
        console.error('削除エラー:', err)
      }
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="mb-4 flex justify-between">
        <Link href="/home" legacyBehavior>
          <a className="bg-gray-500 text-white p-2 rounded">ホームへ戻る</a>
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">削除</button>
      </div>
      {developer ? (
        <>
          <h1 className="text-3xl mb-4">{developer.artist_name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developer.applications.map(app => (
              <div 
                key={app.id} 
                className="bg-white p-4 rounded shadow cursor-pointer" 
                onClick={() => setSelectedApp(app)}
              >
                {app.artworkUrl60 && (
                  <img src={app.artworkUrl60} alt="アプリアイコン" className="w-12 h-12 rounded" />
                )}
                <div>
                  <h2 className="text-xl">{app.track_name}</h2>
                  <p className="text-gray-600">{app.genre}</p>
                </div>
              </div>
            ))}
          </div>
          {selectedApp && <Modal app={selectedApp} onClose={() => setSelectedApp(null)} />}
        </>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  )
}
