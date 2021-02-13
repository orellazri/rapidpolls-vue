<template>
	<b-row v-if="error">
		<b-col>
			<b-alert show variant="danger">
				{{ error }}
			</b-alert>
		</b-col>
	</b-row>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['error']),
}
</script>