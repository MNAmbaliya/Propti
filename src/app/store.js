import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './api/auth/authslice'
import OrderReducer from './api/order/orderslice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    order: OrderReducer
  },
})