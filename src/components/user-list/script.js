
export default {
  data () {
    return {
      foo: '',
      tableData: [],
      currentPage: 1,
      pageSize: 1,
      totalSize: 1,
      inputText: '',
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      addUserForm: {
        username: '',
        email: '',
        mobile: '',
        password: ''
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 页面一开始就渲染用户列表
  async created () {
    this.loadUserlist(1)
  },
  methods: {
    /*
    每页显示多少条
     */
    handleSizeChange (pageSize) {
      // 将data中的pageSize更新为点击时的数据
      this.pageSize = pageSize
      this.loadUserlist(1)
      // this.currentPage = 1
    },

    /*
    当前是第几页
     */
    async handleCurrentChange (val) {
      this.loadUserlist(val)
      // this.currentPage = val
    },

    /*
    打开页面 渲染用户列表
     */
    async loadUserlist (pagenum) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum,
          pagesize: this.pageSize,
          query: this.inputText
        }
      })
      const {data} = res.data
      this.tableData = data.users
      this.totalSize = data.total
    },

    /*
    点击搜索用户
     */
    async handleSearch () {
      this.loadUserlist(this.currentPage)
    },

    /*
    添加用户
     */
    async handleAddUser (formData) {
      // 验证
      this.$refs[formData].validate(async (val)=> {
        if (!val) {
          return false
        }
        // 验证通过 发送请求
        const res = await this.$http.post('/users',this.addUserForm)
        const {meta} = res.data
        if (meta.status === 201) {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          for (let key in this.addUserForm) {
            this.addUserForm[key] = ''
          }
        }
      })
    },

    /*
    根据id获取用户
     */
    async getUserById (user) {
      const {id:userId} = user
      const res = await this.$http.get(`/users/${userId}`)
      const {data} = res.data
      if (res.data.meta.status === 200) {
        this.editUserForm = data
      }
      this.dialogEditFormVisible = true
    },

    /*
    编辑用户
     */
    async handleEditUser (formName) {
      this.$refs[formName].validate(async (val) => {
        if (!val) {
          return false
        }
        const res = await this.$http.put(`/users/${this.editUserForm.id}`,this.editUserForm)
        console.log(res)
        console.log(this.editUserForm)
        const {status} = res.data.meta
        if (status === 200) {
          this.loadUserlist(this.currentPage)
          this.dialogEditFormVisible = false
        }
      })
    },

    /*
    删除用户
     */
    async handleDeleteUser (user) {
      const {id:userId} = user
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${userId}`)
        if (res.data.meta.status === 200) {
          // 重新加载页面
          this.loadUserlist(this.currentPage)
          this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    /*
    更改用户状态
     */
    async handleChangeState (state) {
      console.log(1)
    }
  }
}
