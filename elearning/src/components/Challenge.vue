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
        <Question :question="question" @continue="next"></Question>
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
    question: 0
  }),

  async beforeMount() {
    this.root = await api.fetchChallenge(this.challenge)
  },

  methods: {
    next() {
      console.log({q: this.question, of: this.root.data[0].question.length})
      if (this.question < this.root.data[0].question.length - 1)
        this.question++
      else
        this.$emit('next')
    }
  }
}
</script>

<style scoped>

</style>