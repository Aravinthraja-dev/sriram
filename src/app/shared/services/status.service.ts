import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  observableStatus$!: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.observableStatus$ = this.db.list('/status', (ref) => ref.orderByChild('name')).snapshotChanges();
   }

  getStatus(){
    return this.observableStatus$.pipe(
      map((changes) => {
        return changes.map((c: any) => ({
          $key: c.payload.key,...c.payload.val()
        }));
      })
    );
  }
}
