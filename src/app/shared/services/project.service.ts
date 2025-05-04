import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Project } from 'src/app/shared/model/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: AngularFireDatabase) { }

  create(project: any) {
    return this.db.list('/projects').push(project);
  }

  getAll() {
    return this.db.list('/projects').snapshotChanges()
      .pipe(map((actions: any[]) => {
        return actions.map(action => {
          const key = action.payload.key;
          const data = action.payload.val();
          return { key, ...data } as Project;
        });
      }));
  }

  get(projectId: any) {
    return this.db.object('/projects/' + projectId).valueChanges();
  }

  update(projectId: any, project: any) {
    return this.db.object('/projects/' + projectId).update(project);
  }

  delete(projectId: any) {
    return this.db.object('/projects/' + projectId).remove();
  }

  fetchElementData(): Observable<Project[]> {
    return this.db.list<Project>('/projects').valueChanges();
  }


  getInitialProjects(limit: number) {
    return this.db.list('/projects', ref => ref.limitToFirst(limit))
      .snapshotChanges()
      .pipe(
        map((actions: any[]) =>
          actions.map(action => {
            const key = action.payload.key;
            const data = action.payload.val();
            return { key, ...data } as Project;
          })
        )
      );
  }

  getNextProjects(lastKey: string, limit: number) {
    return this.db.list('/projects', ref => ref.orderByKey().startAt(lastKey).limitToFirst(limit + 1))
      .snapshotChanges()
      .pipe(
        map((actions : any[]) => {
          const newActions = actions.slice(1);
          return newActions.map(action => {
            const key = action.payload.key;
            const data = action.payload.val();
            return { key, ...data } as Project;
          });
        })
      );
  }


}

