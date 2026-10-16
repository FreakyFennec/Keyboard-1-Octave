// src/modules/renderer.js

import * as THREE from 'three'

export default function createRenderer() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  renderer.shadowMap.enabled = true

  renderer.domElement.style.cssText =
  'display:block;position:fixed;top:0;left:0;margin:0;padding:0;border:0;'

  document.querySelector('#app').appendChild(renderer.domElement)

  return renderer
}
