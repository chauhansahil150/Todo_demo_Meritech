import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { IntlProvider } from './providers/languageProvider.tsx'
import BeautifulDnd from './pages/BeautifulDnd.tsx'
import BeautifulDnd2 from './pages/BeautifulDnd2.tsx'
import TailwindDemo from './components/tailwinddemo/TailwindDemo.tsx'
import EmployeeTable from './components/antdesign/EmployeeTable.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <IntlProvider locale='en'>
      {/* <TailwindDemo /> */}
    <App />
    {/* <EmployeeTable /> */}
    {/* <BeautifulDnd /> */}
    {/* {<BeautifulDnd2 />} */}
    </IntlProvider>
  // </React.StrictMode>,
)
