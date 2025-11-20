import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RestaurantCard({ r }) {
  return (
    <Link to={`/restaurant/${r._id}`} className="group bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/40 transition block">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={r.image_url} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white font-semibold">{r.name}</h3>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-sm text-slate-200">{r.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="text-sm text-slate-300 flex items-center justify-between">
          <p>{r.cuisine?.join(', ')}</p>
          <p className="text-slate-400">{r.delivery_time_min}-{r.delivery_time_max} min</p>
        </div>
      </div>
    </Link>
  )
}
