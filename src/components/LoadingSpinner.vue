<template>
	<div class="d-flex justify-content-center" v-if="loading">
		<b-spinner label="Loading..."></b-spinner>
	</div>
</template>

<script>
import { mapState }  from 'vuex';
export default {
	computed: mapState(['loading']),
}
</script>