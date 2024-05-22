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
  const [inputSearch, setInputSearch] = useState('')
  const [search, setSearch] = useState(false)
  const filteredData = useSelector((state) => state.filteredData)
  const items = useSelector((state) => state.items)
  const category = useSelector((state) => state.filterBy)
  const changed = useSelector((state) => state.changed)
  const handleSearch = () => {
    setSearch((prev) => !prev)
  }

  const handleSearchInput = (e) => {
    setInputSearch(e.target.value)
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
    dispatch(toDoSliceAction.filteredData({ status: category, title: inputSearch }))
  }, [category, items, inputSearch, dispatch])

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('https://todo-ae203-default-rtdb.firebaseio.com/items.json')
      let data = await response.json()
      dispatch(toDoSliceAction.replaceItems(data))
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const sendData = async () => {
      let response = await fetch('https://todo-ae203-default-rtdb.firebaseio.com/items.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
      })
      return response.json()
    }
    if (changed) {
      sendData()
    }
  }, [items, changed])

  return (
    <main>
      <Layout>
        <h1 className="text-3xl uppercase mt-8 font-bold">things to do</h1>
        <Navigation onAction={handleOpen} onSearch={handleSearch} />
        {search && (
          <Input
            className={`bg-slate-700 animate-showScale`}
            placeholder="Szukaj"
            onAction={handleSearchInput}
            value={inputSearch}
          />
        )}
        {open && (
          <Modal open={open} onModalClose={handleOpen}>
            <div>
              <h2 className="text-center my-2">{statusModal === 'edit' ? 'Edit task' : 'Make New Task'}</h2>
              <Form onCloseModal={handleOpen} statusModal={statusModal} />
            </div>
          </Modal>
        )}
        <List
          items={category === 'all' && inputSearch.length === 0 ? items : filteredData}
          onRemoveItem={handleRemoveItem}
          onChangeStatus={handleChangeStatus}
          onEditItem={handleEditItem}
        />
      </Layout>
    </main>
  )
}

export default App
