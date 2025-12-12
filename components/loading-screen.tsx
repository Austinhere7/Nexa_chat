"use client"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated AI Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">AI</span>
          </div>
          {/* Rotating Ring */}
          <div className="absolute inset-0 rounded-2xl border-4 border-transparent border-t-cyan-400 animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-white font-semibold text-xl">Nexa Chat AI</h2>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-gray-400 text-sm">Initializing AI Assistant...</p>
        </div>
      </div>
    </div>
  )
}
