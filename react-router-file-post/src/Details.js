import React from "react";
import { useFetcher, useLoaderData } from "react-router-dom";

export async function loader() {
    return fetch('http://localhost:8080/fileList').then(r => r.json())
}
export async function action({request}) {
    const formData = await request.formData();
    console.log("Formdata in action", formData) // here the file is only the name
    await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData
    });
    return {success: true};
}

export function Details() {
    const fileList = useLoaderData();
    const fetcher = useFetcher();

    const handleUpload = (ev) => {
        const file =  ev.target.files[0];
        console.log("File from handle upload", file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pw', "InRealityComesFromSomeOtherInput");
        console.log("Formdata in handle upload", formData); // here the file is the file object
        fetcher.submit(formData, {method: 'POST', action: '/details', encType: 'multipart/form-data'})
    }

    return (
        <>
        <ul>
            {fileList.map(f => <li key={f}><a href={`http://localhost:8080/files/${f}`}>{f}</a></li>)}
        </ul>
        <input type="file" id="file" name="file" onChange={handleUpload} />
        </>
    );
}