export default function Loader({ loading, text = "Loading..." }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-80 flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center">
        <div className="
          w-14 h-14 border-4 border-gray-500/40 border-t-purple-600 
          rounded-full animate-spin
        " />
        <p className="text-gray-200 text-lg font-medium mt-4">{text}</p>
      </div>
    </div>
  );
}