import React, { useState } from "react";
import { Card, Button, Tag } from "antd";
import FilePane from "./FilePane";
import Forks from "./Forks";
import { getSingleGistUrl } from "./config";

export const Panes = (gistData) => {
    const uniData = gistData.gistData;
    const files = uniData.files;
    const fileArr = [];
    for (let file in files) {
        let language = files[file].language;
        if (fileArr.indexOf(language) === -1) {
            fileArr.push(language);
        }
    }

    const noOfFiles = Object.keys(files).length;

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const moreOpen = async (value) => {
        if (value !== "") {
            try {
                const URL = getSingleGistUrl(value);
                const resp = await fetch(URL);
                const data = await resp.json();
                setData(data);
                setShow(true);
            } catch (e) {
                console.log(e);
                setShow(false);
            }
        }
    };

    return (
        <div className="pane">
            <Card className="gistTitle"
                title={uniData.description || "No description"}
                bordered={true}
                extra={
                    <Button type="primary" onClick={() => moreOpen(`/${uniData.id}`)}>See forks</Button>
                }
            >
                <p className="numberOfFiles">
                    {noOfFiles} {noOfFiles > 1 ? "Files" : "File"}
                </p>

                <div>
                    {fileArr.map((language, index) => {
                        return (
                            <Tag color="red" key={index}>{language}</Tag>
                        );
                    })}
                </div>

                <FilePane filelist={files} />

                {show && data !== [] ? <Forks forks={data} /> : null}
            </Card>
        </div>
    );
};

export default Panes;