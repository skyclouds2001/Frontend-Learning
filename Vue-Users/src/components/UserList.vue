<template>
    <div>
      <el-button type="primary" @click="dialogVisible=true">添加</el-button>

      <el-table class="table" :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="position" label="头衔"></el-table-column>
        <el-table-column label="时间">
          <template #default="scope">
            {{scope.row.time | dataFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <router-link :to="'/users/' + row.id">详情</router-link>
            &nbsp;
            <a href="#" @click.prevent="onRemove(row.id)">删除</a>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加新用户" :visible.sync="dialogVisible" width="50%" @close="onDialogClosed">
        <el-form :model="form" label-width="100px" :rules="rules" ref="addForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="form.age"></el-input>
          </el-form-item>
          <el-form-item label="头衔" prop="position">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="onAddNewUser">确定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    const checkAge = (_rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error('请填写整数'));
      }
      if (value > 150 || value < 1) {
        return callback(new Error('年龄应在 1 与 150 之间'));
      }
    };
    return {
      userList: [
        {
          name: 'Amy',
          age: 35,
          position: 'Normal People',
          time: new Date().toString(),
          id: 1,
        },
        {
          name: 'Sam',
          age: 23,
          position: 'Normal People',
          time: new Date().toString(),
          id: 2,
        },
        {
          name: 'Jack',
          age: 54,
          position: 'Normal People',
          time: new Date().toString(),
          id: 3,
        },
      ],
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        position: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 20,
            message: '长度在1与20之间',
            trigger: 'blur',
          },
        ],
        age: [
          {
            required: true,
            message: '请输入年龄',
            trigger: 'blur',
          },
          {
            validator: checkAge,
            trigger: 'blur',
          },
        ],
        position: [
          {
            required: true,
            message: '请输入头衔',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  created () {
    // this.getUserList();
  },
  methods: {
    async getUserList () {
      try {
        const { data: res } = await this.$http.get('/api/users');

        if (res.status !== 0) {
          return console.error('ERROR');
        }

        this.userList = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    onDialogClosed () {
      this.$refs.addForm.resetFields();
    },
    onAddNewUser () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('/api/users', this.form);
          if (res.status !== 0) {
            this.$message.error('添加失败');
          } else {
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.getUserList();
          }
        }
      });
    },
    onRemove (id) {
      console.log(this);
      this.$confirm('此操作将永久删除此用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const { data: res } = this.$http.delete(`/api/users/${id}`);
        if (res.status !== 0) {
          this.$message.error('删除失败！');
        } else {
          this.$message.success('删除成功！');
          this.getUserList();
        }
      }).catch(() => {
        this.$message.info('已取消删除！');
      });
    },
  },
};
</script>

<style lang="less" scoped>
.table {
  margin: 15px 0px;
}
</style>
