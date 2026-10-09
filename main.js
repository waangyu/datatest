/* 滚动浮现、数字滚动、图表进场重播、导航高亮 */
(function () {
  var chartInsts = {};   // chartEl.id -> echarts 实例
  var KEEP_ALIVE = { c11: true };  // 交互型图表：首次创建后常驻，不随滚动销毁

  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    var target = parseFloat(el.dataset.count), dur = 1600, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      k = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * k);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function createChart(chartEl) {
    var id = chartEl.id;
    if (!window.CHARTS || !window.CHARTS[id] || chartInsts[id]) return;
    var inst = window.echarts.init(chartEl, null, { renderer: 'canvas' });
    chartInsts[id] = inst;
    function apply(opt) {
      if (chartInsts[id] !== inst) { inst.dispose(); return; } // 异步返回前已被销毁
      inst.setOption(opt);
      if (window.CHARTS.mounted && window.CHARTS.mounted[id]) window.CHARTS.mounted[id](inst);
    }
    var ret = window.CHARTS[id]();   // 可能返回 Promise（异步底图）
    if (ret && typeof ret.then === 'function') ret.then(apply);
    else apply(ret);
  }
  function destroyChart(chartEl) {
    var id = chartEl.id;
    var inst = chartInsts[id];
    if (!inst) return;
    if (KEEP_ALIVE[id]) return;      // 常驻图表保留实例与交互状态
    inst.dispose();
    delete chartInsts[id];
    chartEl.dataset.inited = '';
  }

  /* 图表卡片：进入视口播放动画，完全滑出后复位；再滑回来重新播放 */
  var figIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var fig = e.target;
      var chartEl = fig.querySelector('.chart');
      if (e.isIntersecting) {
        fig.classList.add('on');
        if (chartEl) createChart(chartEl);
      } else {
        fig.classList.remove('on');
        if (chartEl) destroyChart(chartEl);
      }
    });
  }, { threshold: [0.15, 0.35] });

  /* 普通文字块：只播放一次 */
  var textIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      el.classList.add('on');
      el.querySelectorAll('[data-count]').forEach(countUp);
      if (el.hasAttribute('data-count')) countUp(el);
      textIO.unobserve(el);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fig').forEach(function (fig) { figIO.observe(fig); });
  document.querySelectorAll('.rv').forEach(function (el) {
    if (!el.closest('.fig')) textIO.observe(el);
  });

  /* 导航高亮 */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function spy() {
    var y = window.scrollY + window.innerHeight * 0.4, cur = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
    navLinks.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  /* “首页”锚点在 sticky 元素上会被浏览器滚偏，显式回到页面顶端 */
  var homeLink = document.querySelector('.nav a[href="#home"]');
  if (homeLink) {
    homeLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 窗口尺寸变化：只 resize 当前存活的图表 */
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      Object.keys(chartInsts).forEach(function (id) { chartInsts[id].resize(); });
    }, 200);
  });

  /* 不支持 IntersectionObserver 的兜底 */
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fig').forEach(function (fig) {
      fig.classList.add('on');
      var chartEl = fig.querySelector('.chart');
      if (chartEl) createChart(chartEl);
    });
    document.querySelectorAll('.rv').forEach(function (el) {
      if (!el.closest('.fig')) el.classList.add('on');
    });
  }
})();
