import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function QuizPlayer({ attempt, onFinish }) {
  const quiz = attempt?.quiz
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(quiz ? 600 : 0)

  useEffect(() => {
    if (!quiz) return
    const id = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [quiz])

  const current = quiz?.questions?.[index]

  const select = (i) => {
    const copy = [...answers]
    copy[index] = { question_index: index, selected_index: i }
    setAnswers(copy)
  }

  const progress = useMemo(() => {
    if (!quiz) return 0
    const answered = answers.filter(a => a && a.selected_index !== undefined).length
    return Math.round((answered / quiz.questions.length) * 100)
  }, [answers, quiz])

  const submit = async () => {
    const res = await fetch(`${API}/attempt/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attempt_id: attempt.attempt_id, answers })
    })
    const data = await res.json()
    onFinish?.(data)
  }

  if (!quiz) return null

  return (
    <div className="bg-slate-800/60 border border-sky-500/20 rounded-2xl p-6 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sky-200">{quiz.title}</div>
        <div className="text-sky-300">Time: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
      </div>
      <div className="mt-3 w-full h-2 bg-slate-900/70 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-400 to-sky-400" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6">
        <div className="text-sky-100 font-medium">Q{index+1}. {current.prompt}</div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {current.options.map((opt, i) => (
            <button key={i} onClick={() => select(i)} className={`text-left px-4 py-3 rounded-xl border transition ${answers[index]?.selected_index===i? 'bg-sky-500/20 border-sky-400 text-sky-50':'bg-slate-900/70 border-slate-700 text-sky-200'}`}>{opt}</button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button disabled={index===0} onClick={() => setIndex(i => i-1)} className="px-4 py-2 rounded-lg border border-slate-700 text-sky-200">Previous</button>
          {index < quiz.questions.length - 1 ? (
            <button onClick={() => setIndex(i => i+1)} className="px-4 py-2 rounded-lg bg-sky-600 text-white">Next</button>
          ) : (
            <button onClick={submit} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-sky-600 text-white">Submit</button>
          )}
        </div>
      </div>
    </div>
  )
}
