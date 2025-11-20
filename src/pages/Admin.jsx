import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Admin(){
  const [restaurants, setRestaurants] = useState([])
  const [selected, setSelected] = useState('')
  const [menu, setMenu] = useState([])
  const [form, setForm] = useState({ name:'', price:'', description:'', image_url:'' })
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    const run = async ()=>{
      await fetch(`${API}/admin/seed`, { method:'POST' })
      const rs = await (await fetch(`${API}/restaurants`)).json()
      setRestaurants(rs)
      if(rs.length) setSelected(rs[0]._id)
    }
    run()
  },[])

  useEffect(()=>{
    const load = async ()=>{
      if(!selected) return
      const m = await (await fetch(`${API}/restaurants/${selected}/menu`)).json()
      setMenu(m)
      const o = await (await fetch(`${API}/admin/orders?restaurant_id=${selected}`)).json()
      setOrders(o)
    }
    load()
  },[selected])

  const addItem = async ()=>{
    const payload = { ...form, price: parseFloat(form.price), restaurant_id: selected }
    const res = await fetch(`${API}/admin/menu`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    const data = await res.json()
    if(data.item_id){
      setForm({ name:'', price:'', description:'', image_url:'' })
      const m = await (await fetch(`${API}/restaurants/${selected}/menu`)).json()
      setMenu(m)
    }
  }

  const revenue = useMemo(()=> orders.reduce((s,o)=> s + (o.total||0), 0), [orders])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl text-white font-bold mb-4">Restaurant Admin</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <aside className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-2">Your restaurants</h3>
            <div className="space-y-2">
              {restaurants.map(r=> (
                <button key={r._id} onClick={()=>setSelected(r._id)} className={`w-full text-left px-3 py-2 rounded-lg ${selected===r._id? 'bg-blue-500 text-white':'bg-slate-900/60 text-slate-200 hover:bg-slate-900'}`}>{r.name}</button>
              ))}
            </div>
          </aside>

          <section className="md:col-span-2 space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">Add menu item</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} placeholder="Name" className="bg-slate-900/60 text-slate-200 rounded-lg px-3 py-2 border border-slate-700/50"/>
                <input value={form.price} onChange={e=>setForm(f=>({...f, price:e.target.value}))} placeholder="Price" className="bg-slate-900/60 text-slate-200 rounded-lg px-3 py-2 border border-slate-700/50"/>
                <input value={form.image_url} onChange={e=>setForm(f=>({...f, image_url:e.target.value}))} placeholder="Image URL" className="bg-slate-900/60 text-slate-200 rounded-lg px-3 py-2 border border-slate-700/50 sm:col-span-2"/>
                <textarea value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} placeholder="Description" className="bg-slate-900/60 text-slate-200 rounded-lg px-3 py-2 border border-slate-700/50 sm:col-span-2"/>
              </div>
              <button onClick={addItem} className="mt-3 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Add item</button>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">Menu</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {menu.map(i=> (
                  <div key={i._id} className="bg-slate-900/60 rounded-lg p-3 text-slate-200">
                    <div className="flex items-center justify-between"><span>{i.name}</span><span>${i.price.toFixed(2)}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">Orders</h3>
              <div className="text-slate-200 space-y-2">
                {orders.map(o=> (
                  <div key={o._id} className="bg-slate-900/60 rounded-lg p-3 flex items-center justify-between">
                    <span>#{o._id.slice(-6)} • {o.items?.length||0} items • {o.status}</span>
                    <span className="font-semibold">${(o.total||0).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="text-white font-semibold mt-3">Total revenue: ${revenue.toFixed(2)}</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
