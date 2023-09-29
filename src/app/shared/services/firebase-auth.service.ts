import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    public afs: AngularFirestore,
    private db: AngularFireDatabase,
  ) {
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
  addProduct(category: string, price: number) {
    const productsRef = this.db.list(`products/${category}`);

    const newProduct = {
      price: price
    };

    return productsRef.push(newProduct);
  }
  addProduct2(category2: string, productName2: string, price2: number) {
    const productsRef = this.db.list(`products2/${category2}`);

    const newProduct = {
      productName2: productName2,
      price2: price2
    };

    return productsRef.push(newProduct);
  }
  addProductToDatabase(year: string, month: string, category: string, price: number, callback: Function) {
    const newProduct = {
      price: price,
    };
    const productsRef = this.db.database.ref("products");
    productsRef.child(year).child(month).child(category).set(newProduct)
      .then(() => {
        // Chame o callback de sucesso
        callback(null);
      })
      .catch(error => {
        // Chame o callback de erro com o erro recebido
        callback(error);
      });
  }
  getProductsFromFirebase(year: string, month: string, category: string): Observable<any[]> {
    const productsRef = this.db.list(`products/${year}/${month}/${category}`);
    return productsRef.valueChanges(); // Retorna um Observable com os valores dos produtos
  }

  deleteProductFromDatabase(category: string, callback: Function) {
    const productsRef = this.db.database.ref("products");
    productsRef.child(category).remove()
      .then(() => {
        // Chame o callback de sucesso
        callback(null);
      })
      .catch(error => {
        // Chame o callback de erro com o erro recebido
        callback(error);
      });
  }



  addProductToDatabase2(year: string, month: string, category2: string, price2: number, selectedCategory: string, callback: Function) {
    const productData = {
      price: price2,
      selectedCategory: selectedCategory,
    };

    const productsRef = this.db.database.ref("products2");
    productsRef.child(year).child(month).child(category2).set(productData)
      .then(() => {
        // Chame o callback de sucesso
        callback(null);
      })
      .catch(error => {
        // Chame o callback de erro com o erro recebido
        callback(error);
      });
  }

  deleteProductFromDatabase2(category2: string, callback: Function) {
    const productsRef = this.db.database.ref("products2");
    productsRef.child(category2).remove()
      .then(() => {
        // Chame o callback de sucesso
        callback(null);
      })
      .catch(error => {
        // Chame o callback de erro com o erro recebido
        callback(error);
      });
  }



  fetchProductsFromFirebase(year: string, month: string): Observable<any[]> {
    const productsRef = this.db.list(`products/${year}/${month}`);
    return productsRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.val() as any; // Correção aqui
          const key = action.key || ''; // Certifique-se de ter um valor padrão
          return { key, ...data };
        });
      })
    );
  }

  fetchProductsFromFirebase2(): Observable<any[]> {
    const productsRef = this.db.list('products2');
    return productsRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.val() as any;
          const key = action.key || '';
          return { key, ...data };
        });
      })
    );
  }
}
