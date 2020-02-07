<template>
  <div>
    <div id="scene" v-if="sceneInstance">
        
        <Layer v-for="(layer,index) in layers" 
               :ref="'layer-'+index" 
               :id="index+1" 
               :on="layer.active" 
               :selected-layer="selectedLayer" 
               :scene-instance="sceneInstance">
        </Layer>

        <dialog-drag id="particles" title="Layer Select">
          Layer <input type="number" min="1" max="6" v-model="selectedLayer"/>
          <input type="checkbox" v-model="layers[selectedLayer-1].active"/>

        </dialog-drag>
    </div>
  </div>
</template>

<script>

import Layer from "./Layer.vue";
import DialogDrag from 'vue-dialog-drag'

export default {
  name: "Scene",
  components: { Layer, DialogDrag },
  data() {
    return {
      game: this.$store.getters.getGame,
      sceneInstance: null,
      selectedLayer:1,
      layers: [{active:true},{active:false},{active:false},{active:false},{active:false},{active:false}]
    };
  },
  mounted() {
    let vm = this;
    
    this.game.scene.add(
      "scene,",
      {
        preload: function preload() {
          this.load.image("sky", "assets/sky.png");
          this.load.image("star", "assets/star.png");
        },
        create: function create() {
          vm.createScene(this);
        }
      },
      true,
      null
    );
  },
  methods: {
    createScene(scene) {
      this.sceneInstance = scene;
    },
    switchLayer(){
      this.layers[this.selectedLayer-1].active = !this.layers[this.selectedLayer-1].active  
    },
    setPosition(event){
      let nm = "layer-" + String(this.selectedLayer-1)
      this.$refs[nm][0].setPosition(event)
    }

  }
};
</script>
