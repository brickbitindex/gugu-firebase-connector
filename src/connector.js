import firebase from 'firebase/app';
import 'firebase/firestore';
import config from './config.json';

const firebaseUrl = 'firestore.googleapis.com';

export default class Connector {
  constructor() {
    firebase.initializeApp(config);
    this.firebase = firebase;
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true,
    });
  }

  shouldXHRUpdate(url) {
    // 若是firebase的api的请求，则隐藏
    return url.indexOf(firebaseUrl) === -1;
  }
  shouldResourceUpdate(entry) {
    return entry.name.indexOf(firebaseUrl) === -1;
  }

  setData(key, data, option) {
    return this.db.doc(key).set(data, option);
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
