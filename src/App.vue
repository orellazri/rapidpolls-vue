<template>
	<div id="app">
		<Navbar />
		
		<b-container>
			<router-view/>
		</b-container>
	</div>
</template>

<script>
import firebase from '@/firebase';
import store from '@/store';

import Navbar from '@/components/Navbar';

export default {
	components: {
		Navbar
	},

	created() {
		// Responsible on updating the store's user state
		// accoring to the user state from firebase
		firebase.auth().onAuthStateChanged(user => {
			store.commit("changeUser", user);
		});
	},
}
</script>

<style lang="scss">

</style>
