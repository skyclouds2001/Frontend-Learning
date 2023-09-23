<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ACESFilmicToneMapping, Color, HemisphereLight, LinearFilter, Mesh, MeshLambertMaterial, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, SRGBColorSpace, Scene, SpotLight, SpotLightHelper, TextureLoader, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { useEventListener } from '@sky-fly/shooks'
import { disturb, Lucy100k } from '@/assets'

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

  const camera = new PerspectiveCamera(40, width / height, 0.1, 100)
  camera.name = 'PerspectiveCamera'
  camera.position.set(7, 4, 1)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 2
  controls.maxDistance = 10
  controls.minPolarAngle = 0
  controls.maxPolarAngle = Math.PI / 2
  controls.target.set(0, 1, 0)

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

  const loader = new TextureLoader()

  const texture = loader.load(new URL(disturb, import.meta.url).href)
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.colorSpace = SRGBColorSpace

  const ambient = new HemisphereLight(0xffffff, 0x8d8d8d, 0.15)
  scene.add(ambient)

  const spot = new SpotLight(0xffffff, 100)
  spot.position.set(2.5, 5, 2.5)
  spot.angle = Math.PI / 6
  spot.intensity = 1
  spot.penumbra = 1
  spot.decay = 2
  spot.distance = 0
  spot.map = texture
  spot.castShadow = true
  spot.shadow.mapSize.width = 1024
  spot.shadow.mapSize.height = 1024
  spot.shadow.camera.near = 1
  spot.shadow.camera.far = 10
  spot.shadow.focus = 1
  scene.add(spot)

  const helper = new SpotLightHelper(spot)
  scene.add(helper)

  const geometry = new PlaneGeometry(200, 200)
  const material = new MeshLambertMaterial({
    color: 0xbcbcbc,
  })
  const mesh = new Mesh(geometry, material)
  mesh.position.y = -1
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true
  scene.add(mesh)

  new PLYLoader().load(new URL(Lucy100k, import.meta.url).href, (geometry) => {
    geometry.scale(0.0024, 0.0024, 0.0024)
    geometry.computeVertexNormals()

    const material = new MeshLambertMaterial()

    const mesh = new Mesh(geometry, material)
    mesh.rotation.y = -Math.PI / 2
    mesh.position.y = 0.8
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)
  })

  const render = (): void => {
    const time = performance.now() / 3000

    spot.position.x = Math.cos(time) * 2.5
    spot.position.z = Math.sin(time) * 2.5
    helper.update()
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
