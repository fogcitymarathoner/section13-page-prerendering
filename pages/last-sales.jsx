import {useEffect, useState} from "react";
import useSWR from "swr";

// const url = 'https://venefish-107fe-default-rtdb.firebaseio.com/sales.json'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LastSalesPage() {
    const [sales, setSales] = useState([]);
    const {data, error} = useSWR('https://venefish-107fe-default-rtdb.firebaseio.com/sales.json', fetcher)
    console.log(data)
    useEffect((data) => {
        console.log('useEffect');
        console.log(data)
        if (data) {
            console.log('data ' + data)
            const transformedSales = []
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                })
            }
            setSales(transformedSales);
        }
    }, [data]);
    /*useEffect(() => {
        setIsLoading(true);
        fetch('https://venefish-107fe-default-rtdb.firebaseio.com/sales.json')
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                const transformedSales = []
                for (const key in data) {
                    transformedSales.push({
                        id: key,
                        username: data[key].username,
                        volume: data[key].volume,
                    })
                }
                console.log(transformedSales)
                setSales(transformedSales);
                console.log(sales)
                setIsLoading(false);
            })
    }, [])*/

    if (error) {
        return <h1>Failed to load</h1>;
    }
    if (!data || !sales) {
        return <h1>Loading...</h1>;
    }
    return (<div>sales{data.s1.username}</div>)
    if (sales.length > 0) {
        return (
            <div>
                <h1>Last Sales</h1>
                <ul>
                    {sales.map((sale) => (
                        <li key={sale.id}>
                            {sale.username} - ${sale.volume}
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return <h1>No Sales</h1>
    }

}