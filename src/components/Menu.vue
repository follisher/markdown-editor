<template>
  <div>
    <ul class="sidebar-menu">
      <li><a v-link="{ path: '/' }">index</a></li>
      <li><a v-link="{ path: '/editor' }">editor</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        test: 'test'
      }
    }
  }
</script>

<style>
  .sidebar-menu{
    width:200px;
    border:1px solid #ccc;
    float:left;
  }
</style>