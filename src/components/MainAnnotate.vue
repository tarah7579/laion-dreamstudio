<template>
    <div class="main-page" >
        <div class="generated-wrapper" >
            <button class="btn btn-primary settings" ><i class="bi bi-gear-wide-connected position-absolute active" ></i><i class="bi bi-x-circle position-absolute" ></i></button>
                <PaintWidget />
        </div>
    </div>
</template>

<script lang="ts">
    import PaintWidget from './PaintWidget.vue'
    export default {
        name: "MainAnnotate",
        components: { PaintWidget }
    }
</script>
