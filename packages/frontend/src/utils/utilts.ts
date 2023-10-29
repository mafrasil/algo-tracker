export const formatAddress = (address: string, digits = 6) => {
    return `${address.slice(0,digits)}...${address.slice(digits * -1)}`
}