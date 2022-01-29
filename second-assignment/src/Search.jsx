import React, { useState } from "react";
import { Input, Alert, Spin } from "antd";
import { SearchResults } from "./SearchResults";
import { getGistsForUser } from "./config";

const { Search } = Input;

export const SearchWindow = () => {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const onSearch = async (username) => {
        const usersname = username.trim();
        setUsername(usersname);
        setLoading(true);
        if (usersname && usersname !== "") {
            try {
                const URL = getGistsForUser(usersname);
                const resp = await fetch(URL);
                const data = await resp.json();
                setData(data);
                setLoading(false);
                setError(false);
            } catch (e) {
                setLoading(false);
                setError(true);
            }
        } else if (usersname === "") {
            setLoading(false);
            setError(true);
        }

        setLoading(false);
    };

    return (
        <>
            <Search className="searchBar"
                placeholder="Search"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            {loading ? <Spin tip="loading..." style={{ margin: 10 }} /> : null}

            {username !== "" && data && !error ? (
                <SearchResults data={data} username={username} />
            ) : null}

            {username && data.lentgh === 0 ? (
                <Alert
                    message="Error"
                    description="No data for this user"
                    type="error"
                    showIcon
                    style={{ marginTop: 10 }}
                />
            ) : null}

            {username === '' ? (
                <Alert
                    message="Error"
                    description="Enter a valid username"
                    type="error"
                    showIcon
                    style={{ marginTop: 10 }}
                />
            ) : null}
        </>
    );
};

export default SearchWindow;