import { createRoot } from 'react-dom/client'
import App from './components/App/App.tsx'

import './assets/styles/index.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
)