// src/main.js

import SceneManager from './managers/SceneManager.js'
import Keyboard from './objects/Keyboard.js'
import RaycasterManager from './modules/raycaster.js'
import './style/main.css'


const sceneManager = new SceneManager()

async function init() {
  const keyboard = await new Keyboard(sceneManager.scene).load()
  const raycaster = new RaycasterManager(sceneManager.camera, keyboard)
}

init()

function animate() {
  requestAnimationFrame(animate)
  sceneManager.update()
}

animate()