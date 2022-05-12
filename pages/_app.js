import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const currentMode = localStorage.getItem('dark-mode');
    if (currentMode && currentMode === 'true') {
      document.documentElement.classList.add('dark');
    }
  })
  return <Component {...pageProps} />
}

export default MyApp
