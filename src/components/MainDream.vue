<template>
    <div class="main-page" >
        <div class="generated-wrapper" >
            <button class="btn btn-primary settings" ><i class="bi bi-gear-wide-connected position-absolute active" ></i><i class="bi bi-x-circle position-absolute" ></i></button>
            <div class="row"  style="height: 100%;">
                <ImageGenerated :imageProp=generatedImage></ImageGenerated>
                <div class="col-auto col-lg-4 settings-wrapper" >
                    <div class=""  style="height: 100%;">
                        <div class="params params-desktop" >
                            <div >
                                <ParamSlider @updateValue="updateParams"  param_name="Width" param_desc="The width of the generated image." :param_value=512 :param_max=1024 :param_min=512 :param_step=64 />
                                <ParamSlider @updateValue="updateParams"  param_name="Height" param_desc="The height of the generated image." :param_value=512 :param_max=1024 :param_min=512 :param_step=64 />
                                <ParamSlider @updateValue="updateParams"  param_name="Cfg Scale" param_desc="Cfg scale adjusts how much the image will be like your prompt. Higher values keep your image closer to your prompt." :param_value=7 :param_max=20 :param_min=0 :param_step=1 />
                                <ParamSlider @updateValue="updateParams"  param_name="Steps" param_desc="How many steps to spend generating (diffusing) your image." :param_value="50" :param_max=150 :param_min=10 :param_step=1 />
                                <ParamSlider @updateValue="updateParams"  param_name="Number of Images" param_desc="To generate multiple images from one prompt." :param_value="1" :param_max=9 :param_min=1 :param_step=1 />
                                <ParamSelect @updateValue="updateParams" param_name="Sampler" param_desc="The diffusion sampling method. Default is 'k_lms'." :param_value="k_lms" />
                                <ParamCheck param_name="Seed" param_desc="The seed used to generate your image. Enable to manually set a seed." param_value="" />
                                <ParamApiKey @updateValue="updateParams" param_name="apiKey" param_value="api key" />
                                <ParamHost @updateValue="updateParams" param_name="host" param_value="https://grpc.stability.ai:443" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="prompt-wrapper prompt-wrapper-mobile" >
                    <form  id="prompt-form" class="d-flex flex-column flex-lg-row align-items-center" >
                        <ParamPrompt @updateValue="updateParams" param_name="Input Prompt" param_value="" />
                        <ParamButton buttonText="Dream" @click="this.onGenerate"/>
                        <ParamButton buttonText="Dream WebSocket" @click="this.onGenerateWss"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import  { generate } from '@/stability/stability'
import { generateWss } from '@/stability/selas_wss'
import  { diffusionMap } from '@/stability/utils'
import ParamSlider from './ParamSlider.vue'
import ParamSelect from './ParamSelect.vue'
import ParamCheck from './ParamCheck.vue'
import ImageGenerated from './ImageGenerated.vue'
import ParamButton from './ParamButton.vue'
import ParamApiKey from './ParamApiKey.vue'
import ParamPrompt from './ParamPrompt.vue'
import ParamHost from './ParamHost.vue'
const params = {
    'Width': Number(512),
    'Height': Number(512),
    'Cfg Scale': Number(7),
    'Steps': Number(50),
    'Number of Images': Number(1),
    'Sampler': 7,
    'Seed': String(''),
    'Input Prompt': String(''),
    'apiKey': String(''),
    'host': String('https://grpc.stability.ai:443')
}
export default {
  name: 'MainDream',
  components: {
    ParamSlider,
    ParamSelect,
    ParamCheck,
    ParamHost,
    ParamButton,
    ParamPrompt,
    ParamApiKey,
    ImageGenerated
},
data () {
    return {
        generatedImage: ''
    }
},
  methods: {
    updateParams(name, input) {
        params[name] = input;
        console.log(params);
    },
    onGenerate() {
        const api = generate({
        host: params['host'],
        prompt: params['Input Prompt'],
        width: params['Width'],
        height: params['Height'],
        cfgScale: params['Cfg Scale'],
        steps: params['Steps'],
        samples: params['Number of Images'],
        diffusion: diffusionMap[params['Sampler']],
        apiKey: params['apiKey'],
        debug: true
        })  

        api.on('image', ({  binary }) => {
            const base64 = "data:image/png;base64," + binary;
            console.log(base64)
            this.updateImage(base64);
        })

        api.on('end', () => {
        console.log('Generating Complete')
        })
    },
    updateImage(generatedImage) {
        console.log("updating image")
        this.generatedImage = generatedImage
    },
    async onGenerateWss() {
        const promptData = {
        prompt: params['Input Prompt'],
        width: params['Width'],
        height: params['Height'],
        cfgScale: params['Cfg Scale'],
        steps: params['Steps'],
        samples: params['Number of Images'],
        diffusion: diffusionMap[params['Sampler']],
        word_phrase: params['apiKey']
        }
        const response = await fetch("api/generate/txt2img", {
            method: "post",
            body: JSON.stringify(promptData),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        const serverdata = await response.json();
        if (serverdata['result'] == "success") {
            this.generatedImage = serverdata['image'];
        }
        else if (serverdata['result'] == "no credits") {
            console.log("no credits");
        }
        else {
            console.log(serverdata['result']);
        }

    }
}
}
</script>
