<script setup>

import {ArrowDown} from "@element-plus/icons-vue";
</script>

<template>
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display:
flex">
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">后台管理
    </div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown style="margin-top: 10px">
        <el-button type="primary">
          我的<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

