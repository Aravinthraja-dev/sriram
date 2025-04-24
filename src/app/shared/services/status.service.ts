import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, catchError, map, of } from 'rxjs';
import { Status } from '../model/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private db: AngularFireDatabase) { }

  getStatus(): Observable<Status[]>{
    return this.db.list('/status', (ref) => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe(
      map((changes) => {
        return changes.map((c: any) => ({
          $key: c.payload.key,
          ...c.payload.val() as Object
        })) as Status[]
      }),
      catchError(error => {
        console.error('Error fetching status ', error);
        return of([] as Status[])
      })
    )
  }
}
