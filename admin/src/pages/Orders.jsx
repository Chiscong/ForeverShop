import React from 'react'
import { useEffect } from 'react'
import { useState, useCallback } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/admin_assets/assets'
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const fetchAllOrders = useCallback(async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  })

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success('Status updated successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchAllOrders()
  }, [fetchAllOrders, token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders && orders.length > 0 ? orders.map((order, index) => (
            <div className='flex items-center justify-between border border-gray-200 p-4 my-2 bg-gray-50 rounded' key={index}>
              {/* Left: Package Icon */}
              <div className='flex items-center'>
                <img className='w-12 h-12 mr-4' src={assets.parcel_icon} alt="" />

                {/* Product List and Address */}
                <div>
                  {/* Product Items */}
                  <div className='mb-3'>
                    {order.items && order.items.map((item, itemIndex) => (
                      <p className='text-sm text-gray-800 py-0.5' key={itemIndex}>
                        {item.name} x{item.quantity} {item.size && <span> x {item.size}</span>}
                        {itemIndex < order.items.length - 1 && ','}
                      </p>
                    ))}
                  </div>

                  {/* Customer Address */}
                  <div className='text-xs text-gray-600 space-y-1'>
                    <p className='font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                    <p>{order.address.street},</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>
              </div>

              {/* Center: Order Details */}
              <div className='text-sm text-gray-600 space-y-1'>
                <p>Items : {order.items.length}</p>
                <p>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Center-Right: Amount */}
              <div className='text-lg font-semibold text-gray-800'>
                {currency}{order.amount}
              </div>

              {/* Right: Status Dropdown */}
              <div>
                <select
                  className='p-2 border border-gray-300 rounded bg-white text-sm'
                  value={order.status || "Order Placed"}
                  onChange={(event) => statusHandler(event, order._id)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          )) : <p>No orders found</p>
        }
      </div>
    </div>
  )
}

export default Orders