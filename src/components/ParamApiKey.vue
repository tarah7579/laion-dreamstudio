<template>
    <div class="d-inline-block w-100 me-0 me-lg-3 mt-3 mt-md-0">
        <el-input v-model="v_param" 
            v-on:change="this.updateValue" 
            id="prompt-apikey" 
            type="text" 
            autocomplete="off" 
            placeholder="apiKey">
        </el-input>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ParamApiKey',
    props: {
    param_value: {
            type: String
        },
        param_name: {
            type: String
        },
    },
    data: function() {
        return {
            v_param: this.param_value
        };
    },
    methods: {
        updateValue: function() {
            this.$emit("updateValue", this.param_name, this.v_param);
        }
    }
}
</script>