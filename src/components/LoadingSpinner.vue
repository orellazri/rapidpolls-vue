<template>
	<div class="d-flex justify-content-center" v-if="loading">
		<b-spinner label="Loading..."></b-spinner>
	</div>
</template>

<script>
export default {
	props: ['loading']
}
</script>