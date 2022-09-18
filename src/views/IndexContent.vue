<template>
    <div id="kt_content" class="content d-flex flex-column flex-column-fluid"  style="background: rgb(36, 36, 36);">
      <h3>Credits: </h3>
      <span><input disabled v-model="credits" /></span>
      <h3>Word phrase:</h3>
      
      <span><input disabled v-model="word_phrase" /></span>
    </div>
</template>

<script lang="ts">
export default {
  name: 'IndexContent',
  data: function() {
    return {
      word_phrase: '',
      credits: 0
    };
  },
  methods: {
    newSession: async function () {
      const response = await fetch("api/user/new", {
          method: "get",
          headers: {
              "Content-Type": "application/json; charset=UTF-8"
          }
      });
      const serverdata = await response.json();
      this.word_phrase = serverdata['word_phrase'];
    },
    getCredits: async function () {
      const userData = {word_phrase: this.word_phrase }
      const response = await fetch("api/user/credits", {
          method: "post",
          body: JSON.stringify(userData),
          headers: {
              "Content-Type": "application/json; charset=UTF-8"
          }
      });
      const serverdata = await response.json();
      this.credits = serverdata['credits'];
    },
  },
  async mounted() {
    if (localStorage.word_phrase) {
      this.word_phrase = localStorage.word_phrase;
    } else {
      await this.newSession();
    }
    await this.getCredits();
  },
  watch: {
    word_phrase(new_word_phrase) {
      localStorage.word_phrase = new_word_phrase;
    }
  }
}
</script>