<template>
    <div>
        <h3>{{param_name}}<div className="param-value">{{v_slider}}</div></h3>
        <div className="param-slider">
            <div className="param-desc">{{param_desc}}</div>
            <el-slider v-model="v_slider" 
                v-on:change="this.updateValue"
                :step="param_step" 
                show-stops 
                :min="param_min" 
                :max="param_max">
            </el-slider>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ParamSlider',
    props: {
        param_value: {
            type: Number
        },
        param_step: {
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
            this.$emit("updateValue", this.param_name, this.v_slider);
        }
    }
}
</script>