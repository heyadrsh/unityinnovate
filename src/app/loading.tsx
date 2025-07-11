export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Unity Innovate</h2>
          <p className="text-gray-600 text-sm">Loading your experience...</p>
        </div>
      </div>
    </div>
  );
} 