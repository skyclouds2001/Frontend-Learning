<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AnimationClip, AnimationMixer, AxesHelper, BoxGeometry, Clock, Color, ColorKeyframeTrack, Mesh, MeshBasicMaterial, NumberKeyframeTrack, PerspectiveCamera, Quaternion, QuaternionKeyframeTrack, Scene, Vector3, VectorKeyframeTrack, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)

    render()
  }

  if (!WebGL.isWebGLAvailable()) return

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(40, width / height, 1, 1000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(25, 25, 50)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  const helper = new AxesHelper(10)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const onResize = (): void => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const clock = new Clock()

  const geometry = new BoxGeometry(5, 5, 5)
  const material = new MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
  })
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const positionKeyframe = new VectorKeyframeTrack('.position', [0, 1, 2], [0, 0, 0, 30, 0, 0, 0, 0, 0])

  const scaleKeyframe = new VectorKeyframeTrack('.scale', [0, 1, 2], [1, 1, 1, 2, 2, 2, 1, 1, 1])

  const x = new Vector3(1, 0, 0)
  const initial = new Quaternion().setFromAxisAngle(x, 0)
  const final = new Quaternion().setFromAxisAngle(x, Math.PI)
  const quaternionKeyframe = new QuaternionKeyframeTrack('.quaternion', [0, 1, 2], [initial.x, initial.y, initial.z, initial.w, final.x, final.y, final.z, final.w, initial.x, initial.y, initial.z, initial.w])

  const colorKeyframe = new ColorKeyframeTrack('.material.color', [0, 1, 2], [1, 0, 0, 0, 1, 0, 0, 0, 1])

  const opacityKeyframe = new NumberKeyframeTrack('.material.opacity', [0, 1, 2], [1, 0, 1])

  const clip = new AnimationClip('Action', 3, [positionKeyframe, scaleKeyframe, colorKeyframe, opacityKeyframe, quaternionKeyframe])

  const mixer = new AnimationMixer(mesh)

  const action = mixer.clipAction(clip)
  action.play()

  const render = (): void => {
    const delta = clock.getDelta()
    mixer.update(delta)
  }
})
</script>

<template>
  <div v-if="WebGL.isWebGLAvailable()" id="container" ref="container"></div>
  <div v-else>WebGL is not supported by current version of browser, please update to the newest version of browser.</div>
</template>

<style scoped>
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
