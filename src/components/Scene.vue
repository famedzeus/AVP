<template>
  <div>
    <div id="scene" v-if="sceneInstance">
      
      <div v-if="visual[selectedLayer-1]">
        
        <Layer
          v-for="(layer,index) in visual"
          :key="index"
          :layer-number="index"
          :ref="'layer-'+index"
          :on="visual[index].on.value"
          :scene-instance="sceneInstance"
          :layerProps="visual[index]"
          @layer-props="setLayerProps"
        ></Layer>

        <!-- LAYER SELECT -->
        <div>
          <dialog-drag id="particles" title="Layer">
            <input type="number" min="1" max="6" v-model="selectedLayer" />
            <input type="checkbox" @change="switchLayer" v-model="visual[selectedLayer-1].on.value" />
          </dialog-drag>
        </div>

        <!-- IMAGE SELECT -->
        <div>
          <dialog-drag title="Image">
            <img width="100" height="100" style="background-color:black" :src="visual[selectedLayer-1].image.value" />
          </dialog-drag>
        </div>

        <controls ref="controls" :on="visual[selectedLayer-1].on.value" :layer-props="visual[selectedLayer-1]" @changeImage="loadImage" @updateDefaultPreset="updateDefaultPreset"></controls>

      </div>

    </div>
  </div>
</template>

<script>
import Layer from "./Layer.vue";
import Controls from "./Controls.vue";
import DialogDrag from "vue-dialog-drag";

export default {
  name: "Scene",
  components: { Layer, Controls, DialogDrag },
  data() {
    return {
      game: this.$store.getters.getGame,
      sceneInstance: null,
      selectedLayer: 1,
      visual:[],
      preventPosition:false,
      layerProps: this.$store.getters.getLayerProps,
      layerGroups: [
        { name: "Life", on: true },
        { name: "Pen", on: true }
      ]
    };
  },
  mounted() {
    let vm = this;

    this.game.scene.add(
      "scene,",
      {
        preload: function preload() {
          // this.load.image("sky", "assets/sky.png");
          // this.load.image("star", "assets/star.png");
        },
        create: function create() {
          vm.createScene(this);
        }
      },
      true,
      null
    )

  },
  created(){
    let vm = this
    // get default visual
    vm.visual = JSON.parse(localStorage.getItem('defaultVisual'))
    if(!vm.visual){
      this.$store.dispatch('fetchDefaultVisual').then(response => {
        vm.visual = response.data
      })
    }
  },
  methods: {
    loadImage(){
      this.game.load.image("star", "assets/star.png");
    },
    updateDefaultPreset(){
      localStorage.setItem('defaultVisual',JSON.stringify(this.visual))
    },
    createScene(scene) {
      this.sceneInstance = scene;
    },
    switchLayer() {
      this.updateDefaultPreset()
    },
    setPosition(event) {
      let nm = "layer-" + String(this.selectedLayer - 1);
      this.$refs['controls'].setPosition(event);
    },
    dragLayerDialog(e) {
      console.log(e);
    },
    setLayerProps(props) {
      this.layerProps = props;
    }
  },
  watch: {
    visual(){
      console.log('change')
    }
  }
};
</script>
