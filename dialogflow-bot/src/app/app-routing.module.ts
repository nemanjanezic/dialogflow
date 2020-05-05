import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatModule } from './chat/chat.module';
import { ChatComponent } from './chat/chat/chat.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ChatModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
