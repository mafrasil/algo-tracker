import './App.css'
import Account from './components/Account'
import Api from './components/Api';
import Logo from './components/Logo'
import Watchlist from './components/Watchlist'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className='flex items-center justify-center pt-8'>
        <Logo />
      </header>
      <main className="container mx-auto">

        <section className="flex my-6 border-4 border-white">
          <div className="lg:w-1/2 lg:block hidden bg-[url(/purple-pattern.svg)]"></div>
          <div className="w-full lg:w-1/2">
            <Watchlist />
          </div>
        </section>

        <section>
          <Account />
        </section>

        <section className="border-4 border-white my-6">
            <div className="p-8">
                <Api />
            </div>
        </section>

      </main>
      <Toaster position="bottom-center" toastOptions={{
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
