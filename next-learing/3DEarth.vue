<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AdditiveBlending, AmbientLight, BufferAttribute, BufferGeometry, CatmullRomCurve3, Color, CubicBezierCurve3, CylinderGeometry, DoubleSide, Fog, Group, Line, LineBasicMaterial, LoadingManager, Matrix4, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, Points, PointsMaterial, Ray, Scene, SphereGeometry, Spherical, TextureLoader, TorusGeometry, Vector2, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useEventListener } from '@sky-fly/shooks'
import { earth_bump, earth_cloud, earth_spec, earth, light_ray, star, sat, satellite, wave } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

const lngLats = [
  {
    lng_lat: [
      [116.4, 39.91],
      [109.51, 18.25],
    ],
    color: 'rgb(192, 44, 56)',
  },
  {
    lng_lat: [
      [116.4, 39.91],
      [169.14, 67.74],
    ],
    color: 'rgb(129, 60, 133)',
  },
  {
    lng_lat: [
      [116.4, 39.91],
      [22.9, 51.23],
    ],
    color: 'rgb(32, 161, 98)',
  },
  {
    lng_lat: [
      [116.4, 39.91],
      [35.75, -6.17],
    ],
    color: 'rgb(255, 20, 147)',
  },
  {
    lng_lat: [
      [116.4, 39.91],
      [-56.89, -14.54],
    ],
    color: 'rgb(255, 153, 0)',
  },
  {
    lng_lat: [
      [116.4, 39.91],
      [58.48, 40.74],
    ],
    color: 'rgb(0, 255, 255)',
  },
  {
    lng_lat: [
      [116.4, 39.91],
      [76.77, 12.93],
    ],
    color: 'rgb(75, 0, 130)',
  },
]

