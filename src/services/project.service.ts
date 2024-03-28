import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: AngularFireDatabase) { }

  saveData(data: any) {
    return this.db.list('/projects').push(data)
            .then(() => {
              console.log('Data saved successfully!');
            })
            .catch(error => {
              console.error('Error saving data:', error);
            })
  }
}

