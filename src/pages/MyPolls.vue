<template>
	<div>
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
import store from '@/store';
import db from '@/db';
import { convertTimestamp } from '@/helpers';

export default {
	data() {
		return {
			polls: [],
		}
	},

	computed: mapState(['error', 'loading', 'user']),

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
			store.commit('setError', 'An error occured while trying to fetch your polls.');
			return;
		}

		store.commit('setLoading', false);
	},

	methods: {
		convertTimestamp,
	},
};
</script>

<style lang="scss" scoped>

</style>
