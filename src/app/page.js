"use client";
import React, { useReducer } from "react";
import Head from "next/head";
import DropFile from "../../components/DropFile.js";
import styles from "./globals.css";

export default function Home() {
    //manage state for if file dropped, as well as the data of files
    const reducer = (state, action) => {
        switch (action.type) {
            case "IN_DND_ZONE":
                return { ...state, inDropZone: action.inDropZone };
            case "ADD_FILE_TO_LIST":
                return { ...state, fileList: state.fileList.concat(action.files) };
            default:
                return state;
        }
    };

    const [data, dispatch] = useReducer(reducer, {
        inDropZone: false,
        fileList: [],
    });
    return (
        <div>
            <Head>
                <title>Drag-Drop File Upload</title>
            </Head>

            <main className='main'>
                <h1 className='title'> Drag and Drop to Upload Files</h1>
                <DropFile data={data} dispatch={dispatch} />
            </main>
        </div>
    );
}
