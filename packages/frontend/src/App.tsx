import './App.css'
import Account from './components/Account'
import Logo from './components/Logo'
import Watchlist from './components/Watchlist'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className='flex items-center justify-center py-8'>
        <Logo />
      </header>
      <main className="container mx-auto">

        <div className="flex my-12 border-4 border-white">
          <div className="w-1/2 bg-[url(/purple-pattern.svg)]"></div>
          <div className="w-1/2">
            <Watchlist />
          </div>
        </div>

        <div>
          <Account />
        </div>

      </main>
      <Toaster position="bottom-center" toastOptions={{
   className: '',
   iconTheme: {
      primary: '#fff',
      secondary: '#384cff',
    },
   style: {
      borderRadius: '0px',
      maxWidth: 'none',
      background: '#384cff',
     border: '1px solid #384cff',
     padding: '16px',
     color: '#fff',
   },
      }} />
    </div>

  )
}

export default App
