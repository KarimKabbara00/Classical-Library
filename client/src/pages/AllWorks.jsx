import React, { useEffect } from "react";
import axios from "axios";

function AllWorks() {

    useEffect(() => {
        axios.get("http://localhost:3001/api/allWorks").then(res => {

        }).catch(err => {

        })
    }, [])

    return (
        <div>

        </div>
    )
}

export default AllWorks;