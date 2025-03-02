import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      setError('パスワードが一致しません')
      return
    }
    try {
      await axios.post('http://127.0.0.1:8000/api/users/register/', { username, email, password, password2 })
      router.push('/')
    } catch (err) {
      setError('登録に失敗しました')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">ユーザー登録</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          className="border p-2 mb-2 w-full" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="border p-2 mb-2 w-full" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="border p-2 mb-2 w-full" 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={password2} 
          onChange={e => setPassword2(e.target.value)} 
          className="border p-2 mb-4 w-full" 
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">登録</button>
        <p className="mt-4 text-center">
          既にアカウントをお持ちですか？ <a href="/" className="text-blue-500">ログイン</a>
        </p>
      </form>
    </div>
  )
}
