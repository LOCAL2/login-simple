import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      navigate('/login')
      return
    }
    const user = JSON.parse(userStr)
    setUsername(user.username)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="success-icon">✓</div>
        <h1>เข้าสู่ระบบสำเร็จ!</h1>
        <p className="welcome-text">ยินดีต้อนรับ</p>
        <p className="username-display">{username}</p>
        <button onClick={handleLogout} className="btn-logout">
          ออกจากระบบ
        </button>
        <p className="credit">by Barron</p>
      </div>
    </div>
  )
}
