import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  userData: any;

  constructor(private afAuth: AngularFireAuth, public router: Router, public afs: AngularFirestore,) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  /** Metodo para criar usuário no firebase */
  register(email: string, password: string): any {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Método de login
  signIn(email: string, password: string): any {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método de logout
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.clear();
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  /* Setting up user data when sign in with username/password, */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email.trim(),
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
