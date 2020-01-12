export class Particle {

  constructor(objectKey, sceneInstance, emitterProps){
    this.particle = sceneInstance.add.image(Number(emitterProps.x.value), Number(emitterProps.y.value), objectKey);
    this.objectKey = objectKey
    this.emitterProps = emitterProps

    this.life = emitterProps.life.value
    this.lifeCount = this.life

    // straight prop to particle mappings
    Object.keys(emitterProps.particleCreateProps).forEach((key,index) => {
      this.particle[key] = emitterProps.particleCreateProps[key].value

      // Exceptions
      // Color (tint)
      let red = this.hexToDec('red')
      let green = this.hexToDec('green')
      let blue = this.hexToDec('blue')
      let h = `0x${red}${green}${blue}`
      this.particle['tint'] = parseInt(h,16)
    })

    this.dead = false
  }

  update(){
    
    // Mandatory emitter effects
    this.particle.x += Number(this.emitterProps.windX.value)
    this.particle.y += Number(this.emitterProps.windY.value)
    this.particle.alpha = this.lifeCount/this.life
    this.particle.rotation += Number(this.emitterProps.particleCreateProps.rotation.value/1000)

    // this.particle.scaleY = Math.random()*10
    // this.particle.scaleX = 2
    // this.particle.setRotation(this.rotation)
    // this.rotation+=0.1
    // this.particle.tint = 0xff0000
    // this.particle.setAlpha(0.3,0.7,0.4,1)    

    // Mandatory life effect
    if(this.lifeCount <= 0 && !this.dead){
      this.dead = true
      this.particle.destroy()
    } else {
      this.lifeCount -= 1
    }
    
  }

  hexToDec(key){
    let hex = Number(this.emitterProps.particleCreateProps[key].value).toString(16)
    if(this.emitterProps.particleCreateProps[key].value < 10){
      hex = "0"+hex
    }
    return hex
  }



}