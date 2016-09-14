import React, { Component } from 'react'

import AFRAME from 'aframe'
import 'aframe-entity-generator-component'
import extras from 'aframe-extras'

extras.controls.registerAll()

AFRAME.registerComponent('gravity', {
  schema: {
    type: 'int',
    default: 1
  },
  init: function() {
    if (!this.el.object3D.vel)
      this.el.object3D.vel = new THREE  .Vector3(0, 0, 0)
    if (!this.el.object3D.acc)
      this.el.object3D.acc = new THREE.Vector3(0, 0, 0)
  },

  update: function() {
    this.el.object3D.gravity = this.data
  },
  tick: function() {
    this.el.object3D.acc.set(0, -this.el.object3D.gravity * 0.0001, 0)
    this.el.object3D.vel.add(this.el.object3D.acc)
    this.el.object3D.position.add(this.el.object3D.vel)
    this.el.object3D.acc.set(0, 0, 0)
  }
})
AFRAME.registerComponent('flash', {
  schema: {
    type: 'float',
    default: 1
  },
  init: function() {
    this.el.components.material.material.opacity = 0
    this.el.components.material.material.transparent = true
  },
  tick: function(t, tq) {
    this.el.components.material.material.opacity = 1 - Math.tan(
      ((t / 100) + this.el.object3D.id) * this.data
    )
  }
})
AFRAME.registerComponent('grow', {
  schema: {
    type: 'float',
    default: 1
  },
  init: function() {
    // this.el.components.scale = 1
  },
  tick: function(t, tq) {
    var mag = 1 - Math.cos(
      ((t / 100) + this.el.object3D.id) * this.data
    )
    this.el.object3D.scale.set(mag, mag, mag)
    this.el.object3D.scale.clampLength(0, 1)
  }
})
AFRAME.registerComponent('wind', {
  schema: {
    type: 'int',
    default: 1
  },
  init: function() {
    if (!this.el.object3D.vel)
      this.el.object3D.vel = new THREE.Vector3(0, 0, 0)
    if (!this.el.object3D.acc)
      this.el.object3D.acc = new THREE.Vector3(0, 0, 0)
  },

  update: function() {
    this.el.object3D.wind = this.data * 0.001
  },
  tick: function() {
    var wind = this.el.object3D.wind
    this.el.object3D.acc.set(
      THREE.Math.randFloat(-wind, wind),
      THREE.Math.randFloat(-wind, wind),
      THREE.Math.randFloat(-wind, wind)
    )
    this.el.object3D.vel.add(this.el.object3D.acc)
    this.el.object3D.position.add(this.el.object3D.vel)
    this.el.object3D.acc.set(0, 0, 0)
  }
})

AFRAME.registerComponent('vehicle', {
  schema: {
    type: 'boolean'
  },
  init: function() {
    if (!AFRAME.vehicles)
      AFRAME.vehicles = []
    AFRAME.vehicles.push(this.el.object3D)
    var obj = this.el.object3D
    if (!obj.vel)
      obj.vel = new THREE.Vector3(0, 0, 0)
    if (!obj.acc)
      obj.acc = new THREE.Vector3(0, 0, 0)
    obj.desiredSeparation = THREE.Math.randFloat(2, 1)
    obj.maxSpeed = THREE.Math.randFloat(.07, 0.05)
    obj.maxForce = THREE.Math.randFloat(.001, .0005)
  },
  update: function() {

  },

  applyForce: function(force) {
    this.el.object3D.acc.add(force)
  },

  seek: function(target) {
    var obj = this.el.object3D
    var desired = new THREE.Vector3()
    desired.subVectors(target, obj.position)
    desired.setLength(obj.maxSpeed)

    // Steering = desired - velocity
    var steer = new THREE.Vector3()
    steer.subVectors(desired, obj.vel)
    steer.clampLength(-obj.maxForce, obj.maxForce)
    return steer
  },

  updatePos() {
    var obj = this.el.object3D
    obj.vel.add(obj.acc)
    obj.vel.clampLength(-obj.maxSpeed, obj.maxSpeed)
    obj.position.add(obj.vel)
    obj.acc.set(0, 0, 0)
  },

  separate: function(vehicles) {
    var obj = this.el.object3D
    var desiredSeparation = obj.desiredSeparation
    var sum = new THREE.Vector3(0, 0, 0)
    var count = 0
    for (var i = 0; i < vehicles.length; i++) {
      var d = obj.position.distanceTo(vehicles[i].position)
      if (d > 0 && d < desiredSeparation) {
        var diff = new THREE.Vector3()
        diff.subVectors(obj.position, vehicles[i].position)
        diff.normalize()
        diff.divideScalar(d) // weight by distance
        sum.add(diff)
        count++
      }
    }
    // Average the forces
    if (count > 0) {
      sum.divideScalar(count)
      sum.normalize()
      sum.multiplyScalar(obj.maxSpeed)

      // Steering = desired - velocity
      var steer = new THREE.Vector3()
      steer.subVectors(sum, obj.vel)
      steer.clampLength(-obj.maxForce, obj.maxForce)
      return steer
    } else {
      return new THREE.Vector3()
    }

  },

  tick: function() {
    var obj = this.el.object3D
      // turning circle

    var seekVector = new THREE.Vector3(0, 1.8, -3)
    var seekForce = this.seek(seekVector)

    var separateForce = this.separate(AFRAME.vehicles)
    separateForce.multiplyScalar(1.5)
    this.applyForce(seekForce)
    this.applyForce(separateForce)
    this.updatePos()
  }

})

export default (props) => {
  return(
    <a-scene id="scene">
      <a-entity camera look-controls universal-controls="movementEnabled: false; touchControls: false"></a-entity>
      <a-mixin id="sphere" geometry="primitive: sphere; radius: 0.03"></a-mixin>
      <a-mixin id="random-pos" random-spherical-position="lengthX: 180; lengthY: 180; radius: 2"></a-mixin>
      <a-mixin id="firefly" vehicle></a-mixin>
      <a-mixin id="white" material="shader: flat"></a-mixin>
      <a-mixin id="flash" flash="0.5"></a-mixin>
      <a-mixin id="grow" grow="0.5"></a-mixin>
      <a-entity id="awesome" entity-generator="mixin: sphere random-pos firefly white grow lantern; num: 200;"></a-entity>

      <a-sky color="#111"></a-sky>
    </a-scene>

  )
}
