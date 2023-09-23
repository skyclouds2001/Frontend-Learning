<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BoxGeometry, HemisphereLight, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, ReinhardToneMapping, RepeatWrapping, SRGBColorSpace, Scene, SphereGeometry, TextureLoader, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'
import { brick_bump, brick_diffuse, brick_roughness, earth_atmos_2048, earth_specular_2048, hardwood_bump, hardwood_diffuse, hardwood_roughness } from '@/assets'

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

  const camera = new PerspectiveCamera(50, width / height, 0.1, 100)
  camera.name = 'PerspectiveCamera'
  camera.position.set(-4, 4, 2)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.shadowMap.enabled = true
  renderer.toneMapping = ReinhardToneMapping
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 1
  controls.minPolarAngle = 0
  controls.maxDistance = 20
  controls.maxPolarAngle = Math.PI / 2

  useEventListener(
    window,
    'resize',
    () => {
      if (container.value === null) return

      const { width, height } = container.value.getBoundingClientRect()

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.render(scene, camera)
    },
    {
      passive: true,
    }
  )

  useEventListener(
    window,
    'orientationchange',
    () => {
      if (container.value === null) return

      const { width, height } = container.value.getBoundingClientRect()

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.render(scene, camera)
    },
    {
      passive: true,
    }
  )

  const textureLoader = new TextureLoader()

  const bulbLight = new PointLight(0xffee88, 0.5, 100, 2)
  const bulbGeometry = new SphereGeometry(0.02, 16, 8)
  const bulbMaterial = new MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000,
  })
  const bulbMesh = new Mesh(bulbGeometry, bulbMaterial)
  bulbLight.add(bulbMesh)
  bulbLight.position.set(0, 2, 0)
  bulbLight.castShadow = true
  scene.add(bulbLight)

  const hemiLight = new HemisphereLight(0xddeeff, 0x0f0e0d, 0.02)
  scene.add(hemiLight)

  const floorGeometry = new PlaneGeometry(20, 20)
  const floorMaterial = new MeshStandardMaterial({
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 0.0005,
  })
  const floorMesh = new Mesh(floorGeometry, floorMaterial)
  floorMesh.receiveShadow = true
  floorMesh.rotation.x = -Math.PI / 2
  scene.add(floorMesh)

  const ballGeometry = new SphereGeometry(0.25, 32, 32)
  const ballMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 1.0,
  })
  const ballMesh = new Mesh(ballGeometry, ballMaterial)
  ballMesh.position.set(1, 0.25, 1)
  ballMesh.rotation.y = Math.PI
  ballMesh.castShadow = true
  scene.add(ballMesh)

  const boxGeometry = new BoxGeometry(0.5, 0.5, 0.5)
  const boxMaterial = new MeshStandardMaterial({
    roughness: 0.7,
    color: 0xffffff,
    bumpScale: 0.002,
    metalness: 0.2,
  })
  const boxMesh = new Mesh(boxGeometry, boxMaterial)
  boxMesh.position.set(-0.25, 0.25, -1)
  boxMesh.castShadow = true
  scene.add(boxMesh)

  textureLoader.load(new URL(hardwood_bump, import.meta.url).href, (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.anisotropy = 4
    texture.repeat.set(10, 24)
    texture.colorSpace = SRGBColorSpace

    floorMaterial.bumpMap = texture
    floorMaterial.needsUpdate = true
  })

  textureLoader.load(new URL(hardwood_diffuse, import.meta.url).href, (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.anisotropy = 4
    texture.repeat.set(10, 24)
    texture.colorSpace = SRGBColorSpace

    floorMaterial.map = texture
    floorMaterial.needsUpdate = true
  })

  textureLoader.load(new URL(hardwood_roughness, import.meta.url).href, (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.anisotropy = 4
    texture.repeat.set(10, 24)
    texture.colorSpace = SRGBColorSpace

    floorMaterial.roughnessMap = texture
    floorMaterial.needsUpdate = true
  })

  textureLoader.load(new URL(brick_bump, import.meta.url).href, (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.anisotropy = 4
    texture.repeat.set(1, 1)
    texture.colorSpace = SRGBColorSpace

    boxMaterial.bumpMap = texture
    boxMaterial.needsUpdate = true
  })

  textureLoader.load(new URL(brick_diffuse, import.meta.url).href, (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.anisotropy = 4
    texture.repeat.set(1, 1)
    texture.colorSpace = SRGBColorSpace

    boxMaterial.map = texture
    boxMaterial.needsUpdate = true
  })

  textureLoader.load(new URL(brick_roughness, import.meta.url).href, (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.anisotropy = 4
    texture.repeat.set(1, 1)
    texture.colorSpace = SRGBColorSpace

    boxMaterial.roughnessMap = texture
    boxMaterial.needsUpdate = true
  })

  textureLoader.load(new URL(earth_atmos_2048, import.meta.url).href, (texture) => {
    texture.anisotropy = 4
    texture.colorSpace = SRGBColorSpace

    ballMaterial.map = texture
    ballMaterial.needsUpdate = true
  })

  textureLoader.load(new URL(earth_specular_2048, import.meta.url).href, (texture) => {
    texture.anisotropy = 4
    texture.colorSpace = SRGBColorSpace

    ballMaterial.metalnessMap = texture
    ballMaterial.needsUpdate = true
  })

  const render = (): void => {
    const time = performance.now() * 0.0005

    bulbLight.position.y = Math.cos(time) * 0.75 + 1.25
  }
})
</script>

<template>
  <div v-if="WebGL.isWebGLAvailable()" id="container" ref="container"></div>
  <div v-else>WebGL is not supported by current version of browser, please update to the newest version of browser.</div>
</template>

<style scoped lang="scss">
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
