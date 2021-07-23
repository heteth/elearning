<template>
  <div v-if="root">
    <v-carousel
        :show-arrows="false"
        hide-delimiters
        :continuous="false"
        v-model="question"
    >
      <v-carousel-item
          v-for="question of root.data[0].question"
          :key="question._id"
      >
        <Question :question="question" @continue="next($event)"></Question>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import api from "@/api";
import Question from "@/components/Question";

export default {
  name: "Challenge",
  components: {Question},
  props: ["challenge"],

  data: () => ({
    root: null,
    question: 0,
    answers: []
  }),

  async beforeMount() {
    this.root = await api.fetchChallenge(this.challenge)
  },

  methods: {
    async next(ans) {
      console.log({q: this.question, of: this.root.data[0].question.length})
      this.answers[this.question] = ans
      if (this.question < this.root.data[0].question.length - 1)
        this.question++
      else {
        console.log("TIME TO SUBMIT TRACK CHALLENGE")
        const correct = this.answers.filter((a, ix) => a === this.root.data[0].question[ix]._correct)
        await api.trackChallenge(this.challenge, Math.round(correct.length/this.root.data[0].question.length*100))
        this.$emit('next')
      }
    }
  }
}
</script>

<style scoped>

</style>