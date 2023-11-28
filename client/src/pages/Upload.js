import React from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from 'axios';

import { useState } from 'react';

const Upload = () => {

    const [ file, setFile ] = useState(null)
    const [ progress, setProgress ] = useState({ started: false, pc: 0})

    const [ title, setTitle ] = useState(null)

    const analyseFileName = (filename) => {
        const patternAter = /_\d{1,3}_/
        const patternBefore = /_[A-Z]\d{1,3}_/
        let title = {}
        title["country"] = filename.split("_")[2].split("-")[0]
        title["tank"] = filename.split(patternBefore)[1].split(patternAter)[0] //à voir si le sigle avant le nom du char est à garder
        title["map"] = filename.split("_").slice(-1)[0].split(".wot")[0]

        return title
    }

    const handleUpload = async () => {
        const fd = new FormData()
        fd.append('file', file)

        const response = await fetch('http://localhost:5000/replay/upload', {
            method: 'POST',
            body: fd
        })

        const result = await response.json()
        setTitle(result.message)


        
        


        // setProgress(prevState => {
        //     return {...prevState,started: true}
        // })
        // axios.post('http://localhost:5000/replay/upload', fd, {
        //     onUploadProgress: (progressEvent) => { setProgress(prevState => {
        //         return {...prevState, pc: progressEvent.progress*100}
        //     }) },
        //     headers: {
        //         "Custom-Header": "value"
        //     }
        // })
        // .then(res => {
        //     setTitle(res.data.headers["Content-Title"])
        //     console.log(res.data)
        // })
        // .catch(err => {
        //     console.log(err)
        // });
    }

    return (
        <div>
            <Logo />
            {/* <Navigation /> */}
            <h1>Select your replay</h1>

            <input type="file" name="file" accept=".wotreplay" onChange={ (e) => { setFile(e.target.files[0]) } }/>
            <br />
            <button onClick={ handleUpload }>Upload</button>

            { progress.started && <progress max="100" value={progress.pc}></progress> }
            <br />
            <br />
            <br />
            { title && <span>{title}</span> }

        </div>
    );
    
    
};

export default Upload;
