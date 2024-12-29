<template>
  <div>
    <div style="margin: 10px 5px">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button>其他</el-button>
    </div>
    <!--搜索框-->
    <div style="margin: 10px 5px">
      <el-input v-model="search" style="width: 240px" placeholder="请输入关键字"/>
      <el-button type="primary" style="margin-left: 10px" @click="list">查找</el-button>
    </div>
    <!--表格-->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" sortable/>
      <el-table-column prop="name" label="家居名"/>
      <el-table-column prop="maker" label="制作商"/>
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="sales" label="销量"/>
      <el-table-column prop="stock" label="库存"/>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit2(scope.row.id)">编辑</el-button>
          <el-popconfirm title="确认删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--表单-->
    <el-dialog title="提示" v-model="dialogVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="家居名" prop="name">
          <el-input v-model="form.name" style="width: 80%"/>
          {{this.validMsg.name}}
        </el-form-item>
        <el-form-item label="厂商" prop="maker">
          <el-input v-model="form.maker" style="width: 80%"/>
          {{this.validMsg.maker}}
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" style="width: 80%"/>
          {{this.validMsg.price}}
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input v-model="form.sales" style="width: 80%"/>
          {{this.validMsg.sales}}
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="form.stock" style="width: 80%"/>
          {{this.validMsg.stock}}
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false;">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--分页导航-->
    <div style="margin: 10px 0">
      <el-pagination
          @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2,4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      validMsg : {},
      //表格数据
      tableData: [],
      search: '',
      //表单数据
      form: '',
      dialogVisible: false,
      //分页
      currentPage: 1,
      pageSize: 2,
      total: 0,
      //表单验证
      rules: {
        name: [
          {required: true, message: '请输入称家居名', trigger: 'blur'}
        ],
        maker: [
          {required: true, message: '请输入称制造商', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'blur'},
          {
            pattern: /^(([1-9]\d*)|(0))(\.\d+)?$/,
            message: '请输入数字',
            trigger: 'blur'
          }
        ],
        sales: [
          {required: true, message: '请输入销量', trigger: 'blur'},
          {
            pattern: /^(([1-9]\d*)|(0))$/,
            message: '请输入数字',
            trigger: 'blur'
          }
        ],
        stock: [
          {required: true, message: '请输入库存', trigger: 'blur'},
          {
            pattern: /^(([1-9]\d*)|(0))$/,
            message: '请输入数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    add() {
      //将上次后端返回的错误信息删除
      this.validMsg = {}
      this.form = {}
      this.dialogVisible = true
      //重置上次表单校验信息
      this.$refs['form'].resetFields()
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true

    },
    handleEdit2(id) {
      request.get('/api/furn/' + id).then(res => {
        this.form = res.data
        this.dialogVisible = true
      })
    },
    save() {
      if (this.form.id) {
        request.put('/api/update', this.form).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
          this.dialogVisible = false
          this.list()
        })
      } else {
        // request.post('/api/save', this.form).then(res => {
        //   this.dialogVisible = false
        //   this.list()
        // })
        //这里添加与表单的关联
        this.$refs['form'].validate((valid) => {
          if (valid) {
            request.post('/api/save', this.form).then(res => {

              if (res.code === '200') {
                this.dialogVisible = false
                this.list()
              }else if(res.code === '400'){
                this.validMsg.name = res.data.name
                this.validMsg.maker = res.data.maker
                this.validMsg.price = res.data.price
                this.validMsg.sales = res.data.sales
                this.validMsg.stock = res.data.stock
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '请输入完整信息'
            })
            return false
          }
        })
      }
    },
    list() {
      request.get('/api/furnsByConditionPage2', {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleDelete(id) {
      request.delete('/api/delete/' + id).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
        this.list()
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.list()
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.list()
    }
  },
  created() {
    this.list()
  }
}
</script>
