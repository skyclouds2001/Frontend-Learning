const e = document.getElementById('graph4')

const charts = echarts.init(e)

charts.showLoading()

$.when($.get('/next-learing/world.json')).done((res) => {
  const worldJson = res

  echarts.registerMap('world', worldJson)

  charts.hideLoading()

  charts.setOption({
    title: {
      show: true,
      text: 'World CO2 Emission of 2019',
      left: 'center',
      top: 'top',
    },
    tooltip: {
      show: true,
      trigger: 'item',
      showDelay: 0.25,
      transitionDuration: 0.25,
      position: 'inside',
    },
    toolbox: {
      show: true,
      left: 'right',
      top: 'top',
      orient: 'vertical',
      showTitle: true,
      feature: {
        dataView: {
          readOnly: false,
        },
        restore: {},
        saveAsImage: {},
      },
    },
    visualMap: {
      show: false,
      type: 'continuous',
      left: 'right',
      top: 'bottom',
      min: Math.floor(Math.log(MINs)),
      max: Math.ceil(Math.log(MAXs)),
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026',
        ],
      },
      text: [
        'High',
        'Low',
      ],
      calculable: true,
      realtime: true,
    },
    series: [
      {
        type: 'map',
        name: 'CO2 Emissions',
        map: 'world',
        emphasis: {
          label: {
            show: true,
          },
        },
        data: DATAs.map((v) => ({
          name: v.name,
          value: Math.log(v.value),
        })),
      },
    ],
  })
})

/**
 * 各国 2021 年 CO2 Emissions 数据
 * @type {Array<{ name: string, value: number}>}
 */
