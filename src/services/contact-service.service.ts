import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private db: AngularFireDatabase) { }

  addUsers(contactForm:any){
    return this.db.list('/visitors').push(contactForm);
  }
}
