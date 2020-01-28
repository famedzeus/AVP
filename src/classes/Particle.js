export class Particle {

  constructor(objectKey, sceneInstance, emitterProps, audioVolume){
    this.particle = sceneInstance.add.image(Number(emitterProps.x.value), Number(emitterProps.y.value), objectKey);
    this.objectKey = objectKey
    this.emitterProps = emitterProps
    this.audioVolume = audioVolume

    this.life = emitterProps.life.value
    this.lifeCount = this.life

    // straight prop to particle mappings
    Object.keys(emitterProps.particleCreateProps).forEach((key,index) => {
      this.particle[key] = emitterProps.particleCreateProps[key].value

      // Exceptions

      // Apply audio to color
      // let rotation_v = audioVolume * Number(this.emitterProps.particleCreateProps.rotation.audioValue) || 1

      let red_v = this.volumeFactor(this.emitterProps.particleCreateProps['red'], audioVolume, 'red', 10, 255)
      let green_v = this.volumeFactor(this.emitterProps.particleCreateProps['green'], audioVolume, 'green', 10, 255)
      let blue_v = this.volumeFactor(this.emitterProps.particleCreateProps['blue'], audioVolume, 'blue', 10, 255)

      // Color (tint)
      let red = this.decToHex(Number(this.emitterProps.particleCreateProps['red'].value) + Math.floor(red_v))
      let green = this.decToHex(Number(this.emitterProps.particleCreateProps['green'].value) + Math.floor(green_v))
      let blue = this.decToHex(Number(this.emitterProps.particleCreateProps['blue'].value) + Math.floor(blue_v))

      let h = `0x${red}${green}${blue}`
      this.particle['tint'] = parseInt(h,16)
    })

    this.dead = false
  }

  update(audioVolume){
    
    // audioVolume = audioVolume / 1000

    // Mandatory emitter effects
    let windX_v = this.volumeFactor(this.emitterProps.windX, audioVolume, 'windX', 2000)
    this.particle.x += Number(this.emitterProps.windX.value) + windX_v
    let windY_v = this.volumeFactor(this.emitterProps.windY, audioVolume, 'windY', 2000)
    this.particle.y += Number(this.emitterProps.windY.value) + windY_v
    
    this.particle.alpha = this.lifeCount/this.life

    // Particle effects
    
    // Rotation
    let angle_v = this.volumeFactor(this.emitterProps.particleCreateProps.angle, audioVolume, 'angle', 10)
    this.particle.angle += Number(this.emitterProps.particleCreateProps.angle.value) * angle_v

    // Scale
    let scaleX_v = this.volumeFactor(this.emitterProps.particleCreateProps.scaleX, audioVolume, 'scaleX', 10)
    this.particle.scaleX = Number(this.emitterProps.particleCreateProps.scaleX.value) + scaleX_v
    let scaleY_v = this.volumeFactor(this.emitterProps.particleCreateProps.scaleY, audioVolume, 'scaleY', 10)
    this.particle.scaleY = Number(this.emitterProps.particleCreateProps.scaleY.value) + scaleY_v

    // Mandatory life effect
    if(this.lifeCount <= 0 && !this.dead){
      this.dead = true
      this.particle.destroy()
    } else {
      this.lifeCount -= 1
    }
    
  }

  volumeFactor(param, audioVolume, prop, tenuation, clip){
    let factor = audioVolume * Number(param.audioValue)
    factor = factor == 0 ? 1 : factor
      // if(clip){
      //   factor = factor > clip ? clip : factor
      // }
    return factor / tenuation
  }

  decToHex(v){
    v = v > 255 ? 255 : v
    let hex = v.toString(16)
    if(v < 10){
      hex = "0"+hex
    }
    return hex
  }



}