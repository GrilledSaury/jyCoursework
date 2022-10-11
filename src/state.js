import { reactive } from 'vue'

const db = {
  testid: {
    _id: 'testid',
    name: 'Sample',
    code: 'SP000',
    lang: 'English',
    teacher: 'Jingyuan Zhang',
    date: 1665497437398,
    location: 'Research Building Lecture Hall',
    duration: 3
  }
}

export const draft = reactive({ new: true })

export const get = async () => ({ ...db })

export const put = async (id, data) => {
  db[id] = data
  db[id]._id = id
}

export const del = async (id) => {
  delete db[id]
}
