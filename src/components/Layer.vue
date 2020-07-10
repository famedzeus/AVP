<template>

  <div>
  </div>

</template>

<script>
import { Particle } from "../classes/Particle.js";

export default {
  name: "Layer",
  props: {
    sceneInstance: Object,
    layerProps: Object,
    // id:Number,
    // selectedLayer:Number,
    on:Boolean,
    layerNumber:Number
  },
  components: { },

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
  watch:{
    ["layerProps.frequency.value"](){
      this.changeFrequency()  
    },
    seletedLayer(){
      this.$emit('layer-props',this.layerProps)
    }
  },
  methods: {
    init() {

      let vm = this

      // load image
      this.game.scene.scenes[0].load.image("image"+this.layerNumber, this.layerProps.image.value)
      this.game.scene.scenes[0].load.start()

      this.layerProps.x.max = this.canvas.width
      this.layerProps.y.max = this.canvas.height

      // this.audioShape = new AudioShape();

      // Create particles interval
      this.updateLayer = setInterval(() => {

        if(this.on == true){

          this.audioVolume = this.$audioShape.getAudioVolume();

          this.audioRange = this.$audioShape.getRangeDetection();

          this.particles.push(
            new Particle(
              this.layerNumber,
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
    },
  }
};
</script>
