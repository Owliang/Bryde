import React , { Component, useState } from "react";
import Course from './Course'
import {CourseData} from '../Course/CourseData'

export default class CourseList extends Component{
    state = {
        courses:CourseData
    }
    

    render(){
        const {courses}=this.state;
        
        return(
            <div className="couresList">
                {courses.map(course=>(
                    <Course key={course.id} course={course}/>
                ))}
            </div>       
                    
        )
    }

}