<template>

  <div v-show="selectedLayer == id && on == true">
    <!-- <audio id="player" controls></audio> -->
    <div @mousedown="preventPosition = true" @mouseup="preventPosition = false">
      <dialog-drag id="emitter" title="Layer" :options="{buttonClose:false,top:'100'}">
      <!-- <div style="position:absolute;left:10px;top:100px"> -->
        <!-- <joypad @update="updateParameter"></joypad> -->
        <!-- <input type="number" v-model="layerProps.particleCreateProps.scaleX" min="0" max="20" />-->
        <input type="number" @change="setAudioInputVolume" min="0" max="1" step="0.01" />

        <!-- Layer propreties -->
        <div v-for="(prop,key) in layerProps" v-if="prop.min">
          <!-- <label :for="key">{{key}}</label> -->
          <div style="box-shadow:1px 1px 5px #b5b1e4;padding:3px;margin:5px;">
            <div style="width:45%;float:left">
              <div>{{key}}</div>
              <knob-control :min="prop.min" :max="prop.max" :stroke-width="8" :size="80" v-model="prop.value" @change="prop.change"></knob-control>
            </div>
            <div style="width:45%;float:right">
              <div><span class="fas fa-check"></span>&nbsp;{{key}}</div> 
              <knob-control :min="prop.min" :max="prop.max" :stroke-width="8" :size="80" v-model="prop.audioValue" @change="prop.change"></knob-control>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>
        <!-- {{255-(layerProps.particleCreateProps['red'].audioValue) - audioRange.audioVolume}} -->
        <knob-control v-if="audioRange" :min="0" :max="100" :stroke-width="8" :size="80" v-model="audioRange.audioVolume"></knob-control>

      </dialog-drag>



      <dialog-drag id="particles" title="Particles" :options="{buttonClose:false,left:getWidth()-250}">

          <!-- Particle propreties -->
          <div v-for="(prop,key) in layerProps.particleCreateProps">
            <!-- <label :for="key">{{key}}</label> -->


            <div style="box-shadow:1px 1px 5px #b5b1e4;padding:3px;margin:5px;opacity:1">
              <div style="width:45%;float:left">
                <div>{{key}}</div>
                <knob-control :min="layerProps.particleCreateProps[key].min" 
                              :max="layerProps.particleCreateProps[key].max" 
                              :stroke-width="8" 
                              :size="80" 
                              v-model="layerProps.particleCreateProps[key].value" 
                              @change="layerProps.particleCreateProps[key].change"></knob-control>
              </div>
              <div style="width:45%;float:right">
                <div>{{key}}</div>
                <knob-control :min="layerProps.particleCreateProps[key].audioRange[0]" 
                              :max="layerProps.particleCreateProps[key].audioRange[1]" 
                              :stroke-width="8" 
                              :size="80" 
                              v-model="layerProps.particleCreateProps[key].audioValue" 
                              @change="layerProps.particleCreateProps[key].change"></knob-control>
              </div>
              <div style="clear:both"></div>
            </div>


          </div>
          <input type="color" name="favcolor" @change="selectColor" />
          {{particles.length}}
          <!-- Audio volume:{{audioVolume}} -->
          <!-- Detect:{{audioRange}} -->

      </dialog-drag>

    </div>

  </div>
</template>

<script>
import Slider from "./Slider.vue";
import { Particle } from "../classes/Particle.js";
import KnobControl from 'vue-knob-control'
import DialogDrag from 'vue-dialog-drag'

