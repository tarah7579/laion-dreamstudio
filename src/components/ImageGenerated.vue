<template>
    <div class="generated_image"  style="padding: 5px 5px 5px 5px; ">
        <div class="generated_image_wrap"  style="">
            <img class="image" v-if="imageProp" v-bind:src=imageProp alt=""  style="aspect-ratio: 1 / 1; width: 100%; height: 100%;">
            <img class="image" v-else src="/media/images/dream-empty.png" alt=""  style="aspect-ratio: 1 / 1; width: 100%; height: 100%;">
        </div>
    </div>
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