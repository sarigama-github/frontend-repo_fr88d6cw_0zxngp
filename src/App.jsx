import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import Checkout from './pages/Checkout'
import OrderDetail from './pages/OrderDetail'
import Admin from './pages/Admin'
import Auth from './pages/Auth'

function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/restaurants" element={<Home/>} />
      <Route path="/restaurant/:id" element={<Restaurant/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/orders/:id" element={<OrderDetail/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/auth" element={<Auth/>} />
    </Routes>
  )
}

export default App
