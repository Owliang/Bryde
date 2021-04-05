import React, { useState, useEffect } from 'react'
import axios from "axios";

const myCourseURL = "/myCourse";

const initialCourseData = {
    tutor: "",
    name: "test empty",
    subject: "",
    description: "",
    price: "",
    link: "",
};

const GetCourseData = ((props) => {
    console.log("Calling GetCoureData")
    const { CID, mode, setAlert, setData } = props;

    if (mode === "edit") {
        axios
            .get("http://localhost:4000/course", { id: CID }, { crossdomain: true })
            .then((response) => {
                console.log("response: ", response);
                var isSuccess = response.data.result;
                if (isSuccess) {
                    console.log("Found");
                    return(response.data.data)
                } else {
                    console.log("Not Found");
                    return(initialCourseData)
                }
            })
            .catch((err) => {
                /*setAlert({
                    title: "Failed to connect the server",
                    open: true,
                    message:
                        "An error occured during sending results to server, Please try again later and make sure that server is on.",
                    submessage: err.name + ": " + err.message,
                    optionMessage: "Try Again Later",
                    //optionRefTo: myCourseURL
                });*/
                console.error("catch error from getCourseData");
                return(initialCourseData)
            });

            return({...initialCourseData, name: "test Edit"});
    }else{
        return initialCourseData
    }
});

export default GetCourseData
