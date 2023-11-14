import ReactDOM from 'react-dom/client'

import config from './config.ts'
import axios from 'axios'
axios.defaults.baseURL = config.baseURL

import App from '~/App.tsx'
import '~/index.css'
import 'virtual:uno.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
