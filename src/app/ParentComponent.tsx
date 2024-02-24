"use client"
import React, { useState } from "react";
import Aside from "./Components/Aside";
import Section from "./Components/Section";


export default function ParentComponent()
{
    const [selectedvideo, setselectedvideo] = useState(null);

    const handleselectvideo = (videoURL: any) => {
        setselectedvideo(videoURL);
    }
    return (
    <>
        <Aside setSelectedVideo={handleselectvideo}></Aside>
        <Section selectedVideo={selectedvideo}></Section>
    </>
    )
}