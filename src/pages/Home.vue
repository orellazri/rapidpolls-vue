<template>
  <div class="home">
    <div class="row">
      <div class="col">
        <h2>Welcome to Rapid Polls! 🙋🏻</h2>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <h3>Create a poll</h3>
        <form @submit.prevent="createPoll">
          <div class="row mb-3">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="title" :model="title" placeholder="What is your question?">
            </div>
          </div>

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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      choices: ['', '', ''],
    }
  },
  
  methods: {
    createPoll() {
      console.log(this.choices);
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
