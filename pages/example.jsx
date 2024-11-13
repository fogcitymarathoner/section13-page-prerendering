import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App() {
    const { data, error, isLoading } = useSWR(
        'https://venefish-107fe-default-rtdb.firebaseio.com/sales.json',
        fetcher
    );
    const transformedSales = []
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        })
    }
    console.log(transformedSales)
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
        <div>
            {transformedSales[0].id}
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👁 {data.subscribers_count}</strong>{" "}
            <strong>✨ {data.stargazers_count}</strong>{" "}
            <strong>🍴 {data.forks_count}</strong>
        </div>
    );
}
