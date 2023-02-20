const el = document.getElementById('graph3')

const chart = echarts.init(el)

chart.showLoading()

$.when($.get('/next-learing/world.json')).done((res) => {
  const worldJson = res

  const projection = d3.geoEqualEarth()

  echarts.registerMap('world', worldJson)

  chart.hideLoading()

  chart.setOption({
    title: {
      show: true,
      text: 'World GDP of 2021',
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
      min: Math.floor(Math.log(MIN)),
      max: Math.ceil(Math.log(MAX)),
      inRange: {
        color: [
          '#489ef6',
          '#53a1ef',
          '#67a5e3',
          '#75dad8',
          '#8afada',
          '#7feecb',
          '#cbbdf9',
          '#a588f7',
          '#8a65fc',
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
        name: 'GDP',
        map: 'world',
        projection: {
          project (point) {
            return projection(point)
          },
          unproject (point) {
            return projection.invert(point)
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        data: DATA.map((v) => ({
          name: v.name,
          value: Math.log(v.value),
        })),
      },
    ],
  })
})

/**
 * 各国 2021 年 GDP 数据
 * @type {Array<{ name: string, value: number}>}
 */
const DATA = [
  {
    name: 'Afghanistan',
    value: 14786861638.4535,
  },
  {
    name: 'Albania',
    value: 18255787479.1846,
  },
  {
    name: 'Algeria',
    value: 163044443983.759,
  },
  {
    name: 'Angola',
    value: 67404287260.3199,
  },
  {
    name: 'Argentina',
    value: 487227339102.67,
  },
  {
    name: 'Armenia',
    value: 13861409968.835,
  },
  {
    name: 'Australia',
    value: 1552667363236.06,
  },
  {
    name: 'Austria',
    value: 480368403893.364,
  },
  {
    name: 'Azerbaijan',
    value: 54622176470.5882,
  },
  {
    name: 'Bahamas',
    value: 11208600000,
  },
  {
    name: 'Bahrain',
    value: 38868663031.9149,
  },
  {
    name: 'Bangladesh',
    value: 416264942893.326,
  },
  {
    name: 'Barbados',
    value: 4843800000,
  },
  {
    name: 'Belarus',
    value: 68205380706.6609,
  },
  {
    name: 'Belgium',
    value: 594104177539.525,
  },
  {
    name: 'Belize',
    value: 2491500000,
  },
  {
    name: 'Benin',
    value: 17144918952.4682,
  },
  {
    name: 'Bermuda',
    value: 7286607000,
  },
  {
    name: 'Bhutan',
    value: 2539552984.67797,
  },
  {
    name: 'Bolivia',
    value: 40408208528.1599,
  },
  {
    name: 'Bosnia and Herz.',
    value: 5861268038.7982,
  },
  {
    name: 'Botswana',
    value: 17614791265.6824,
  },
  {
    name: 'Brazil',
    value: 1608981456325.08,
  },
  {
    name: 'Bulgaria',
    value: 84056312734.3089,
  },
  {
    name: 'Burkina Faso',
    value: 19737615114.3661,
  },
  {
    name: 'Burundi',
    value: 2779813489.02447,
  },
  {
    name: 'Cambodia',
    value: 26961061119.7957,
  },
  {
    name: 'Cameroon',
    value: 45338283344.8175,
  },
  {
    name: 'Canada',
    value: 1988336331717.42,
  },
  {
    name: 'Cape Verde',
    value: 1936174043.45293,
  },
  {
    name: 'Cayman Is.',
    value: 5898449687.97711,
  },
  {
    name: 'Central African Rep.',
    value: 2516498299.01212,
  },
  {
    name: 'Chad',
    value: 11779980801.7843,
  },
  {
    name: 'Chile',
    value: 317058508651.76,
  },
  {
    name: 'China',
    value: 17734062645371.4,
  },
  {
    name: 'Colombia',
    value: 314464137241.33,
  },
  {
    name: 'Comoros',
    value: 1296089632.60039,
  },
  {
    name: 'Congo',
    value: 55350968593.0597,
  },
  {
    name: 'Costa Rica',
    value: 64282438666.739,
  },
  {
    name: 'Côte d\'Ivoire',
    value: 70043191477.0454,
  },
  {
    name: 'Croatia',
    value: 68955083280.1922,
  },
  {
    name: 'Curaçao',
    value: 2699612458.10056,
  },
  {
    name: 'Cyprus',
    value: 28407867534.0035,
  },
  {
    name: 'Czech Rep.',
    value: 281777887121.451,
  },
  {
    name: 'Dem. Rep. Congo',
    value: 55350968593.0597,
  },
  {
    name: 'Denmark',
    value: 398303272764.46,
  },
  {
    name: 'Djibouti',
    value: 3482987379.0942,
  },
  {
    name: 'Dominica',
    value: 554181481.481481,
  },
  {
    name: 'Dominican Rep.',
    value: 94243453937.4462,
  },
  {
    name: 'Ecuador',
    value: 106165866000,
  },
  {
    name: 'Egypt',
    value: 404142766093.053,
  },
  {
    name: 'El Salvador',
    value: 28736940000,
  },
  {
    name: 'Eq. Guinea',
    value: 12269392839.7472,
  },
  {
    name: 'Estonia',
    value: 37191166151.98,
  },
  {
    name: 'Ethiopia',
    value: 111271112329.975,
  },
  {
    name: 'Fiji',
    value: 4296304590.01135,
  },
  {
    name: 'Finland',
    value: 297301883523.251,
  },
  {
    name: 'France',
    value: 2957879759263.52,
  },
  {
    name: 'Gabon',
    value: 20216843173.9702,
  },
  {
    name: 'Gambia',
    value: 2038417462.37695,
  },
  {
    name: 'Georgia',
    value: 18629365597.0017,
  },
  {
    name: 'Germany',
    value: 4259934911821.64,
  },
  {
    name: 'Ghana',
    value: 77594279054.8795,
  },
  {
    name: 'Greece',
    value: 214873879833.648,
  },
  {
    name: 'Guam',
    value: 6123000000,
  },
  {
    name: 'Guatemala',
    value: 85985752107.4679,
  },
  {
    name: 'Guinea',
    value: 16091817842.2342,
  },
  {
    name: 'Guinea-Bissau',
    value: 1638517533.16504,
  },
  {
    name: 'Guyana',
    value: 8044498800.95923,
  },
  {
    name: 'Haiti',
    value: 20944392615.0803,
  },
  {
    name: 'Honduras',
    value: 28488668301.6401,
  },
  {
    name: 'Hungary',
    value: 181848022233.89,
  },
  {
    name: 'Iceland',
    value: 25602419210.3374,
  },
  {
    name: 'India',
    value: 3176295065497.24,
  },
  {
    name: 'Indonesia',
    value: 1186092991320.04,
  },
  {
    name: 'Iran',
    value: 359713152725.062,
  },
  {
    name: 'Iraq',
    value: 207889333724.138,
  },
  {
    name: 'Ireland',
    value: 504182603275.542,
  },
  {
    name: 'Israel',
    value: 488526545878.891,
  },
  {
    name: 'Italy',
    value: 2107702842669.73,
  },
  {
    name: 'Jamaica',
    value: 14657586937.0735,
  },
  {
    name: 'Japan',
    value: 4940877780755.33,
  },
  {
    name: 'Jordan',
    value: 45744271658.9141,
  },
  {
    name: 'Kazakhstan',
    value: 197112255360.612,
  },
  {
    name: 'Kenya',
    value: 110347079517.356,
  },
  {
    name: 'Kiribati',
    value: 207031250,
  },
  {
    name: 'Korea',
    value: 1810955871380.98,
  },
  {
    name: 'Kyrgyzstan',
    value: 8543423502.6134,
  },
  {
    name: 'Lao PDR',
    value: 18827148509.5798,
  },
  {
    name: 'Latvia',
    value: 39853501579.8211,
  },
  {
    name: 'Lebanon',
    value: 23131940280.7316,
  },
  {
    name: 'Lesotho',
    value: 2496134680.31694,
  },
  {
    name: 'Liberia',
    value: 3509000000,
  },
  {
    name: 'Libya',
    value: 42817472975.3677,
  },
  {
    name: 'Lithuania',
    value: 66445256585.3671,
  },
  {
    name: 'Luxembourg',
    value: 85506243833.7816,
  },
  {
    name: 'Macedonia',
    value: 13825049831.7959,
  },
  {
    name: 'Madagascar',
    value: 14472603322.5571,
  },
  {
    name: 'Malawi',
    value: 12626717491.8941,
  },
  {
    name: 'Malaysia',
    value: 372980957208.023,
  },
  {
    name: 'Mali',
    value: 19140461605.8227,
  },
  {
    name: 'Malta',
    value: 17364044943.8202,
  },
  {
    name: 'Mauritania',
    value: 9996249658.23982,
  },
  {
    name: 'Mauritius',
    value: 11529042672.3528,
  },
  {
    name: 'Mexico',
    value: 1272839334119.3,
  },
  {
    name: 'Micronesia',
    value: 404028900,
  },
  {
    name: 'Moldova',
    value: 13679221333.2052,
  },
  {
    name: 'Mongolia',
    value: 15286441818.1437,
  },
  {
    name: 'Montenegro',
    value: 5861268038.7982,
  },
  {
    name: 'Morocco',
    value: 142866329198.42,
  },
  {
    name: 'Mozambique',
    value: 15776758632.8573,
  },
  {
    name: 'Myanmar',
    value: 65091751273.2879,
  },
  {
    name: 'Namibia',
    value: 12310595843.9353,
  },
  {
    name: 'Nepal',
    value: 36288830373.4106,
  },
  {
    name: 'Netherlands',
    value: 1012846760976.73,
  },
  {
    name: 'New Caledonia',
    value: 10071351960.0477,
  },
  {
    name: 'New Zealand',
    value: 249885687029.634,
  },
  {
    name: 'Nicaragua',
    value: 14013022092.0645,
  },
  {
    name: 'Niger',
    value: 14915001426.9724,
  },
  {
    name: 'Nigeria',
    value: 440833583992.485,
  },
  {
    name: 'Norway',
    value: 482174854481.956,
  },
  {
    name: 'Oman',
    value: 88191977373.212,
  },
  {
    name: 'Pakistan',
    value: 348262544719.178,
  },
  {
    name: 'Panama',
    value: 63605100000,
  },
  {
    name: 'Papua New Guinea',
    value: 26594305745.554,
  },
  {
    name: 'Paraguay',
    value: 39495431574.1782,
  },
  {
    name: 'Peru',
    value: 223249497500.387,
  },
  {
    name: 'Philippines',
    value: 394086401171.168,
  },
  {
    name: 'Poland',
    value: 679444832854.295,
  },
  {
    name: 'Portugal',
    value: 253663144586.019,
  },
  {
    name: 'Puerto Rico',
    value: 106525700000,
  },
  {
    name: 'Qatar',
    value: 179677211793.938,
  },
  {
    name: 'Romania',
    value: 284087563695.798,
  },
  {
    name: 'Russia',
    value: 1778782625793.74,
  },
  {
    name: 'Rwanda',
    value: 11070356519.4804,
  },
  {
    name: 'Samoa',
    value: 843842416.462442,
  },
  {
    name: 'São Tomé and Principe',
    value: 526653790.670814,
  },
  {
    name: 'Saudi Arabia',
    value: 833541236569.315,
  },
  {
    name: 'Senegal',
    value: 27625388352.1688,
  },
  {
    name: 'Serbia',
    value: 63082047649.8528,
  },
  {
    name: 'Seychelles',
    value: 1454458183.85981,
  },
  {
    name: 'Sierra Leone',
    value: 4042237864.28942,
  },
  {
    name: 'Singapore',
    value: 396986899888.351,
  },
  {
    name: 'Slovakia',
    value: 116527101097.7,
  },
  {
    name: 'Slovenia',
    value: 61748586534.8672,
  },
  {
    name: 'Solomon Is.',
    value: 1631486531.92364,
  },
  {
    name: 'Somalia',
    value: 7628000011.46184,
  },
  {
    name: 'South Africa',
    value: 419015018371.887,
  },
  {
    name: 'Spain',
    value: 1427380681294.55,
  },
  {
    name: 'Sri Lanka',
    value: 88927263724.8592,
  },
  {
    name: 'St. Vin. and Gren.',
    value: 904181492.766708,
  },
  {
    name: 'Sudan',
    value: 34326058557.4418,
  },
  {
    name: 'Suriname',
    value: 2984706243.65482,
  },
  {
    name: 'Swaziland',
    value: 4743335152.94181,
  },
  {
    name: 'Sweden',
    value: 635663801201.765,
  },
  {
    name: 'Switzerland',
    value: 800640155387.26,
  },
  {
    name: 'Tajikistan',
    value: 8746270636.40142,
  },
  {
    name: 'Tanzania',
    value: 67841049193.3855,
  },
  {
    name: 'Thailand',
    value: 505947037098.424,
  },
  {
    name: 'Timor-Leste',
    value: 3621222382.15929,
  },
  {
    name: 'Togo',
    value: 8413200567.6151,
  },
  {
    name: 'Tonga',
    value: 469231309.539488,
  },
  {
    name: 'Trinidad and Tobago',
    value: 24460196270.6866,
  },
  {
    name: 'Tunisia',
    value: 46686741814.278,
  },
  {
    name: 'Turkey',
    value: 819035182929.585,
  },
  {
    name: 'Uganda',
    value: 40529789025.5702,
  },
  {
    name: 'United Arab Emirates',
    value: 415021590683.006,
  },
  {
    name: 'Ukraine',
    value: 200085537744.354,
  },
  {
    name: 'United Kingdom',
    value: 3131377762925.95,
  },
  {
    name: 'United States',
    value: 23315080560000,
  },
  {
    name: 'Uruguay',
    value: 59319484710.6527,
  },
  {
    name: 'Uzbekistan',
    value: 69238903106.1738,
  },
  {
    name: 'Vanuatu',
    value: 956332655.718234,
  },
  {
    name: 'Vietnam',
    value: 366137590600.699,
  },
  {
    name: 'Zambia',
    value: 22147634727.3584,
  },
  {
    name: 'Zimbabwe',
    value: 28371238665.5116,
  },
]

/**
 * 各国 2021年 GDP 最大值
 * @type {number}
 */
const MAX = DATA.reduce((pre, cur) => cur.value > pre ? cur.value : pre, Number.MIN_VALUE)

/**
 * 各国 2021年 GDP 最小值
 * @type {number}
 */
const MIN = DATA.reduce((pre, cur) => cur.value < pre ? cur.value : pre, Number.MAX_VALUE)
