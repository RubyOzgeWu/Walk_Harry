<template>
    <h3><strong>遛遛哈利</strong></h3>
    <div class="row" id="wrap">
      <div id="login" class="col-12">
        <q-form  @submit.prevent='login' class="column">
            <q-input dense ref="inputRef" v-model="LoginForm.account" label="Account" :rules="rules.account" />
            <q-input dense ref="inputRef" v-model="LoginForm.password" :type="isPwd ? 'password' : 'text'" label="password"
                :rules="rules.password">
                <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
            </q-input>
            <q-btn dense type="submit" size="22px" class="q-px-xl q-py-xs" color="secondary" label="Login" />
        </q-form>
    </div>
      <div id="signUp" class="col-12">
        <q-form v-model='valid' @submit.prevent='register' class="row">
            <q-input dense class="col col-12" ref="inputRef" v-model="signUpForm.account" label="Account name" :rules="rules.account" />
            <q-input dense class="col col-12" ref="inputRef" v-model="signUpForm.password" :type="isPwd ? 'password' : 'text'" label="password"
                :rules="rules.password">
                <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
            </q-input>
            <q-btn dense type="submit" size="22px" class="q-px-xl q-py-xs sign-up col-12" color="secondary" label="Sign up" />
        </q-form>
    </div>
    <q-btn color="primary" class="goList" to="/Record">直接進入紀錄表</q-btn>
    </div>

</template>
<style scoped>
h3{
    text-align: center;
    margin-top: 7.5rem;
}
#wrap{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  margin-top: 1.5rem;
  /* border: 1px solid red; */
}
#login{
    /* width: 100%; */
    padding-top: 4rem;
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    /* margin-bottom: 2rem; */
}
.goList{
  margin: auto;
  margin-top: 5rem;
}

</style>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { api } from '../boot/axios.js'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import Swal from 'sweetalert2'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const user = useUserStore()

    const inputRef = ref(null)
    const signUpForm = reactive({
      account: '',
      password: ''
    })
    const LoginForm = reactive({
      account: '',
      password: ''
    })
    const rules = reactive({
      account: [
        v => !!v || 'Account name is required',
        v => (v.length >= 4 && v.length <= 20) || 'account name should be in 4-20 characters',
        v => /^[a-zA-Z0-9]+$/.test(v) || 'account should only include English characters and numbers'
      ],
      password: [
        v => !!v || 'password is required',
        v => (v.length >= 4 && v.length <= 20) || 'password should be in 4-20 characters',
        // .test() 把 v 替換成正則表達式出來的元素
        v => /^[a-zA-Z0-9]+$/.test(v) || 'password should only include English characters and numbers'
      ]
    })

    const register = async () => {
      console.log('ok')
      try {
        await api.post('/users', signUpForm)
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Sign up successfully'
        })
        router.push('/')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'failed',
          text: (error.isAxiosError && error.response.data) ? error.response.data.message : 'error occurs'
        })
      }
    }
    const login = () => {
      user.login(LoginForm)
    }

    return {
      tab: ref('login'),
      LoginForm,
      signUpForm,
      rules,
      inputRef,
      register,
      isPwd: ref(true),
      login,

      reset() {
        inputRef.value.resetValidation()
      }
    }
  }

})
</script>
