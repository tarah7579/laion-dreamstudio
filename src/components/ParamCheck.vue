<template>
    <div>
        <h3>{{param_name}}</h3>
        <div className="param-slider">
            <div className="param-desc">{{param_desc}}</div>
            <el-input v-model="v_seed" 
                @change="updateSeedValue"
                format="number" 
                size="large" 
                placeholder="Random seed"
                :disabled="v_random_seed"
                style="background: rgb(41, 41, 41) !important; height: 38px; display: inline-block; width: calc(100% - 45px); font-size: 14px;">
            </el-input>
            <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack" 
                style="display: inline-flex">
                <input @change="updateRandomSeedValue" v-model="v_random_seed" type="checkbox" class="form-check-input"/>
            </label>
        </div>
    </div>
</template>

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
        param_random_seed: {
            type: Boolean
        }
    },
    data: function() {
        return {
            v_seed: this.param_value,
            v_random_seed: this.param_random_seed
        };
    },
    methods: {
        updateSeedValue: function() {
            this.$emit("updateValue", this.param_name, this.v_seed);
        },
        updateRandomSeedValue: function() {
            this.$emit("updateValue", "Random Seed", this.v_random_seed);
        }
    }
}
</script>