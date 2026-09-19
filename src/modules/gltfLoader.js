// src/modules/gltfLoader.js

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function loadGLTF(path) {
  return new Promise((resolve, reject) => {

    const loader = new GLTFLoader()

    loader.load(
      path,

      (gltf) => {
        const model = gltf.scene

        /* centrer le modèle */
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)

        /* agrandir le modèle */
        model.scale.set(20, 20, 20)

        console.log("GLB loaded successfully")

        resolve(gltf)
      },

      (progress) => {
        console.log((progress.loaded / progress.total * 100) + "% loaded")
      },

      (error) => {
        console.error("Error loading GLB:", error)
        reject(error)
      }
    )

  })
}