export default {
  name: "Layer",
  props: {
    sceneInstance: Object,
    id:Number,
    selectedLayer:Number,
    on:Boolean
  },
  components: { Slider, KnobControl, DialogDrag},

  data() {
    return {
      particles: [],
      preventPosition:false,
      updateLayer: null,
      updateParticles: null,
      emitter: Object,
      audioVolume: 0,
      audioRange: 0,
      oneShotAudio: true,
      graphics: null,
      canvas:null,
      game: this.$store.getters.getGame,

      layerProps: {
        frequency: {
          value: 100,
          audioValue: 0,
          min: 1,
          max: 500,
          change: () => {
            this.changeFrequency();
          }
        },
        life: {
          value: 100,
          audioValue: 0,
          min: 1,
          max: 500,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        x: {
          value: 300,
          audioValue: 0,
          min: 1,
          max: 800,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        y: {
          value: 300,
          audioValue: 0,
          min: 1,
          max: 600,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        windX: {
          value: 0,
          min: -100,
          audioValue: 0,
          max: 100,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        windY: {
          value: 0,
          min: -100,
          audioValue: 0,
          max: 100,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        particleCreateProps: {
          red: {
            value: 0,
            min: 0,
            max: 255,
            audioValue: 0,
            audioRange:[0,100],            
            change: item => {
              this.particlePropChange(item);
            }
          },
          green: {
            value: 0,
            min: 0,
            max: 255,
            audioValue: 0,
            audioRange:[0,100],
            change: item => {
              this.particlePropChange(item);
            }
          },
          blue: {
            value: 0,
            min: 0,
            max: 255,
            audioValue: 0,
            audioRange:[0,100],            
            change: item => {
              this.particlePropChange(item);
            }
          },
          scaleX: {
            value: 5,
            min: 1,
            max: 30,
            audioValue: 0,
            audioRange:[-100,100],
            change: item => {
              this.particlePropChange(item);
            }
          },
          scaleY: {
            value: 5,
            min: 1,
            max: 30,
            audioValue: 0,
            audioRange:[-100,100],
            change: item => {
              this.particlePropChange(item);
            }
          },
          angle: {
            value: 0,
            min: -360,
            max: 360,
            audioValue: 0,
            audioRange:[-100,100],
            change: item => {
              this.particlePropChange(item);
            }
          }
        }
      }
    };
  },
  mounted() {
    let vm = this;

    this.graphics = this.sceneInstance.add.graphics(100, 100);
    this.graphics.lineStyle(10, 0xff0000, 0.8);
    // this.graphics.beginFill(0xFF700B, 1);

// Layer placement click
    this.canvas = document.getElementsByTagName('canvas')[0]
    // this.canvas.onclick = (event) => {
    //   vm.positionLayer(event)
    //   console.log(event)
    // }


    this.init();
  },
  destroyed() {
    clearInterval(this.updateLayer);
  },
  methods: {
    init() {

      let vm = this

      this.layerProps.x.max = this.canvas.width
      this.layerProps.y.max = this.canvas.height

      // this.audioShape = new AudioShape();

      // Create particles interval
      this.updateLayer = setInterval(() => {

        if(this.on == true){

          this.audioVolume = this.$audioShape.getAudioVolume();

          this.audioRange = this.$audioShape.getRangeDetection();
          // Colours require range on their audio sensitivity range
          // this.layerProps.particleCreateProps['red'].audioRange[1] = Math.floor(this.audioRange.range)
          // this.layerProps.particleCreateProps['green'].audioRange[1] = Math.floor(this.audioRange.range)
          // this.layerProps.particleCreateProps['blue'].audioRange[1] = Math.floor(this.audioRange.range)

          this.particles.push(
            new Particle(
              "star",
              this.sceneInstance,
              this.layerProps,
              this.audioVolume,
              this.audioRange
            )
          );

          // remove dead particles
          this.particles = this.particles.filter(particle => {
            return particle.dead == false;
          });
        }
      }, Number(this.layerProps.frequency.value));

      // Update active particles interval
      this.updateParticles = setInterval(() => {
        this.particles.forEach(particle => {
          particle.update(this.audioVolume);
        });
      }, 10);
    },
    getWidth(){
      return window.innerWidth
    },
    updateParameter(param) {
      // this.layerProps.particleCreateProps['scaleX'] = param.x
    },
    selectColor(col) {
      // this.layerProps.particleCreateProps.tint = parseInt(col.currentTarget.value.replace("#","0x"))
    },
    setPosition(event){
      if(this.preventPosition == false){
        this.layerProps.x.value = event.clientX
        this.layerProps.y.value = event.clientY
      }
    },
    setPositionLimits(x,y){
      this.layerProps.x.max = x
      this.layerProps.y.max = y
    },
    changeFrequency() {
      clearInterval(this.updateLayer);
      clearInterval(this.updateParticles);
      this.init();
    },
    particlePropChange(item) {
      if (item.audio == true) {
        this.layerProps.particleCreateProps[item.prop].audioValue =
          item.value;
      } else {
        this.layerProps.particleCreateProps[item.prop].value = item.value;
      }

      console.log(item);
    },
    emitterPropChange(item) {
      if (item.audio == true) {
        this.layerProps[item.prop].audioValue = item.value;
      } else {
        this.layerProps[item.prop].value = item.value;
      }
    },
    setAudioInputVolume(v) {
      this.$audioShape.setAudioInputLevel(Number(v.currentTarget.value));
    },
    override(event){
      console.log("!")
      // event.preventBubble()
    }
  }
};
</script>
