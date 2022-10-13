import { reactive } from 'vue'
import moment from 'moment'

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
  if (!data.name) return { ok: false, err: 'Missing course name!' }
  if (data.name.match(/[^a-zA-Z]/)) return { ok: false, err: 'Course Name: English letters only!' }
  if (!data.code) return { ok: false, err: 'Missing course code!' }
  if (!data.code.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)) return { ok: false, err: 'Course Code: Combination of English letters and numbers only!' }
  for (const k in db) {
    if (id == k) continue
    if (data.code == db[k].code && data.name != db[k].name) return { ok: false, err: 'Course code already taken!' }
  }
  if (!data.lang) return { ok: false, err: 'Language not selected!' }
  if (!data.teacher) return { ok: false, err: 'Missing teacher!' }
  if (data.teacher.match(/[^a-zA-Z\s\S]/)) return { ok: false, err: 'Teacher Name: English letters only!' }
  if (!data.date) return { ok: false, err: 'Date not set!' }
  const d = moment(data.date).format('YYYY/MM/DD')
  if (data.date < Date.now() || d == moment(Date.now()).format('YYYY/MM/DD')) return { ok: false, err: 'Time travel forbidden!' }
  for (const k in db) {
    if (id == k) continue
    if (d == moment(db[k].date).format('YYYY/MM/DD')) {
      if (data.teacher == db[k].teacher) return { ok: false, err: 'This teacher already has a course on that day!' }
      if (data.name == db[k].name) return { ok: false, err: 'There is already a same course on that day!' }
    }
  }
  if (!data.location) return { ok: false, err: 'Missing location!' }
  if (!data.duration) return { ok: false, err: 'Duration not set!' }
  if (data.duration <= 0) return { ok: false, err: 'Invalid duration!' }
  for (const k in db) {
    if (id == k) continue
    const x = data.date, y = x + data.duration * 3600e3
    const a = db[k].date, b = a + db[k].duration * 3600e3
    if (y >= a && b >= x) return { ok: false, err: 'This room is already occupied!' }
  }
  db[id] = data
  db[id]._id = id
  return { ok: true }
}

export const del = async (id) => {
  delete db[id]
}
