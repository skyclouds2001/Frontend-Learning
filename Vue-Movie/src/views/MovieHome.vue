<template>
  <div class="home">
    <NavBar/>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, provide } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { getInTheaters, getComingSoon, getTop250 } from '@/api/movie'
import NavBar from '@/components/NavBar.vue'

@Options({
  name: 'MovieHome',
  components: {
    NavBar
  },
  setup () {
    const state = reactive({
      inTheaters: [],
      comingSoon: [],
      top250: []
    })

    provide('title', '黑马电影')

    const getInTheatersData = async () => {
      const { data } = await getInTheaters({ start: 0, count: 10 })

      data.subjects.forEach((v: { starArr: number[]; rating: { stars: number } }) => {
        v.starArr = []
        const starNum = Math.floor(v.rating.stars / 10)
        for (let i = 0; i < 5; i++) {
          v.starArr[i] = starNum > i ? 1 : 0
        }
      })

      state.inTheaters = data.subjects
    }

    const getComingSoonData = async () => {
      const { data } = await getComingSoon({ start: 0, count: 10 })

      data.subjects.forEach((v: { starArr: number[]; rating: { stars: number } }) => {
        v.starArr = []
        const starNum = Math.floor(v.rating.stars / 10)
        for (let i = 0; i < 5; i++) {
          v.starArr[i] = starNum > i ? 1 : 0
        }
      })

      state.comingSoon = data.subjects
    }

    const getTop250Data = async () => {
      const { data } = await getTop250({ start: 0, count: 10 })

      data.subjects.forEach((v: { starArr: number[]; rating: { stars: number } }) => {
        v.starArr = []
        const starNum = Math.floor(v.rating.stars / 10)
        for (let i = 0; i < 5; i++) {
          v.starArr[i] = starNum > i ? 1 : 0
        }
      })

      state.top250 = data.subjects
    }

    onMounted(() => {
      getInTheatersData()
      getComingSoonData()
      getTop250Data()
    })

    return {
      ...toRefs(state)
    }
  }
})

export default class MovieHome extends Vue {}
</script>

<style lang="scss">
</style>
