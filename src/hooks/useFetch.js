import { useEffect, useState } from "react";

export default function useFetchData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [url]);

    return [data, loading, error];
}