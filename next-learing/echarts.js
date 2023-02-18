/***** Chart 1 *****/

const year = [1860, 1865, 1870, 1875, 1880, 1885, 1890, 1895, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935, 1940, 1945, 1950, 1955, 1960, 1965, 1970, 1975, 1980, 1985, 1990]

const co2 = [14.70965494, 14.74187227, 14.78223944, 14.72507738, 14.74905997, 14.70818344, 14.73632585, 14.74006119, 14.78028687, 14.6703631, 14.63755151, 14.7022267, 14.72622345, 14.79085619, 14.87582109, 14.94452875, 15.01326471, 15.01695761, 14.96800198, 14.98390548, 15.04047328, 14.97518969, 14.99516811, 14.99076776, 15.09203233, 15.16075414, 15.24567659]

const temperature = [0.684048805, 0.848125056, 0.927925778, 1.005936577, 1.085438979, 1.249515229, 1.242952179, 1.663136541, 2.169684675, 2.675636168, 3.096715492, 3.261090063, 3.168759882, 3.845947317, 3.668446645, 4.174398138, 4.680647952, 4.845619164, 6.378389666, 7.910265207, 9.955251932, 12.93920229, 16.18045404, 18.39667671, 18.47468751, 20.09382178, 21.19805495]

echarts.init(document.getElementById('graph1')).setOption({
  title: {
    text: 'The CO2 Emissions and the Average Temperature of the Earth\'s Atmosphere Yearly Change Chart',
    left: 'center',
    top: 'top',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['CO2 Emissions', 'Average Temperature'],
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
      data: [...year],
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
      name: 'Average Temperature(℃)',
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
      type: 'line',
      yAxisIndex: 0,
      smooth: true,
      data: [...co2],
    },
    {
      name: 'Average Temperature',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      data: [...temperature],
    },
  ],
})

/***** Chart 2 *****/

echarts.init(document.getElementById('graph2')).setOption({})