const DATAs = [
  {
    name: 'Afghanistan',
    value: 6079.99992370605,
  },
  {
    name: 'Albania',
    value: 4829.99992370605,
  },
  {
    name: 'Algeria',
    value: 171250,
  },
  {
    name: 'Angola',
    value: 25209.9990844727,
  },
  {
    name: 'Argentina',
    value: 168100.006103516,
  },
  {
    name: 'Armenia',
    value: 6170.00007629395,
  },
  {
    name: 'Australia',
    value: 386529.998779297,
  },
  {
    name: 'Austria',
    value: 64769.9966430664,
  },
  {
    name: 'Azerbaijan',
    value: 35509.9983215332,
  },
  {
    name: 'Bahamas',
    value: 2839.99991416931,
  },
  {
    name: 'Bahrain',
    value: 33259.9983215332,
  },
  {
    name: 'Bangladesh',
    value: 90739.9978637695,
  },
  {
    name: 'Barbados',
    value: 1250,
  },
  {
    name: 'Belarus',
    value: 57669.9981689453,
  },
  {
    name: 'Belgium',
    value: 93010.0021362305,
  },
  {
    name: 'Belize',
    value: 639.999985694885,
  },
  {
    name: 'Benin',
    value: 7300.00019073486,
  },
  {
    name: 'Bhutan',
    value: 1049.99995231628,
  },
  {
    name: 'Bolivia',
    value: 22340.0001525879,
  },
  {
    name: 'Bosnia and Herz.',
    value: 21069.9996948242,
  },
  {
    name: 'Botswana',
    value: 7250,
  },
  {
    name: 'Brazil',
    value: 434299.987792969,
  },
  {
    name: 'Bulgaria',
    value: 39139.9993896484,
  },
  {
    name: 'Burkina Faso',
    value: 5000,
  },
  {
    name: 'Burundi',
    value: 720.000028610229,
  },
  {
    name: 'Cambodia',
    value: 16180.0003051758,
  },
  {
    name: 'Cameroon',
    value: 9430.00030517578,
  },
  {
    name: 'Canada',
    value: 580210.021972656,
  },
  {
    name: 'Cape Verde',
    value: 649.999976158142,
  },
  {
    name: 'Central African Rep.',
    value: 239.999994635582,
  },
  {
    name: 'Chad',
    value: 2250,
  },
  {
    name: 'Chile',
    value: 91370.002746582,
  },
  {
    name: 'China',
    value: 10707219.7265625,
  },
  {
    name: 'Colombia',
    value: 81040.0009155273,
  },
  {
    name: 'Comoros',
    value: 319.999992847443,
  },
  {
    name: 'Congo',
    value: 7260.00022888184,
  },
  {
    name: 'Costa Rica',
    value: 8239.99977111816,
  },
  {
    name: 'Côte d\'Ivoire',
    value: 10829.9999237061,
  },
  {
    name: 'Croatia',
    value: 16520.0004577637,
  },
  {
    name: 'Cyprus',
    value: 7190.00005722046,
  },
  {
    name: 'Czech Rep.',
    value: 96290.0009155273,
  },
  {
    name: 'Dem. Rep. Congo',
    value: 3210.00003814697,
  },
  {
    name: 'Dem. Rep. Korea',
    value: 56040.0009155273,
  },
  {
    name: 'Denmark',
    value: 29700.0007629395,
  },
  {
    name: 'Djibouti',
    value: 419.999986886978,
  },
  {
    name: 'Dominica',
    value: 170.000001788139,
  },
  {
    name: 'Dominican Rep.',
    value: 27229.9995422363,
  },
  {
    name: 'Ecuador',
    value: 39290.0009155273,
  },
  {
    name: 'Egypt',
    value: 249369.995117188,
  },
  {
    name: 'El Salvador',
    value: 7800.00019073486,
  },
  {
    name: 'Eq. Guinea',
    value: 5349.99990463257,
  },
  {
    name: 'Estonia',
    value: 10180.0003051758,
  },
  {
    name: 'Ethiopia',
    value: 18360.0006103516,
  },
  {
    name: 'Fiji',
    value: 1629.99999523163,
  },
  {
    name: 'Finland',
    value: 40709.9990844727,
  },
  {
    name: 'France',
    value: 300519.989013672,
  },
  {
    name: 'Gabon',
    value: 5250,
  },
  {
    name: 'Gambia',
    value: 579.999983310699,
  },
  {
    name: 'Georgia',
    value: 10109.9996566772,
  },
  {
    name: 'Germany',
    value: 657400.024414063,
  },
  {
    name: 'Ghana',
    value: 20040.0009155273,
  },
  {
    name: 'Greece',
    value: 60000,
  },
  {
    name: 'Guatemala',
    value: 19309.9994659424,
  },
  {
    name: 'Guinea',
    value: 3950.00004768372,
  },
  {
    name: 'Guinea-Bissau',
    value: 330.000013113022,
  },
  {
    name: 'Guyana',
    value: 2849.99990463257,
  },
  {
    name: 'Haiti',
    value: 3319.9999332428,
  },
  {
    name: 'Honduras',
    value: 10220.0002670288,
  },
  {
    name: 'Hungary',
    value: 46380.0010681152,
  },
  {
    name: 'Iceland',
    value: 1639.99998569489,
  },
  {
    name: 'India',
    value: 2456300.04882813,
  },
  {
    name: 'Indonesia',
    value: 619840.026855469,
  },
  {
    name: 'Iran',
    value: 630010.009765625,
  },
  {
    name: 'Iraq',
    value: 174559.997558594,
  },
  {
    name: 'Ireland',
    value: 35750,
  },
  {
    name: 'Israel',
    value: 62650.0015258789,
  },
  {
    name: 'Italy',
    value: 317239.990234375,
  },
  {
    name: 'Jamaica',
    value: 8390.00034332275,
  },
  {
    name: 'Japan',
    value: 1081569.94628906,
  },
  {
    name: 'Jordan',
    value: 24629.9991607666,
  },
  {
    name: 'Kazakhstan',
    value: 212110.000610352,
  },
  {
    name: 'Kenya',
    value: 22280.0006866455,
  },
  {
    name: 'Kiribati',
    value: 90.0000035762787,
  },
  {
    name: 'Korea',
    value: 610789.978027344,
  },
  {
    name: 'Kyrgyzstan',
    value: 10050.0001907349,
  },
  {
    name: 'Lao PDR',
    value: 18709.9990844727,
  },
  {
    name: 'Latvia',
    value: 7570.00017166138,
  },
  {
    name: 'Lebanon',
    value: 27950.0007629395,
  },
  {
    name: 'Lesotho',
    value: 769.999980926514,
  },
  {
    name: 'Liberia',
    value: 1179.99994754791,
  },
  {
    name: 'Libya',
    value: 56799.9992370605,
  },
  {
    name: 'Lithuania',
    value: 11729.9995422363,
  },
  {
    name: 'Luxembourg',
    value: 9489.99977111816,
  },
  {
    name: 'Macedonia',
    value: 8300.00019073486,
  },
  {
    name: 'Madagascar',
    value: 4119.99988555908,
  },
  {
    name: 'Malawi',
    value: 1450.00004768372,
  },
  {
    name: 'Malaysia',
    value: 253270.004272461,
  },
  {
    name: 'Mali',
    value: 5829.99992370605,
  },
  {
    name: 'Malta',
    value: 1659.9999666214,
  },
  {
    name: 'Mauritania',
    value: 3950.00004768372,
  },
  {
    name: 'Mauritius',
    value: 4170.00007629395,
  },
  {
    name: 'Mexico',
    value: 449269.989013672,
  },
  {
    name: 'Micronesia',
    value: 180.000007152557,
  },
  {
    name: 'Moldova',
    value: 8859.99965667725,
  },
  {
    name: 'Mongolia',
    value: 23069.9996948242,
  },
  {
    name: 'Montenegro',
    value: 2599.99990463257,
  },
  {
    name: 'Morocco',
    value: 71480.0033569336,
  },
  {
    name: 'Mozambique',
    value: 7500,
  },
  {
    name: 'Myanmar',
    value: 36720.0012207031,
  },
  {
    name: 'Namibia',
    value: 4219.99979019165,
  },
  {
    name: 'Nepal',
    value: 13449.9998092651,
  },
  {
    name: 'Netherlands',
    value: 146339.996337891,
  },
  {
    name: 'New Zealand',
    value: 34009.9983215332,
  },
  {
    name: 'Nicaragua',
    value: 5239.99977111816,
  },
  {
    name: 'Niger',
    value: 2150.00009536743,
  },
  {
    name: 'Nigeria',
    value: 115279.998779297,
  },
  {
    name: 'Norway',
    value: 35950.0007629395,
  },
  {
    name: 'Oman',
    value: 76029.9987792969,
  },
  {
    name: 'Pakistan',
    value: 190570.007324219,
  },
  {
    name: 'Panama',
    value: 13340.0001525879,
  },
  {
    name: 'Papua New Guinea',
    value: 7579.99992370605,
  },
  {
    name: 'Paraguay',
    value: 8210.00003814697,
  },
  {
    name: 'Peru',
    value: 56750,
  },
  {
    name: 'Philippines',
    value: 145419.998168945,
  },
  {
    name: 'Poland',
    value: 295130.004882813,
  },
  {
    name: 'Portugal',
    value: 44639.9993896484,
  },
  {
    name: 'Qatar',
    value: 91970.0012207031,
  },
  {
    name: 'Romania',
    value: 73949.9969482422,
  },
  {
    name: 'Russia',
    value: 1703589.96582031,
  },
  {
    name: 'Rwanda',
    value: 1330.00004291534,
  },
  {
    name: 'Samoa',
    value: 300.000011920929,
  },
  {
    name: 'São Tomé and Principe',
    value: 150.000005960464,
  },
  {
    name: 'Saudi Arabia',
    value: 523780.029296875,
  },
  {
    name: 'Senegal',
    value: 10619.9998855591,
  },
  {
    name: 'Serbia',
    value: 45950.0007629395,
  },
  {
    name: 'Seychelles',
    value: 610.000014305115,
  },
  {
    name: 'Sierra Leone',
    value: 899.999976158142,
  },
  {
    name: 'Singapore',
    value: 47380.0010681152,
  },
  {
    name: 'Slovakia',
    value: 31079.9999237061,
  },
  {
    name: 'Slovenia',
    value: 13600.0003814697,
  },
  {
    name: 'Solomon Is.',
    value: 360.000014305115,
  },
  {
    name: 'Somalia',
    value: 689.999997615814,
  },
  {
    name: 'South Africa',
    value: 439640.014648438,
  },
  {
    name: 'Spain',
    value: 239979.995727539,
  },
  {
    name: 'Sri Lanka',
    value: 23780.0006866455,
  },
  {
    name: 'St. Vin. and Gren.',
    value: 259.999990463257,
  },
  {
    name: 'Sudan',
    value: 20620.0008392333,
  },
  {
    name: 'Suriname',
    value: 2650.00009536743,
  },
  {
    name: 'Swaziland',
    value: 959.999978542328,
  },
  {
    name: 'Sweden',
    value: 35000,
  },
  {
    name: 'Switzerland',
    value: 37380.0010681152,
  },
  {
    name: 'Tajikistan',
    value: 9420.00007629395,
  },
  {
    name: 'Tanzania',
    value: 12449.9998092651,
  },
  {
    name: 'Thailand',
    value: 267089.996337891,
  },
  {
    name: 'Timor-Leste',
    value: 620.000004768372,
  },
  {
    name: 'Togo',
    value: 2369.99988555908,
  },
  {
    name: 'Tonga',
    value: 159.999996423721,
  },
  {
    name: 'Trinidad and Tobago',
    value: 17190.00053405760,
  },
  {
    name: 'Tunisia',
    value: 29909.9998474121,
  },
  {
    name: 'Turkey',
    value: 396839.996337891,
  },
  {
    name: 'Uganda',
    value: 5860.0001335144,
  },
  {
    name: 'United Arab Emirates',
    value: 188860.000610352,
  },
  {
    name: 'Ukraine',
    value: 174729.995727539,
  },
  {
    name: 'United Kingdom',
    value: 348920.013427734,
  },
  {
    name: 'United States',
    value: 4817720.21484375,
  },
  {
    name: 'Uruguay',
    value: 6489.99977111816,
  },
  {
    name: 'Uzbekistan',
    value: 116709.999084473,
  },
  {
    name: 'Vanuatu',
    value: 209.999993443489,
  },
  {
    name: 'Vietnam',
    value: 336489.990234375,
  },
  {
    name: 'Zambia',
    value: 6800.00019073486,
  },
  {
    name: 'Zimbabwe',
    value: 11760.0002288818,
  },
]

/**
 * 各国 2021年 CO2 Emissions 最大值
 * @type {number}
 */
const MAXs = DATAs.reduce((pre, cur) => cur.value > pre ? cur.value : pre, Number.MIN_VALUE)

/**
 * 各国 2021年 CO2 Emissions 最小值
 * @type {number}
 */
const MINs = DATAs.reduce((pre, cur) => cur.value < pre ? cur.value : pre, Number.MAX_VALUE)
