import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function OrderDetail(){
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    const fetchOrder = async ()=>{
      const res = await fetch(`${API}/orders/${id}`)
      const data = await res.json()
      setOrder(data)
    }
    fetchOrder()
    const iv = setInterval(async ()=>{
      const res = await fetch(`${API}/orders/${id}/status`)
      const data = await res.json()
      setOrder(prev => prev ? { ...prev, status: data.status } : prev)
    }, 4000)
    return ()=> clearInterval(iv)
  },[id])

  if(!order) return <div className="min-h-screen bg-slate-900"><Navbar/><div className="max-w-6xl mx-auto px-4 py-8 text-slate-300">Loading...</div></div>

  const steps = ['confirmed','preparing','out_for_delivery','delivered']
  const currentIndex = steps.indexOf(order.status)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl text-white font-bold mb-4">Order #{order._id}</h1>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <p className="text-slate-200">Status: <span className="font-semibold text-white capitalize">{order.status.replaceAll('_',' ')}</span></p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {steps.map((s, idx)=> (
              <div key={s} className={`text-center py-2 rounded-lg border ${idx<=currentIndex? 'bg-blue-500/80 border-blue-400 text-white':'bg-slate-900/50 border-slate-700/60 text-slate-300'}`}>{s.replaceAll('_',' ')}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
