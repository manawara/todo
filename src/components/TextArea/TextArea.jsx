const TextArea = ({ id, count, maxLength, name, value, type, onAction, placeholder, required, props }) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm flex justify-end m-1">
        {count} / {maxLength}
      </label>
      <textarea
        name={name}
        id={id}
        value={value}
        type={type}
        {...props}
        placeholder={placeholder}
        className="bg-slate-600 w-full rounded py-2 px-3 resize-none"
        maxLength={maxLength}
        onChange={onAction}
        required={required}
      />
    </div>
  )
}

export default TextArea
