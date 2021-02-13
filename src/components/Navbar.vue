<template>
	<b-navbar toggleable="lg" type="dark" variant="dark" class="mb-4">
		<router-link to="/">
			<b-navbar-brand>
				Rapid Polls
			</b-navbar-brand>
		</router-link>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-form v-if="!user">
					<b-button variant="primary" size="sm" class="loginGoogle" @click="loginGoogle">
						<b-icon icon="google" class="pr-1" ></b-icon> Log In With Google
					</b-button>
				</b-nav-form>

				<b-nav-form v-else>
					<b-nav-text class="pr-3">
						<router-link to="/mypolls/">
							My Polls
						</router-link>
					</b-nav-text>
					<b-button size="sm" @click="logout">
						Log Out
					</b-button>
				</b-nav-form>

			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import firebase from '@/firebase';
import { mapState } from 'vuex';

export default {
	computed: mapState(['user']),

	methods: {
		async loginGoogle() {
			const provider = new firebase.auth.GoogleAuthProvider();
			await firebase.auth().signInWithPopup(provider);
			// Reload page
			this.$router.go('');
		},

		logout() {
			firebase.auth().signOut();
			this.$router.push('/');
		}
	},
}
</script>

<style lang="scss" scoped>
.loginGoogle {
	background: #e3544f;
	border-color: transparent;

	&:hover, &:active {
		background: #ce4f4b;
		border-color: transparent;
	}
}
</style>