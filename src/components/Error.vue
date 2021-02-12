<template>
	<b-row v-if="error != ''">
		<b-col>
			<b-alert show variant="danger">
				{{ error }}
			</b-alert>
		</b-col>
	</b-row>
</template>

<script>
export default {
	props: ['error']
}
</script>