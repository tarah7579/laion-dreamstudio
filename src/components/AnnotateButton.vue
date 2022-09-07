<template>
    <div class="d-inline-block mt-3 mt-lg-0">
        <button
        id="prompt-btn" 
        type="button" 
        v-if="buttonIcon" :class=buttonIcon>{{buttonText}}</button>
        <button
        id="prompt-btn" 
        type="button" 
        v-else class="btn btn-primary">{{buttonText}}</button>
    </div>
</template>

<script lang="ts">
    export default {
    name: 'ParamButton',
    props: ['buttonText', 'buttonIcon']
    }
</script>