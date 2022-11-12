<template>
    <div id="wrap">
        <h4 class="text-center"><strong>時間紀錄表</strong></h4>
        <div class="q-pa-md">
            <q-btn color="primary" class="goList" to="/Home">新增時間紀錄</q-btn>
        </div>

        <div class="q-pa-md">
            <q-markup-table v-for="(item,index) in rows" :key="item._id">
                <thead v-if="index===0">
                    <th colspan="4">{{rows[index].account}}</th>
                </thead>
                <tbody v-if="index===0">
                    <tr v-for="record of rows[index].record" :key="record._id">
                        <td>{{record.date}}</td>
                        <td>{{record.timeStart}}</td>
                        <td>{{record.timeEnd}}</td>
                        <td>{{record.total}}</td>
                    </tr>
                </tbody>
            </q-markup-table>
            <div v-for="(item, index) in rows" :key="item._id">
                <div class="total" v-if="index===0">
                    <p>Ruby 本週總時數：{{item.totalTime}} 分鐘</p>
                    <q-btn color="red" class="goList" style="margin-left:.5rem;" @click="deleteIt(item._id)">清除紀錄</q-btn>
            </div>
        </div>
    </div>
    <div class="q-pa-md">
        <q-markup-table v-for="(item,index) in rows" :key="item._id">
            <thead v-if="index===1">
                <th colspan="4">{{rows[index].account}}</th>
            </thead>
            <tbody v-if="index===1">
                <tr v-for="record of rows[index].record" :key="record._id">
                    <td>{{record.date}}</td>
                    <td>{{record.timeStart}}</td>
                    <td>{{record.timeEnd}}</td>
                    <td>{{record.total}}</td>
                </tr>
            </tbody>
        </q-markup-table>
        <div class="total" v-for="(item, index) in rows" :key="item._id">
            <div v-if="index===1">
                <p>Joyce 本週總時數：{{item.totalTime}} 分鐘</p>
                <q-btn color="red" class="goList" style="margin-left:.5rem;" @click="deleteIt(item._id)">清除紀錄</q-btn>
            </div>
        </div>
    </div>

    </div>
</template>
<style scoped>
h4{
    margin-bottom: 1rem;
}

#wrap{
    position: absolute;
    top: 2.5%;
    width: 100%;
}
.total{
    margin-top: 1.5rem;
}
.total p{
    font-size: 1.25rem;
    font-weight: 500;
    color: blue;
}
</style>
<script setup>
import { reactive } from 'vue'
import { api } from '../boot/axios.js'
import Swal from 'sweetalert2'
import { useUserStore } from '../stores/user.js'

// const columns = [
//   {
//     name: 'date',
//     required: true,
//     label: '日期',
//     align: 'left',
//     field: row => row.account,
//     format: val => `${val}`,
//     sortable: true
//   },
//   { name: 'timeStart', align: 'center', label: '開始時間', field: 'calories', sortable: true },
//   { name: 'timeEnd', label: '結束時間', field: 'fat', sortable: true },
//   { name: 'total', label: '總共時間', field: 'carbs' }
// ]

const rows = reactive([])
const user = useUserStore()
// let RubyRows = reactive([])
// let rubyRow = reactive([])

const init = async() => {
  try {
    const { data } = await api.get('/users/all')
    rows.splice(0, rows.length)
    rows.push(...data.result.map(row => {
      row.totalTime = row.record.reduce((a, b) => {
        return a + b.total
      }, 0)
      return row
    }))
    console.log(rows)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
init()

// const deleteIt = async() => {
// //   const idx = rows.findIndex(row => row._id === _id)
//   try {
//     await api.delete('/users/all')
//   } catch (error) {
//     console.log(error)
//     Swal.fire({
//       icon: 'error',
//       title: 'failed',
//       text: error.isAxiosError ? error.response.data.message : error.message
//     })
//   }
// }

const deleteIt = async(_id) => {
  const idx = rows.findIndex(row => row._id === _id)
  console.log(rows[idx].record)
  await user.deleteRecord({ record: rows[idx].record, userId: rows[idx]._id })

//   if (rows[idx].record) {
//     await user.deleteRecord({ record: rows[idx].record })
//   }
}
</script>
