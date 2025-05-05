export default function Loading({ className = '', children }) {
  return (
    <div className={`text-center py-8 ${className}`}>
      {children || 'Loading...'}
    </div>
  );
}