import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import '../styles/Auth.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single()

      if (queryError || !data) {
        setError('Username หรือ Password ไม่ถูกต้อง')
        setLoading(false)
        return
      }

      // เก็บข้อมูล user ใน localStorage
      localStorage.setItem('user', JSON.stringify({ username: data.username }))
      navigate('/dashboard')
    } catch (err: any) {
      setError('Username หรือ Password ไม่ถูกต้อง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>เข้าสู่ระบบ</h1>
        <p className="auth-subtitle">ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="กรอก username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="กรอก password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
        <p className="auth-link">
          ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
        </p>
        <p className="credit">by Barron</p>
      </div>
    </div>
  )
}
