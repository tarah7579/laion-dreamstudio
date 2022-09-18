<template>
    <div id="kt_content" class="content d-flex flex-column flex-column-fluid"  style="background: rgb(36, 36, 36);">
      
    </div>
</template>

<script lang="ts">
  export default {
    name: 'IndexContent',
    data: {
      word_phrase: ''
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
    },
    async mounted() {
      if (localStorage.word_phrase) {
        this.word_phrase = localStorage.word_phrase;
      } else {
        await this.newSession();
      }
    },
    watch: {
      word_phrase(new_word_phrase) {
        localStorage.word_phrase = new_word_phrase;
      }
    }
  }
</script>