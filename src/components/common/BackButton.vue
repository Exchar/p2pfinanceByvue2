<template>
	<div>
		<el-button type="primary">{{msg}}</el-button>
	</div>
</template>

<script>
  export default {
    name: "BackButton",
		props: {
      msg: String
		}
  }
</script>

<style scoped>
	.el-button{
		font-size: 18px;
		background-color: white;
		color: grey;
		border-color: transparent;
	}
</style>
