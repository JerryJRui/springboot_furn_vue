<script setup>

</script>

<template>
  <div>
    <h5 class="mb-2"></h5>
    <el-menu
        style="width: 200px"
        default-active="2"
        class="el-menu-vertical-demo"
        router="router"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>导航1</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="/about">选项1</el-menu-item>
          <el-menu-item index="/">选项2</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>导航2</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>导航3</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>导航4</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>

</style>
