<template>
	<div>
		<div class="row" v-if="error != ''">
			<div class="col">
				<div class="alert alert-danger" role="alert">
						{{ error }}
					</div>
			</div>
		</div>

		<div v-if="!loading && error == ''">
			<div class="row">
				<div class="col">
					Welcome
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import db from '@/db';
import { generateId } from '@/helpers';

export default {
	data() {
		return {
			error: '',
			loading: true,
			id: '',
			choices: [],
			created_at: ''
		}
	},

	async created() {
		this.id = this.$route.params.pollId;
		
		const poll = await db.collection('polls').doc(this.id).get();
		if (!poll.exists) {
			this.error = 'This poll does not exist!';
		} else {
			console.log(poll.data);
		}

		this.loading = false;
	},
	
	methods: {
		
	},
};
</script>

<style lang="scss" scoped>

</style>
