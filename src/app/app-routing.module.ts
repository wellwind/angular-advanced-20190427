import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    component: MainComponent,
    loadChildren: './posts/posts.module#PostsModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
