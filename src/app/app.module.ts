import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthentificationComponent } from './authentification/authentification.component';
import { SignUpComponent } from './sign-up/sign-up.component';

//import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { HeaderComponent } from './header/header.component';
//import { PayementUpdateComponent } from './settings/payement-update/payement-update.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { AcountLocationComponent } from './settings/acount-location/acount-location.component';
import { ContactSettingsComponent } from './settings/contact-settings/contact-settings.component';
import { DeleteAcountComponent } from './settings/delete-acount/delete-acount.component';
import { InfoUpdateComponent } from './settings/info-update/info-update.component';
import { NameSettingsComponent } from './settings/name-settings/name-settings.component';
import { PasswordUpdateComponent } from './settings/password-update/password-update.component';
import { PayementUpdateComponent } from './settings/payement-update/payement-update.component';
import { SettingsComponent } from './settings/settings.component';

import {initializeApp,provideFirebaseApp } from '@angular/fire/app'
import { provideStorage,getStorage} from '@angular/fire/storage'
import { environment } from 'src/environments/environment';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { RequestsListComponent } from './friends/requests-list/requests-list.component';
import { RequestsSentListComponent } from './friends/requests-sent-list/requests-sent-list.component';
import { BlockedListComponent } from './friends/blocked-list/blocked-list.component';
import { SuggestionListComponent } from './friends/suggestion-list/suggestion-list.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchListComponent } from './friends/search-list/search-list.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    SignUpComponent,
    AcceuilComponent,
    ProfileComponent,
    HeaderComponent,
    SettingsComponent,
    NameSettingsComponent,
    ContactSettingsComponent,
    InfoUpdateComponent,
    PasswordUpdateComponent,
    DeleteAcountComponent,
    AcountLocationComponent,
    PayementUpdateComponent,
    FriendsComponent,
    FriendsListComponent,
    RequestsListComponent,
    RequestsSentListComponent,
    BlockedListComponent,
    SuggestionListComponent,
    MessagesComponent,
    SearchListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    Ng2TelInputModule,
    BrowserAnimationsModule,
    provideFirebaseApp(()=> initializeApp(environment.firebaseConfig)),
    provideStorage(()=> getStorage()),
   

    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

