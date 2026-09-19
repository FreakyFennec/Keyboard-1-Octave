// src/objects/Keyboard.js

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Keyboard {

  constructor(scene) {
    this.scene = scene
    this.keys = {}        // { note: mesh }
    this.sounds = {}      // { note: Audio }
  }

  async load() {

    const loader = new GLTFLoader()

    const gltf = await new Promise((resolve, reject) =>
      loader.load(
        `${import.meta.env.BASE_URL}modeles/gltf/keyboard_1_octave.glb`,
        resolve,
        undefined,
        reject
      )
    )

    const model = gltf.scene

    /* centrer le modèle */
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)

    /* agrandir le modèle */
    model.scale.set(15, 15, 15)

    // Mapping exact des 12 touches du GLB
    const noteOrder = [
      "B",
      "ASharp",
      "A",
      "GSharp",
      "G",
      "FSharp",
      "F",
      "E",
      "DSharp",
      "CSharp",
      "C",
      "D"
    ]

    let meshIndex = 0

    model.traverse((obj) => {

      if (!obj.isMesh) return

      // Ignorer le corps du clavier
      if (obj.name === "body_keyboard") return

      // Associer le mesh à la note
      const note = noteOrder[meshIndex]

      if (!note) {
        console.warn("No note assigned to mesh:", obj.name)
        return
      }

      // Enregistrer la touche
      this.keys[note] = obj

      // Charger le son correspondant
      const audioPath =
        `${import.meta.env.BASE_URL}sound/${note}.wav`

      this.sounds[note] = new Audio(audioPath)

      console.log(
        "Key loaded:",
        note,
        "mesh:",
        obj.name,
        "sound:",
        audioPath
      )

      meshIndex++
    })

    this.scene.add(model)

    return this
  }

  // Animation d'une touche + lecture du son
  animateKey(mesh) {

    const note = Object.keys(this.keys)
      .find(n => this.keys[n] === mesh)

    if (note && this.sounds[note]) {
      this.sounds[note].currentTime = 0

      this.sounds[note].play()
        .catch(error => {
          console.warn("Audio playback failed:", error)
        })
    }

    // Animation visuelle
    mesh.rotation.x += 0.08

    setTimeout(() => {
      mesh.rotation.x -= 0.08
    }, 100)
  }
}
