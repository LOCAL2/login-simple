import '../styles/Modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'success' | 'error'
}

export default function Modal({ isOpen, onClose, title, message, type = 'success' }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-icon ${type}`}>
          {type === 'success' ? '✓' : '✕'}
        </div>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <button onClick={onClose} className="modal-button">
          ตกลง
        </button>
      </div>
    </div>
  )
}
