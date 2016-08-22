export default (p) => {

  let blur = 200
  let gems = []
  let wind
  let windStrength = 2
  let windDynamics = 0.5
  let maxGems = 800

  const Wind = function(c){
    // initialise Perlin offset
    this.xoff = 0
    this.c = c
    this.direction = p.createVector(0,0)

    this.calculateForce = function(part){
      // force relative to particle mass
      var force = this.direction.mult(part.mass * part.mass)
      force.setMag(p.random(this.c))
      return force
    }

    this.update = function(){
      // create new vector from Perlin Noise
      this.direction = p.createVector(
        p.map(p.noise(this.xoff), 0, 1, -1, 1),
        p.map(p.noise(this.xoff + 7), 0, 1, -1, 1)
      )
      // scale by coefficient
      this.direction.mult(this.c)
      // increment Perlin offset
      this.xoff += windDynamics
    }
  }

  const Gem = function(x, y, radius){
    this.pos = p.createVector(x, y)
    this.vel = p.createVector(0, 0)
    this.acc = p.createVector(0, 0)
    this.radius = radius || p.random(2, 4)
    this.mass = this.radius
    this.spawned = false

    this.applyForce = function(force){
      // do not affect original force value
      var f = force.copy()
      // F = m * a
      f.div(this.mass)
      this.acc.add(f)
    }

    this.display = function(){
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      // reset acc for next force calculation
      this.acc.set(0, 0)
      if(this.pos.x < 0) this.pos.x = p.width
      if(this.pos.x > p.width) this.pos.x = 0
      if(this.pos.y < 0) this.pos.y = p.height
      if(this.pos.y > p.height) this.pos.y = 0

      p.noStroke()
      p.fill(255)
      p.ellipse(this.pos.x, this.pos.y, this.radius)
    }

    this.spawn = () => {

      const newb = {
        x: p.random(this.pos.x - 5, this.pos.x + 5),
        y: p.random(this.pos.y + 10, this.pos.y + 20),
        radius: this.radius
      }
      if(newb.x > p.width || newb.y > p.height || this.spawned){
        return false
      }
      gems.push(new Gem(newb.x, newb.y, newb.radius))
      this.spawned = true
    }
  }

  p.setup = () => {
    p.frameRate(60)
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
    wind = new Wind(windStrength)
    for(let i = 0; i < p.width; i += 50){
      gems.push(new Gem(i, p.random(0, 20)))
    }

  }

  p.draw = () => {
    p.background(21, blur)

    if(gems.length > maxGems){
      gems.splice(0, gems.length - maxGems)
    }

    gems.map((gem) => {
      gem.spawn()
      gem.applyForce(wind.calculateForce(gem))
      gem.display()
    })
    wind.update()

  }

  p.mouseClicked = () => {

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }
}
