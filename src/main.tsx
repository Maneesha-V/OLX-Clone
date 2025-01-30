import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from '../store/FirebaseContext.tsx'
import { MenuProvider } from '../store/MenuContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FirebaseProvider> 
        <MenuProvider> 
          <App />               
        </MenuProvider>     
      </FirebaseProvider>    
    </BrowserRouter>
  </StrictMode>,
)
