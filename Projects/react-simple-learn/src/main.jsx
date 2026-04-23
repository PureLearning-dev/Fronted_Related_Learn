import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    // 为了美观，可以为每个组件进行书写css样式
    <StrictMode>
      {
          // 使用BrowserRouter组件是让App拥有可以建立路由的能力
      }
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </StrictMode>,
)
