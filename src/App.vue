<template>
    <div class="page d-flex flex-row flex-column-fluid">
        <LayoutAside />
        <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper pl-0" style="padding-top: 45px; flex: 1 0 0px !important;">
            <LayoutHeader />
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts">
import LayoutAside from '@/components/LayoutAside.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import { RouterView } from "vue-router";

export default {
    components: {
        LayoutAside,
        LayoutHeader,
        RouterView
    }
};
</script>