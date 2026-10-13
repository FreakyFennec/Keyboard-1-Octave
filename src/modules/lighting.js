// src/modules/lighting.js

import * as THREE from 'three'

export default function lighting(scene) {

  /* lumière ambiante */
  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)

  /* lumière directionnelle */
  const dirLight = new THREE.DirectionalLight(0xffffff, 2)

  dirLight.position.set(5, 10, 5)

  /* optionnel mais très utile pour les ombres */
  dirLight.castShadow = true

  scene.add(dirLight)

  return { ambient, dirLight }

}