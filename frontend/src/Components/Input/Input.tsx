type Props = {
  label?: string;
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  labelColor?: string;
};

export const Input = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  multiple = false,
  labelColor = "text-gray-200",
  ...otherProps
}: Props) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className={`block text-sm/6 font-medium ${labelColor}`}
        >
          {label}
        </label>
      )}

      <div className="mt-2">
        <input
          {...otherProps}
          id={label}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          multiple={multiple}
          className="block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm/6 bg-slate-800"
        />
      </div>
    </div>
  );
};
