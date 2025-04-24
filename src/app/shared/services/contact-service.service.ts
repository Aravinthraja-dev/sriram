import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, from, map, mergeMap, Observable, of } from 'rxjs';
import { ContactForm } from 'src/app/shared/model/contact-form';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private lastSeenKey: string | null = null;

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

  listenForNewMessages(): Observable<ContactForm> {
    return this.db.list<ContactForm>('visitors').snapshotChanges().pipe(
      map(actions => {
        const messages = actions.map(a => {
          const key = a.payload.key;
          const data = a.payload.val() as ContactForm;
          return { key, ...data };
        });
        
        if (!this.lastSeenKey) {
          this.lastSeenKey = messages[messages.length - 1]?.key || null;
          return [];
        }
        
        const lastSeenIndex = messages.findIndex(m => m.key === this.lastSeenKey);
        const newMessages = messages.slice(lastSeenIndex + 1);
        
        if (newMessages.length > 0) {
          this.lastSeenKey = newMessages[newMessages.length - 1].key;
        }
        
        return newMessages;
      }),
      filter(messages => messages.length > 0),
      mergeMap(messages => from(messages))
    );
  }
}
