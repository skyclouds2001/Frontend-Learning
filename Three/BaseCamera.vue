<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BufferGeometry, type Camera, CameraHelper, Color, Float32BufferAttribute, Group, MathUtils, Mesh, MeshBasicMaterial, OrthographicCamera, PerspectiveCamera, Points, PointsMaterial, Scene, SphereGeometry, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
    controls.update()
    stats.update()

    render()
  }

  if (!WebGL.isWebGLAvailable()) return

  if (container.value === null) return

  let { width, height } = container.value.getBoundingClientRect()
  let aspect = width / height

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(50, 0.5 * aspect, 1, 10000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 0, 2500)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.setAnimationLoop(animate)
  renderer.autoClear = false
  renderer.autoClearColor = false
  renderer.autoClearDepth = false
  renderer.autoClearStencil = false

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const onResize = (): void => {
    if (container.value === null) return

    const rect = container.value.getBoundingClientRect()
    width = rect.width
    height = rect.height
    aspect = width / height

    camera.aspect = 0.5 * aspect
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)

    perspectiveCamera.aspect = 0.5 * aspect
    perspectiveCamera.updateProjectionMatrix()

    orthographicCamera.left = (0.5 * size * aspect) / -2
    orthographicCamera.right = (0.5 * size * aspect) / 2
    orthographicCamera.top = size / 2
    orthographicCamera.bottom = size / -2
    orthographicCamera.updateProjectionMatrix()
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const size = 600

  const perspectiveCamera = new PerspectiveCamera(50, 0.5 * aspect, 150, 1000)
  perspectiveCamera.rotation.set(0, Math.PI, 0)
  const perspectiveCameraHelper = new CameraHelper(perspectiveCamera)
  scene.add(perspectiveCameraHelper)

  const orthographicCamera = new OrthographicCamera((0.5 * size * aspect) / -2, (0.5 * size * aspect) / 2, size / 2, size / -2, 150, 1000)
  orthographicCamera.rotation.set(0, Math.PI, 0)
  const orthographicCameraHelper = new CameraHelper(orthographicCamera)
  scene.add(orthographicCameraHelper)

  let activeCamera: Camera = perspectiveCamera
  let activeCameraHelper = perspectiveCameraHelper

  const group = new Group()
  group.add(perspectiveCamera)
  group.add(orthographicCamera)
  scene.add(group)

  const mesh1 = new Mesh(
    new SphereGeometry(50, 16, 8),
    new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    })
  )
  scene.add(mesh1)

  const mesh2 = new Mesh(
    new SphereGeometry(50, 16, 8),
    new MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    })
  )
  mesh2.position.set(0, 150, 0)
  mesh1.add(mesh2)

  const mesh3 = new Mesh(
    new SphereGeometry(5, 16, 8),
    new MeshBasicMaterial({
      color: 0x0000ff,
      wireframe: true,
    })
  )
  mesh3.position.set(0, 150, 0)
  group.add(mesh3)

  const geometry = new BufferGeometry()
  const vertices = Array(10000 * 3)
    .fill(0)
    .map(() => MathUtils.randFloatSpread(2000))
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  const particles = new Points(
    geometry,
    new PointsMaterial({
      color: 0x888888,
    })
  )
  scene.add(particles)

  const render = (): void => {
    const delta = Date.now() * 0.0005

    mesh1.position.set(700 * Math.cos(delta), 700 * Math.sin(delta), 700 * Math.sin(delta))
    mesh2.position.set(70 * Math.cos(2 * delta), 150, 70 * Math.sin(delta))

    if (activeCamera === perspectiveCamera) {
      perspectiveCamera.fov = 35 + 30 * Math.sin(0.5 * delta)
      perspectiveCamera.far = mesh1.position.length()
      perspectiveCamera.updateProjectionMatrix()

      perspectiveCameraHelper.update()
      perspectiveCameraHelper.visible = true

      orthographicCameraHelper.visible = false
    } else {
      orthographicCamera.far = mesh1.position.length()
      orthographicCamera.updateProjectionMatrix()

      orthographicCameraHelper.update()
      orthographicCameraHelper.visible = true

      perspectiveCameraHelper.visible = false
    }

    group.lookAt(mesh1.position)

    renderer.clear()

    activeCameraHelper.visible = false

    renderer.setViewport(0, 0, width / 2, height)
    renderer.render(scene, activeCamera)

    activeCameraHelper.visible = true

    renderer.setViewport(width / 2, 0, width / 2, height)
    renderer.render(scene, camera)
  }

  useEventListener(
    window,
    'keydown',
    (e) => {
      switch (e.keyCode) {
        case 79:
          activeCamera = orthographicCamera
          activeCameraHelper = orthographicCameraHelper
          break
        case 80:
          activeCamera = perspectiveCamera
          activeCameraHelper = perspectiveCameraHelper
          break
      }
    },
    {
      passive: true,
    }
  )
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
