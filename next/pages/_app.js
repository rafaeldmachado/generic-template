import '../styles/globals.css'
import initFirebase from '../services/firebase'

initFirebase();

function MyApp({ Component, pageProps }) {
  
  return <Component {...pageProps} />
}

export default MyApp
