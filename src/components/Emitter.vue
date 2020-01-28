<template>
  <div>
    <!-- <audio id="player" controls></audio> -->
    <div style="position:absolute;left:10px;top:100px">
      <!-- <joypad @update="updateParameter"></joypad> -->
      <!-- <input type="number" v-model="emitterProps.particleCreateProps.scaleX" min="0" max="20" />-->
      <input type="number" @change="setAudioInputVolume" min="0" max="1" step="0.01" />

      <!-- Emitter propreties -->
      <div v-for="(prop,key) in emitterProps" v-if="prop.min">
        <!-- <label :for="key">{{key}}</label> -->
        <div style="box-shadow:1px 1px 5px #b5b1e4;padding:3px;margin:5px;">
          <div style="width:40%;float:left">
            <div>{{key}} {{emitterProps[key].value}}</div>
            <knob-control :min="prop.min" :max="prop.max" :stroke-width="8" :size="80" v-model="prop.value" @change="prop.change"></knob-control>
            <!-- <Slider
              :prop="key"
              v-model="prop.value"
              :min="prop.min"
              :max="prop.max"
              @change="prop.change"
            ></Slider> -->
          </div>
          <div style="width:40%;float:left">
            <div>{{key}} audio {{emitterProps[key].audioValue}}</div> 
            <knob-control :min="prop.min" :max="prop.max" :stroke-width="8" :size="80" v-model="prop.audioValue" @change="prop.change"></knob-control>
            <!--
            <Slider
              :prop="key"
              v-model="prop.audioValue"
              :audio="true"
              :min="prop.min"
              :max="prop.max"
              @change="prop.change"
            ></Slider> -->
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <!-- Particle propreties -->
      <div v-for="(prop,key) in emitterProps.particleCreateProps">
        <!-- <label :for="key">{{key}}</label> -->
        <div style="box-shadow:1px 1px 5px #b5b1e4;padding:3px;margin:5px;">
          <div style="width:45%;float:left">
            <div>{{key}} {{emitterProps.particleCreateProps[key].value}}</div>
            <Slider
              :prop="key"
              v-model="emitterProps.particleCreateProps[key].value"
              :min="emitterProps.particleCreateProps[key].min"
              :max="emitterProps.particleCreateProps[key].max"
              @change="emitterProps.particleCreateProps[key].change"
            ></Slider>
          </div>
          <div style="width:45%;float:right">
            <div>{{key}} audio {{emitterProps.particleCreateProps[key].audioValue}}</div>
            <Slider
              :prop="key"
              :audio="true"
              v-model="emitterProps.particleCreateProps[key].audioValue"
              :min="-100"
              :max="100"
              @change="emitterProps.particleCreateProps[key].change"
            ></Slider>
          </div>
          <div style="clear:both"></div>
        </div>

        <!-- <input :id="key" 
            type="number" 
              v-model="emitterProps.particleCreateProps[key].value" 
              @change="emitterProps.particleCreateProps[key].change"
              :min="emitterProps.particleCreateProps[key].min" 
              :max="emitterProps.particleCreateProps[key].max" />
        <input :id="key" 
            type="number" 
            v-model="emitterProps.particleCreateProps[key].audioValue" 
              min="-100" 
        max="100" />-->
      </div>
      <input type="color" name="favcolor" @change="selectColor" />
      {{particles.length}}
      Audio:{{audioVolume}}
    </div>
  </div>
</template>

<script>
import Slider from "./Slider.vue";
import { Particle } from "../classes/Particle.js";
import KnobControl from 'vue-knob-control'

export default {
  name: "Emitter",
  props: {
    sceneInstance: Object
  },
  components: { Slider, KnobControl },

  data() {
    return {
      particles: [],
      updateEmitter: null,
      updateParticles: null,
      emitter: Object,
      audioVolume: 0,
      oneShotAudio: true,
      graphics: null,
      game: this.$store.getters.getGame,

      emitterProps: {
        frequency: {
          value: "100",
          min: 1,
          max: 500,
          change: () => {
            this.changeFrequency();
          }
        },
        life: {
          value: "100",
          min: 1,
          max: 500,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        x: {
          value: "300",
          min: 1,
          max: 800,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        y: {
          value: "300",
          min: 1,
          max: 600,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        windX: {
          value: "0",
          min: -100,
          audioValue: "0",
          max: 100,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        windY: {
          value: "0",
          min: -100,
          audioValue: "0",
          max: 100,
          change: item => {
            this.emitterPropChange(item);
          }
        },
        particleCreateProps: {
          red: {
            value: "5",
            min: 0,
            max: 255,
            audioValue: "0",
            change: item => {
              this.particlePropChange(item);
            }
          },
          green: {
            value: "5",
            min: 0,
            max: 255,
            audioValue: "0",
            change: item => {
              this.particlePropChange(item);
            }
          },
          blue: {
            value: "10",
            min: 0,
            max: 255,
            audioValue: "0",
            change: item => {
              this.particlePropChange(item);
            }
          },
          scaleX: {
            value: "5",
            min: 1,
            max: 30,
            audioValue: "0",
            change: item => {
              this.particlePropChange(item);
            }
          },
          scaleY: {
            value: "5",
            min: 1,
            max: 30,
            audioValue: "0",
            change: item => {
              this.particlePropChange(item);
            }
          },
          angle: {
            value: "0",
            min: -360,
            max: 360,
            audioValue: "0",
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

    this.init();
  },
  destroyed() {
    clearInterval(this.updateEmitter);
  },
  methods: {
    init() {
      // this.audioShape = new AudioShape();

      // Create particles interval
      this.updateEmitter = setInterval(() => {
        this.audioVolume = this.$audioShape.getAudioVolume();

        this.particles.push(
          new Particle(
            "star",
            this.sceneInstance,
            this.emitterProps,
            this.audioVolume
          )
        );

        // remove dead particles
        this.particles = this.particles.filter(particle => {
          return particle.dead == false;
        });
      }, Number(this.emitterProps.frequency.value));

      // Update active particles interval
      this.updateParticles = setInterval(() => {
        this.particles.forEach(particle => {
          particle.update(this.audioVolume);
        });
      }, 10);
    },
    updateParameter(param) {
      // this.emitterProps.particleCreateProps['scaleX'] = param.x
    },
    selectColor(col) {
      // this.emitterProps.particleCreateProps.tint = parseInt(col.currentTarget.value.replace("#","0x"))
    },
    changeFrequency() {
      clearInterval(this.updateEmitter);
      clearInterval(this.updateParticles);
      this.init();
    },
    particlePropChange(item) {
      if (item.audio == true) {
        this.emitterProps.particleCreateProps[item.prop].audioValue =
          item.value;
      } else {
        this.emitterProps.particleCreateProps[item.prop].value = item.value;
      }

      console.log(item);
    },
    emitterPropChange(item) {
      if (item.audio == true) {
        this.emitterProps[item.prop].audioValue = item.value;
      } else {
        this.emitterProps[item.prop].value = item.value;
      }
    },
    setAudioInputVolume(v) {
      this.$audioShape.setAudioInputLevel(Number(v.currentTarget.value));
    }
  }
};
</script>
