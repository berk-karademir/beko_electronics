export default function ErrorMessage({ message, className = '' }) {
  if (!message) return null;
  return (
    <div className={`text-center text-red-600 py-8 ${className}`}>
      {message}
    </div>
  );
}