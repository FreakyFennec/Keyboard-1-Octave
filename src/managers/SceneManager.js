// src/managers/SceneManager.js

import * as THREE from 'three'
import createRenderer from '../modules/renderer.js'
import lighting from '../modules/lighting.js'
import Keyboard from '../objects/Keyboard.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import RaycasterManager from '../modules/raycaster.js'

export default class SceneManager {

  constructor() {

    /* Scene */
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x202025)

    /* Camera */
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 5, 5)

    /* Renderer */
    this.renderer = createRenderer()

    /* Controls */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    /* Lights */
    lighting(this.scene)

    /* Keyboard */
    this.keyboard = new Keyboard(this.scene)

    /* Raycaster */
    this.raycaster = new RaycasterManager(this.camera, this.keyboard)

    /* Resize */
    window.addEventListener('resize', () => this.onResize())
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  update() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

}
