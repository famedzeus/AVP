<template>

  <div v-show="on == true">
    <!-- <audio id="player" controls></audio> -->
    <div id="controls">  <!--  @mouseenter="preventPosition = true" @mouseleave="preventPosition = false" -->

      <dialog-drag v-for="group in layerGroups" :id="group.name" :title="group.name" :options="{buttonClose:false}">

        <!-- Layer propreties -->
        <div v-for="(prop,key) in layerProps" v-if="prop.group == group.name">
          <div style="box-shadow:1px 1px 5px #b5b1e4;padding:3px;margin:5px;">
            <div style="width:45%;float:left">
              <div>{{key}}</div>
              <knob-control :min="prop.min" :max="prop.max" :stroke-width="8" :size="60" v-model="prop.value" ></knob-control>
            </div>
            <div style="width:45%;float:right">
              <div>&nbsp;{{key}}</div> 
              <knob-control :min="prop.min" :max="prop.max" :stroke-width="8" :size="60" v-model="prop.audioValue" ></knob-control>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>

        <!-- <knob-control v-if="audioRange" :min="0" :max="100" :stroke-width="8" :size="80" v-model="audioRange.audioVolume"></knob-control> -->

      </dialog-drag>

      <dialog-drag v-for="group in particleGroups" :id="group.name" :title="group.name" :options="{buttonClose:false}">

          <!-- Particle propreties -->
          <div v-for="(prop,key) in layerProps.particleCreateProps" v-if="layerProps.particleCreateProps[key].group == group.name">

            <div style="box-shadow:1px 1px 5px #b5b1e4;padding:3px;margin:5px;opacity:1">
              <div style="width:45%;float:left">
                <div>{{key}}</div>
                <knob-control :min="layerProps.particleCreateProps[key].min" 
                              :max="layerProps.particleCreateProps[key].max" 
                              :stroke-width="8" 
                              :size="60" 
                              v-model="layerProps.particleCreateProps[key].value" 
                              ></knob-control>
              </div>
              <div style="width:45%;float:right">
                <div>{{key}}</div>
                <knob-control :min="layerProps.particleCreateProps[key].audioRange[0]" 
                              :max="layerProps.particleCreateProps[key].audioRange[1]" 
                              :stroke-width="8" 
                              :size="60" 
                              v-model="layerProps.particleCreateProps[key].audioValue" 
                              ></knob-control>
              </div>
              <div style="clear:both"></div>
            </div>


          </div>
          <input type="color" name="favcolor" @change="selectColor" />
          <!-- {{particles.length}} -->
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
  name: "Controls",
  props: {
    // id:Number,
    // selectedLayer:Number,
    on:Boolean,
    layerProps:Object
  },
  components: { Slider, KnobControl, DialogDrag},

  data() {
    return {
      preventPosition:false,
      particleGroups : [{name:"Colours",on:true},{name:"Scale",on:true},{name:"Effects",on:true}],
      layerGroups : [{name:"Life",on:true},{name:"Pen",on:true}],
    }
  },
  mounted() {
    let vm = this;
  },
  destroyed() {
  },
  watch:{
    ["layerProps.frequency.value"](){
      this.changeFrequency()  
    }
  },
  methods: {

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
    },
    // startDragDialog(){
    //   this.preventPosition = true
    //   this.$emit('preventPosition',true)
    // },
    // endDragDialog(){
    //   this.preventPosition = false
    //   this.$emit('preventPosition',false)
    //   console.log(e)
    // }
  }
};
</script>
