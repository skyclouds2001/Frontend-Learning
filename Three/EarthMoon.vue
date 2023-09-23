<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AxesHelper, Clock, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, SRGBColorSpace, Scene, SphereGeometry, TextureLoader, Vector2, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { useEventListener } from '@sky-fly/shooks'
import { earth_atmos_2048, earth_normal_2048, earth_specular_2048, moon_1024 } from '@/assets'

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
    dRenderer.render(scene, camera)

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

  const camera = new PerspectiveCamera(45, width / height, 0.1, 200)
  camera.name = 'PerspectiveCamera'
  camera.position.set(10, 5, 20)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)
  camera.layers.enableAll()

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const helper = new AxesHelper(20)
  helper.layers.enableAll()
  scene.add(helper)

  const onResize = (): void => {
    if (container.value === null) return

    const { width: w, height: h } = container.value.getBoundingClientRect()

    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.render(scene, camera)

    dRenderer.setSize(w, h)

    width = w
    height = h
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const EARTH_RADIUS = 1

  const MOON_RADIUS = 0.27

  const clock = new Clock()

  const loader = new TextureLoader()

  const light = new DirectionalLight(0xffffff, 3)
  light.position.set(0, 0, 1)
  light.layers.enableAll()
  scene.add(light)

  const earth = new Mesh(
    new SphereGeometry(EARTH_RADIUS, 16, 16),
    new MeshPhongMaterial({
      specular: 0x333333,
      shininess: 5,
      map: loader.load(new URL(earth_atmos_2048, import.meta.url).href, (texture) => {
        texture.colorSpace = SRGBColorSpace
      }),
      specularMap: loader.load(new URL(earth_specular_2048, import.meta.url).href),
      normalMap: loader.load(new URL(earth_normal_2048, import.meta.url).href),
      normalScale: new Vector2(0.85, 0.85),
    })
  )
  earth.layers.enableAll()
  scene.add(earth)

  const moon = new Mesh(
    new SphereGeometry(MOON_RADIUS, 16, 16),
    new MeshPhongMaterial({
      shininess: 5,
      map: loader.load(new URL(moon_1024, import.meta.url).href, (texture) => {
        texture.colorSpace = SRGBColorSpace
      }),
    })
  )
  moon.layers.enableAll()
  scene.add(moon)

  const earthDiv = document.createElement('div')
  earthDiv.className = 'label'
  earthDiv.textContent = 'Earth'
  earthDiv.style.backgroundColor = 'transparent'

  const earthLabel = new CSS2DObject(earthDiv)
  earthLabel.position.set(1.5 * EARTH_RADIUS, 0, 0)
  earthLabel.center.set(0, 1)
  earth.add(earthLabel)
  earthLabel.layers.set(0)

  const earthMassDiv = document.createElement('div')
  earthMassDiv.className = 'label'
  earthMassDiv.textContent = '5.97237e24 kg'
  earthMassDiv.style.backgroundColor = 'transparent'

  const earthMassLabel = new CSS2DObject(earthMassDiv)
  earthMassLabel.position.set(1.5 * EARTH_RADIUS, 0, 0)
  earthMassLabel.center.set(0, 0)
  earth.add(earthMassLabel)
  earthMassLabel.layers.set(1)

  const moonDiv = document.createElement('div')
  moonDiv.className = 'label'
  moonDiv.textContent = 'Moon'
  moonDiv.style.backgroundColor = 'transparent'

  const moonLabel = new CSS2DObject(moonDiv)
  moonLabel.position.set(1.5 * MOON_RADIUS, 0, 0)
  moonLabel.center.set(0, 1)
  moon.add(moonLabel)
  moonLabel.layers.set(0)

  const moonMassDiv = document.createElement('div')
  moonMassDiv.className = 'label'
  moonMassDiv.textContent = '7.342e22 kg'
  moonMassDiv.style.backgroundColor = 'transparent'

  const moonMassLabel = new CSS2DObject(moonMassDiv)
  moonMassLabel.position.set(1.5 * MOON_RADIUS, 0, 0)
  moonMassLabel.center.set(0, 0)
  moon.add(moonMassLabel)
  moonMassLabel.layers.set(1)

  const dRenderer = new CSS2DRenderer()
  dRenderer.setSize(width, height)
  dRenderer.domElement.style.position = 'absolute'
  dRenderer.domElement.style.top = '0'
  dRenderer.domElement.style.left = '0'
  container.value.appendChild(dRenderer.domElement)

  const controls = new OrbitControls(camera, dRenderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 5
  controls.maxDistance = 100

  const render = (): void => {
    const time = clock.getElapsedTime()

    moon.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5)
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
