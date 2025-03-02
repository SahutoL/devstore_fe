import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // ログイン処理
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', { username, password })
      const { access, refresh } = response.data
      // JWTトークンを localStorage に保存
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
      router.push('/home')
    } catch (err) {
      setError('ログインに失敗しました')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">ログイン</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          className="border p-2 mb-2 w-full" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="border p-2 mb-4 w-full" 
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">ログイン</button>
        <p className="mt-4 text-center">
          アカウントをお持ちでないですか？ <a href="/register" className="text-blue-500">登録</a>
        </p>
      </form>
    </div>
  )
}
