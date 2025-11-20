import { useState } from 'react'
import Hero from './components/Hero'
import CategorySelector from './components/CategorySelector'
import QuizPlayer from './components/QuizPlayer'
import Dashboard from './components/Dashboard'

function App() {
  const [attempt, setAttempt] = useState(null)
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-sky-100">
      <Hero />

      <main className="relative z-10 max-w-5xl mx-auto px-6 -mt-16 pb-24">
        {!attempt && (
          <div className="space-y-8">
            <CategorySelector onGenerated={(data) => setAttempt(data)} />
            <Dashboard />
          </div>
        )}

        {attempt && !result && (
          <QuizPlayer attempt={attempt} onFinish={(r) => setResult(r)} />
        )}

        {result && (
          <div className="bg-slate-800/60 border border-sky-500/20 rounded-2xl p-6 backdrop-blur text-center">
            <h3 className="text-2xl font-bold">Results</h3>
            <p className="mt-2 text-sky-200">You scored {result.score} out of {result.total}</p>
            <button onClick={() => { setAttempt(null); setResult(null) }} className="mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-sky-600 text-white">Take another quiz</button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
