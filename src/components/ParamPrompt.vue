<template>
    <div class="d-inline-block w-100 me-0 me-lg-3 mt-3 mt-md-0">
        <textarea v-model="v_param" 
            v-on:change="this.updateValue" 
            id="prompt-input" 
            type="text" 
            class="form-control" 
            autocomplete="off" 
            placeholder="I want to dream of..." 
            maxlength="500"
            rows="1"  
            style="height: 65px;">
        </textarea>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ParamPrompt',
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