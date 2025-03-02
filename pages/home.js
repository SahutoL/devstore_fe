import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [developers, setDevelopers] = useState([])
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  useEffect(() => {
    if (!accessToken) {
      router.push('/')
      return
    }
    axios.get('https://devstore-be.onrender.com/api/developers/list/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => setDevelopers(res.data))
      .catch(err => console.error(err))
  }, [accessToken])

  const handleAddDeveloper = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://devstore-be.onrender.com/api/developers/create/', { url }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      setDevelopers([...developers, res.data])
      setUrl('')
    } catch (err) {
      setError('開発者情報の追加に失敗しました')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('このデベロッパーを削除してもよろしいですか？')) {
      try {
        await axios.delete(`https://devstore-be.onrender.com/api/developers/delete/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        setDevelopers(developers.filter(dev => dev.id !== id))
      } catch (err) {
        console.error('削除エラー:', err)
      }
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl mb-4">デベロッパー一覧</h1>
      <form onSubmit={handleAddDeveloper} className="mb-6">
        <input 
          type="text" 
          placeholder="App Store URL" 
          value={url} 
          onChange={e => setUrl(e.target.value)} 
          className="border p-2 mr-2" 
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">追加</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map(dev => (
          <div key={dev.id} className="relative">
            <Link href={`/developer/${dev.id}`} legacyBehavior>
              <a className="block p-4 bg-white rounded shadow hover:shadow-lg transition">
                <h2 className="text-xl">{dev.artist_name}</h2>
                <p>アプリ数: {dev.applications.length}</p>
              </a>
            </Link>
            <button 
              onClick={() => handleDelete(dev.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
