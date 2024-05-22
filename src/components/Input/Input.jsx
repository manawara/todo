const Input = ({ name, value, type, placeholder, maxLength, id, count, className, onAction, required, props }) => {
  return (
    <div>
      {maxLength && (
        <label htmlFor={id} className="text-sm flex justify-end m-1">
          {count} / {maxLength}
        </label>
      )}
      <input
        name={name}
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        className={` w-full rounded py-2 px-3 ${className ? className : 'bg-slate-600'}`}
        maxLength={maxLength}
        onChange={onAction}
        required={required}
        {...props}
      />
    </div>
  )
}

export default Input
