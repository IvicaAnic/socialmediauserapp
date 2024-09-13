

import {Request, Response} from 'express';
import {COURSES, SOCIALMEDIAUSERS} from "./db-data";



export function getAllCourses(req: Request, res: Response) {

/*
    console.log("ERROR loading courses!");
    res.status(500).json({message: 'error occurred.'});
    return;
*/



        setTimeout(() => {

             res.status(200).json({payload:Object.values(COURSES)});

        }, 1500);


}

export function getAllSocialMediaUser(req: Request, res: Response) {

    /*
        console.log("ERROR loading courses!");
        res.status(500).json({message: 'error occurred.'});
        return;
    */
    
    
    
            setTimeout(() => {
    
                 res.status(200).json({payload:Object.values(SOCIALMEDIAUSERS)});
                 console.log("RESPNSE " + res);
    
            }, 1500);
    
    
    }


export function getCourseById(req: Request, res: Response) {

    const courseId = req.params["id"];

    const courses:any = Object.values(COURSES);

    const course = courses.find(course => course.id == courseId);

    res.status(200).json(course);
}