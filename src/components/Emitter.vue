<template>
  <div></div>
</template>

<script>
export default {
  name: "Emitter",
  props: {
    sceneInstance: Object
  },
  data() {
    return {
      // game: this.$store.getters.getGame
    };
  },
  mounted() {
    let vm = this;
    var particles = this.sceneInstance.add.particles("bomb");
    var emitter = particles.createEmitter();
    emitter.setPosition(400, 300);
    emitter.setSpeed(200);
    emitter.setBlendMode(Phaser.BlendModes.ADD);
  },
  methods: {

  }
};
</script>
