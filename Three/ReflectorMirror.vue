<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CircleGeometry, Clock, CylinderGeometry, IcosahedronGeometry, Mesh, MeshPhongMaterial, Object3D, PerspectiveCamera, PlaneGeometry, PointLight, Scene, SphereGeometry, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { useEventListener } from '@sky-fly/shooks'

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
  controls.target.set(0, 40, 0)
  controls.enableDamping = true
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

    groundMirror.getRenderTarget().setSize(w, h)
    verticalMirror.getRenderTarget().setSize(w, h)
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const planeTop = new Mesh(
    new PlaneGeometry(100.1, 100.1),
    new MeshPhongMaterial({
      color: 0xffffff,
    })
  )
  planeTop.position.set(0, 100, 0)
  planeTop.rotation.set(Math.PI / 2, 0, 0)
  scene.add(planeTop)

  const planeBottom = new Mesh(
    new PlaneGeometry(100.1, 100.1),
    new MeshPhongMaterial({
      color: 0xffffff,
    })
  )
  planeBottom.rotation.set(-Math.PI / 2, 0, 0)
  scene.add(planeBottom)

  const planeLeft = new Mesh(
    new PlaneGeometry(100.1, 100.1),
    new MeshPhongMaterial({
      color: 0xff0000,
    })
  )
  planeLeft.position.set(-50, 50, 0)
  planeLeft.rotation.set(0, Math.PI / 2, 0)
  scene.add(planeLeft)

  const planeRight = new Mesh(
    new PlaneGeometry(100.1, 100.1),
    new MeshPhongMaterial({
      color: 0x00ff00,
    })
  )
  planeRight.position.set(50, 50, 0)
  planeRight.rotation.set(0, -Math.PI / 2, 0)
  scene.add(planeRight)

  const planeBack = new Mesh(
    new PlaneGeometry(100.1, 100.1),
    new MeshPhongMaterial({
      color: 0x0000ff,
    })
  )
  planeBack.position.set(0, 50, 50)
  planeBack.rotation.set(0, Math.PI, 0)
  scene.add(planeBack)

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

  const groundMirror = new Reflector(new CircleGeometry(40, 64), {
    clipBias: 0.003,
    textureWidth: width * window.devicePixelRatio,
    textureHeight: height * window.devicePixelRatio,
    color: 0xb5b5b5,
  })
  groundMirror.position.set(0, 0.5, 0)
  groundMirror.rotation.set(-Math.PI / 2, 0, 0)
  scene.add(groundMirror)

  const verticalMirror = new Reflector(new PlaneGeometry(100, 100), {
    clipBias: 0.003,
    textureWidth: width * window.devicePixelRatio,
    textureHeight: height * window.devicePixelRatio,
    color: 0xc1cbcb,
  })
  verticalMirror.position.set(0, 50, -50)
  scene.add(verticalMirror)

  const smallSphere = new Mesh(
    new IcosahedronGeometry(5, 0),
    new MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x7b7b7b,
      flatShading: true,
    })
  )
  scene.add(smallSphere)

  const sphereGroup = new Object3D()
  scene.add(sphereGroup)

  const halfSphere = new Mesh(
    new SphereGeometry(15, 24, 24, Math.PI / 2, Math.PI * 2, 0, (Math.PI / 180) * 120),
    new MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x8d8d8d,
    })
  )
  halfSphere.position.set(0, 7.5 + 15 * Math.sin((Math.PI / 180) * 30), 0)
  halfSphere.rotation.set((-Math.PI / 180) * 135, 0, (-Math.PI / 180) * 20)
  sphereGroup.add(halfSphere)

  const sphereCap = new Mesh(
    new CylinderGeometry(0.1, 15 * Math.cos((Math.PI / 180) * 30), 0.1, 24, 1),
    new MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x8d8d8d,
    })
  )
  sphereCap.position.set(0, -15 * Math.sin((Math.PI / 180) * 30) - 0.05, 0)
  sphereCap.rotation.set(-Math.PI, 0, 0)
  halfSphere.add(sphereCap)

  const clock = new Clock()

  const render = (): void => {
    const time = clock.getElapsedTime() * 10

    smallSphere.position.set(Math.cos(time * 0.1) * 30, Math.abs(Math.cos(time * 0.2)) * 20 + 5, Math.sin(time * 0.1) * 30)
    smallSphere.rotation.set(0, Math.PI / 2 - time * 0.1, time * 0.8)

    sphereGroup.rotation.set(0, time * -0.1, 0)
  }
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
