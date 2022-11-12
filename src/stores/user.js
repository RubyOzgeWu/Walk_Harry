import { defineStore } from 'pinia'
import { api, apiAuth } from '../boot/axios.js'
import Swal from 'sweetalert2'

export const useUserStore = defineStore({
  // state: () => ({
  //   counter: 0
  // }),

  id: 'user',
  state() {
    return {
      token: '',
      account: ''
    }
  },
  getters: {
    // doubleCount: (state) => state.counter * 2
    isLogin () {
      return this.token.length !== 0
    }
  },
  actions: {
    // increment () {
    //   this.counter++
    // }

    async login (form) {
      // const router = useRouter()
      try {
        const { data } = await api.post('/users/login', form)
        this.token = data.result.token
        this.account = data.result.account
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successfully'
        })
        this.router.push('/Home')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'failed',
          text: (error.isAxiosError && error.response.data) ? error.response.data.message : 'Error occurs'
        })
      }
    },
    async logout () {
      try {
        await apiAuth.delete('/users/logout')
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Logout successfully'
        })
      } catch (_) {
      }
      this.token = ''
      this.account = ''
      this.role = 0
      this.cart = 0
    },
    async addRecord(data) {
      if (this.token.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'failed',
          text: 'Please login first'
        })
        this.router.push('/login')
        return
      }
      try {
        const { data: resData } = await apiAuth.post('/users/addRecord', data)
        this.record = resData.result
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Added to the cart'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'failed',
          text: 'Failed'
        })
      }
    },
    async deleteRecord(data) {
      try {
        await api.patch('users/deleteRecord', data)
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to update the cart'
        })
        return false
      }
    },
    async getUser () {
      if (this.token.length === 0) return
      try {
        const { data } = await apiAuth.get('/users')
        this.account = data.result.account
        this.role = data.result.role
        this.cart = data.result.cart
      } catch (error) {
        this.logout()
      }
    }
  },
  persist: {
    key: 'vite-shop',
    paths: ['token']
  }
})
