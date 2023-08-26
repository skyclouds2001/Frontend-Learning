const years = [
  1900, 1905, 1910, 1915, 1920,
  1925, 1930, 1935, 1940, 1945,
  1950, 1955, 1960, 1965, 1970,
  1975, 1980, 1985, 1990, 1995,
  2000, 2005, 2010, 2015, 2020,
]

/**
 * 二氧化碳排放数据
 *
 * @see https://ourworldindata.org/co2-and-greenhouse-gas-emissions
 * @see https://github.com/owid/co2-data
 */
const co2s = [
  1.95, 2.43, 3.03, 3.13, 3.52,
  3.73, 3.93, 3.81, 4.85, 4.25,
  6.00, 7.44, 9.39, 11.32, 14.90,
  17.05, 19.50, 20.33, 22.76, 23.46,
  25.45, 29.61, 33.36, 35.56, 35.26,
]

/**
 * 全球年降水距平
 *
 * @see https://www.data.jma.go.jp/cpdinfo/temp/an_wld_r.html
 */
const precipitations = [
  -21, -77, -18, -32, -20,
  -33, -51, -20, -38, -19,
  1, 28, 6, -41, -5,
  13, -13, -8, -24, -30,
  25, 11, 50, -51, 20,
]

echarts.init(document.getElementById('graph2')).setOption({
  title: {
    text: 'The CO2 Emissions and the Anomalous Precipitation Annual Change Chart',
    left: 'center',
    top: 'top',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['CO2 Emissions', 'Anomalous Precipitation'],
    left: 'right',
    top: 'bottom',
  },
  grid: {
    top: '5%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    }
  },
  
  xAxis: [
    {
      type: 'category',
      data: [...years],
      axisTick: {
        alignWithLabel: true,
      },
      boundaryGap: false,
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'CO2 Emissions(10 billion tons)',
      nameLocation: 'middle',
      nameTextStyle: {
        padding: [0, 0, 20, 0],
        fontWeight: 'bold',
        fontFamily: 'Segoe-UI-Bold sans-serif',
        fontSize: 12,
        color: '#232253',
      },
      position: 'left',
      scale: true,
    },
    {
      type: 'value',
      name: 'Anomalous Precipitation(mm)',
      nameLocation: 'middle',
      nameTextStyle: {
        padding: [20, 0, 0, 0],
        fontWeight: 'bold',
        fontFamily: 'Segoe-UI-Bold sans-serif',
        fontSize: 12,
        color: '#232253',
      },
      position: 'right',
      scale: true,
    },
  ],
  series: [
    {
      name: 'CO2 Emissions',
      type: 'scatter',
      yAxisIndex: 0,
      smooth: true,
      data: [...co2s],
    },
    {
      name: 'Anomalous Precipitation',
      type: 'scatter',
      yAxisIndex: 1,
      smooth: true,
      data: [...precipitations],
    },
  ],
})
