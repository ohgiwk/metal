export type Entry = {
  id: string
  title: string
  username: string
  password: string
  note: string
  url: string
  createdAt: number
  updatedAt: number
  group: string
}

export interface Group {
  id: string
  name: string
  createdAt: number
  updatedAt: number
}
