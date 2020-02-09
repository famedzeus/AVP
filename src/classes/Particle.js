export class Particle {

  constructor(objectKey, sceneInstance, layerProps, audioVolume, audioRange){
    this.particle = sceneInstance.add.image(Number(layerProps.x.value), Number(layerProps.y.value), objectKey);
    this.objectKey = objectKey
    this.layerProps = layerProps
    this.audioVolume = audioVolume
    this.audioRange = audioRange

    this.life = layerProps.lifespan.value
    this.lifeCount = this.life

    // straight prop to particle mappings
    Object.keys(layerProps.particleCreateProps).forEach((key,index) => {
      this.particle[key] = layerProps.particleCreateProps[key].value

      // Exceptions

      // Apply audio to color
      // let rotation_v = audioVolume * Number(this.layerProps.particleCreateProps.rotation.audioValue) || 1

      // let range = this.audioShape.getRangeDetection()
      
      let red_v =  0
      let green_v =  0
      let blue_v =  0
      
      if(this.layerProps.particleCreateProps['red'].audioValue > 0){
        red_v =  255 - Math.abs((this.layerProps.particleCreateProps['red'].audioValue - audioRange.audioVolume)*3)
      }
      if(this.layerProps.particleCreateProps['green'].audioValue > 0){
        green_v =  255 - Math.abs((this.layerProps.particleCreateProps['green'].audioValue - audioRange.audioVolume)*3)
      }
      if(this.layerProps.particleCreateProps['blue'].audioValue > 0){
        blue_v =  255 - Math.abs((this.layerProps.particleCreateProps['blue'].audioValue - audioRange.audioVolume)*3)
      }
      
      // Color (tint)
      let red = this.decToHex(Number(this.layerProps.particleCreateProps['red'].value + red_v))
      let green = this.decToHex(Number(this.layerProps.particleCreateProps['green'].value + green_v))
      let blue = this.decToHex(Number(this.layerProps.particleCreateProps['blue'].value + blue_v))

      let h = `0x${red}${green}${blue}`
      this.particle['tint'] = parseInt(h,16)

      // Explode
      this.explodeX = 0
      this.explodeY = 0
      if(this.layerProps.explode.value > 0){
        let ex = this.layerProps.explode.value
        this.explodeX = -ex + Math.floor(Math.random()*(ex*2))
        this.explodeY = -ex + Math.floor(Math.random()*(ex*2))
      }

    })

    this.dead = false
  }

  update(audioVolume){
    
    // audioVolume = audioVolume / 1000

    // Mandatory emitter effects
    // let windX_v = this.volumeFactor(this.layerProps.windX, audioVolume, 'windX', 2000)
    // this.particle.x += Number(this.layerProps.windX.value) + windX_v
    // let windY_v = this.volumeFactor(this.layerProps.windY, audioVolume, 'windY', 2000)
    // this.particle.y += Number(this.layerProps.windY.value) + windY_v
    
    this.particle.x += Number(this.layerProps.windX.value / 10)
    this.particle.y += Number(this.layerProps.windY.value / 10)
    
    this.particle.x += Number(this.explodeX / 10)
    this.particle.y += Number(this.explodeY / 10)

    this.particle.alpha = this.lifeCount/this.life

    // // Particle effects
    
    // // Rotation
    // let angle_v = this.volumeFactor(this.layerProps.particleCreateProps.angle, audioVolume, 'angle', 10)
    // this.particle.angle += Number(this.layerProps.particleCreateProps.angle.value) * angle_v
    this.particle.angle += Number(this.layerProps.particleCreateProps.angle.value / 100)

    // // Scale
    let scaleX_v = this.volumeFactor(this.layerProps.particleCreateProps.scaleX, audioVolume, 'scaleX', 100000)
    this.particle.scaleX = Number(this.layerProps.particleCreateProps.scaleX.value) + scaleX_v
    let scaleY_v = this.volumeFactor(this.layerProps.particleCreateProps.scaleY, audioVolume, 'scaleY', 100000)
    this.particle.scaleY = Number(this.layerProps.particleCreateProps.scaleY.value) + scaleY_v

    // // Mandatory life effect
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
    return Math.round(factor / tenuation)
  }

  decToHex(v){
    v = v > 255 ? 255 : v
    let hex = v.toString(16)
    if(v < 16){
      hex = "0"+hex
    }
    return hex
  }



}