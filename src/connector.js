import firebase from 'firebase/app';
import 'firebase/firestore';
import config from './config.json';
import handleSetData from './handleSetData';
import handleGetData from './handleGetData';

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
    return this.db.doc(key).set(handleSetData(key, data), option);
  }
  updateData(key, data) {
    return this.db.doc(key).update(data);
  }
  getData(key) {
    return this.db.doc(key).get().then((doc) => {
      if (doc.exists) {
        return handleGetData(key, doc.data());
      }
      return undefined;
    });
  }
  deleteData(key) {
    return this.db.doc(key).delete();
  }
  onDataChange(key, callback) {
    this.db.doc(key).onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      callback(handleGetData(key, doc.data()), source);
    });
  }
  onceDataChange(key, callback) {
    const unsubscribe = this.db.doc(key).onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      callback(handleGetData(key, doc.data()), source);
      unsubscribe();
    });
  }
}
