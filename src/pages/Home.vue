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
import CreatePollForm from '@/components/CreatePollForm';

export default {
	components: {
		CreatePollForm,
	},
};
</script>

<style lang="scss" scoped>

</style>
