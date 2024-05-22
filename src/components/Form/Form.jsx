import { useState, useEffect } from 'react'
import Input from '../Input/Input'
import TextArea from '../TextArea/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { toDoSliceAction } from '../../store/todo-slice'
const initialState = {
  title: '',
  description: '',
}
const Form = ({ onCloseModal, statusModal, data }) => {
  const [input, setInput] = useState(initialState)
  const editItem = useSelector((state) => state.edit)

  const dispatch = useDispatch()
  useEffect(() => {
    if (statusModal !== 'edit') {
      return
    }
    setInput(editItem)
  }, [statusModal, editItem])
  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (statusModal === 'edit') {
      dispatch(toDoSliceAction.updateItem({ id: editItem.id, title: input.title, description: input.description }))
    } else {
      dispatch(toDoSliceAction.addItemToList({ title: input.title, description: input.description }))
      setInput(initialState)
    }

    onCloseModal()
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmitForm}>
      <Input
        placeholder="Your task topic"
        maxLength={50}
        name="title"
        onAction={handleChange}
        count={input.title.length}
        value={input.title}
        required
      />
      <TextArea
        placeholder="More info about task"
        maxLength={75}
        name="description"
        onAction={handleChange}
        value={input.description}
        count={input.description.length}
        required
      />
      <button
        type="submit"
        className="mt-2 p-1 px-3 border-solid border-slate-400 border-[1px]  hover:bg-slate-600 duration-400 transition-bg capitalize self-center"
      >
        {statusModal === 'edit' ? 'save' : 'create new task'}
      </button>
    </form>
  )
}

export default Form
