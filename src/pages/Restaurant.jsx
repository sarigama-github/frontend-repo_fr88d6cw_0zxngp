import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MenuItemCard from '../components/MenuItemCard'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Restaurant() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const run = async ()=>{
      const r = await (await fetch(`${API}/restaurants/${id}`)).json()
      setRestaurant(r)
      const m = await (await fetch(`${API}/restaurants/${id}/menu`)).json()
      setMenu(m)
    }
    run()
  },[id])

  const addToCart = (item)=>{
    setCart(prev=>{
      const idx = prev.findIndex(i=>i._id===item._id)
      if(idx>-1){
        const copy=[...prev]; copy[idx].quantity += 1; return copy
      }
      return [...prev, {...item, quantity:1}]
    })
  }

  const subtotal = cart.reduce((s,i)=>s+i.price*i.quantity,0)

  const checkout = ()=>{
    localStorage.setItem('cart', JSON.stringify({restaurant, items: cart}))
    navigate('/checkout')
  }

  if(!restaurant) return <div className="min-h-screen bg-slate-900"><Navbar/><div className="max-w-6xl mx-auto px-4 py-8 text-slate-300">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar cartCount={cart.reduce((s,i)=>s+i.quantity,0)} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden border border-slate-700/50">
              <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-60 object-cover"/>
            </div>
            <h1 className="text-3xl text-white font-bold mt-4">{restaurant.name}</h1>
            <p className="text-slate-300">{restaurant.cuisine?.join(', ')} • {restaurant.delivery_time_min}-{restaurant.delivery_time_max} min</p>

            <div className="mt-6 grid gap-4">
              {menu.map(item=> <MenuItemCard key={item._id} item={item} onAdd={addToCart} />)}
            </div>
          </div>
          <aside className="w-full md:w-80 bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 h-fit sticky top-24">
            <h3 className="text-white font-semibold mb-3">Your order</h3>
            {cart.length===0 ? (
              <p className="text-slate-400 text-sm">No items added yet.</p>
            ) : (
              <div className="space-y-3">
                {cart.map(i=> (
                  <div key={i._id} className="flex items-center justify-between text-slate-200">
                    <span>{i.name} × {i.quantity}</span>
                    <span>${(i.price*i.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-white font-semibold pt-3 border-t border-slate-700/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button onClick={checkout} className="w-full mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Go to checkout</button>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}
