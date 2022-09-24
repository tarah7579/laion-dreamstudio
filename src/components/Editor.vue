<template>
<div class="editor-container" style="opacity: 1; filter: none;">
    <div class="editor-wrapper">
        <div class="editor-display-wrapper" style="">
            <div class="editor-display" style="width: 512px; height: 512px;">
                <div class="controls-horizontal controls-top">
                    <ControlSlider v-if="image_strength_visible" @updateValue="updateImageStrength" param_name="image_strength" param_desc="Image Strength" class="control control-slider image-strength" :param_value=50 :param_min=1 :param_max=99></ControlSlider>
                    <ControlSlider v-if="masking_controls_visible" @updateValue="updateBrushSize" param_name="brush_size" param_desc="Brush Size" class="control control-slider" :param_value=100 :param_min=1 :param_max=500></ControlSlider>
                    <ControlSlider v-if="masking_controls_visible" @updateValue="updateBrushBlur" param_name="brush_blur" param_desc="Brush Blur" class="control control-slider" :param_value=20 :param_min=0 :param_max=100></ControlSlider>
                    <ControlSlider v-if="masking_controls_visible" @updateValue="updateBrushStrength" param_name="brush_strength" param_desc="Brush Strength" class="control control-slider" :param_value=100 :param_min=1 :param_max=100></ControlSlider>
                    <ControlSlider v-if="masking_controls_visible" @updateValue="updateImageOpacity" param_name="image_opacity" param_desc="Image Opacity" class="control control-slider" :param_value=100 :param_min=0 :param_max=100></ControlSlider>
                </div>
                <div class="controls-vertical controls-left">
                    <a @click="setVisible('move')" title="Select and Move" :class=move_button_class>
                        <i class="bi bi-arrows-move"></i>
                    </a>
                    <a @click="setVisible('mask')" title="Masking" :class=mask_button_class>
                        <i class="bi bi-brush"></i>
                    </a>
                    <a @click="setVisible('restore')" title="Restore" :class=restore_button_class>
                        <i class="bi bi-bandaid"></i>
                    </a>
                    <a @click="setVisible('initial')" title="Initial Image Mode" :class=initial_image_button_class>
                        <i class="bi bi-arrow-left-right"></i>
                    </a>
                </div>
                <div v-if="!uploaded_image" class="placeholder"><div class="placeholder-icon"><i class="bi bi-image"></i></div> Upload an image to start! </div>
                <img ref="uploaded_image" class="uploaded-image">
                <canvas ref="canvas" width="512" height="512" style="position: absolute; opacity: 0;"></canvas>
                <div class="svg-wrapper" style="width: 512px; height: 512px; transform: scale(1);">
                    <svg class="svg-rendered" width="512" height="512" overflow="hidden">
                        <defs>
                            <filter id="renderImageNoise" x="0" y="0" width="100%" height="100%">
                                <feTile in="SourceGraphic" x="50" y="50" width="100" height="100"></feTile>
                                <feTile></feTile>
                            </filter>
                        </defs>
                        <rect x="-1000" y="-1000" width="3000" height="3000" fill="black"></rect>
                        <svg x="0" y="0" width="512" height="512" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <filter id="renderBlur0" x="-1000" y="-1000" width="3000" height="3000">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur>
                                </filter>
                                <filter id="renderImageNoise" x="0" y="0" width="100%" height="100%">
                                    <feTile in="SourceGraphic" x="50" y="50" width="100" height="100"></feTile>
                                    <feTile></feTile>
                                </filter>
                                <filter id="renderImageWhite">
                                    <feColorMatrix in="SourceGraphic" type="matrix" 
                                    values="1 1 1 1 0
                                            1 1 1 1 0
                                            1 1 1 1 0
                                            1 1 1 1 0"></feColorMatrix>
                                </filter>
                                <mask ref="renderMask" id="renderMask">
                                    <g viewBox="0 0 512 512" filter="url(#renderBlur0)">
                                        <rect x="-1000" y="-1000" width="3000" height="3000" fill="#FFFFFF" opacity="0"></rect>
                                        <path v-for="d in this.svg_paths" :key="d" :d="d" filter="url(#renderBlur0)" stroke-width="100" opacity="1" stroke="black" stroke-linejoin="round" stroke-linecap="round" fill="none"></path>
                                    </g>
                                </mask>
                            </defs>
                            <image opacity="1" ref="svg_image" x="0" y="0" width="100%" height="100%" mask="url(#renderMask)" filter="url(#renderImageWhite)" preserveAspectRatio="xMidYMid slice"></image>
                        </svg>
                    </svg>
                </div>
                <div class="svg-wrapper" style="width: 512px; height: 512px; transform: scale(1);">
                    <svg class="svg-display" width="512" height="512" overflow="hidden">
                        <svg x="0" y="0" width="512" height="512" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <filter id="displayBlur0" x="-1000" y="-1000" width="3000" height="3000">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur>
                                </filter>
                                <mask ref="displayMask" id="displayMask">
                                    <g viewBox="0 0 512 512">
                                        <rect x="-1000" y="-1000" width="3000" height="3000" fill="#FFFFFF"></rect>
                                        <path v-for="d in this.svg_paths" :key="d" :d="d" filter="url(#displayBlur0)" stroke-width="100" opacity="1" stroke="black" stroke-linejoin="round" stroke-linecap="round" fill="none"></path>
                                    </g>
                                </mask>
                            </defs>
                            <image opacity="1" ref="svg_image_2" x="0" y="0" width="100%" height="100%" mask="url(#displayMask)" preserveAspectRatio="xMidYMid slice"></image>
                        </svg>
                    </svg>
                </div>
                <div class="hidden-overflow"
                  @mousedown="startDrawing($event)"
                  @mouseup="stopDrawing($event)"
                  @mousemove="getMousePos($event)"
                  @mouseleave="getMousePos($event)"
                  @mouseenter="getMousePos($event)"
                  style="cursor: crosshair;" >
                    <Vue3DraggableResizable
                        :initW="w"
                        :initH="h"
                        v-model:x="x"
                        v-model:y="y"
                        v-model:active="active"
                        :draggable="false"
                        :resizable="false"
                        style="top: 0px; left: 0px; display: none; width: 512px; height: 512px;"
                        ></Vue3DraggableResizable>
                        <!---->
                    <div class="editor-cursor" :style="cursor"></div>
                    
                </div>
                <div class="controls-vertical controls-right">
                    <a title="Undo" class="btn btn-secondary">
                        <i class="bi bi-arrow-counterclockwise"></i>
                    </a>
                </div>
                <div class="controls-horizontal controls-bottom">
                    <button class="btn btn-secondary">
                        <i class="bi bi-arrow-left"></i>Back</button>
                    <a href="/faq#photo-editor" class="">
                        <button class="btn btn-secondary">
                            <i class="bi bi-question-circle"></i>Guide</button>
                    </a>
                    <button  @click="$refs.file.click()" class="btn btn-primary">
                        <i class="bi bi-upload"></i>Upload Image</button>
                    <input type="file" ref="file" v-on:change="onFileChange($event)" id="image-upload">
                </div>
            </div>
            <object aria-hidden="true" tabindex="-1" style="
