import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout(){
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [address, setAddress] = useState('123 Demo Street')
  const [method, setMethod] = useState('card')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const saved = localStorage.getItem('cart')
    if(saved) setCart(JSON.parse(saved))
  },[])

  const subtotal = useMemo(()=> cart? cart.items.reduce((s,i)=>s+i.price*i.quantity,0):0, [cart])
  const tax = useMemo(()=> +(subtotal*0.08).toFixed(2), [subtotal])
  const total = useMemo(()=> +(subtotal+tax).toFixed(2), [subtotal, tax])

  const placeOrder = async ()=>{
    if(!cart) return
    setLoading(true)
    const payload = {
      user_id: 'demo-user',
      restaurant_id: cart.restaurant._id,
      items: cart.items.map(i=>({ item_id: i._id, name: i.name, price: i.price, quantity: i.quantity })),
      delivery_address: address,
      payment_method: method
    }
    const res = await fetch(`${API}/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    const data = await res.json()
    setLoading(false)
    if(data.order_id){
      localStorage.removeItem('cart')
      navigate(`/orders/${data.order_id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl text-white font-bold mb-4">Checkout</h1>
        {!cart ? (
          <p className="text-slate-300">No items in cart.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Delivery address</h3>
                <input value={address} onChange={e=>setAddress(e.target.value)} className="w-full bg-slate-900/60 text-slate-200 rounded-lg px-3 py-2 border border-slate-700/50"/>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Payment</h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-slate-200"><input type="radio" checked={method==='card'} onChange={()=>setMethod('card')} /> Card</label>
                  <label className="flex items-center gap-2 text-slate-200"><input type="radio" checked={method==='paypal'} onChange={()=>setMethod('paypal')} /> PayPal</label>
                </div>
                <p className="text-slate-400 text-sm mt-2">Demo checkout – payment is simulated.</p>
              </div>
            </div>
            <aside className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 h-fit">
              <h3 className="text-white font-semibold mb-3">Order summary</h3>
              <div className="space-y-2 text-slate-200">
                {cart.items.map(i=> (
                  <div key={i._id} className="flex items-center justify-between"><span>{i.name} × {i.quantity}</span><span>${(i.price*i.quantity).toFixed(2)}</span></div>
                ))}
              </div>
              <div className="mt-3 border-t border-slate-700/60 pt-3 text-slate-200 space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-white font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <button disabled={loading} onClick={placeOrder} className="w-full mt-3 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60">{loading? 'Placing order...' : 'Place order'}</button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
