import { API_URL } from "../utils/constants";

type ApiItemProps = {
    method: string;
    path: string;
    params?: string;
    description: string;
}

const ApiItem = ({ method, path, params, description }: ApiItemProps): JSX.Element => {
    return (
        <li className="flex lg:flex-row flex-col lg:gap-x-8">
            <code><span className='bg-pink-700 px-1'>{method}</span> {path}</code>
            <p>{description}</p>
            {params && <span className='text-sm text-teal-700 lg:ml-2'>params: {params}</span>}
        </li>
    )
}

const Api = () => {
    return (
        <>
        <h2 className="text-2xl text-right font-bold">API</h2>
        <p className="text-right text-sm font-light">{API_URL}</p>
        <ul className="list-disc flex flex-col gap-y-4 mt-8">
        <ApiItem method="GET" path="/api/watchlist" description="Get the watchlist" />
        <ApiItem method="POST" path="/api/watchlist" description="Add a new address to the watchlist" params="address (string)" />
        <ApiItem method="DELETE" path="/api/watchlist" description="Remove an address from the watchlist" params="address (string)" />
        <ApiItem method="GET" path="/api/watchlist/activity" description="Get the activity feed" />
        </ul>
        </>
    )
}

export default Api