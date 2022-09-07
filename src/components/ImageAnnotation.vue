<template>
    <img class="image" v-if="imageProp" v-bind:src=imageProp alt="" style="position:absolute">
</template>

<script lang="ts">
    export default {
        props: ['imageProp'],
        computed: {
            generatedImage() {
            return this.imageProp
            }
        }
    }
</script>