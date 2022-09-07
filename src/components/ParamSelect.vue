<template>
    <div>
        <h3>{{param_name}}</h3>
        <div className="param-slider">
            <div className="param-desc">{{param_desc}}</div>
            <el-select v-model="v_select" 
                v-on:change="this.updateValue" 
                class="el-input" 
                size="large" 
                :placeholder="param_value" 
                default-first-option>
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
        </div>
    </div>
</template>


<script lang="ts" setup>

const options = [
    {value: 'k_lms', label: 'k_lms',},
    {value: 'k_dpm_2_ancestral', label: 'k_dpm_2_ancestral',},
    {value: 'k_dpm_2', label: 'k_dpm_2',},
    {value: 'k_heun', label: 'k_heun',},
    {value: 'k_euler_ancestral', label: 'k_euler_ancestral',},
    {value: 'k_euler', label: 'k_euler',},
    {value: 'plms', label: 'plms',},
    {value: 'ddim', label: 'ddim',}
]
</script>
<script lang="ts">
export default {
    name: 'ParamSelect',
    props: {
        param_value: {
            type: String
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
            v_select: this.param_value
        };
    },
    methods: {
        updateValue: function() {
            this.$emit("updateValue", this.param_name, this.v_select);
        }
    }
}
</script>