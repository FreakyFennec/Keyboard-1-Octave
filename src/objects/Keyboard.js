// src/objects/Keyboard.js

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Keyboard {

  constructor(scene) {

    this.scene = scene
    this.keys = {}        // objet associatif { note: mesh }
    this.sounds = {}      // objet associatif { note: Audio }
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

    // 🔹 Mapping exact des notes pour ton GLB
    const noteOrder = ["B","ASharp","A","GSharp","G","FSharp","F","E","DSharp","CSharp","C","D"]

    let meshIndex = 0
    model.traverse((obj) => {

    if (!obj.isMesh) return

    // 🔹 utiliser directement le nom du mesh comme note
    const note = obj.name

    // 🔹 ignorer le mesh du corps du clavier
    if (note === "body_keyboard") return

    // 🔹 enregistrer la touche dans l'objet associatif { note: mesh }
    this.keys[note] = obj

    // console.log("Key loaded:", note, "mesh name:", obj.name)

    // 🔹 charger le son correspondant
    const audioPath = `${import.meta.env.BASE_URL}sound/${note}.wav`
    this.sounds[note] = new Audio(audioPath)

  })

    this.scene.add(model)
    return this
  }

  // animation simple d'une touche (y-axis) et lecture du son
  animateKey(mesh) {
    // console.log("animateKey called")

    // 🔹 jouer le son si trouvé
    const note = Object.keys(this.keys).find(n => this.keys[n] === mesh)

    // console.log("Pressed mesh:", mesh.name)
    // console.log("Detected note:", note)
    // console.log("Sound object:", this.sounds[note])

    if(note && this.sounds[note]) {
      this.sounds[note].currentTime = 0
      this.sounds[note].play()
    }

    // 🔹 animation visuelle simple
    mesh.rotation.x += 0.08
    setTimeout(() => {
      mesh.rotation.x -= 0.08
    }, 100)
  }

}