<template>
    <div>
        <div class="description">{{param_desc}}</div>
        <div>
            <el-slider v-model="v_slider" 
                v-on:change="this.updateValue"
                :min="param_min" 
                :max="param_max">
            </el-slider>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ControlSlider',
    props: {
        param_value: {
            type: Number
        },
        param_min: {
            type: Number
        },
        param_max: {
            type: Number
        },
        param_desc: {
            type: String
        },
        param_name: {
            type: String
        },
    },
    data: function() {
        return {
            v_slider: this.param_value
        };
    },
    methods: {
        updateValue: function() {
            this.$emit("updateValue", this.v_slider);
        }
    }
}
</script>