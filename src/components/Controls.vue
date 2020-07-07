<template>

  <div v-show="on == true">
    <!-- <audio id="player" controls></audio> -->
    <div id="controls">  <!--  @mouseenter="preventPosition = true" @mouseleave="preventPosition = false" -->

      <dialog-drag v-for="(group,index) in layerGroups" :key="'layer-'+index" 
            :x="group.dialogX"
            :y="group.dialogY"
            :index="'layer-'+index" 
            :id="group.name" 
            :title="group.name" 
            :options="getLayerDialogOptions(group)"
            @drag-end="updateLayerGroups">
        <!-- Layer propreties -->
        <div v-for="(prop,key) in layerProps" v-if="prop.group == group.name">
          <div style="box-shadow:1px 1px 5px #b5b1e4;padding:3px;margin:5px;">
            <div style="width:45%;float:left" @mouseup="updateDefaultPreset">
              <div>{{key}}</div>
              <knob-control :min="prop.min" :max="prop.max" :stroke-width="8" :size="60" v-model="prop.value" ></knob-control>
            </div>
            <div style="width:45%;float:right" @mouseup="updateDefaultPreset">
              <div>&nbsp;{{key}}</div> 
              <knob-control :min="prop.min" :max="prop.max" :stroke-width="8" :size="60" v-model="prop.audioValue" ></knob-control>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>

        <!-- <knob-control v-if="audioRange" :min="0" :max="100" :stroke-width="8" :size="80" v-model="audioRange.audioVolume"></knob-control> -->

      </dialog-drag>

      <dialog-drag v-for="(group,index) in particleGroups" 
            :key="'particle-'+index" 
            :index="'particle-'+index" 
            :id="group.name" 
            :title="group.name" 
            :options="getParticleDialogOptions(group)"
            @drag-end="updateParticleGroups">

          <!-- Particle propreties -->
          <div v-for="(prop,key) in layerProps.particleCreateProps" v-if="layerProps.particleCreateProps[key].group == group.name">

            <div style="box-shadow:1px 1px 5px #b5b1e4;padding:3px;margin:5px;opacity:1">
              <div style="width:45%;float:left" @mouseup="updateDefaultPreset">
                <div>{{key}}</div>
                <knob-control :min="layerProps.particleCreateProps[key].min" 
                              :max="layerProps.particleCreateProps[key].max" 
                              :stroke-width="8" 
                              :size="60" 
                              v-model="layerProps.particleCreateProps[key].value" 
                              ></knob-control>
              </div>
              <div style="width:45%;float:right" @mouseup="updateDefaultPreset">
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
          <!-- <input type="color" name="favcolor" @change="selectColor" /> -->
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
      // layerProps:this.props,
      preventPosition:false,
      particleGroups : [{name:"Colours",on:true,dialogX:0,dialogY:0},{name:"Scale",on:true,dialogX:0,dialogY:0},{name:"Effects",on:true,dialogX:0,dialogY:0}],
      layerGroups : [{name:"Life",on:true,dialogX:0,dialogY:0},{name:"Pen",on:true,dialogX:0,dialogY:0}]
    }
  },
  created(){
    
  },
  mounted() {
    let vm = this;
    // Get stored dialog positions
    let pGroups = localStorage.getItem('particleGroups')
    let lGroups = localStorage.getItem('layerGroups')
    if(pGroups){
      this.particleGroups = JSON.parse(pGroups)
    }
    if(lGroups){
      this.layerGroups = JSON.parse(lGroups)
    }
  },
  destroyed() {
  },
  methods: {
    updateDefaultPreset(){
      this.$emit('updateDefaultPreset')
    },
    getLayerDialogOptions(group){
      return {
        x:this.layerGroups.find(l=> l.name == group.name).dialogX,
        y:this.layerGroups.find(l=> l.name == group.name).dialogY,
        buttonClose:false
      }
    },
    getParticleDialogOptions(group){
      return {
        x:this.particleGroups.find(l=> l.name == group.name).dialogX,
        y:this.particleGroups.find(l=> l.name == group.name).dialogY,
        buttonClose:false
      }
    },    
    updateLayerGroups(d){
      this.layerGroups.find(l=> l.name == d.id).dialogX = d.x
      this.layerGroups.find(l=> l.name == d.id).dialogY = d.y
      localStorage.setItem('layerGroups',JSON.stringify(this.layerGroups))
    },
    updateParticleGroups(d){
      this.particleGroups.find(l=> l.name == d.id).dialogX = d.x
      this.particleGroups.find(l=> l.name == d.id).dialogY = d.y
      localStorage.setItem('particleGroups',JSON.stringify(this.particleGroups))
    },
    selectColor(col) {
      // this.layerProps.particleCreateProps.tint = parseInt(col.currentTarget.value.replace("#","0x"))
    },
    setPosition(event){
      if(this.preventPosition == false){
        this.layerProps.x.value = event.clientX
        this.layerProps.y.value = event.clientY
        this.updateDefaultPreset()
      }
    },
    setPositionLimits(x,y){
      this.layerProps.x.max = x
      this.layerProps.y.max = y
    },
    // particlePropChange(item) {
    //   if (item.audio == true) {
    //     this.layerProps.particleCreateProps[item.prop].audioValue =
    //       item.value;
    //   } else {
    //     this.layerProps.particleCreateProps[item.prop].value = item.value;
    //   }

    //   console.log(item);
    // },
    // emitterPropChange(item) {
    //   if (item.audio == true) {
    //     this.layerProps[item.prop].audioValue = item.value;
    //   } else {
    //     this.layerProps[item.prop].value = item.value;
    //   }
    // },
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

<style>
  .dialog-drag {
    background-color:#f0f0f070 !important;
  }
  .dialog-drag .dialog-body {
    padding:0 !important;
  } 
 .dialog-drag .dialog-header {
   background-color:#f0f0f070 !important;
 }

</style>
