<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { useEventListener } from '@sky-fly/shooks'
import { pisa } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

const params = {
  mapping: 'Reflection',
  color: 0xffffff,
  roughness: 0.0,
  metalness: 0.0,
  wireframe: false,
  flatShading: false,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  ior: 1.5,
  transmission: 0.0,
  specularIntensity: 1.0,
  specularColor: 0xffffff,
  envMapIntensity: 2.0,
  exposure: 1.0,
}

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

  const scene = new THREE.Scene()
  scene.name = 'Scene'
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.Fog(0xffffff, 10, 25)

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100)
  camera.name = 'PerspectiveCamera'
  camera.position.set(5, 0, 5)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = params.exposure

  container.value.appendChild(renderer.domElement)

  const helper = new THREE.AxesHelper(100)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 1.5
  controls.maxDistance = 10

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

  const clock = new THREE.Clock()

  const manager = new THREE.LoadingManager(() => {
    roughMetalBallMaterial.envMap = generator.fromCubemap(cubeMap).texture
  })

  const generator = new THREE.PMREMGenerator(renderer)
  generator.compileCubemapShader()

  const urls = [pisa.px, pisa.nx, pisa.py, pisa.ny, pisa.pz, pisa.nz]
  const loader = new THREE.CubeTextureLoader(manager)
  const cubeMap = loader.load(urls.map((url) => new URL(url, import.meta.url).href))

  scene.background = cubeMap

  const envBallMap = cubeMap.clone()
  if (params.mapping === 'reflection') {
    envBallMap.mapping = THREE.CubeReflectionMapping
  } else if (params.mapping === 'refraction') {
    envBallMap.mapping = THREE.CubeRefractionMapping
  }
  const envBallGeometry = new THREE.IcosahedronGeometry(1, 15)
  const envBallMaterial = new THREE.MeshBasicMaterial({
    envMap: envBallMap,
  })
  const envBall = new THREE.Mesh(envBallGeometry, envBallMaterial)
  scene.add(envBall)

  const roughMetalBallGeometry = new THREE.TorusKnotGeometry(1, 0.5, 150, 20)
  const roughMetalBallMaterial = new THREE.MeshPhysicalMaterial({
    color: params.color,
    roughness: params.roughness,
    metalness: params.metalness,
    wireframe: params.wireframe,
    flatShading: params.flatShading,
    clearcoat: params.clearcoat,
    clearcoatRoughness: params.clearcoatRoughness,
    ior: params.ior,
    transmission: params.transmission,
    specularIntensity: params.specularIntensity,
    specularColor: new THREE.Color(params.specularColor),
    envMapIntensity: params.envMapIntensity,
  })
  const roughMetalBall = new THREE.Mesh(roughMetalBallGeometry, roughMetalBallMaterial)
  scene.add(roughMetalBall)

  const render = (): void => {
    const time = clock.getElapsedTime()

    envBall.position.x = 3 * Math.sin(time)
    envBall.position.z = 3 * Math.cos(time)
    roughMetalBall.rotation.y = time * 0.2
  }

  const gui = new GUI()

  const envBallFolder = gui.addFolder('envBall')
  envBallFolder.add(params, 'mapping', ['Reflection', 'Refraction']).onChange((mapping) => {
    switch (mapping) {
      case 'Reflection':
        envBallMap.mapping = THREE.CubeReflectionMapping
        break
      case 'Refraction':
        envBallMap.mapping = THREE.CubeRefractionMapping
        break
    }
    envBallMaterial.needsUpdate = true
  })

  const roughMetalBallFolder = gui.addFolder('roughMetalBall')
  roughMetalBallFolder.addColor(params, 'color').onChange((color: number) => {
    roughMetalBallMaterial.color = new THREE.Color(color)
  })
  roughMetalBallFolder.add(params, 'roughness', 0, 1, 0.01).onChange((roughness: number) => {
    roughMetalBallMaterial.roughness = roughness
  })
  roughMetalBallFolder.add(params, 'metalness', 0, 1, 0.01).onChange((metalness: number) => {
    roughMetalBallMaterial.metalness = metalness
  })
  roughMetalBallFolder.add(params, 'wireframe').onChange((wireframe: boolean) => {
    roughMetalBallMaterial.wireframe = wireframe
  })
  roughMetalBallFolder.add(params, 'flatShading').onChange((flatShading: boolean) => {
    roughMetalBallMaterial.flatShading = flatShading
    roughMetalBallMaterial.needsUpdate = true
  })
  roughMetalBallFolder.add(params, 'clearcoat', 0, 1, 0.01).onChange((clearcoat: number) => {
    roughMetalBallMaterial.clearcoat = clearcoat
  })
  roughMetalBallFolder.add(params, 'clearcoatRoughness', 0, 1, 0.01).onChange((clearcoatRoughness: number) => {
    roughMetalBallMaterial.clearcoatRoughness = clearcoatRoughness
  })
  roughMetalBallFolder.add(params, 'ior', 1, 2.333, 0.001).onChange((ior: number) => {
    roughMetalBallMaterial.ior = ior
  })
  roughMetalBallFolder.add(params, 'transmission', 0, 1, 0.01).onChange((transmission: number) => {
    roughMetalBallMaterial.transmission = transmission
  })
  roughMetalBallFolder.add(params, 'specularIntensity', 0, 1, 0.01).onChange((specularIntensity: number) => {
    roughMetalBallMaterial.specularIntensity = specularIntensity
  })
  roughMetalBallFolder.addColor(params, 'specularColor').onChange((specularColor: number) => {
    roughMetalBallMaterial.specularColor = new THREE.Color(specularColor)
  })
  roughMetalBallFolder.add(params, 'envMapIntensity').onChange((envMapIntensity: number) => {
    roughMetalBallMaterial.envMapIntensity = envMapIntensity
  })

  const sceneFolder = gui.addFolder('scene')
  sceneFolder.add(params, 'exposure', 0, 2, 0.01).onChange((exposure: number) => {
    renderer.toneMappingExposure = exposure
  })

  gui.open()
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped lang="scss">
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
