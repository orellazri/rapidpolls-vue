<script>
import { Doughnut } from 'vue-chartjs';

export default {
	extends: Doughnut,

	props: ['data'],

	mounted() {
		this.renderChart(this.data, {
			borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px" });
	},
}
</script>