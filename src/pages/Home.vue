<template>
	<div>
		<b-row>
			<b-col>
				<h2>Welcome to Rapid Polls! 🙋🏻</h2>
			</b-col>
		</b-row>

		<hr>
		
		<CreatePollForm />

	</div>
</template>

<script>
import store from '@/store';

import CreatePollForm from '@/components/CreatePollForm';

export default {
	components: {
		CreatePollForm,
	},

	mounted() {
		store.commit('setLoading', false);		
	}
};
</script>

<style lang="scss" scoped>

</style>
