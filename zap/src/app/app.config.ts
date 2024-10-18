import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"zapgame","appId":"1:890434539045:web:4e2775d115a923685739cc","storageBucket":"zapgame.appspot.com","apiKey":"AIzaSyDRKgmCgJsFBgaJbHQuEqHYsl_acCIKepo","authDomain":"zapgame.firebaseapp.com","messagingSenderId":"890434539045"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
