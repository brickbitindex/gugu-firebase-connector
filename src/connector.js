import firebase from 'firebase/app';
import 'firebase/firestore';

import config from './config.json';

export default class Connector {
  constructor() {
    firebase.initializeApp(config);
    this.firebase = firebase;
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true,
    });
  }

  setData(key, data) {
    return this.db.doc(key).set(data);
  }
  updateData(key, data) {
    return this.db.doc(key).update(data);
  }
  getData(key) {
    return this.db.doc(key).get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      return undefined;
    });
  }
  onDataChange(key, callback) {
    this.db.doc(key).onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      callback(doc.data(), source);
    });
  }
  onceDataChange(key, callback) {
    const unsubscribe = this.db.doc(key).onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      callback(doc.data(), source);
      unsubscribe();
    });
  }
}
