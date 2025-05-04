import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { ImageForm } from "../model/image-form";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ImageService {

    constructor(private db: AngularFireDatabase) { }

    create(image: ImageForm) {
        return this.db.list('/allImages').push(image);
    }

    getAll() {
        return this.db.list('/allImages').snapshotChanges()
            .pipe(map((action: any[]) => {
                return action.map(action => {
                    const key = action.payload.key;
                    const data = action.payload.val();
                    return { key, ...data } as ImageForm
                })
            }))
    }

    get(imageId: any) {
        return this.db.object('/allImages/' + imageId).valueChanges();
    }

    update(imageId: any, image: any) {
        return this.db.object('/allImages/' + imageId).update(image);
    }

    delete(imageId: any) {
        return this.db.object('/allImages/' + imageId).remove();
    }

}