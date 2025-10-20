import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MenuProvider } from './contexts/MenuContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { OrdersProvider } from './contexts/OrdersContext.jsx'
import { RoleProvider } from './contexts/RoleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoleProvider>
      <MenuProvider>
        <CartProvider>
          <OrdersProvider>
            <App />
          </OrdersProvider>
        </CartProvider>
      </MenuProvider>
    </RoleProvider>
  </StrictMode>,
)
