<template>
  <div>
    <div id="scene" v-if="sceneInstance">
      
      <div v-if="visual[selectedLayer-1]">
        
        <Layer
          v-for="(layer,index) in layers"
          :key="index"
          :ref="'layer-'+index"
          :on="layers[index].active"
          :scene-instance="sceneInstance"
          :layerProps="visual[index]"
          @layer-props="setLayerProps"
        ></Layer>


        <div>
          <dialog-drag id="particles" title="Layer Select">
            Layer
            <input type="number" min="1" max="6" v-model="selectedLayer" />
            <input type="checkbox" v-model="layers[selectedLayer-1].active" />
          </dialog-drag>
        </div>
        
        <controls ref="controls" :on="layers[selectedLayer-1].active" :layerProps="visual[selectedLayer-1]"></controls>

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
      layers: [
        { active: true },
        { active: false },
        { active: false },
        { active: false },
        { active: false },
        { active: false }
      ],
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
          this.load.image("sky", "assets/sky.png");
          this.load.image("star", "assets/star.png");
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
    this.$store.dispatch('fetchVisual').then(response => {
      vm.visual = response.data
    })
  },
  methods: {
    createScene(scene) {
      this.sceneInstance = scene;
    },
    switchLayer() {
      this.layers[this.selectedLayer - 1].active = !this.layers[
        this.selectedLayer - 1
      ].active;
    },
    setPosition(event) {
      if(this.preventPosition == false){
        let nm = "layer-" + String(this.selectedLayer - 1);
        this.$refs['controls'].setPosition(event);
      }
    },
    dragLayerDialog(e) {
      console.log(e);
    },
    setLayerProps(props) {
      this.layerProps = props;
    }
  }
};
</script>
