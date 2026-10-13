// src/modules/renderer.js

import * as THREE from 'three'

export default function createRenderer() {

  const renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  /* optionnel mais recommandé */
  renderer.shadowMap.enabled = true

  document.body.appendChild(renderer.domElement)

  return renderer

}