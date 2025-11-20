import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RestaurantCard from '../components/RestaurantCard'
import SearchBar from '../components/SearchBar'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRestaurants = async (params={})=>{
    const url = new URL(`${API}/restaurants`)
    Object.entries(params).forEach(([k,v])=>{ if(v) url.searchParams.set(k,v) })
    const res = await fetch(url)
    const data = await res.json()
    setRestaurants(data)
    setLoading(false)
  }

  useEffect(()=>{ fetchRestaurants(); },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Discover restaurants</h1>
        <SearchBar onSearch={fetchRestaurants} />
        {loading ? (
          <p className="text-slate-300 mt-6">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {restaurants.map(r=> <RestaurantCard key={r._id} r={r} />)}
          </div>
        )}
      </main>
    </div>
  )
}
