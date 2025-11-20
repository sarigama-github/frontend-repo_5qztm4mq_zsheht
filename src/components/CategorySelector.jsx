import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

const DIFFS = ['Easy', 'Medium', 'Hard']

export default function CategorySelector({ onGenerated }) {
  const [categories, setCategories] = useState({})
  const [category, setCategory] = useState('Academic')
  const [subcategory, setSubcategory] = useState('Physics')
  const [difficulty, setDifficulty] = useState('Easy')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/categories`).then(r => r.json()).then(data => {
      setCategories(data)
      const firstCat = Object.keys(data)[0]
      setCategory(firstCat)
      setSubcategory(data[firstCat][0])
    })
  }, [])

  useEffect(() => {
    if (category && categories[category]) {
      setSubcategory(categories[category][0])
    }
  }, [category])

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, subcategory, difficulty, num_questions: 5 }),
      })
      const data = await res.json()
      onGenerated?.(data)
    } finally {
      setLoading(false)
    }
  }

  const subs = categories[category] || []

  return (
    <div className="bg-slate-800/60 border border-sky-500/20 rounded-2xl p-6 backdrop-blur">
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="text-sky-200 text-sm">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 w-full bg-slate-900/70 text-sky-100 rounded-xl px-3 py-2 border border-slate-700">
            {Object.keys(categories).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sky-200 text-sm">Subcategory</label>
          <select value={subcategory} onChange={e => setSubcategory(e.target.value)} className="mt-1 w-full bg-slate-900/70 text-sky-100 rounded-xl px-3 py-2 border border-slate-700">
            {subs.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sky-200 text-sm">Difficulty</label>
          <div className="mt-1 flex gap-2">
            {DIFFS.map(d => (
              <button key={d} onClick={() => setDifficulty(d)} className={`px-3 py-2 rounded-xl border ${difficulty===d? 'bg-sky-500/20 border-sky-400 text-sky-100':'bg-slate-900/70 border-slate-700 text-sky-200'}`}>{d}</button>
            ))}
          </div>
        </div>
        <div className="flex items-end">
          <button onClick={handleGenerate} disabled={loading} className="w-full bg-gradient-to-r from-purple-500/60 to-sky-500/60 hover:from-purple-500 hover:to-sky-500 text-white font-semibold rounded-xl px-4 py-3 transition">
            {loading? 'Generating…' : 'Generate Quiz'}
          </button>
        </div>
      </div>
    </div>
  )
}
