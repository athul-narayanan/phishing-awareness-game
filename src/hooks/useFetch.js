import { useCallback, useEffect, useState } from "react";
import axios from "axios";


const appendQueryParams = (url, queryParams) => {
    if (!queryParams) return url;
    const queryString = new URLSearchParams(queryParams).toString();
    return `${url}?${queryString}`;
};

const apiUrl = process.env.REACT_APP_PHISHING_AWARENESS_API;

const useFetch = (url, method, autoFetch = false) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    url = apiUrl + url;

    useEffect(() => {
        if (autoFetch) fetchData();
    }, [autoFetch, method, url]);

    const fetchData = useCallback(
        async (body, queryParams) => {
            const finalUrl = appendQueryParams(url, queryParams);

            const config = { 
                method, 
                url: finalUrl
            };

            setData(null);
            setError(null);

            try {
                setLoading(true);
                if (body) config.data = body;

                const response = await axios(config);
                setData(response.data);
                setError("");
            } catch (err) {
                setError(err?.response?.data?.error || err?.message || "Request failed");
            } finally {
                setLoading(false);
            }
        },
        [url, method]
    );

    return { data, loading, error, fetchData };
};

export default useFetch;
