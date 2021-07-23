<template>
  <div style="height: 100%; "><!--padding-bottom: 50px; for delimiters-->
    <div style="height: 100%; overflow: auto; padding-bottom: 50px">
      <form>
        <v-radio-group v-model="chosen" :error-messages="wrong" :success-messages="correct" :readonly="submitted">
          <template v-slot:label>
            <div>{{question.question[0]}}</div>
          </template>
          <div v-for="answer of question.answer" :key="answer._id">
            <v-radio :value="answer._id">
              <template v-slot:label>          
                {{String.fromCharCode("A".charCodeAt(0) + parseInt(answer._id) - 1)}}) {{answer.nodeValue}}
              </template>
            </v-radio>
          </div>
        </v-radio-group>
        <v-btn @click="submit" :disabled="chosen == null" v-if="!submitted">Submit</v-btn>
        <v-btn v-if="submitted" @click="$emit('continue', chosen)">Continue</v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: "Question",
  
  props: ["question"],
  
  data: () => ({
    chosen: null,
    submitted: false,
    correct: null,
    wrong: null
  }),
  
  methods: {
    async submit() {
      await api.trackQuestion(this.question._id, this.chosen)
      
      this.correct = this.chosen === this.question._correct ? this.question.correct[0] : null
      this.wrong = this.chosen !== this.question._correct ? this.question.wrong[0] : null
      this.submitted = true
    },
  }
}
</script>

<style scoped>

</style>