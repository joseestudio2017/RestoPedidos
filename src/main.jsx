import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MenuProvider } from './contexts/MenuContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { OrdersProvider } from './contexts/OrdersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuProvider>
      <CartProvider>
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </CartProvider>
    </MenuProvider>
  </StrictMode>,
)
