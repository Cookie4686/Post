export default function Button({
  disabled,
  children,
  type = "button",
}: {
  type: "button" | "reset" | "submit";
  disabled?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-1 rounded-2xl font-medium bg-[--accent] text-white`}
    >
      {children}
    </button>
  );
}
