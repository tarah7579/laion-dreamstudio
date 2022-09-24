<template>
    <div>
        <h3>{{param_name}} </h3>
        <div className="param-slider">
            <div className="param-desc">{{param_desc}}</div>
            <el-input v-model="vSeed" 
                format="number" 
                size="large" 
                placeholder="Random seed"
                style="background: rgb(41, 41, 41) !important; height: 38px; display: inline-block; width: calc(100% - 45px); font-size: 14px;">
            </el-input>
            <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack" 
                style="display: inline-block; margin-left: 8px;">
                <input v-model="randomSeed" type="checkbox" class="form-check-input" 
                 />
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const vSeed = ref('');
const randomSeed = ref(true);
</script>
<script lang="ts">
export default {
    name: 'ParamCheck',
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
}
</script>