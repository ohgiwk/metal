import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import firebase from 'firebase'
import CryptoJS from 'crypto-js'

import { Entry, Group } from '../common/Types'
import { AppContext } from '../contexts/AppContext'
import { ListContext } from '../contexts/ListContext'

type State = {
  title: string
  username: string
  password: string
  note: string
  url: string
  group: string
}

const useAPI = () => {
  const { t } = useTranslation()
  const { currentUser, setSnackBar, setIsLoading } = useContext(AppContext)
  const { entries, setEntries, groups, setGroups } = useContext(ListContext)
  const db = firebase.firestore()

  const masterPassword = 'master'

  function encrypt(password: string) {
    return CryptoJS.AES.encrypt(password, masterPassword).toString()
  }

  function decrypt(password: string) {
    return CryptoJS.AES.decrypt(password, masterPassword).toString(
      CryptoJS.enc.Utf8
    )
  }

  async function fetchEntries() {
    const doc = db.collection('passwords').doc(currentUser?.uid)
    const { docs: _entries } = await doc.collection('entries').get()

    const entries = _entries
      .map((d) => ({ id: d.id, ...d.data() } as Entry))
      .map((e) => ({ ...e, password: decrypt(e.password) }))

    setEntries(entries)
  }

  /**
   * エントリー作成
   */
  async function createEntry(state: State) {
    setIsLoading(true)
    const now = new Date().getTime()

    const entry = {
      ...state,
      password: encrypt(state.password),
      createdAt: now,
      updatedAt: now,
    }

    let doc = db.collection('passwords').doc(currentUser?.uid)

    if (!(await doc.get()).exists) {
      await doc.set({})
    }

    doc = await doc.collection('entries').add(entry)

    setIsLoading(false)

    setEntries([...entries, { id: doc.id, ...entry }])
    setSnackBar({ open: true, type: 'success', message: t('CREATED') })
  }

  /**
   * エントリー更新
   */
  async function updateEntry(target: Entry, state: State) {
    setIsLoading(true)

    const targetEntry = {
      ...target,
      ...state,
      password: encrypt(state.password),
      updatedAt: new Date().getTime(),
    }

    await db
      .collection('passwords')
      .doc(currentUser?.uid)
      .collection('entries')
      .doc(targetEntry?.id)
      .update(targetEntry)

    setIsLoading(false)

    setEntries([
      ...entries.map((e) => (e.id === targetEntry?.id ? targetEntry : e)),
    ])
    setSnackBar({ open: true, type: 'success', message: t('UPDATED') })
  }

  async function deleteEntry(entry: Entry) {
    setIsLoading(true)

    await db
      .collection('passwords')
      .doc(currentUser?.uid)
      .collection('entries')
      .doc(entry.id)
      .delete()

    setIsLoading(false)

    setEntries([...entries.filter((e) => e.id !== entry.id)])
    setSnackBar({ open: true, type: 'success', message: t('DELETED') })
  }

  async function fetchGroups() {
    const doc = db.collection('passwords').doc(currentUser?.uid)
    const { docs: _groups } = await doc.collection('groups').get()
    const groups = _groups.map((d) => ({ id: d.id, ...d.data() } as Group))
    setGroups(groups)
  }

  /**
   *
   */
  async function createGroup(name: string) {
    setIsLoading(true)

    const now = new Date().getTime()
    const group = { name, createdAt: now, updatedAt: now }

    let doc = db.collection('passwords').doc(currentUser?.uid)

    if (!(await doc.get()).exists) {
      await doc.set({})
    }

    doc = await doc.collection('groups').add(group)

    setIsLoading(false)

    setGroups([...groups, { id: doc.id, ...group }])
    setSnackBar({ open: true, type: 'success', message: t('CREATED') })
  }

  /**
   *
   */
  async function updateGroup(group: Group, name: string) {
    setIsLoading(true)

    const targetGroup = {
      ...group,
      name,
      updatedAt: new Date().getTime(),
    }

    await db
      .collection('passwords')
      .doc(currentUser?.uid)
      .collection('groups')
      .doc(targetGroup?.id)
      .update(targetGroup)

    setIsLoading(false)

    setGroups([
      ...groups.map((e) => (e.id === targetGroup?.id ? targetGroup : e)),
    ])
    setSnackBar({ open: true, type: 'success', message: t('UPDATED') })
  }

  return {
    fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    fetchGroups,
    createGroup,
    updateGroup,
  }
}

export default useAPI
