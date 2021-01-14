import firebase from 'firebase'
import firebaseConfig from '../configs/firebaseConfig.json'

export function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  }
}
