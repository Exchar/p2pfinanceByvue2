<template>
	<div>
		<el-button type="danger">{{msg}}</el-button>
	</div>
</template>

<script>
  export default {
    name: "SubmitButton",
		props: {
      msg: String
		}
  }
</script>

<style scoped>
	.el-button{
		font-size: 18px;
	}
</style>
