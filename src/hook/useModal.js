import { useState } from 'react'

const useModal = () => {
  const [open, setOpen] = useState(false)
  const [statusModal, setStatusModal] = useState('add')

  const handleOpen = (status = 'add') => {
    setOpen((prev) => !prev)
    setStatusModal(status)
  }
  return { open, statusModal, handleOpen }
}

export default useModal
