import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import Collection from './assets/pages/Collection'
import About from './assets/pages/About'
import Contact from './assets/pages/Contact'
import Product from './assets/pages/Product'
import Cart from './assets/pages/Cart'
import Login from './assets/pages/Login'
import PlaceOrder from './assets/pages/PlaceOrder'
import Orders from './assets/pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import Verify from './assets/pages/Verify'
import AIAssistant from './components/AIAssistant'
import ForgotPassword from './assets/pages/ForgotPassword'
import ResetPassword from './assets/pages/ResetPassword'
export const App = () => {
  return (
    <div className='px-4 sm:px-[5w] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login'element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
      <AIAssistant/>
      <Footer/>
    </div>
  )
}

export default App