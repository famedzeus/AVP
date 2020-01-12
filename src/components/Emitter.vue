<template>
  <div>
    <!-- <audio id="player" controls></audio> -->
    <div style="position:absolute;left:10px;top:100px">
      <!-- <joypad @update="updateParameter"></joypad> -->
      <!-- <input type="number" v-model="emitterProps.particleCreateProps.scaleX" min="0" max="20" />
      <input type="number" v-model="emitterProps.particleCreateProps.scaleY" min="0" max="20" /> -->

      <!-- Emitter propreties -->
      <div v-for="(prop,key) in emitterProps" v-if="prop.value">
        <label :for="key">{{key}}</label>
        <input :id="key" 
            type="number" 
            @change="prop.change"
            v-model="prop.value" 
              :min="prop.min" 
              :max="prop.max" />
      </div>

      <!-- Particle propreties -->
      <div v-for="(prop,key) in emitterProps.particleCreateProps">
        <label :for="key">{{key}}</label>
        <input :id="key" 
            type="number" 
            v-model="emitterProps.particleCreateProps[key].value" 
              @change="emitterProps.particleCreateProps[key].change"
              :min="emitterProps.particleCreateProps[key].min" 
              :max="emitterProps.particleCreateProps[key].max" />
      </div>
      <input type="color" name="favcolor" @change="selectColor"/>

      {{particles.length}}
      Audio:{{audioVolume}}
    </div>

  </div>
</template>

<script>

// import Joypad from './Joypad.vue'
import { Particle } from '../classes/Particle.js'
import { AudioShape } from '../classes/AudioShape.js'

export default {
  name: "Emitter",
  props: {
    sceneInstance: Object
  },
  // components:{Joypad},
  data() {
    return {
      particles:[],
      updateEmitter:null,
      updateParticles:null,
      emitter:Object,
      audioVolume:0,
      oneShotAudio:true,
      graphics:null,
      game: this.$store.getters.getGame,
      audioShape:null,
      
      emitterProps:{
        frequency:{value:100,min:1,max:100,change:()=>{this.changeFrequency()}},
        life:{value:100,min:1,max:500,change:()=>{}},
        x:{value:400,min:0,max:800,change:()=>{}},
        y:{value:300,min:1,max:600,change:()=>{}},
        windX:{value:-2,min:-100,max:100,change:()=>{}},
        windY:{value:-2,min:-100,max:100,change:()=>{}},
        particleCreateProps:{
          red:{value:255,min:0,max:255,change:()=>{ }},
          green:{value:255,min:0,max:255,change:()=>{}},
          blue:{value:255,min:0,max:255,change:()=>{}},
          scaleX:{value:1,min:1,max:30,change:()=>{}},
          scaleY:{value:1,min:1,max:30,change:()=>{}},
          rotation:{value:1,min:-360,max:360,change:()=>{}}
        }
      },

    };
  },
  mounted() {
    let vm = this;
    
    this.graphics = this.sceneInstance.add.graphics(100, 100);
    this.graphics.lineStyle(10, 0xFF0000, 0.8);
    // this.graphics.beginFill(0xFF700B, 1);

    this.init()

  },
  destroyed(){
    clearInterval(this.updateEmitter)
  },
  methods: {
    init(){

      this.audioShape = new AudioShape()

      // Create particles interval
      this.updateEmitter = setInterval(() => {

        this.audioVolume = this.audioShape.getAudioVolume()

        this.particles.push(new Particle('star',this.sceneInstance,this.emitterProps))

        // remove dead particles 
        this.particles = this.particles.filter(particle => {
          return particle.dead == false
        })

      },Number(this.emitterProps.frequency.value))

      // Update active particles interval
      this.updateParticles = setInterval(() => {
        this.particles.forEach(particle => {          
          particle.update()
        })
      },10)

    },
    updateParameter(param){
      // this.emitterProps.particleCreateProps['scaleX'] = param.x
    },
    selectColor(col){
      // this.emitterProps.particleCreateProps.tint = parseInt(col.currentTarget.value.replace("#","0x"))
    },
    changeFrequency(){
      clearInterval(this.updateEmitter)
      clearInterval(this.updateParticles)
      this.init()
    },

  },

};
</script>
