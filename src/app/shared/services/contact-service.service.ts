import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { ContactForm } from 'src/app/shared/model/contact-form';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private db: AngularFireDatabase) { }

  addUsers(contactForm:any){
    return this.db.list('/visitors').push(contactForm);
  }

  getUsers(){
    return this.db.list('/visitors').snapshotChanges()
    .pipe(map((actions: any[]) => {
      return actions.map(action => {
        const key = action.payload.key;
        const data = action.payload.val();
        return { key, ...data } as ContactForm;
      });
    }));;
  }

  deleteUser(userId: any){
    return this.db.object('/visitors/' + userId).remove();
  }
}
