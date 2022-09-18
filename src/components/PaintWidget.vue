<template>
<div  style="height: 100%;" class="row" >
    <div style="position: absolute;" class="image-area"  >
        <div  style="display: flex; align-items: center;" class="generated_image" >
            <div class="flex justify-center">
                <div style="width:100%; height:100%" class="outsideWrapper">
                    <div style="width:100%; height:100%; position:relative;" class="insideWrapper">
                        <ImageAnnotation :imageProp=generatedImage></ImageAnnotation>
                        <canvas ref="can" width="512" height="512" style="width:100%;height:100%;top:0px; left:0px;border: 1px solid;position:absolute"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-auto col-lg-4 settings-wrapper" >
        <div class=""  style="height: 100%;">
            <div class="params params-desktop" >
                <div>
                    <h3>Credits: </h3>
                    <span><input disabled class="form-control" v-model="credits" /></span>
                    <h3>Word phrase:</h3>
                    
                    <span><input size="100" rows="3" class="form-control" disabled v-model="word_phrase" /></span>

                    <div className="param-slider">
                    <div className="param-desc">1 annotation = 1 credit</div>
                    <span className="param-desc">
                        please help us to improve the quality of the images we generate by marking the parts of the person in this image below that seem not well-shaped like e.g. eyes of different sizes, misshaped fingers
                    </span>
                    </div>
                </div>
                <br/>
                <div>
                    <h3>Delete</h3>
                    <div className="param-slider">
                        <div className="param-desc">Clear the current annotation</div>
                    <ParamButton @click="clear" buttonText="Delete" buttonIcon="btn btn-primary bi bi-trash fs-2x"></ParamButton>
                    </div>
                </div>
                <br/>
                <div>
                    <h3>Submit</h3>
                    <div className="param-slider">
                        <div className="param-desc">Submit the current annotation</div>
                    <ParamButton @click="passAnnotation" buttonText="Submit" buttonIcon="btn btn-primary bi bi-pencil-square fs-2x"></ParamButton>
                    </div>
                </div>
                <div>
                    <h3>Download</h3>
                    <div className="param-slider">
                        <div className="param-desc">Download the current annotation</div>
                    <ParamButton @click="downloadMask" buttonText="Download" buttonIcon="btn btn-primary bi bi-download fs-2x"></ParamButton>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script lang="ts">
import {fabric} from 'fabric'
import ImageAnnotation from './ImageAnnotation.vue';
import ParamButton from './ParamButton.vue';
let imageNumber: string;
let imgSrc: string;
let wmax: number;
const part = Math.floor(Math.random() * 2);
let canv;
const humans_choice = ["humans", "humans_square"]
const humans_length = [10000, 19303]
const humans_zeroes = ['0000', '00000']
const humans_format = ['.png', '.jpg']
export default {
    name: "PaintWidget",
    data: function () {
        return {
            generatedImage: '',
            credits: 0,
            word_phrase: ''
        };
    },
    methods: {
        getCredits: async function () {
            const userData = {word_phrase: this.word_phrase }
            const response = await fetch("api/user/credits", {
                method: "post",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            });
            const serverdata = await response.json();
            this.credits = serverdata['credits'];
        },
        newSession: async function () {
          const response = await fetch("api/user/new", {
                method: "get",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            });
            const serverdata = await response.json();
            this.word_phrase = serverdata['word_phrase'];
        },
        getAnnotation: function () {
            
            imageNumber = (humans_zeroes[part] + Math.floor(Math.random() * humans_length[part] + 1)).slice(-(humans_zeroes[part].length));
            imgSrc =
                "https://raw.githubusercontent.com/LAION-AI/human_artifacts/main/" + humans_choice[part] + "/" +
                    imageNumber +
                    humans_format[part];
            this.generatedImage = imgSrc;
        },
        uploadAnnotations: async function (annotationData) {
            const response = await fetch("api/annotation/submit", {
                method: "post",
                body: JSON.stringify(annotationData),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            });
            const serverdata = await response.json();
            if (serverdata['result'] != "rate limit") {
                await this.getCredits();
            }
            return serverdata['result'];
        },
        passAnnotation: async function () {
            // let jsons = canv.freeDrawingBrush.canvas._objects;
            // console.log();
            const svgpath = canv.freeDrawingBrush.canvas.toSVG();
            // const paths = JSON.stringify(jsons.map((x: any) => x.path.map((y: any) => [y[1], y[2]])));
            const annotationData = {
                image_id: "Humans" + String(imageNumber),
                annotation: svgpath,
                word_phrase: this.word_phrase
            };
            const response = await this.uploadAnnotations(annotationData);
            if (response != "rate limit") {
                this.getAnnotation();
                this.clear();
            }
            
        },
        downloadMask: function () {
            const dataURL = canv.freeDrawingBrush.canvas.toDataURL({
                width: canv.freeDrawingBrush.canvas.width,
                height: canv.freeDrawingBrush.canvas.height,
                left: 0,
                top: 0,
                format: "png",
            });
            const link = document.createElement("a");
            link.download = imageNumber + ".png";
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        clear: function () {
            canv.clear();
        },
        createCanvas: function (part: number) {
            const canvas = this.$refs.can;
            if (canv) {
                canv.clear();
            }
            if (part === 0) {
                const wmaxshort = wmax * 0.7;
                if (wmax < 512) {
                    canvas.width = wmaxshort;
                    canvas.height = 2 * wmaxshort;
                }
                else {
                    canvas.height = 1024;
                    canvas.width = 512;
                }
            }
            else {
                const wmaxshort = wmax;
                if (wmax < 512) {
                    canvas.width = wmaxshort;
                    canvas.height = wmaxshort;
                }
                else {
                    canvas.height = 512;
                    canvas.width = 512;
                }
            }
            // console.table({
            //     "wmax": wmax,
            //     "wmaxshort": wmaxshort,
            //     "canvas.width": canvas.width,
            //     "canvas.height": canvas.height
            // });
            canv = new fabric.Canvas(canvas, { isDrawingMode: true });
            const brush = canv.freeDrawingBrush;
            brush.width = 20;
            brush.color = "rgba(255, 0, 0, 0.5)";
        },
        reloadPaintWidget: function () {
            this.getAnnotation();
            this.createCanvas(part);
        },
    },
    async mounted() {
        this.reloadPaintWidget();
        if (localStorage.word_phrase) {
            this.word_phrase = localStorage.word_phrase;
        } else {
            await this.newSession();
        }
        await this.getCredits();
    },
    watch: {
      word_phrase(new_word_phrase) {
        localStorage.word_phrase = new_word_phrase;
      }
    },
    components: { ImageAnnotation, ParamButton }
}

</script>
