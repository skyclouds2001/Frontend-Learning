<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Clock, IcosahedronGeometry, Mesh, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, PointLight, RepeatWrapping, Scene, type ShaderMaterial, TextureLoader, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Refractor } from 'three/examples/jsm/objects/Refractor'
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader'
import { useEventListener } from '@sky-fly/shooks'
import { waterdudv } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (container.value === null) return

  if (!WebGL.isWebGLAvailable()) {
    container.value.appendChild(WebGL.getWebGLErrorMessage())
    return
  }

  const animate = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)

    render()
  }

  let { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'

  const camera = new PerspectiveCamera(45, width / height, 1, 500)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 75, 160)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.target.set(0, 40, 0)
  controls.minDistance = 10
  controls.maxDistance = 400

  const onResize = (): void => {
    if (container.value === null) return

    const { width: w, height: h } = container.value.getBoundingClientRect()

    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.render(scene, camera)

    width = w
    height = h
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const geometry = new IcosahedronGeometry(5, 0)
  const material = new MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0x333333,
    flatShading: true,
  })
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const planeGeometry = new PlaneGeometry(100.1, 100.1)

  const planeTop = new Mesh(
    planeGeometry,
    new MeshPhongMaterial({
      color: 0xffffff,
    })
  )
  planeTop.position.set(0, 100, 0)
  planeTop.rotation.set(Math.PI / 2, 0, 0)
  scene.add(planeTop)

  const planeBottom = new Mesh(
    planeGeometry,
    new MeshPhongMaterial({
      color: 0xffffff,
    })
  )
  planeBottom.rotation.set(-Math.PI / 2, 0, 0)
  scene.add(planeBottom)

  const planeBack = new Mesh(
    planeGeometry,
    new MeshPhongMaterial({
      color: 0x0000ff,
    })
  )
  planeBack.position.set(0, 50, -50)
  scene.add(planeBack)

  const planeLeft = new Mesh(
    planeGeometry,
    new MeshPhongMaterial({
      color: 0xff0000,
    })
  )
  planeLeft.position.set(-50, 50, 0)
  planeLeft.rotation.set(0, Math.PI / 2, 0)
  scene.add(planeLeft)

  const planeRight = new Mesh(
    planeGeometry,
    new MeshPhongMaterial({
      color: 0x00ff00,
    })
  )
  planeRight.position.set(50, 50, 0)
  planeRight.rotation.set(0, -Math.PI / 2, 0)
  scene.add(planeRight)

  const mainLight = new PointLight(0xe7e7e7, 2.5, 250, 0)
  mainLight.position.set(0, 60, 0)
  scene.add(mainLight)

  const redLight = new PointLight(0xff0000, 0.5, 1000, 0)
  redLight.position.set(-550, 50, 0)
  scene.add(redLight)

  const greenLight = new PointLight(0x00ff00, 0.5, 1000, 0)
  greenLight.position.set(550, 50, 0)
  scene.add(greenLight)

  const blueLight = new PointLight(0x0000ff, 0.5, 1000, 0)
  blueLight.position.set(0, 50, 550)
  scene.add(blueLight)

  const refractor = new Refractor(new PlaneGeometry(90, 90), {
    color: 0xcbcbcb,
    textureWidth: 1024,
    textureHeight: 1024,
    shader: WaterRefractionShader,
  })
  refractor.position.set(0, 50, 0)
  scene.add(refractor)
  ;(refractor.material as ShaderMaterial).uniforms.tDudv.value = new TextureLoader().load(waterdudv, (texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping
  })

  const clock = new Clock()

  const render = (): void => {
    const time = clock.getElapsedTime()

    ;(refractor.material as ShaderMaterial).uniforms.time.value = time

    mesh.position.set(Math.cos(time) * 30, Math.abs(Math.cos(time * 2)) * 20 + 5, Math.sin(time) * 30)
    mesh.rotation.set(0, Math.PI / 2 - time, time * 8)
  }
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped>
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
