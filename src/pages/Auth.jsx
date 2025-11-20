import { useState } from 'react'
import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth(){
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      const url = mode==='login'? `${API}/auth/login` : `${API}/auth/signup`
      const payload = mode==='login'? { email, password } : { name, email, password }
      const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      if(data.token){
        setUser(data.user)
      }else{
        setError(data.detail || 'Something went wrong')
      }
    }catch(err){ setError('Network error') }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-8">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl text-white font-bold">{mode==='login'? 'Login':'Create account'}</h1>
            <button onClick={()=>setMode(mode==='login'?'signup':'login')} className="text-blue-400 text-sm">{mode==='login'? 'Need an account? Sign up':'Have an account? Log in'}</button>
          </div>
          {!user ? (
            <form onSubmit={submit} className="space-y-3">
              {mode==='signup' && (
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full bg-slate-900/60 text-slate-200 rounded-lg px-3 py-2 border border-slate-700/50"/>
              )}
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full bg-slate-900/60 text-slate-200 rounded-lg px-3 py-2 border border-slate-700/50"/>
              <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full bg-slate-900/60 text-slate-200 rounded-lg px-3 py-2 border border-slate-700/50"/>
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <button className="w-full mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">{mode==='login'? 'Login':'Sign up'}</button>
              <button type="button" onClick={()=>alert('Demo: Social login not wired, but UI ready.')} className="w-full mt-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Continue with Google</button>
            </form>
          ) : (
            <div className="text-slate-200">
              <p className="mb-2">Welcome, {user.name || user.email}!</p>
              <pre className="text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-700/50 overflow-auto">{JSON.stringify(user, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
