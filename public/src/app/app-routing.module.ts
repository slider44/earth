import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { LeaveComponent } from './pages/leaves/leave.component';
import { CallbackComponent } from './pages/callback/callback.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '',
    component: LeaveComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: [],

  
})
export class AppRoutingModule { }
