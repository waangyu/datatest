/* 数据与图表配置（ECharts 5） */
window.CHARTS = (function () {
  var SERIF = '"Noto Serif SC","Source Han Serif SC","Songti SC","STZhongsong","SimSun",serif';
  var INK = '#211d18', SOFT = '#5d574c', LINE = '#d7d0c0',
      RED = '#8a2f20', RED2 = '#b0543c', BLUE = '#2a475e', STEEL = '#577184',
      SAND = '#8f6c34', NEUTRAL = '#a89d82', GRAY = '#8f8a7d';

  var BASE = {
    textStyle: { fontFamily: SERIF, color: INK },
    animationDuration: 1400,
    animationEasing: 'cubicOut'
  };
  function axisX(data, name) {
    return {
      type: 'category', data: data, boundaryGap: true,
      axisLine: { lineStyle: { color: '#b0a894' } },
      axisTick: { show: false },
      axisLabel: { color: SOFT, fontSize: 12 },
      name: name || '', nameTextStyle: { color: SOFT, fontSize: 11, padding: 4 }
    };
  }
  function axisY(name, max) {
    return {
      type: 'value', name: name || '',
      max: max || null,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: SOFT, fontSize: 12 },
      splitLine: { lineStyle: { color: '#e2dccb', type: [4, 4] } },
      nameTextStyle: { color: SOFT, fontSize: 11 }
    };
  }
  function grid() { return { left: 54, right: 34, top: 58, bottom: 42, containLabel: false }; }
  function legend(items, top) {
    return {
      data: items, top: top || 8, right: 10, itemWidth: 18, itemHeight: 8,
      itemGap: 18, textStyle: { color: SOFT, fontSize: 12.5 }
    };
  }
  var M = {};

  /* C1 考研与国考报名人数变化：双折线（单轴·万人），两条线先后生长 */
  M.c1 = function () {
    var years = ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'];
    var ky = [177,201,238,290,341,377,457,474,438,388,343];
    var gk = [139.46,148.63,165.97,137.93,143.7,157.6,212.3,259.77,303.3,341.6,371.8];
    return Object.assign({}, BASE, {
      grid: grid(),
      legend: legend(['考研报名人数', '国考过审人数']),
      xAxis: axisX(years),
      yAxis: axisY('万人'),
      series: [
        {
          name: '考研报名人数', type: 'line', data: ky, symbol: 'circle', symbolSize: 7,
          lineStyle: { width: 3, color: BLUE }, itemStyle: { color: BLUE },
          animationDuration: 1800,
          label: { show: true, position: 'top', fontSize: 11, color: BLUE, fontFamily: SERIF, fontWeight: 600,
                   formatter: function (p) { return p.value; } }
        },
        {
          name: '国考过审人数', type: 'line', data: gk, symbol: 'circle', symbolSize: 7,
          lineStyle: { width: 3, color: RED }, itemStyle: { color: RED },
          animationDelay: 1500, animationDuration: 1800,
          label: { show: true, position: 'bottom', fontSize: 11, color: RED, fontFamily: SERIF, fontWeight: 600,
                   formatter: function (p) { return p.value; } }
        }
      ]
    });
  };

  /* C2 考研报名与硕士招生规模对比：分组柱状（全站唯一标准柱） */
  M.c2 = function () {
    var years = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
    var bm = [164.9,177,201,238,290,341,377,457,474,438,388];
    var zs = [57.06,58.98,72.22,76.25,81.13,99.05,105.07,110.35,114.84,118.57,123.68];
    return Object.assign({}, BASE, {
      grid: { left: 54, right: 30, top: 62, bottom: 42 },
      legend: legend(['考研报名人数', '硕士招生规模']),
      xAxis: axisX(years),
      yAxis: axisY('万人'),
      series: [
        {
          name: '考研报名人数', type: 'bar', data: bm, barWidth: '34%', barGap: '25%',
          itemStyle: { color: BLUE, borderRadius: [2, 2, 0, 0] },
          animationDelay: function (i) { return i * 70; },
          label: { show: true, position: 'top', fontSize: 10, color: BLUE, fontFamily: SERIF, fontWeight: 600 }
        },
        {
          name: '硕士招生规模', type: 'bar', data: zs, barWidth: '34%',
          itemStyle: { color: SAND, borderRadius: [2, 2, 0, 0] },
          animationDelay: function (i) { return 800 + i * 70; },
          label: { show: true, position: 'top', fontSize: 10, color: SAND, fontFamily: SERIF, fontWeight: 600,
                   formatter: function (p) { return p.value; } },
          markLine: {
            symbol: 'none', animationDuration: 400,
            lineStyle: { color: GRAY, type: 'dashed' },
            label: { formatter: '2017年\n口径调整', fontSize: 11, color: SOFT, fontFamily: SERIF },
            data: [{ xAxis: '2017' }]
          }
        }
      ]
    });
  };

  /* C3 考研报名与招生规模比：棒棒糖图（细杆 + 圆头），峰值 4.14 / 4.13 与 3.14 强调 */
  M.c3 = function () {
    var years = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
    var ratio = [2.89,3.00,2.78,3.12,3.57,3.44,3.59,4.14,4.13,3.70,3.14];
    function dotColor(n) { return n >= 4.1 ? RED : (Math.abs(n - 3.14) < 0.001 ? BLUE : '#c3bcae'); }
    return Object.assign({}, BASE, {
      grid: grid(),
      xAxis: axisX(years),
      yAxis: Object.assign(axisY('报名人数 ÷ 硕士招生规模'), { max: 4.8 }),
      series: [
        {
          type: 'bar', data: ratio, barWidth: 2,
          itemStyle: { color: '#c8c0ad', borderRadius: 1 },
          barGap: '-100%', silent: true,
          animationDelay: function (i) { return i * 70; },
          tooltip: { show: false }
        },
        {
          type: 'scatter',
          data: ratio.map(function (n) { return { value: n, itemStyle: { color: dotColor(n) } }; }),
          symbolSize: 17, z: 5,
          animationDelay: function (i) { return i * 90 + 200; },
          label: { show: true, position: 'top', fontSize: 12, fontFamily: SERIF, fontWeight: 600,
                   color: INK,
                   formatter: function (p) { return p.value.toFixed(2); } }
        }
      ]
    });
  };

  /* C4 高校毕业生规模变化：珠串气泡图（高低 + 大小双编码，不连线） */
  M.c4 = function () {
    var years = ['2015届','2016届','2017届','2018届','2019届','2020届','2021届','2022届','2023届','2024届','2025届','2026届'];
    var v = [749,765,795,820,834,874,909,1076,1158,1179,1222,1270];
    function size(n) { return Math.round(Math.sqrt(n / 1270) * 46 + 13); }
    return Object.assign({}, BASE, {
      grid: { left: 54, right: 30, top: 60, bottom: 42 },
      xAxis: axisX(years),
      yAxis: Object.assign(axisY('万人'), { min: 600, max: 1360 }),
      tooltip: {
        trigger: 'item',
        formatter: function (p) { return p.name + '<br/>高校毕业生：' + p.value[1] + ' 万人'; }
      },
      series: [{
        type: 'scatter',
        data: v.map(function (n, i) {
          var hot = i >= 7;
          return {
            name: years[i],
            value: [years[i], n],
            symbolSize: size(n),
            itemStyle: { color: hot ? RED : STEEL, opacity: hot ? .82 : .7,
                         borderColor: '#f4f0e6', borderWidth: 2, shadowBlur: 6, shadowColor: 'rgba(60,50,35,.12)' }
          };
        }),
        animationDelay: function (i) { return i * 110; },
        label: { show: true, position: 'top', fontSize: 11, fontFamily: SERIF, fontWeight: 600, color: INK,
                 formatter: function (p) {
                   return (p.dataIndex === 7 ? '首破千万 ' : '') + p.value[1];
                 } }
      }]
    });
  };

  /* C6 国考过审人数与计划招录规模对比：指数折线（2016年＝100），一眼看出增速差 */
  M.c6 = function () {
    var years = ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'];
    var passAudit = [139.46,148.63,165.97,137.93,143.7,157.6,212.3,259.77,303.3,341.6,371.8];
    var recruit = [2.78,2.71,2.85,1.45,2.41,2.57,3.12,3.71,3.96,3.97,3.81];
    function idx(arr) { return arr.map(function (v) { return +(v / arr[0] * 100).toFixed(1); }); }
    var pi = idx(passAudit), ri = idx(recruit);
    return Object.assign({}, BASE, {
      grid: { left: 54, right: 110, top: 62, bottom: 42 },
      legend: legend(['国考过审人数', '计划招录人数'], 8),
      xAxis: axisX(years),
      yAxis: Object.assign(axisY('指数（2016年＝100）'), { min: 40, max: 300 }),
      tooltip: { trigger: 'axis',
        formatter: function (p) {
          var i = years.indexOf(p[0].axisValue);
          return p[0].axisValue + '年<br/>过审人数：' + passAudit[i] + ' 万人<br/>计划招录：' + recruit[i] + ' 万人';
        } },
      series: [
        {
          name: '国考过审人数', type: 'line', data: pi, symbol: 'circle', symbolSize: 7,
          lineStyle: { width: 3, color: RED }, itemStyle: { color: RED },
          animationDuration: 1800,
          label: { show: true, position: 'top', fontSize: 10.5, color: RED, fontFamily: SERIF, fontWeight: 600,
                   formatter: function (p) { return p.dataIndex === 10 ? p.value + '（+166.6%）' : p.value; } }
        },
        {
          name: '计划招录人数', type: 'line', data: ri, symbol: 'circle', symbolSize: 7,
          lineStyle: { width: 3, color: STEEL }, itemStyle: { color: STEEL },
          animationDelay: 900, animationDuration: 1800,
          label: { show: true, position: 'bottom', fontSize: 10.5, color: STEEL, fontFamily: SERIF, fontWeight: 600,
                   formatter: function (p) { return p.dataIndex === 10 ? p.value + '（+37.0%）' : p.value; } }
        }
      ]
    });
  };

  /* C7 国考职位应届身份要求变化：红色＝明确限应届职位占比（单系列，红色渐变面积） */
  M.c7 = function () {
    var years = ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'];
    var a = [44.4,43.1,43.0,39.8,45.5,54.6,64.3,60.7,62.1,64.5,66.5];
    return Object.assign({}, BASE, {
      grid: { left: 54, right: 64, top: 66, bottom: 42 },
      legend: legend(['明确限应届职位占比'], 8),
      xAxis: axisX(years),
      yAxis: Object.assign(axisY('占职位总数比例（%）'), { max: 80 }),
      tooltip: { trigger: 'axis',
        formatter: function (p) { return p[0].axisValue + '年<br/>明确限应届职位占比：' + p[0].value + '%'; } },
      series: [{
        name: '明确限应届职位占比', type: 'line', data: a,
        symbol: 'circle', symbolSize: 7,
        lineStyle: { width: 3, color: RED }, itemStyle: { color: RED },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(138,47,32,.26)' },
            { offset: 1, color: 'rgba(138,47,32,.02)' }
          ])
        },
        animationDuration: 1800,
        label: { show: true, position: 'top', fontSize: 11.5, color: '#661f13', fontFamily: SERIF, fontWeight: 600,
                 textBorderColor: '#f4f0e6', textBorderWidth: 3,
                 formatter: function (p) { return p.dataIndex === 10 ? p.value + '%（约三分之二）' : p.value + '%'; } }
      }]
    });
  };

  /* C8 2026年国考职位学历要求组合：符号饼图（人形符号按占比成行排列） */
  M.c8 = function () {
    var PERSON = 'path://M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4-4,1.79-4,4,1.79,4,4,4z'
               + 'M12,14c-2.67,0-8,1.34-8,4v2h16v-2c0-2.66-5.33-4-8-4z';
    var rows = [
      { name: '本科＋硕士＋博士', n: '14,123', pct: 68.18, color: RED },
      { name: '本科',            n: '3,012',  pct: 14.54, color: '#b0543c' },
      { name: '硕士＋博士',      n: '1,984',  pct: 9.58,  color: STEEL },
      { name: '本科＋硕士',      n: '1,125',  pct: 5.43,  color: '#6d8a9c' },
      { name: '硕士及其他',      n: '470',    pct: 2.27,  color: SAND }
    ];
    return Object.assign({}, BASE, {
      grid: { left: 10, right: 170, top: 24, bottom: 26, containLabel: true },
      xAxis: { type: 'value', max: 70, show: false },
      yAxis: {
        type: 'category', inverse: true,
        data: rows.map(function (r) { return r.name; }),
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: INK, fontSize: 12.5, fontFamily: SERIF }
      },
      tooltip: { trigger: 'item',
        formatter: function (p) {
          var r = rows[p.dataIndex];
          return r.name + '<br/>' + r.n + ' 个 · ' + r.pct + '%';
        } },
      series: [{
        type: 'pictorialBar',
        symbol: PERSON,
        symbolSize: [15, 15],
        symbolMargin: 3,
        symbolRepeat: true,
        symbolClip: true,
        barCategoryGap: '55%',
        data: rows.map(function (r, i) {
          return {
            value: r.pct,
            itemStyle: { color: r.color },
            label: {
              show: true, position: 'right', distance: 8,
              color: i === 0 ? '#661f13' : SOFT,
              fontWeight: i === 0 ? 700 : 400,
              fontFamily: SERIF, fontSize: 12.5, lineHeight: 18,
              formatter: r.n + ' 个 · ' + r.pct + '%'
            }
          };
        }),
        animationDelay: function (i) { return i * 120; }
      }]
    });
  };

  /* C9 学科门类 × 年份 热力矩阵 */
  M.c9 = function () {
    var raw = {
      '管理学': [6071,7223,7590,4484,7642,6838,8891,9473,9259,8109,8684],
      '经济学': [5575,6685,7406,4279,6605,5808,7657,8087,7569,7656,8001],
      '工学':   [4035,4435,5082,3150,5147,4869,6465,6920,7117,5886,6012],
      '法学':   [3108,3650,4008,2093,4128,3661,4768,4822,5080,4078,4142],
      '理学':   [3607,4247,4428,2936,4430,3780,5532,6138,6027,3983,4092],
      '文学':   [2622,3332,3529,1846,3831,3625,4698,4588,4553,3254,3141],
      '农学':   [344,391,278,80,206,171,247,527,508,561,523],
      '哲学':   [97,178,566,204,354,354,502,830,807,621,476],
      '教育学': [135,236,534,142,287,387,320,477,452,434,345],
      '医学':   [176,154,145,37,137,283,280,302,221,212,270],
      '艺术学': [27,27,75,64,138,151,393,618,231,119,131],
      '历史学': [108,223,447,102,194,178,265,499,372,396,77],
      '军事学': [0,0,0,0,0,0,0,14,22,33,25],
      '交叉学科':[0,0,0,0,0,0,0,0,9,11,11]
    };
    var years = ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'];
    var cats = Object.keys(raw);
    var data = [];
    cats.forEach(function (c, ci) {
      raw[c].forEach(function (v, yi) {
        var item = { value: [yi, ci, v] };
        if (v >= 600) item.label = { color: v >= 4500 ? '#fff' : '#3d3a33' };
        data.push(item);
      });
    });
    return Object.assign({}, BASE, {
      grid: { left: 74, right: 20, top: 14, bottom: 44 },
      xAxis: { type: 'category', data: years, splitArea: { show: false },
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: SOFT, fontSize: 12 } },
      yAxis: { type: 'category', data: cats, inverse: false,
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: INK, fontSize: 12, fontFamily: SERIF } },
      visualMap: {
        min: 0, max: 9500, calculable: false, orient: 'vertical', right: 0, top: 'middle',
        itemHeight: 120, itemWidth: 12, text: ['高', '低'],
        textStyle: { color: SOFT, fontSize: 11, fontFamily: SERIF },
        inRange: { color: ['#f7f2e8', '#eedfc4', '#dca97f', '#b05a3e', '#8a2f20'] }
      },
      tooltip: { formatter: function (p) { return p.name + '年 · ' + cats[p.value[1]] + '<br/>覆盖职位：' + p.value[2].toLocaleString() + ' 个'; } },
      series: [{
        type: 'heatmap', data: data,
        progressive: 1000,
        label: { show: true, fontSize: 9.5, fontFamily: SERIF,
          formatter: function (p) {
            var v = p.value[2];
            return v >= 600 ? v : '';
          } },
        itemStyle: { borderColor: '#f4f0e6', borderWidth: 1.5 },
        emphasis: { itemStyle: { shadowBlur: 6, shadowColor: 'rgba(0,0,0,.3)' } },
        animationDelay: function (i) { return i % 11 * 40 + Math.floor(i / 11) * 60; }
      }]
    });
  };

  /* C10 完全不限专业职位变化：极简时间轴点阵（点越大＝职位越多，2026年红点强调） */
  M.c10 = function () {
    function dot(cat, v, color, label, emph) {
      return {
        value: [cat, 0],
        symbolSize: Math.max(9, Math.sqrt(v) * 3.1),
        itemStyle: { color: color, opacity: .88 },
        label: {
          show: true, position: 'top', distance: 14,
          color: emph ? '#661f13' : SOFT,
          fontWeight: emph ? 700 : 400,
          fontFamily: SERIF, fontSize: emph ? 15 : 14, lineHeight: 24,
          formatter: label
        }
      };
    }
    return Object.assign({}, BASE, {
      grid: { left: 40, right: 40, top: 110, bottom: 24 },
      xAxis: {
        type: 'category', data: ['2016年', '2019年', '2026年'],
        axisLine: { lineStyle: { color: '#b0a894' } },
        axisTick: { show: false },
        axisLabel: { color: SOFT, fontSize: 14, fontFamily: SERIF, padding: 16 }
      },
      yAxis: { type: 'value', min: 0, max: 150, show: false },
      tooltip: { show: false },
      series: [{
        type: 'scatter',
        data: [
          dot('2016年', 80, STEEL, '80 个\n占 0.51%'),
          dot('2019年', 116, '#b0543c', '116 个\n占 1.20%'),
          dot('2026年', 6, RED, '仅剩 6 个\n占约 0.03%', true)
        ],
        animationDelay: function (i) { return i * 260; }
      }]
    });
  };

  /* ---------- C11 中国地图气泡图（大小=职位数，颜色=限应届占比） ---------- */
  var CAP = {
    '北京':[116.4,39.9],'天津':[117.2,39.1],'河北':[114.5,38.0],'山西':[112.5,37.9],
    '内蒙古':[111.7,40.8],'辽宁':[123.4,41.8],'吉林':[125.3,43.9],'黑龙江':[126.6,45.8],
    '上海':[121.5,31.2],'江苏':[118.8,32.1],'浙江':[120.2,30.3],'安徽':[117.3,31.8],
    '福建':[119.3,26.1],'江西':[115.9,28.7],'山东':[117.0,36.7],'河南':[113.6,34.7],
    '湖北':[114.3,30.6],'湖南':[112.9,28.2],'广东':[113.3,23.1],'广西':[108.4,22.8],
    '海南':[110.3,20.0],'重庆':[106.5,29.6],'四川':[104.1,30.7],'贵州':[106.7,26.6],
    '云南':[102.7,25.0],'西藏':[91.1,29.6],'陕西':[108.9,34.3],'甘肃':[103.8,36.1],
    '青海':[101.8,36.6],'宁夏':[106.3,38.5],'新疆':[87.6,43.8]
  };
  var chinaReady = null;
  function loadChina() {
    if (chinaReady) return chinaReady;
    chinaReady = fetch('js/china.json')
      .then(function (r) { return r.json(); })
      .then(function (geo) {
        geo.features.forEach(function (f) {
          var n = (f.properties && f.properties.name) || '';
          n = n.replace('壮族', '').replace('回族', '').replace('维吾尔', '')
               .replace(/特别行政区|自治区|省|市/g, '');
          f.properties.name = n;
        });
        echarts.registerMap('china', geo);
        return true;
      })
      .catch(function () { chinaReady = null; return false; });
    return chinaReady;
  }
  function mapPoints(year) {
    var items = (window.MAPDATA && window.MAPDATA.data[year]) || [];
    return items.map(function (d) {
      var c = CAP[d.n];
      return c ? { name: d.n, value: [c[0], c[1], d.f, d.p] } : null;
    }).filter(Boolean);
  }
  function mapOption(year, k) {
    k = k || 0.92;
    return {
      animationDuration: 900,
      animationEasing: 'cubicOut',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(33,29,24,.92)', borderWidth: 0,
        textStyle: { color: '#f2ecdd', fontFamily: SERIF, fontSize: 13, lineHeight: 20 },
        formatter: function (p) {
          if (p.seriesType !== 'scatter') return p.name || '';
          return p.name + ' · ' + year + '年<br/>职位：' + p.value[3].toLocaleString() +
                 ' 个<br/>限应届占比：' + p.value[2] + '%';
        }
      },
      visualMap: {
        show: false, min: 0, max: 80, dimension: 2, seriesIndex: 0, calculable: false,
        inRange: { color: ['#efe2cd', '#dca57f', '#b05a3e', '#7a2a1c'] }
      },
      geo: {
        map: 'china', roam: false, zoom: 1.08,
        itemStyle: { areaColor: '#e9e3d4', borderColor: '#f4f0e6', borderWidth: 1 },
        emphasis: { disabled: false, itemStyle: { areaColor: '#e0d7c2' }, label: { show: false } },
        select: { disabled: true }
      },
      series: [{
        type: 'scatter', coordinateSystem: 'geo', data: mapPoints(year),
        symbolSize: function (v) { return Math.max(8, Math.sqrt(v[3]) * k); },
        itemStyle: { opacity: .82, borderColor: '#fbf5ea', borderWidth: 1.2,
          shadowBlur: 5, shadowColor: 'rgba(80,55,30,.18)' },
        label: { show: false },
        emphasis: {
          scale: 1.25, z: 10,
          itemStyle: { opacity: 1, borderColor: '#fff', borderWidth: 1.6 },
          label: { show: true, position: 'right', distance: 5, fontSize: 13,
                   fontWeight: 700, color: INK, fontFamily: SERIF,
                   formatter: function (p) { return p.name; } }
        },
        animationDelay: function (i) { return i * 28; }
      }]
    };
  }
  M.c11 = function () {
    return loadChina().then(function (ok) {
      return ok ? mapOption('2026', 0.92) : {};
    });
  };

  /* 图表挂载后的交互钩子 / 销毁前清理钩子 */
  M.mounted = {};
  M.beforeDispose = {};
  M.mounted.c11 = function (inst) {
    var years = (window.MAPDATA && window.MAPDATA.years) || [];
    var yearBox = document.getElementById('mapYears');
    var playBtn = document.getElementById('mapPlay');
    var list = document.getElementById('top10List');
    var title = document.getElementById('top10Title');
    var cur = '2026', timer = null, resizeTimer = null;
    function coeff() {
      var w = inst.getWidth();
      return w >= 800 ? 0.92 : (w >= 560 ? 0.74 : 0.6);
    }

    function renderTop10(y) {
      var items = (window.MAPDATA.data[y] || []).slice(0, 10);
      var max = items.length ? items[0].p : 1;
      title.textContent = y + ' · 职位 TOP10';
      list.innerHTML = items.map(function (d, i) {
        return '<li><span class="rk">' + (i + 1) + '</span><span class="pn">' + d.n +
               '</span><span class="track"><i data-w="' + Math.round(d.p / max * 100) +
               '"></i></span><span class="pv">' + d.p.toLocaleString() + '个</span></li>';
      }).join('');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          list.querySelectorAll('.track i').forEach(function (el) { el.style.width = el.dataset.w + '%'; });
        });
      });
    }

    function setYear(y) {
      cur = y;
      yearBox.querySelectorAll('.yr-btn').forEach(function (b) {
        b.classList.toggle('on', b.dataset.y === y);
      });
      inst.setOption(mapOption(y, coeff()), { lazyUpdate: true });
      renderTop10(y);
    }

    function stopPlay() {
      if (timer) { clearInterval(timer); timer = null; }
      playBtn.querySelector('.mp-ico').textContent = '▶';
      playBtn.querySelector('.mp-txt').textContent = '播放';
    }
    function startPlay() {
      playBtn.querySelector('.mp-ico').textContent = '❚❚';
      playBtn.querySelector('.mp-txt').textContent = '暂停';
      timer = setInterval(function () {
        var idx = years.indexOf(cur);
        if (idx >= years.length - 1) { stopPlay(); return; }
        setYear(years[idx + 1]);
      }, 1300);
    }

    yearBox.innerHTML = years.map(function (y) {
      return '<button type="button" class="yr-btn' + (y === cur ? ' on' : '') + '" data-y="' + y + '">' + y + '</button>';
    }).join('');
    yearBox.addEventListener('click', function (e) {
      var b = e.target.closest('.yr-btn');
      if (!b) return;
      stopPlay();
      setYear(b.dataset.y);
    });
    playBtn.addEventListener('click', function () {
      if (timer) { stopPlay(); }
      else {
        if (cur === years[years.length - 1]) setYear(years[0]);
        startPlay();
      }
    });
    renderTop10(cur);

    /* 窗口尺寸变化：geo 会随容器缩放，但 symbolSize 是像素值，需按宽度重算 */
    inst._mapOnResize = function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        inst.resize();
        inst.setOption(mapOption(cur, coeff()), { lazyUpdate: true });
      }, 200);
    };
    window.addEventListener('resize', inst._mapOnResize);
  };
  M.beforeDispose.c11 = function (inst) {
    if (inst && inst._mapOnResize) window.removeEventListener('resize', inst._mapOnResize);
    var playBtn = document.getElementById('mapPlay');
    if (playBtn) {
      playBtn.querySelector('.mp-ico').textContent = '▶';
      playBtn.querySelector('.mp-txt').textContent = '播放';
    }
  };

  return M;
})();
