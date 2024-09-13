import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './profile/home.component';
import {FeedViewComponent} from './feedview/feedview.component';
import {CourseComponent} from './course/course.component';
import {LoginComponent} from './login/login.component';
import {SearchLessonsComponent} from './search-lessons/search-lessons.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  },
  {
    path:"search-lessons",
    component: SearchLessonsComponent
  },
  {
    path: 'feedview',
    component: FeedViewComponent
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
