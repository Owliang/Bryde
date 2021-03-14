import React , { Component, useState } from "react";

export default class Course extends Component{
    
    render(){
        const {id,name,img,subject,desc,price} = this.props.course
        return(
            <div className="course">
                <div className = "img-container">
                    <img src={img} width ="450px" hight="450px" />
                </div>
                <div className="course-info">
                    <h2>Course name : {name}</h2>
                    <p>Subject : {subject}</p>
                    <p>description : {desc}</p>
                    <p>course fee : {price}</p>
                </div>
            </div>           
        );
    }
}