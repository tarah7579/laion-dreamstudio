<template>
    <div id="kt_content" class="content d-flex flex-column flex-column-fluid"  style="background: rgb(36, 36, 36);">
    <div class="post d-flex flex-column-fluid" >
        <div id="kt_content_container" class="container d-flex flex-column container-xxl"  style="height: calc(100vh - 100px); max-width: unset; position: relative;">
            <div  >
                <ImageCost />
                <MainDream />
                <div ></div>
            </div>
        </div>
    </div>
    </div>
</template>
<script lang="ts">
import ImageCost from '@/components/ImageCost.vue'
import MainDream from '@/components/MainDream.vue'

export default {
  name: 'DreamContent',
  components: {
    ImageCost,
    MainDream
    
  }
}
</script>
