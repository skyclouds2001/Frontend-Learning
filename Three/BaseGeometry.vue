<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmbientLight, BoxGeometry, CapsuleGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, DodecahedronGeometry, DoubleSide, ExtrudeGeometry, Fog, IcosahedronGeometry, LatheGeometry, Mesh, MeshPhongMaterial, OctahedronGeometry, PerspectiveCamera, PlaneGeometry, RingGeometry, Scene, ShapeGeometry, SphereGeometry, TetrahedronGeometry, TorusGeometry, TorusKnotGeometry, TubeGeometry, WebGLRenderer } from 'three'
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
  scene.background = new Color(0xa0a0a0)
  scene.fog = new Fog(0xa0a0a0, 10, 25)

  const camera = new PerspectiveCamera(50, width / height, 1, 1000)
  camera.position.set(5, 5, 5)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)
  renderer.shadowMap.enabled = true

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  scene.add(new AmbientLight(0xffffff, 0.1))

  const light = new DirectionalLight(0xffffff, 3)
  light.position.set(300, 200, 100)
  light.castShadow = true
  scene.add(light)

  const plane = new Mesh(
    new PlaneGeometry(100, 100),
    new MeshPhongMaterial({
      color: 0xeeeeee,
    })
  )
  plane.position.set(0, -0.5, 0)
  plane.rotation.set(-Math.PI / 2, 0, 0)
  plane.castShadow = true
  plane.receiveShadow = true
  scene.add(plane)

  const box = new Mesh(
    new BoxGeometry(),
    new MeshPhongMaterial({
      color: 0x00ff00,
    })
  )
  box.position.set(0, 0, 2)
  box.castShadow = true
  box.receiveShadow = true
  scene.add(box)

  const capsule = new Mesh(
    new CapsuleGeometry(),
    new MeshPhongMaterial({
      color: 0x0000ff,
    })
  )
  capsule.position.set(2, 0, 2)
  capsule.castShadow = true
  capsule.receiveShadow = true
  scene.add(capsule)

  const cone = new Mesh(
    new ConeGeometry(),
    new MeshPhongMaterial({
      color: 0xff0000,
    })
  )
  cone.position.set(2, 0, 0)
  cone.castShadow = true
  cone.receiveShadow = true
  scene.add(cone)

  const cylinder = new Mesh(
    new CylinderGeometry(),
    new MeshPhongMaterial({
      color: 0xffff00,
    })
  )
  cylinder.position.set(2, 0, -2)
  cylinder.castShadow = true
  cylinder.receiveShadow = true
  scene.add(cylinder)

  const dodecahedron = new Mesh(
    new DodecahedronGeometry(),
    new MeshPhongMaterial({
      color: 0xff00ff,
    })
  )
  dodecahedron.position.set(0, 0, -2)
  dodecahedron.castShadow = true
  dodecahedron.receiveShadow = true
  scene.add(dodecahedron)

  const extrude = new Mesh(
    new ExtrudeGeometry(),
    new MeshPhongMaterial({
      color: 0x00ffff,
    })
  )
  extrude.position.set(-2, 0, -2)
  extrude.castShadow = true
  extrude.receiveShadow = true
  scene.add(extrude)

  const icosahedron = new Mesh(
    new IcosahedronGeometry(),
    new MeshPhongMaterial({
      color: 0x990000,
    })
  )
  icosahedron.position.set(-2, 0, 0)
  icosahedron.castShadow = true
  icosahedron.receiveShadow = true
  scene.add(icosahedron)

  const octahedron = new Mesh(
    new OctahedronGeometry(),
    new MeshPhongMaterial({
      color: 0x009900,
    })
  )
  octahedron.position.set(-2, 0, 2)
  octahedron.castShadow = true
  octahedron.receiveShadow = true
  scene.add(octahedron)

  const sphere = new Mesh(
    new SphereGeometry(),
    new MeshPhongMaterial({
      color: 0x000099,
    })
  )
  sphere.position.set(4, 0, 4)
  sphere.castShadow = true
  sphere.receiveShadow = true
  scene.add(sphere)

  const tetrahedron = new Mesh(
    new TetrahedronGeometry(),
    new MeshPhongMaterial({
      color: 0x999900,
    })
  )
  tetrahedron.position.set(4, 0, -4)
  tetrahedron.castShadow = true
  tetrahedron.receiveShadow = true
  scene.add(tetrahedron)

  const torus = new Mesh(
    new TorusGeometry(),
    new MeshPhongMaterial({
      color: 0x990099,
    })
  )
  torus.position.set(-4, 0, -4)
  torus.castShadow = true
  torus.receiveShadow = true
  scene.add(torus)

  const torusKnot = new Mesh(
    new TorusKnotGeometry(),
    new MeshPhongMaterial({
      color: 0x009999,
    })
  )
  torusKnot.position.set(-4, 0, 4)
  torusKnot.castShadow = true
  torusKnot.receiveShadow = true
  scene.add(torusKnot)

  const circle = new Mesh(
    new CircleGeometry(),
    new MeshPhongMaterial({
      color: 0x000000,
      side: DoubleSide,
    })
  )
  circle.position.set(0, 0, 4)
  circle.castShadow = true
  circle.receiveShadow = true
  scene.add(circle)

  const lathe = new Mesh(
    new LatheGeometry(),
    new MeshPhongMaterial({
      color: 0x000000,
      side: DoubleSide,
    })
  )
  lathe.position.set(4, 0, 0)
  lathe.castShadow = true
  lathe.receiveShadow = true
  scene.add(lathe)

  const ring = new Mesh(
    new RingGeometry(),
    new MeshPhongMaterial({
      color: 0x000000,
      side: DoubleSide,
    })
  )
  ring.position.set(-4, 0, 0)
  ring.castShadow = true
  ring.receiveShadow = true
  scene.add(ring)

  const shape = new Mesh(
    new ShapeGeometry(),
    new MeshPhongMaterial({
      color: 0x000000,
      side: DoubleSide,
    })
  )
  shape.position.set(0, 0, -4)
  shape.castShadow = true
  shape.receiveShadow = true
  scene.add(shape)

  const tube = new Mesh(
    new TubeGeometry(),
    new MeshPhongMaterial({
      color: 0x000000,
      side: DoubleSide,
    })
  )
  tube.position.set(0, 2, 0)
  tube.castShadow = true
  tube.receiveShadow = true
  scene.add(tube)

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
  })

  useEventListener(window.screen.orientation, 'orientationchange', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
  })
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
