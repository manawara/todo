import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toDoSliceAction } from './store/todo-slice'
import Layout from './layout/Layout'
import Navigation from './components/Navigation/Navigation'
import Modal from './components/Modal/Modal'
import useModal from './hook/useModal'
import Form from './components/Form/Form'
import Input from './components/Input/Input'
import List from './components/List/List'

function App() {
  const { open, statusModal, handleOpen } = useModal()
  const [search, setSearch] = useState(false)
  const filteredData = useSelector((state) => state.filteredData)
  const items = useSelector((state) => state.items)
  const category = useSelector((state) => state.filterBy)
  const handleSearch = () => {
    setSearch((prev) => !prev)
  }
  const dispatch = useDispatch()
  const handleRemoveItem = (id) => {
    dispatch(toDoSliceAction.removeItemWithList(id))
  }

  const handleChangeStatus = (id) => {
    dispatch(toDoSliceAction.changeStatusItem(id))
  }
  const handleEditItem = (data) => {
    dispatch(toDoSliceAction.editItem(data))
    handleOpen('edit')
  }

  useEffect(() => {
    dispatch(toDoSliceAction.filteredData(category))
  }, [category, items, dispatch])

  return (
    <main>
      <Layout>
        <h1 className="text-3xl uppercase mt-8 font-bold">things to do</h1>
        <Navigation onAction={handleOpen} onSearch={handleSearch} />
        {search && <Input className={`bg-slate-700 animate-showScale`} placeholder="Szukaj" />}
        {open && (
          <Modal open={open} onModalClose={handleOpen}>
            <div>
              <h2 className="text-center my-2">{statusModal === 'edit' ? 'Edit task' : 'Make New Task'}</h2>
              <Form onCloseModal={handleOpen} statusModal={statusModal} />
            </div>
          </Modal>
        )}
        <List
          items={category === 'all' ? items : filteredData}
          onRemoveItem={handleRemoveItem}
          onChangeStatus={handleChangeStatus}
          onEditItem={handleEditItem}
        />
      </Layout>
    </main>
  )
}

export default App
