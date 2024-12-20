interface Props {
  label: string;
}

const Button = ({ label }: Props) => {
  return (
    <button className="py-3 text-black btn-bg w-full rounded font-poppins shadow-sm shadow-black text-s font-bold">
      {label}
    </button>
  );
};

export default Button;
