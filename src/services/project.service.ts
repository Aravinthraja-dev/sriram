import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: AngularFireDatabase) { }

  create(project: any) {
    return this.db.list('/projects').push(project);
  }
  
  getAll(){
    return this.db.list('/projects').snapshotChanges()
    .pipe(map(changes => {
      return changes.map(c => ({key: c.payload.key, data: c.payload.val()}));
    }));
  }

  get(projectId:any){
    return this.db.object('/projects/' + projectId).valueChanges();
  }
}

