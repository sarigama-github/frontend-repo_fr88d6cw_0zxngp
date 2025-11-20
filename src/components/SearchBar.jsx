import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [rating, setRating] = useState('')

  const submit = (e)=>{
    e.preventDefault()
    onSearch({ q, cuisine, min_rating: rating })
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex flex-wrap gap-3">
      <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-slate-900/60 rounded-lg px-3 py-2 text-slate-200">
        <Search className="w-4 h-4 text-slate-400" />
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search restaurants" className="bg-transparent outline-none w-full"/>
      </div>
      <input value={cuisine} onChange={e=>setCuisine(e.target.value)} placeholder="Cuisine (e.g. Italian)" className="flex-1 min-w-[140px] bg-slate-900/60 rounded-lg px-3 py-2 text-slate-200 border border-slate-700/50"/>
      <input value={rating} onChange={e=>setRating(e.target.value)} placeholder="Min rating" className="w-36 bg-slate-900/60 rounded-lg px-3 py-2 text-slate-200 border border-slate-700/50"/>
      <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Search</button>
    </form>
  )
}
