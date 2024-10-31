type Props = {
  name: string;
  onClick?: () => void;
  type?: "button" | "submit";
  bgackgroundColor?: string;
};

export const Button = ({
  name,
  onClick,
  type = "button",
  bgackgroundColor = "bg-indigo-600",
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-md ${bgackgroundColor} px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {name}
    </button>
  );
};
