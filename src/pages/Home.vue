<template>
	<div>
		<div class="row">
			<div class="col">
				<h2>Welcome to Rapid Polls! 🙋🏻</h2>
			</div>
		</div>

		<hr>

		<div class="row">
			<div class="col">
				<div v-if="error != ''">
					<div class="alert alert-danger" role="alert">
						{{ error }}
					</div>
				</div>

				<h3>Create a poll</h3>
				<form @submit.prevent="createPoll">
					<div class="row mb-3">
						<label for="title" class="col-sm-2 col-form-label">Title</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="title"
								v-model="title" placeholder="What is your question?"
								@focus="startedForm = true">
						</div>
					</div>

					<div v-if="startedForm">
						<div class="row mb-3">
							<label class="col-sm-2 col-form-label">Choices</label>
							<div class="col-sm-10">
								<div v-for="(choice, index) in choices" :key="index">
									<input type="text" class="form-control mb-3"
										v-model="choices[index]" placeholder="Type a choice..."
										@focus="focusChoice(index)">
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<button type="submit" class="btn btn-primary">Create Poll</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from '@/firebase';
import db from '@/db';
import { generateId } from '@/helpers';

export default {
	data() {
		return {
			title: '',
			startedForm: false,
			choices: ['', '', ''],
			error: '',
		}
	},
	
	methods: {
		async createPoll() {
			this.error = '';
			
			if (this.title.trim() == '') {
				this.error = 'Title cannot be blank';
				//return;
			}

			// Trim the choices so there will be no empty choices in between
			const trimmedChoices = this.choices.filter((choice) => {
				if (choice.trim() != '') return choice.trim();
			});
			
			if (trimmedChoices.length < 2) {
				this.error = 'You must specify at least 2 choices';
				//return;
			}

			let pollId = generateId(10);

			while (true) { // eslint-disable-line no-constant-condition 
				const doc = await db.collection('polls').doc(pollId).get();
				if (!doc.exists) break;
				pollId = generateId(10);
			}

			await db.collection('polls').doc(pollId).set({
				title: this.title,
				total_votes: 0,
				created_at: firebase.firestore.FieldValue.serverTimestamp(),
			});
			
			let index = 0;
			for (const choice of trimmedChoices) {
				await db.collection('polls').doc(pollId).collection('choices').doc(index.toString()).set({
					id: index,
					title: choice,
					votes: 0
				});

				index++;
			}

			this.$router.push(`/${pollId}/`);
		},

		focusChoice(index) {
			if (index == this.choices.length - 1) {
				this.choices.push('');
			}
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
