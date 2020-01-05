<template>
  <div>
    <a href="#" @click="test">Test </a>
  </div>
</template>

<script>

import { EmitterOp } from 'phaser'

export default {
  name: "Emitter",
  props: {
    sceneInstance: Object
  },
  data() {
    return {
      emitterOp:Object,
      emitter:Object,
      game: this.$store.getters.getGame
    };
  },
  mounted() {
    let vm = this;
    var particles = this.sceneInstance.add.particles("star");
    this.emitter = particles.createEmitter(
      {
        x:400,
        y:200,
        // y:{
        //   onEmit:function(particle,key,t,value){
        //     return Math.random()*300
        //   }
        // },
        speed:130,
        alpha:{start:1,end:0},
        tint:[0xffffff,0xff0000,0xffff00],
        // tint:{start:0xffffff,end:0xff0000},
        rotate:{
          onEmit:function(particle,key,t,value){
            return Math.random()*360
          }
        },
        scaleX:4,
        scaleY:4,
        // scaleX:{
        //   onEmit:function(particle,key,t,value){
        //     return Math.random()*30
        //   }
        // },
      }
    );
    // this.emitter.setPosition(400, 300);
    // this.emitter.setSpeed(200);
    // this.emitter.setBlendMode(Phaser.BlendModes.ADD);
    // this.emitter.rotate.propertyValue = 0;
    // this.emitter.scaleX.propertyValue = 5;
    // this.emitter.speedX.propertyValue = 125;
    
    

  },
  methods: {
    test(){
      this.emitter.forEachAlive((particle) => {
        let p = particle      
        // if (particle.body.velocity.y > 100) {
        //   if (particle.animations.sprite.rotation >= 0 && particle.animations.sprite.rotation < Math.PI) {
        //     particle.animations.sprite.rotation += Math.PI / 40;
        //     if (particle.animations.sprite.rotation > Math.PI) {
        //       particle.animations.sprite.rotation = Math.PI;
        //     }
        //   }
        // }
      });

    }

  }
};
</script>
