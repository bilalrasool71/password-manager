import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Site } from './websites-list/websites-list.component';
import { Password } from './password-list/password-list.component';
@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private fireStore: Firestore) {

  }

  AddSite(data: object) {
    const db_instance = collection(this.fireStore, 'sites');
    return addDoc(db_instance, data)
  }

  LoadSites() {
    const db_instance = collection(this.fireStore, "sites");
    return collectionData(db_instance, { idField: 'id' })
  }

  UpdateSite(id: string, data: object) {
    const doc_instance = doc(this.fireStore, 'sites', id);
    return updateDoc(doc_instance, data)
  }

  DeleteSite(id: string) {
    const doc_instance = doc(this.fireStore, 'sites', id);
    return deleteDoc(doc_instance)
  }

  //Password Queries 

  AddPassword(data: Password, site_id: string) {
    const db_instance = collection(this.fireStore, `sites/${site_id}/passwords`);
    return addDoc(db_instance, data)
  }

  LoadPasswords(site_id: string) {
    const db_instance = collection(this.fireStore, `sites/${site_id}/passwords`);
    return collectionData(db_instance, { idField: 'id' });
  }

  UpdatePassowrd(site_id: string, password_id: string, data: object) {
    const doc_instance = doc(this.fireStore, `sites/${site_id}/passwords`, password_id);
    return updateDoc(doc_instance, data);
  }

  DeletePassword(site_id: string, password_id: string) {
    const doc_instance = doc(this.fireStore, `sites/${site_id}/passwords`, password_id);
    return deleteDoc(doc_instance);
  }

}
