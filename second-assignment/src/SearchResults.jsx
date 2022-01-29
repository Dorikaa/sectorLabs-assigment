import React from "react";
import { Alert } from "antd";
import Panes from "./Panes";

export const SearchResults = (data, username) => {
    const userData = data.data;
    return (
        <>
            {username !== null && userData.length !== 0 ? (
                <>
                    <Alert
                        message={`${data.username}'s gists`}
                        description={`${userData.length} gists found`}
                        type="success"
                        showIcon
                        style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <ul className="commingData">
                        {userData.map((gist, index) => {
                            return <Panes key={gist.id} gistData={gist} />
                        })}
                    </ul>
                </>
            ) : null}
        </>
    );
};

export default SearchResults;