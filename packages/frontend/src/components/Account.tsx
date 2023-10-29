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
            <p className='text-lg'>Create an account, add it to the watchlist, add some new ALGO and watch it update!</p>
            <p>Test Net dispenser: <a className='hover:underline' href="https://bank.testnet.algorand.network/" target='_blank'>https://bank.testnet.algorand.network/</a></p>
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