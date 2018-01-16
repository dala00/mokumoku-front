import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main/main.component';
import { ContactComponent } from './components/main/contact/contact.component';
import { GithubLoginCallbackComponent } from './components/user/github-login-callback/github-login-callback.component';
import { TwitterLoginCallbackComponent } from './components/user/twitter-login-callback/twitter-login-callback.component';
import { MeetingDetailComponent } from './components/meeting/meeting-detail/meeting-detail.component';
import { MeetingSearchComponent } from './components/meeting/meeting-search/meeting-search.component';
import { MeetingAddComponent } from './components/meeting/meeting-add/meeting-add.component';
import { MeetingEditComponent } from './components/meeting/meeting-edit/meeting-edit.component';
import { MeetingPostEditComponent } from './components/meeting/meeting-post-edit/meeting-post-edit.component';
import { MystarsComponent } from './components/meeting/mystars/mystars.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { PageComponent } from './components/page/page.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'github-login-callback', component: GithubLoginCallbackComponent},
  {path: 'twitter-login-callback', component: TwitterLoginCallbackComponent},
  {path: 'page/:id', component: PageComponent},
  {path: 'meeting/search', component: MeetingSearchComponent},
  {path: 'meeting/add', component: MeetingAddComponent},
  {path: 'meeting/:id', component: MeetingDetailComponent},
  {path: 'meeting/edit/:id', component: MeetingEditComponent},
  {path: 'meeting-post/edit/:id', component: MeetingPostEditComponent},
  {path: 'user/edit', component: UserEditComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'mystars', component: MystarsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
