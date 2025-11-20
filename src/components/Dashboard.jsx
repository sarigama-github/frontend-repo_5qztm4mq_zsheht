import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Dashboard() {
  const [attempts, setAttempts] = useState([])

  useEffect(() => {
    fetch(`${API}/me/attempts`).then(r => r.json()).then(setAttempts)
  }, [])

  return (
    <div className="bg-slate-800/60 border border-sky-500/20 rounded-2xl p-6 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sky-100 font-semibold">Your Quiz History</h3>
      </div>
      <div className="grid gap-3">
        {attempts.map(a => (
          <div key={a._id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-700 text-sky-200 flex items-center justify-between">
            <div>
              <div className="text-sky-100">Attempt: {a._id}</div>
              <div className="text-sky-300 text-sm">Status: {a.status} • Score: {a.score ?? 0}/{a.total ?? 0}</div>
            </div>
          </div>
        ))}
        {attempts.length===0 && (
          <div className="text-sky-300">No attempts yet. Generate a quiz to get started.</div>
        )}
      </div>
    </div>
  )
}
