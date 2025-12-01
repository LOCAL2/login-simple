import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Modal from '../components/Modal'
import '../styles/Auth.css'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // ตรวจสอบว่า username มีอยู่แล้วหรือไม่
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single()

      if (existingUser) {
        setError('Username นี้ถูกใช้งานแล้ว')
        setLoading(false)
        return
      }

      // สร้าง user ใหม่
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ username, password }])

      if (insertError) throw insertError

      setShowModal(true)
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>สมัครสมาชิก</h1>
        <p className="auth-subtitle">สร้างบัญชีใหม่เพื่อเริ่มต้นใช้งาน</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
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
              minLength={6}
              placeholder="กรอก password (อย่างน้อย 6 ตัวอักษร)"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
          </button>
        </form>
        <p className="auth-link">
          มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
        </p>
        <p className="credit">by Barron</p>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          navigate('/login')
        }}
        title="สมัครสมาชิกสำเร็จ!"
        message="บัญชีของคุณถูกสร้างเรียบร้อยแล้ว กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ"
        type="success"
      />
    </div>
  )
}
