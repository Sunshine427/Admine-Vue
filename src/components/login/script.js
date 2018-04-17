import {saveUserInfo} from '@/assets/js/auth.js'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // 1 获取表单数据
      // 2 表单校验
      // 3 发送请求
      // 4 根据返回的数据做交互
      const ret = await this.$http.post('/login', this.userForm)
      const {data} = ret
      console.log(ret)
      if (data.meta.status === 200) {
        // 登陆成功 将token存储到localstorage中
       saveUserInfo(data.data)
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
