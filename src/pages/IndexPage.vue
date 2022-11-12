<template>
    <h4 class="text-center"><strong>新增時間紀錄</strong></h4>
    <div id="wrap">
        <q-form v-model="valid" @submit.prevent='submit'>
            <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
            </q-input>
            <!-- timeStart -->
            <q-input filled v-model="timeStart" mask="time" :rules="['time']">
                <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="timeStart">
                        <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-time>
                    </q-popup-proxy>
                </q-icon>
                </template>
            </q-input>
            <!-- timeEnd -->
            <q-input filled v-model="timeEnd" mask="time" :rules="['time']">
                <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="timeEnd">
                        <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-time>
                    </q-popup-proxy>
                </q-icon>
                </template>
            </q-input>
            <!-- total -->
            <q-input filled v-model.number="total" type="number" label="total time"/>
            <q-btn color="secondary" type="submit" class="submit">確定新增</q-btn>
        </q-form>
        <q-btn color="primary" class="goList" to="/Record">查看紀錄</q-btn>
    </div>

</template>
<style scoped>
h4{
    margin-top: 5rem;
}
#wrap{
    width: 80%;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
}

#wrap .submit{
    margin-top: 1.5rem;
}

.goList{
margin-top: 2rem;
}

</style>
<script setup>
import { ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

// const route = useRoute()
// const router = useRouter()
const user = useUserStore()
const date = ref('2022/01/01')
const timeStart = ref('10:10')
const timeEnd = ref('10:10')
const total = ref(0)

// const init = async() => {
//   try {
//     const { data } = await apiAuth.get('/users/all')
//     test.push(...data.result)
//     console.log(data.result.record)
//   } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: '失敗',
//       text: error.isAxiosError ? error.response.data.message : error.message
//     })
//   }
// }
// init()

const submit = () => {
  user.addRecord({
    date: date.value,
    timeStart: timeStart.value,
    timeEnd: timeEnd.value,
    total: total.value
  })
}

</script>
