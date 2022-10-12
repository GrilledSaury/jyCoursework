<script setup>
import { watch } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import CourseEditor from '../components/CourseEditor.vue'
import { draft, get } from '../state.js'
import moment from 'moment'

let courses = $ref({})
let show = $ref(false)

async function init () {
  courses = await get()
}

init()

function updateDraft (o) {
  if (o.new) {
    for (const k in draft) delete draft[k]
    draft.new = true
    return
  }
  draft.new = false
  for (const k in o) draft[k] = o[k]
}

watch($$(show), () => {
  init()
})

</script>

<template>
  <div class="px-10 py-8 bg-gray-100 min-h-screen flex flex-col items-center">
    <div class="text-4xl font-bold m-8">Open Courses</div>
    <div class="bg-white rounded-md p-4 overflow-x-scroll">
      <table class="table-auto text-center">
        <thead class="text-gray-600 border-b">
          <tr>
            <th class="py-1 px-2 text-xl border-r">Course Name</th>
            <th class="py-1 px-2 text-xl border-r">Course Code</th>
            <th class="py-1 px-2 text-xl border-r">Language</th>
            <th class="py-1 px-2 text-xl border-r">Teacher</th>
            <th class="py-1 px-2 text-xl border-r">Date</th>
            <th class="py-1 px-2 text-xl border-r">Time</th>
            <th class="py-1 px-2 text-xl border-r">Location</th>
            <th class="py-1 px-2 text-xl">Duration</th>
          </tr>
        </thead>
        <tbody class="bg-gray-100">
          <tr v-for="c in courses" class="border-b all-transition hover:bg-blue-100 cursor-pointer" @click="updateDraft(c); show = true">
            <td class="py-1 px-2 border-r">{{ c.name }}</td>
            <td class="py-1 px-2 border-r font-mono">{{ c.code }}</td>
            <td class="py-1 px-2 border-r">{{ c.lang }}</td>
            <td class="py-1 px-2 border-r">{{ c.teacher }}</td>
            <td class="py-1 px-2 border-r font-mono">{{ moment(c.date).format('YYYY/MM/DD') }}</td>
            <td class="py-1 px-2 border-r font-mono">{{ moment(c.date).format('HH:mm') }}</td>
            <td class="py-1 px-2 border-r">{{ c.location }}</td>
            <td class="py-1 px-2 font-mono">{{ c.duration }}h</td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-center m-2">
        <button class="flex items-center all-transition bg-green-500 font-bold text-white rounded-full shadow hover:shadow-md mx-3 my-1 px-2 py-1 w-32" @click="if (!draft.new) updateDraft({ new: true }); show = true">
          <PlusIcon class="w-5 m-1" />
          Add Class
        </button>
      </div>
    </div>
    <CourseEditor v-model="show" />
  </div>
</template>