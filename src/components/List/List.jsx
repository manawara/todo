import iconEdit from '../../assets/edit.svg'
import iconRemove from '../../assets/remove.svg'
import iconSuccess from '../../assets/success.svg'

const List = ({ items, onEditItem, onChangeStatus, onRemoveItem }) => {
  return (
    <ul className="my-2">
      {items &&
        items.map(({ id, title, description, status }) => (
          <li key={id} className="flex justify-between bg-slate-700 border-solid border-[1px] border-gray-500 p-4">
            <div>{status === 'completed' ? <del>{title}</del> : title}</div>
            <div className="flex items-center">
              <div
                className="relative w-4 h-4 border-[1px] border-solid border-black cursor-pointer"
                onClick={() => onChangeStatus(id)}
              >
                {status === 'completed' && <img src={iconSuccess} alt="success icon" />}
              </div>
              <div className="cursor-pointer" onClick={() => onEditItem({ id, title, description })}>
                <img src={iconEdit} alt="icon edit" className="mx-2 w-4 h-4" />
              </div>
              <div onClick={() => onRemoveItem(id)} className="cursor-pointer">
                <img src={iconRemove} alt="icon remove" className=" w-4 h-4" />
              </div>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default List
