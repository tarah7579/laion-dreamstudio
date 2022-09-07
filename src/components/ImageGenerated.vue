<template>
<div class="image-area col-12 col-lg-8"  style="position: relative;">
    <div class="generated_image"  style="display: flex; align-items: center;">
        <div class="generated_image_wrap empty"  style="">
            <img class="image" v-if="imageProp" v-bind:src=imageProp alt=""  style="aspect-ratio: 1 / 1; width: 100%; height: 100%;">
        </div>
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