display: block !important; 
position: absolute !important; 
top: 0 !important; 
left: 0 !important; 
width: 100% !important; 
height: 100% !important; 
overflow: hidden !important; 
pointer-events: none !important; 
z-index: -1 !important; 
opacity: 0 !important;" type="text/html" data="about:blank"></object>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import ControlSlider from './ControlSlider.vue';
export default {
    name: "Editor",
    props: {
        showing: {
            type: Boolean,
        },
        generation: null
    },
    data: function () {
        return {
        image_strength_visible: true,
        masking_controls_visible: false,
        initial_image_button_class: "initial-image btn btn-primary",
        mask_button_class: "btn btn-secondary",
        restore_button_class: "btn btn-secondary",
        move_button_class: "btn btn-secondary",
        x: 0,
        y: 0,
        h: 100,
        w: 100,
        image_strength: 50,
        brush_size: 100,
        brush_blur: 20,
        brush_strength: 100,
        image_opacity: 100,
        active: false,
        uploaded_image: '',
        is_drawing: false,
        start_x: 0,
        start_y: 0,
        points: [],
        svg_paths: []
        }
    },
    mounted() {
        this.$refs.uploaded_image.src =  '';
        
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.canvas = canvas;
    },
    methods: {
        updateImageStrength(value) {
            this.image_strength = value;
        },
        updateBrushSize(value) {
            this.brush_size = value;
        },
        updateBrushBlur(value) {
            this.brush_blur = value;
        },
        updateBrushStrength(value) {
            this.brush_strength = value;
        },
        updateImageOpacity(value) {
            this.image_opacity = value;
        },
        setVisible(control) {
            if (control == "mask") {
                this.image_strength_visible = false;
                this.masking_controls_visible = true;
                this.initial_image_button_class = "initial-image btn btn-secondary";
                this.mask_button_class = "btn btn-primary";
                this.restore_button_class = "btn btn-secondary";
                this.move_button_class = "btn btn-secondary";
            } else if (control == "initial") {
                this.image_strength_visible = true;
                this.masking_controls_visible = false;
                this.initial_image_button_class = "initial-image btn btn-primary";
                this.mask_button_class = "btn btn-secondary";
                this.restore_button_class = "btn btn-secondary";
                this.move_button_class = "btn btn-secondary";
            }  else if (control == "restore") {
                this.image_strength_visible = false;
                this.masking_controls_visible = true;
                this.initial_image_button_class = "initial-image btn btn-secondary";
                this.mask_button_class = "btn btn-secondary";
                this.restore_button_class = "btn btn-primary";
                this.move_button_class = "btn btn-secondary";
            }  else if (control == "move") {
                this.image_strength_visible = false;
                this.masking_controls_visible = false;
                this.initial_image_button_class = "initial-image btn btn-secondary";
                this.mask_button_class = "btn btn-secondary";
                this.restore_button_class = "btn btn-secondary";
                this.move_button_class = "btn btn-primary";
            }
        },
        getMousePos(event) {
            const rect = this.canvas.getBoundingClientRect();
            this.x =  (event.clientX - rect.left);
            this.y =  (event.clientY - rect.top);
            if (this.is_drawing) {
                this.points.push({
                    x: (this.x),
                    y: (this.y),
                    j: 'L'
                });
            }
        },
        stopDrawing(event) {
            this.is_drawing = false;
            if (this.points.length > 0) {
                const M = this.points.filter((p) => p.j == 'M')[0];
                const L = this.points.filter((p) => p.j == 'L');
                const path = `M ${M.x} ${M.y} ${L.map((p) => `${p.j} ${p.x} ${p.y}`).join(' ')}`;
                this.svg_paths.push(path);
                this.points = [];
                console.log(this.svg_paths);
            }
        },
        startDrawing(event) {
            const rect = this.canvas.getBoundingClientRect();
            this.x =  (event.clientX - rect.left);
            this.y =  (event.clientY - rect.top);
            this.is_drawing = true;
            this.start_x = this.x;
            this.start_y = this.x;
            this.points.push({
                x: (this.x),
                y: (this.y),
                j: 'M'
            });
        },
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files
            if (!files.length) {
            return
            }
            this.createImage(files[0])
        },
        createImage(file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                this.$refs.uploaded_image.src = e.target?.result;
                this.uploaded_image = e.target?.result;
                this.$refs.svg_image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.uploaded_image);
                this.$refs.svg_image_2.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.uploaded_image);
                
            }
            reader.readAsDataURL(file); 
        },
    },
    computed: {
        cursor() {
            const A = `display: block;`,
                E = `left: ${this.x}px; top: ${this.y}px;`,
                O = `width: ${this.brush_size}px;`,
                F = `height: ${this.brush_size}px;`,
                z = `filter: blur(${5*this.brush_blur/100}px);`,
                j = `border-width: ${Math.max(5,10*this.brush_blur/100)}px;`;
            return `${A} ${E} ${O} ${F} ${z} ${j}`
        },
        cursorv3dr() {
            const A = `display: block;`,
                E = `left: ${this.x - (this.brush_size/2)}px; top: ${this.y - (this.brush_size/2)}px;`,
                O = `width: ${this.brush_size}px;`,
                F = `height: ${this.brush_size}px;`,
                z = `filter: blur(${5*this.brush_blur/100}px);`,
                j = `border-width: ${Math.max(5,10*this.brush_blur/100)}px;`;
                return `${A} ${E} ${O} ${F} ${z} ${j}`
        }
    },
    emits: ["closed", "preview-updated"],
    setup(props, context) {
        const { emit } = context;
        const close = () => {
            emit("closed");
        };
        const updatePreview = () => {
            emit("preview-updated");
        };
        return {
            close,
            updatePreview
        };
    },
    components: { ControlSlider }
}
</script>