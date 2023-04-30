import { useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import CryptoJS from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'

import { Entry } from '../common/Types'
import { AppContext, ListContext } from '../contexts'

type State = {
  title: string
  username: string
  password: string
  note: string
  url: string
  group: string
}

const masterPassword = 'master'

// 暗号化
function encrypt(value: string, masterPassword: string) {
  return CryptoJS.AES.encrypt(value, masterPassword).toString()
}

// 復号化
function decrypt(value: string, masterPassword: string) {
  return CryptoJS.AES.decrypt(value, masterPassword).toString(CryptoJS.enc.Utf8)
}

const useAPI = () => {
  const { currentUser, setIsLoading } = useContext(AppContext)
  const { entries, setEntries } = useContext(ListContext)
  const db = firebase.firestore()

  /**
   * エントリー取得
   */
  async function fetchEntries() {
    const doc = db.collection('passwords').doc(currentUser?.uid)
    const { docs } = await doc.collection('entries').get()

    if (docs[0]) {
      setEntries(
        // JSON.parse(docs[0].data()['value']) as Entry[]
        JSON.parse(decrypt(docs[0].data()['value'], masterPassword)) as Entry[]
      )
    }
  }

  /**
   * エントリー保存
   */
  async function saveEntries(entries: Entry[]) {
    setIsLoading(true)

    // const value = { value: JSON.stringify(entries) }
    const value = { value: encrypt(JSON.stringify(entries), masterPassword) }

    const userDocRef = db.collection('passwords').doc(currentUser?.uid)
    const entryColRef = userDocRef.collection('entries')
    const { docs } = await entryColRef.get()

    if (!docs[0]) {
      await entryColRef.doc().set(value)
    } else {
      await entryColRef.doc(docs[0].id).update(value)
    }

    setIsLoading(false)
  }

  /**
   * エントリー作成
   * @param state
   */
  function createEntry(state: State): Entry[] {
    const now = new Date().getTime()
    const entry = { id: uuidv4(), ...state, createdAt: now, updatedAt: now }
    const newEntries = [...entries, entry]

    setEntries(newEntries)
    return newEntries
  }

  /**
   * エントリー更新
   * @param target
   * @param state
   */
  function updateEntry(target: Entry, state: State): Entry[] {
    const targetEntry = {
      ...target,
      ...state,
      updatedAt: new Date().getTime(),
    }

    const newEntries = [
      ...entries.map((e) => (e.id === targetEntry.id ? targetEntry : e)),
    ]
    setEntries(newEntries)
    return newEntries
  }

  /**
   * エントリー削除
   *
   * @param {Entry} entry
   */
  function deleteEntry(entry: Entry) {
    // setIsLoading(true)
    // await db
    //   .collection('passwords')
    //   .doc(currentUser?.uid)
    //   .collection('entries')
    //   .doc(entry.id)
    //   .delete()
    // setIsLoading(false)
    // setEntries([...entries.filter((e) => e.id !== entry.id)])
    // setSnackBar({ open: true, type: 'success', message: t('DELETED') })
  }

  return {
    fetchEntries,
    saveEntries,
    createEntry,
    updateEntry,
    deleteEntry,
  }
}

export default useAPI
