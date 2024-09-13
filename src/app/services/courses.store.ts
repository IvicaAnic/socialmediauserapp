import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Course, SocialmediaUsers, sortCoursesBySeqNo} from '../model/course';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {LoadingService} from '../loading/loading.service';
import {MessagesService} from '../messages/messages.service';


@Injectable({
    providedIn: 'root'
})
export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]);
    private subjectSocialMediaUser = new BehaviorSubject<SocialmediaUsers[]>([]);

    courses$ : Observable<Course[]> = this.subject.asObservable();
    socialMediaUsers$ : Observable<SocialmediaUsers[]> = this.subjectSocialMediaUser.asObservable();


    constructor(
        private http:HttpClient,
        private loading: LoadingService,
        private messages: MessagesService) {

        this.loadAllCourses();
       // this. loadAllSocialMediaUsers();

    }

    private loadAllCourses() {

        const loadCourses$ = this.http.get<Course[]>('/api/courses')
            .pipe(
                map(response => response["payload"]),
                catchError(err => {
                    const message = "Could not load courses";
                    this.messages.showErrors(message);
                    console.log(message, err);
                    return throwError(err);
                }),
                tap(courses => this.subject.next(courses))
            );

        this.loading.showLoaderUntilCompleted(loadCourses$)
            .subscribe();

    }

    private loadAllSocialMediaUsers() {

        const loadSocialMediaUsers$ = this.http.get<SocialmediaUsers[]>('/api/socialmediausers')
            .pipe(
                map(response => response["payload"]),
                catchError(err => {
                    const message = "Could not load socialmediausers";
                    this.messages.showErrors(message);
                    console.log(message, err);
                    return throwError(err);
                }),
                tap(courses => this.subject.next(courses))
            );

        this.loading.showLoaderUntilCompleted(loadSocialMediaUsers$ )
            .subscribe();

    }

    savesocialMediausers(userId:string, changes: Partial<SocialmediaUsers>): Observable<any> {

        const socialMediausers = this.subjectSocialMediaUser.getValue();

        const index = socialMediausers.findIndex(user => user.id == userId);

        const newSocialMediauser: SocialmediaUsers = {
          ...socialMediausers[index],
          ...changes
        };

        const newsocialMediaUsers: SocialmediaUsers[] = socialMediausers.slice(0);

        newsocialMediaUsers[index] = newSocialMediauser;

        this.subjectSocialMediaUser.next( newsocialMediaUsers);

        return this.http.put(`/api/socialmediausers/${userId}`, changes)
            .pipe(
                catchError(err => {
                    const message = "Could not save user";
                    console.log(message, err);
                    this.messages.showErrors(message);
                    return throwError(err);
                }),
                shareReplay()
            );
    }

    saveCourse(courseId:string, changes: Partial<Course>): Observable<any> {

        const courses = this.subject.getValue();

        const index = courses.findIndex(course => course.id == courseId);

        const newCourse: Course = {
          ...courses[index],
          ...changes
        };

        const newCourses: Course[] = courses.slice(0);

        newCourses[index] = newCourse;

        this.subject.next(newCourses);

        return this.http.put(`/api/courses/${courseId}`, changes)
            .pipe(
                catchError(err => {
                    const message = "Could not save course";
                    console.log(message, err);
                    this.messages.showErrors(message);
                    return throwError(err);
                }),
                shareReplay()
            );
    }

    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(courses =>
                    courses.filter(course => course.category == category)
                        .sort(sortCoursesBySeqNo)
                )
            )
    }
    getSocialMediauserById(userid: string): Observable<SocialmediaUsers[]> {
        return this.socialMediaUsers$
            .pipe(
                map(users =>
                    users.filter(user => user.id == userid)
                        
                )
            )
    }

    getAllSocialMediauser(): Observable<SocialmediaUsers[]> {
        return this.socialMediaUsers$;
            
    }

}
