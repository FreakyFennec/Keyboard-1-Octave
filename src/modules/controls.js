// src/modules/controls.js

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function createControls(camera, renderer) {

  const controls = new OrbitControls(camera, renderer.domElement)

  controls.enableDamping = true

  return controls
}