export default function MenuItemCard({ item, onAdd }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex gap-4">
      <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-lg object-cover"/>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-medium">{item.name}</h4>
          <span className="text-white font-semibold">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-slate-300 text-sm mb-3">{item.description}</p>
        <button onClick={()=>onAdd(item)} className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">Add to cart</button>
      </div>
    </div>
  )
}
