import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collectionCount,
  collectionData,
  CollectionReference,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreStatsService {
  private fireStore: Firestore = inject(Firestore);
  tournamentCollection: CollectionReference;
  item$: Observable<any>;

  getTournamentCollection(): Observable<any> {
    const tournament = collection(this.fireStore, 'tournaments');
    this.item$ = collectionData(tournament);
    return this.item$;
  }

  async createRobot(name: string, color: string, age: string) {
    const docRef = await getDoc(collection(this.fireStore, 'robots') as any);
    console.log('Document written with ID: ', docRef.id);
  }
}
