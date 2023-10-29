import useSWR, { mutate } from 'swr';
import { API_URL, MICROALGO, UPDATE_INTERVAL } from '../utils/constants';
import { useEffect, useRef, useState } from 'react';
import { formatAddress } from '../utils/utilts';
import axios from 'axios';
import toast from 'react-hot-toast';

const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
  ) => {
    const res = await fetch(input, init);
    return res.json();
  };

  type Item = {
    address: string;
    balance: number;
    totalAppsOptedIn: number;
    totalAssetsOptedIn: number;
    totalCreatedApps: number;
    totalCreatedAssets: number;
    created: string;
    updated: string;
  };

  type ItemAddressProps = {
    item: Item;
    removeAddress: (address: string) => void;
  };

const ItemStatCard = ({ value, title }: { value: number, title: string }): JSX.Element => {
    return (
        <div className="group relative flex">
            <span className='bg-white text-purple px-1'>{value}</span>
            <span className='hidden absolute -top-8 bg-black p-1 whitespace-nowrap group-hover:block transform -translate-x-1/2 left-1/2'>{title}</span>
        </div>
    )
}

const ItemAddress = ({ item, removeAddress }: ItemAddressProps): JSX.Element => {
    return (
        <>
        <div className="flex flex-col lg:flex-row gap-x-3 lg:items-center py-1">
            <div className='group flex items-center'>
                {formatAddress(item.address, 10)}
                <button className='bg-black hidden hover:bg-white hover:text-black group-hover:inline text-white px-2 text-xs ml-2' onClick={() => removeAddress(item.address)}>Remove</button>
            </div>
            <span className='ml-auto font-thin'><b>{item.balance / MICROALGO}</b> ALGO</span>
            <div className='hidden lg:flex'>
                <ItemStatCard value={item.totalAppsOptedIn} title='Apps Opted In' />
                <ItemStatCard value={item.totalAssetsOptedIn} title='Assets Opted In' />
                <ItemStatCard value={item.totalCreatedApps} title='Apps Created' />
                <ItemStatCard value={item.totalCreatedAssets} title='Assets Created' />
            </div>
        </div>
        </>
    )
}

const Watchlist = (): JSX.Element => {

    const { data: notifications } = useSWR(API_URL + '/api/watchlist/activity', fetcher, {
        refreshInterval: UPDATE_INTERVAL,
    });
    const previousNotificationCount = useRef<number | null>(null);
    
    useEffect(() => {
        if (notifications) {
            if (previousNotificationCount.current === null) {
                // Initialize the ref with the current number of notifications
                previousNotificationCount.current = notifications.length;
            } else if (notifications.length > previousNotificationCount.current) {
                const newNotifications = notifications.slice(previousNotificationCount.current);
                newNotifications.forEach((notification) => {
                    toast.success(notification);
                });
                previousNotificationCount.current = notifications.length;
            }
        }
    }, [notifications]);
    
    const { data } = useSWR(API_URL + '/api/watchlist', fetcher, {
        refreshInterval: UPDATE_INTERVAL
    });
    const [address, setAddress] = useState('');
    
    const addAddress = async (e) => {
      e.preventDefault();
      try {
        await axios.post(API_URL + '/api/watchlist', { address });
        mutate(API_URL + '/api/watchlist');
        setAddress('');
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
              toast.error(error.response?.data.error || 'Something went wrong');
        } else if (error instanceof Error) {
              toast.error(error.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
        }
      }
    };

    const removeAddress = async (address: string) => {
        try {
            await axios.delete(API_URL + '/api/watchlist', { data: { address } })
            mutate(API_URL + '/api/watchlist');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.error || 'Something went wrong');
            } else if (error instanceof Error) {
                toast.error(error.message || 'Something went wrong');
            } else {
                toast.error('Something went wrong');
            }
        }
    }
    
    return (
        <div className="bg-purple p-8">
            <div className="">
                <h2 className="text-2xl font-bold">Watchlist ({data?.length || 0})</h2>
                {!data || data.length === 0 ? <p>No items yet</p> : data.map((item: Item) => (
                    <ItemAddress key={item.address} item={item} removeAddress={removeAddress} />
                ))}
            </div>
            <form className="flex mt-4 justify-between items-center relative">
                <input type="text" name="address" className="w-full bg-transparent focus:border-black focus:outline-none duration-300 placeholder:text-white border-2 p-3" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <button type="submit" className="absolute right-2 hover:bg-white hover:text-black bg-black px-4 py-1" onClick={addAddress}>Add</button>
            </form>
        </div>
    )
}

export default Watchlist