import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FriendsComponent } from './friends/friends.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';




const routes: Routes = [
  {path:"signIn",component:AuthentificationComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"acceuil",component:AcceuilComponent},
  {path:"profile/:id",component:ProfileComponent},
  {path:"settings",component:SettingsComponent},
  {path:"messages",component:MessagesComponent},
  {path:"friends/:id",component:FriendsComponent},
  

  {path:"",redirectTo:"/acceuil",pathMatch:'full'},
  

];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
     useHash: false 
  }, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
