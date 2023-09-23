<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ACESFilmicToneMapping, BoxGeometry, Color, MathUtils, Mesh, MeshStandardMaterial, PMREMGenerator, PerspectiveCamera, PlaneGeometry, RepeatWrapping, Scene, TextureLoader, Vector3, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Sky } from 'three/examples/jsm/objects/Sky'
import { Water } from 'three/examples/jsm/objects/Water'
import { useEventListener } from '@sky-fly/shooks'
import { waternormals } from '@/assets'

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

  const { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(50, width / height, 1, 20000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(30, 30, 100)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.setAnimationLoop(animate)
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.target.set(0, 10, 0)
  controls.minDistance = 40.0
  controls.maxDistance = 200.0
  controls.minPolarAngle = 0
  controls.maxPolarAngle = Math.PI * 0.495

  const onResize = (): void => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.render(scene, camera)
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const sun = new Vector3()

  const phi = MathUtils.degToRad(90)
  const theta = MathUtils.degToRad(180)

  sun.setFromSphericalCoords(1, phi, theta)

  const waterGeometry = new PlaneGeometry(10000, 10000)

  const water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new TextureLoader().load(new URL(waternormals, import.meta.url).href, (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping
    }),
    sunDirection: sun,
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: true,
  })
  water.rotation.x = -Math.PI / 2
  water.material.uniforms.sunDirection.value.copy(sun).normalize()
  scene.add(water)

  const sky = new Sky()
  sky.scale.setScalar(10000)
  scene.add(sky)

  sky.material.uniforms.turbidity.value = 10
  sky.material.uniforms.rayleigh.value = 2
  sky.material.uniforms.mieCoefficient.value = 0.005
  sky.material.uniforms.mieDirectionalG.value = 0.8
  sky.material.uniforms.sunPosition.value.copy(sun)

  const pmremGenerator = new PMREMGenerator(renderer)
  const renderTarget = pmremGenerator.fromScene(scene)
  scene.environment = renderTarget.texture

  const geometry = new BoxGeometry(30, 30, 30)
  const material = new MeshStandardMaterial({
    roughness: 0,
  })
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const render = (): void => {
    const time = performance.now() * 0.001

    mesh.position.y = Math.sin(time) * 20 + 5
    mesh.rotation.x = time * 0.5
    mesh.rotation.z = time * 0.51
    water.material.uniforms.time.value = (water.material.uniforms.time.value as number) + 1.0 / 60.0
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
