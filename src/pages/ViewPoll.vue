<template>
	<div>
		<!-- Loading Spinner -->
		<LoadingSpinner :loading="loading" />

		<div class="row" v-if="error != ''">
			<div class="col">
				<div class="alert alert-danger" role="alert">
					{{ error }}
				</div>
			</div>
		</div>

		<!-- Error -->
		<div v-if="!loading && error == ''">
			<div class="row">
				<div class="col">
					<h3>{{ this.poll.title }}</h3>
				</div>
			</div>

			<!-- Not voted-->
			<div v-if="!hasVoted">
				<div class="row">
					<div class="col">
						<form @submit.prevent="vote">
							<div class="form-check">
								<div class="row mb-3" v-for="(choice, index) in choices" :key="index">
									<input type="radio" class="form-check-input" name="choice"
										:id="'choice' + index" :value="index" v-model="choicePicked">
									<label class="form-check-label" :for="'choice' + index">
										{{ choice.title }}
									</label>
								</div>
							</div>

							<button type="submit" class="btn btn-primary">Vote</button>
						</form>
					</div>
				</div>
			</div>
			
			<!-- Voted -->
			<div v-else>
				<div class="row">
					<div class="col">
						<div v-for="(choice, index) in choices" :key="index">
							<span v-if="index == indexVoted">
								<i class="bi bi-check"></i>
							</span>

							{{ choice.title }} ({{ votePrecent(index) }}%)

							<div class="progress mb-3" style="height: 30px;">
								<div class="progress-bar"
									:style="'width: ' + votePrecent(index) + '%; background:' + choicesColors[index]"></div>
							</div>
						</div>

						<h5>Total Votes: {{ poll.total_votes }}</h5>
					</div>

					<div class="col">
						<PollChart :data="chartData" :height="300" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from '@/firebase';
import db from '@/db';
import { getIP } from '@/helpers';

import LoadingSpinner from '@/components/LoadingSpinner';
import PollChart from '@/components/PollChart';

export default {
	components: {
		LoadingSpinner,
		PollChart,
	},

	data() {
		return {
			error: '', 				// Error
			ip: '', 					// User IP
			id: '', 					// Poll id (from params)
			loading: true, 		// Loading poll information
			hasVoted: false, 	// If this IP already voted or not (to show vote/stats)
			poll: [], 				// Poll object
			choices: [], 			// Poll choices object
			choicePicked: -1, // The choice picked from the vote form
			indexVoted: -1, 	// The index this IP has voted on
			chartData: {},		// Chart data
			choicesColors: [	// Colors for the chart and stats
				'#01BAEF', '#0CBABA', '#F2CD5D',
				'#D741A7', '#F0F3BD', '#ED7D3A',
				'#C69C72', '#49416D', '#B3F2DD',
			] 
		};
	},

	async created() {
		this.id = this.$route.params.pollId;

		const poll = await db.collection('polls').doc(this.id).get();
		if (!poll.exists) {
			this.error = 'This poll does not exist';
		} else {
			this.poll = poll.data();
		}

		// Read choices
		const choicesSnapshot = await db.collection('polls').doc(this.id).collection('choices').get();
		this.choices = choicesSnapshot.docs.map((doc) => doc.data());

		// Check if the user has already voted (by IP)
		try {
			this.ip = await getIP();
		} catch (e) {
			this.error = "Could not fetch information that's required to protect the polls on our site. Please disable your AdBlocker.";
			return;
		}

		const vote = await db.collection('polls').doc(this.id).collection('votes').doc(this.ip).get();
		this.hasVoted = vote.exists;
		if (this.hasVoted) {
			this.indexVoted = vote.data().choice;
		}

		// Update chart data
		let chartLabels = [];
		let chartDatasets = [
			{
				label: "Data",
				data: []
			}
		];
		this.choices.forEach((choice) => {
			chartLabels.push(choice.title);
			chartDatasets[0].data.push(choice.votes);
		});

		chartDatasets[0].backgroundColor = this.choicesColors;

		this.chartData = {
			labels: chartLabels,
			datasets: chartDatasets,
		};

		// Change page title
		document.querySelector('head title').textContent = `${this.poll.title} - Rapid Polls`;

		this.loading = false;
	},

	methods: {
		votePrecent(index) {
			// Calculate the percent a vote holds from the total votes
			return ((this.choices[index].votes / this.poll.total_votes) * 100).toFixed(2);
		},

		async vote() {
			if (this.choicePicked == -1) {
				return;
			}

			// Add a vote document with the user's ip
			await db.collection('polls').doc(this.id).collection('votes').doc(this.ip).set({
				choice: this.choicePicked,
			});

			// Increment total votes for poll
			await db.collection('polls').doc(this.id).update({
				total_votes: firebase.firestore.FieldValue.increment(1),
			});

			// Increment votes for choice
			await db.collection('polls').doc(this.id).collection('choices')
				.doc(this.choicePicked.toString()).update({
					votes: firebase.firestore.FieldValue.increment(1),
			});

			// Reload page
			this.$router.go();
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
