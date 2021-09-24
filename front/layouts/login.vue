<template>
  <div>
    <div>导航</div>
    <Nuxt />
    <div>底部信息</div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss">
  .login-container {
    width: 100%;
    min-height: 100%;

    .login-form {
      width: 520px;
      padding: 160px 0;
      margin: 0 auto;
      overflow: hidden;
    }
  }
</style>
