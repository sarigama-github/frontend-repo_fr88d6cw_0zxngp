import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, UtensilsCrossed, Search, User, ChefHat } from 'lucide-react'

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/70 border-b border-slate-700/40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold text-lg">
          <UtensilsCrossed className="w-6 h-6 text-blue-400" />
          SwiftBite
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-slate-200">
          <NavLink to="/restaurants" className={({isActive})=>`hover:text-white transition ${isActive?'text-white':''}`}>Browse</NavLink>
          <NavLink to="/orders/track" className={({isActive})=>`hover:text-white transition ${isActive?'text-white':''}`}>Track Order</NavLink>
          <NavLink to="/admin" className={({isActive})=>`hover:text-white transition ${isActive?'text-white':''}`}>Restaurant Admin</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="p-2 rounded-lg hover:bg-slate-800 text-slate-200" title="Account">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-200" title="Cart">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
