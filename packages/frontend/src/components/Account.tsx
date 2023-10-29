import algosdk from 'algosdk';
import { useState } from 'react';

type Response = {
    addr: string;
}

const Account = () => {

    const [account, setAccount] = useState<Response | null>(null);

    const createAccount = () => {
        const res = algosdk.generateAccount();
        setAccount(res);
    }

    return (
        <div className='border-4 bg-green text-black p-6'>
            <h2 className='font-bold text-3xl'>Playground</h2>

            <div className="flex flex-col lg:flex-row gap-x-24 pt-4">
                <div className="flex gap-y-3 flex-col lg:border-r-2 border-black pb-8 lg:pb-0 lg:pr-24">
                    <p className='text-lg'>Create an account, add it to the watchlist, add some new ALGO (use Test Net dispenser) and watch it update!</p>
                    <p>Or simply grab some new addresses from the Testnet Explorer.</p>
                </div>
                <nav className='flex flex-col lg:flex-row justify-center gap-y-6 gap-x-12'>
                    <p className='flex flex-col font-bold'>Test Net dispenser: <a className='hover:underline font-normal' href="https://bank.testnet.algorand.network/" target='_blank'>https://bank.testnet.algorand.network/</a></p>
                    <p className='flex flex-col font-bold'>Algorand Testnet Explorer: <a className='hover:underline font-normal' href="https://testnet.algoexplorer.io/" target='_blank'>https://testnet.algoexplorer.io/</a></p>
                </nav>
            </div>            

            <div className="flex flex-col">
            <button className='bg-black p-3 mt-6 text-white hover:bg-white hover:text-black' onClick={createAccount}>Create Account</button>
            {account && (
                <div>
                    <p className='text-center mt-3'>{account.addr}</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default Account