<template>
	<div id="app">
		
		<b-navbar toggleable="lg" type="dark" variant="dark" class="mb-4">
			<router-link to="/">
				<b-navbar-brand>
					Rapid Polls
				</b-navbar-brand>
			</router-link>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-form>
						<b-button variant="primary">Log In</b-button>
					</b-nav-form>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>

		<b-container>
			<router-view/>
		</b-container>
	</div>
</template>

<style lang="scss">

</style>
