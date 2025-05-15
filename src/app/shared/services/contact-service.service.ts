import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { ContactForm } from 'src/app/shared/model/contact-form';
import firebase from 'firebase/compat';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';


@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private unreadCount = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCount.asObservable();

  constructor(private db: AngularFireDatabase, private afMessaging: AngularFireMessaging) {
    this.listenForNewMessages();
  }

  /* addUsers(contactForm: any) {
    const messageData: ContactForm = {
      ...contactForm,
      timestamp: Date.now(),
      isRead: false,
      isNew: true
    };
    return this.db.list('/visitors').push(messageData);
  } */

  addUsers(contactForm: ContactForm): Promise<string> {
    const messageData: Omit<ContactForm, 'id'> = {
      ...contactForm,
      timestamp: Date.now(),
      isRead: false,
      isNew: true
    };

    const ref = this.db.list('/visitors').push(messageData);
    return ref.then(item => item.key as string);
  }

  getUsers() {
    return this.db.list('/visitors').snapshotChanges()
      .pipe(map((actions: any[]) => {
        return actions.map(action => {
          const key = action.payload.key;
          const data = action.payload.val();
          return { key, ...data } as ContactForm;
        });
      }));;
  }

  deleteUser(userId: any) {
    return this.db.object('/visitors/' + userId).remove();
  }

  listenForNewMessages() {
    return this.db.list<ContactForm>('/visitors', ref =>
      ref.orderByChild('isRead').equalTo(false)
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.length;
      })
    ).subscribe(count => {
      this.unreadCount.next(count);
    });
  }

  getMessages() {
    return this.db.list<ContactForm>('/visitors').snapshotChanges().pipe(
      map(actions => {
        const mapped = actions.map(a => ({
          id: a.payload.key,
          ...a.payload.val()
        }));
        return mapped;
      })
    );
  }

  markAsRead(messageId: string) {
    return this.db.object(`/visitors/${messageId}`).update({
      isRead: true,
      isNew: false
    });
  }

  getUnreadMessages() {
    return this.db.list<ContactForm>('/visitors', ref =>
      ref.orderByChild('isRead').equalTo(false)
    ).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.val();
          const id = a.payload.key;
          return { id, ...data } as ContactForm;
        })
      )
    );
  }

}
