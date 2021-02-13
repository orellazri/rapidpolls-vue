<template>
	<div id="app">
		<Navbar />
		
		<b-container>
			<Error />

			<LoadingSpinner />

			<router-view/>
		</b-container>
	</div>
</template>

<script>
import firebase from '@/firebase';
import store from '@/store';

import Navbar from '@/components/Navbar';
import Error from '@/components/Error';
import LoadingSpinner from '@/components/LoadingSpinner';

export default {
	components: {
		Navbar,
		Error,
		LoadingSpinner,
	},

	created() {
		// Responsible on updating the store's user state
		// accoring to the user state from firebase
		firebase.auth().onAuthStateChanged(user => {
			store.commit("setUser", user);
		});
	},
}
</script>

<style lang="scss">

</style>
