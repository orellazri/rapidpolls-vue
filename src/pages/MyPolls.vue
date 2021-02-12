<template>
	<div>
		<Error :error="error" />
		<LoadingSpinner :loading="loading" />

		<b-row v-if="!loading">
			<b-col>
				<b-card v-for="(poll, index) in polls" :key="index" class="mb-4">
					<router-link :to="'/poll/' + poll.id">
						<h5>{{ poll.title }}</h5>
					</router-link>
					<div style="color: grey">
						Total votes: {{ poll.total_votes }}
						<br>
						<b-icon icon="clock"></b-icon> {{ convertTimestamp(poll.created_at) }}				
					</div>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import db from '@/db';
import { convertTimestamp } from '@/helpers';

import Error from '@/components/Error';
import LoadingSpinner from '@/components/LoadingSpinner';

export default {
	components: {
		Error,
		LoadingSpinner,
	},

	data() {
		return {
			error: '',	
			loading: true,
			polls: [],
		}
	},

	computed: mapState(['user']),

	async created() {
		if (this.user == null) {
			this.$router.push('/');
			return;
		}
		
		try {
			const docs = await db.collection('polls').where('creator', '==', this.user.uid).get();
			for (const doc of docs.docs) {
				this.polls.push({ id: doc.id, ...doc.data() });
			}
		} catch (e) {
			this.error = 'An error occured while trying to fetch your polls.';
			this.loading = false;
			return;
		}

		this.loading = false;
	},

	methods: {
		convertTimestamp,
	},
};
</script>

<style lang="scss" scoped>

</style>
