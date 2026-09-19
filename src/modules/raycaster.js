// src/modules/raycaster.js

import * as THREE from 'three'

export default class RaycasterManager {

  constructor(camera, keyboard) {

    this.camera = camera
    this.keyboard = keyboard

    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()

    window.addEventListener("pointerdown", (event) => this.onPointerDown(event))

  }

  onPointerDown(event) {

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.pointer, this.camera)

    const intersects = this.raycaster.intersectObjects(Object.values(this.keyboard.keys))

    if (intersects.length > 0) {
      const mesh = intersects[0].object
      const note = Object.keys(this.keyboard.keys).find(n => this.keyboard.keys[n] === mesh)
      console.log("Note clicked:", note)
      this.keyboard.animateKey(mesh)
    }

  }

}