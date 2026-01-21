import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Portfolio Setup
        </h1>
        <p className="text-xl text-gray-300">
          Vite + React + TypeScript + Tailwind CSS
        </p>
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            count is {count}
          </button>
          <p className="mt-4 text-sm text-gray-400">
            Edit <code>src/App.tsx</code> to start building!
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
