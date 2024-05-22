import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import iconClose from '../../assets/close.svg'

const Modal = ({ open, onClose, onModalClose, children }) => {
  const modalRef = useRef()
  useEffect(() => {
    if (open) {
      modalRef.current.show()
    } else {
      modalRef.current.close()
    }
  }, [open])

  return createPortal(
    <dialog
      open={open}
      ref={modalRef}
      onClose={onClose}
      className="p-4 max-w-[600px] w-full relative open:animate-showScale"
    >
      <div className="">
        <button onClick={onModalClose} className="absolute right-4">
          <img src={iconClose} alt="icon close" className="w-6 h-6 hover:scale-150 transition-transform	duration-200" />
        </button>
        {children}
      </div>
    </dialog>,

    document.getElementById('modal')
  )
}

export default Modal