onMounted(() => {
  const render = (): void => {
    controls.update()
    renderer.render(scene, camera)
    composer.render()

    stars.rotation.y += 0.0002
    stars.rotation.z -= 0.0002

    if (progress <= 1 - 0.001) {
      satel?.position.copy(catmull.getPointAt(progress + 0.001))
      progress += 0.001
    } else {
      progress = 0
    }

    flyLines.forEach((options, flyLine) => {
      const { num, index, points } = options
      let id = index
      flyLine.geometry.setFromPoints(points.slice(id, id + num))
      if (id < points.length) {
        ++id
      } else {
        id = 0
      }
      options.index = id
    })

    waves.forEach((options, wave) => {
      const { size, opacity } = options
      let o = opacity
      o += 0.01
      wave.scale.set(size * o, size * o, size * o)
      if (o <= 1.5) {
        wave.material.opacity = (o - 1) * 2
      } else if (o > 1.5 && o <= 2) {
        wave.material.opacity = 1 - (o - 1.5) * 2
      } else {
        o = 1.0
      }
      options.opacity = o
    })
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.set(0, 0, 14)

  const scene = new Scene()
  scene.background = new Color(0x020924)
  scene.fog = new Fog(0x020924, 200, 1000)

  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(render)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = true
  controls.autoRotate = false
  controls.enablePan = true
  controls.zoomSpeed = 1.8

  const light = new AmbientLight(new Color('rgb(222, 237, 255)'))
  scene.add(light)

  const STAR_NUMBER = 10000

  const manager = new LoadingManager()
  const textureLoader = new TextureLoader(manager)
  const objLoader = new OBJLoader(manager)
  const mtlLoader = new MTLLoader(manager)
  const group = new Group()

  const starGeometry = new BufferGeometry()

  const vertices = new Float32Array(STAR_NUMBER * 3)
  const colors = new Float32Array(STAR_NUMBER * 3)
  for (let i = 0; i < STAR_NUMBER; ++i) {
    vertices[i * 3 + 0] = (Math.random() - 0.5) * 1000
    vertices[i * 3 + 1] = (Math.random() - 0.5) * 1000
    vertices[i * 3 + 2] = (Math.random() - 0.5) * 1000

    const color = new Color()
    color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55)

    colors[i * 3 + 0] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  starGeometry.setAttribute('position', new BufferAttribute(vertices, 3))
  starGeometry.setAttribute('color', new BufferAttribute(colors, 3))

  const starTexture = textureLoader.load(new URL(star, import.meta.url).href)
  const starMaterial = new PointsMaterial({
    map: starTexture,
    size: 1,
    transparent: true,
    opacity: 1,
    vertexColors: true,
    depthTest: true,
    depthWrite: true,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  })

  const stars = new Points(starGeometry, starMaterial)
  scene.add(stars)

  const earthGroup = new Group()

  const earthGeometry = new SphereGeometry(5, 32, 32)
  const earthTexture = textureLoader.load(new URL(earth, import.meta.url).href)
  const earthBumpTexture = textureLoader.load(new URL(earth_bump, import.meta.url).href)
  const earthSpecTexture = textureLoader.load(new URL(earth_spec, import.meta.url).href)
  const earthMaterial = new MeshPhongMaterial({
    map: earthTexture,
    bumpMap: earthBumpTexture,
    bumpScale: 0.15,
    specularMap: earthSpecTexture,
    specular: new Color('#909090'),
    shininess: 5,
    transparent: true,
    side: DoubleSide,
  })
  const earthMesh = new Mesh(earthGeometry, earthMaterial)
  earthGroup.add(earthMesh)

  const cloudGeometry = new SphereGeometry(5.1, 40, 40)
  const cloudTexture = textureLoader.load(new URL(earth_cloud, import.meta.url).href)
  const cloudMaterial = new MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 1,
    blending: AdditiveBlending,
    side: DoubleSide,
  })
  const cloudMesh = new Mesh(cloudGeometry, cloudMaterial)
  earthGroup.add(cloudMesh)

  earthGroup.rotation.set(0.5, 0, -0.4)

  group.add(earthGroup)

  const torusGeometry = new TorusGeometry(8.0, 0.2, 2, 200)
  const torusMaterial = new MeshBasicMaterial({
    color: new Color('rgb(147,181,207)'),
    transparent: true,
    opacity: 0.4,
  })
  const torusMesh = new Mesh(torusGeometry, torusMaterial)
  torusMesh.rotation.set(1.7, 0.5, 1)
  torusMesh.updateMatrix()

  const composer = new EffectComposer(renderer)

  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const outlinePass = new OutlinePass(new Vector2(width, height), scene, camera)
  composer.addPass(outlinePass)

  outlinePass.pulsePeriod = 0
  outlinePass.visibleEdgeColor.set(new Color('rgb(147, 181, 207)'))
  outlinePass.usePatternTexture = false
  outlinePass.edgeStrength = 2
  outlinePass.edgeGlow = 1
  outlinePass.edgeThickness = 1
  outlinePass.selectedObjects = [torusMesh]

  group.add(torusMesh)

  const catmull = new CatmullRomCurve3(
    new Array(300).fill(0).map((_, i) => new Vector3(9 * Math.sin((Math.PI * 2 * i) / 300) + 0, 9 * Math.cos((Math.PI * 2 * i) / 300) + 0, 0)),
    true,
    'catmullrom',
    0.5
  )

  const points = catmull.getPoints(50)

  const lineGeometry = new BufferGeometry().setFromPoints(points)
  const lineMaterial = new LineBasicMaterial({
    transparent: true,
    opacity: 0,
  })
  const line = new Line(lineGeometry, lineMaterial)
  line.rotation.set(1.7, 0.5, 1)

  const matrix = new Matrix4()
  matrix.makeRotationFromEuler(torusMesh.rotation)
  catmull.points.forEach((point) => {
    point.applyMatrix4(matrix)
  })

  group.add(line)

  let satel: Group
  let progress = 0

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mtlLoader.load(new URL(sat, import.meta.url).href, (material: any) => {
    material.preload()

    objLoader.setMaterials(material).load(new URL(satellite, import.meta.url).href, (object: Group) => {
      object.position.copy(catmull.points[0])
      group.add(object)
      satel = object
    })
  })

  const lglnTXyz = (lg: number, lt: number, radius: number): Vector3 => {
    const theta = (90 + lg) * (Math.PI / 180)
    const phi = (90 - lt) * (Math.PI / 180)
    const spherical = new Spherical(radius, phi, theta)
    const xyz = new Vector3()
    xyz.setFromSpherical(spherical)
    return xyz
  }

  const waves = new Map<Mesh<PlaneGeometry, MeshBasicMaterial>, Record<'size' | 'opacity', number>>()

  const createEarthPoint = (location: Vector3, color: string): Group => {
    const group = new Group()

    const waveGeometry = new PlaneGeometry(0.3, 0.3)
    const waveTexture = textureLoader.load(new URL(wave, import.meta.url).href)
    const waveMaterial = new MeshBasicMaterial({
      map: waveTexture,
      color,
      transparent: true,
      opacity: 1.0,
      side: DoubleSide,
      depthWrite: false,
    })
    const waveMesh = new Mesh(waveGeometry, waveMaterial)
    group.add(waveMesh)

    waves.set(waveMesh, {
      size: 5.1 * 0.3,
      opacity: Math.random() * 1.0 + 1.0,
    })

    const lightGeometry = new CylinderGeometry(0, 0.05, 0.5, 32)
    const lightTexture = textureLoader.load(new URL(light_ray, import.meta.url).href)
    const lightMaterial = new MeshBasicMaterial({
      map: lightTexture,
      color,
      transparent: true,
      opacity: 1.0,
      side: DoubleSide,
      depthWrite: false,
    })
    const lightMesh = new Mesh(lightGeometry, lightMaterial)
    lightMesh.rotateX(Math.PI / 2)
    lightMesh.position.z = 0.25
    group.add(lightMesh)

    group.position.set(location.x, location.y, location.z)

    const coord = new Vector3(location.x, location.y, location.z).normalize()
    const normal = new Vector3(0, 0, 1)
    group.quaternion.setFromUnitVectors(normal, coord)

    return group
  }

  const flyLines = new Map<Line<BufferGeometry, LineBasicMaterial>, Record<'num' | 'index', number> & { points: Vector3[] }>()

  const createFlyLine = (v0: Vector3, v3: Vector3): Line => {
    const angle = (v0.angleTo(v3) * 180) / Math.PI
    const horizontal = angle * 0.04
    const vertical = angle * angle * 0.1
    const p0 = new Vector3(0, 0, 0)
    const center = v0.clone().add(v3.clone()).divideScalar(2)
    const rayLine = new Ray(p0, center)
    const t = new Vector3()
    const vTop = rayLine.at(vertical / rayLine.at(1, t).distanceTo(p0), t)
    const v1 = v0.clone().lerp(vTop, horizontal / v0.clone().distanceTo(vTop))
    const v2 = v3.clone().lerp(vTop, horizontal / v3.clone().distanceTo(vTop))

    const curve = new CubicBezierCurve3(v0, v1, v2, v3)
    const points = curve.getSpacedPoints(100)
    const lineGeometry = new BufferGeometry().setFromPoints(points)
    const lineMaterial = new LineBasicMaterial({
      color: new Color('rgb(255, 255, 255)'),
      linewidth: 1,
      transparent: true,
      opacity: 0,
    })
    const line = new Line(lineGeometry, lineMaterial)

    scene.add(line) // todo

    const index = 0
    const num = 5
    const flyLinePoints = points.splice(index, index + num)
    const flyLineGeometry = new BufferGeometry().setFromPoints(flyLinePoints)
    const flyLineMaterial = new LineBasicMaterial({
      color: new Color('rgb(254, 215, 26)'),
      linewidth: 1,
    })
    const flyLine = new Line(flyLineGeometry, flyLineMaterial)

    flyLines.set(flyLine, {
      points,
      num,
      index,
    })

    return flyLine
  }

  const locationGroup = new Group()
  const flyLineGroup = new Group()

  lngLats.forEach((v) => {
    v.lng_lat.forEach((vv) => {
      locationGroup.add(createEarthPoint(lglnTXyz(vv[0], vv[1], 5.1), v.color))
    })

    flyLineGroup.add(createFlyLine(lglnTXyz(v.lng_lat[0][0], v.lng_lat[0][1], 5.1), lglnTXyz(v.lng_lat[1][0], v.lng_lat[1][1], 5.1)))
  })

  earthGroup.add(locationGroup, flyLineGroup)

  group.position.set(0, 0, -10)
  scene.add(group)

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    composer.setSize(width, height)
  })

  useEventListener(window, 'orientationchange', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    composer.setSize(width, height)
  })
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped lang="scss">
#container {
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
