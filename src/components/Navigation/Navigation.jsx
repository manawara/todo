import { useDispatch, useSelector } from 'react-redux'
import { toDoSliceAction } from '../../store/todo-slice'
import iconAdd from '../../assets/add.svg'
import iconSearch from '../../assets/search.svg'

const Navigation = ({ onAction, onSearch }) => {
  const items = useSelector((state) => state.items)
  const category = useSelector((state) => state.filterBy)
  const activeFilter = items.filter((el) => el.status === 'active')
  const dispatch = useDispatch()

  const handleChangeStatus = (status) => {
    dispatch(toDoSliceAction.filterByCategory(status))
  }

  return (
    <div className="my-2 bg-slate-700 p-4 flex flex-col  justify-between sm:flex-row">
      <ul className="flex items-center">
        <li className="mr-1">
          <button className="w-8 h-8 flex justify-center items-center" onClick={onAction}>
            <img src={iconAdd} alt="icon add" />
          </button>
        </li>
        <li className="mr-2 relative after:absolute  after:top-[50%] after:-translate-y-[50%] after:-right-1 after:content-[''] after:h-[70%] after:block after:w-[1px] after:bg-slate-400">
          <button className="w-8 h-8 flex justify-center items-center mr-2" onClick={onSearch}>
            <img src={iconSearch} alt="icon search" className="w-4 h-4" />
          </button>
        </li>
        <li className="ml-auto sm:ml-4">{activeFilter.length} items left</li>
      </ul>
      <ul className="flex justify-center mt-3 sm:mt-0">
        <li className="mr-2">
          <button
            onClick={() => handleChangeStatus('all')}
            className={`p-1 px-3 border-solid border-slate-400 border-[1px] hover:bg-slate-600 duration-400 transition-bg ${
              category === 'all' ? 'bg-slate-600' : undefined
            }`}
          >
            All
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => handleChangeStatus('active')}
            className={`p-1 px-3 border-solid border-slate-400 border-[1px]  hover:bg-slate-600 duration-400 transition-bg
            ${category === 'active' ? 'bg-slate-600' : undefined}`}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => handleChangeStatus('completed')}
            className={`p-1 px-3 border-solid border-slate-400 border-[1px]  hover:bg-slate-600 duration-400 transition-bg ${
              category === 'completed' ? 'bg-slate-600' : undefined
            }`}
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
