document.addEventListener('DOMContentLoaded',()=>{
  /* Нормируем длину контуров у линий с data-line для эффекта прорисовки */
  document.querySelectorAll('.draw [data-line]').forEach(el=>el.setAttribute('pathLength','1'));
  document.querySelectorAll('.draw .hatch').forEach(el=>el.setAttribute('pathLength','1'));

  const mobileQuery = matchMedia('(max-width:900px)');
  const mobile = mobileQuery.matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Курсорное свечение */
  const glow=document.getElementById('glow');
  let glowRAF=0,glowX=-520,glowY=-520;
  if(glow&&!mobile&&!reduced){
    window.addEventListener('pointermove',e=>{
      glowX=e.clientX-210;glowY=e.clientY-210;
      if(!glowRAF)glowRAF=requestAnimationFrame(()=>{
        glowRAF=0;glow.style.transform='translate3d('+glowX+'px,'+glowY+'px,0)';
      });
    },{passive:true});
  }

  /* Навбар + бургер */
  const nav=document.getElementById('nav');
  const burger=document.getElementById('burger');
  const navlinks=document.getElementById('navlinks');
  function setMenu(open){
    const next=Boolean(open)&&mobileQuery.matches;
    document.body.classList.toggle('menu-open',next);
    navlinks.classList.toggle('open',next);
    burger.setAttribute('aria-expanded',String(next));
    burger.setAttribute('aria-label',next?'Закрыть меню':'Меню');
  }
  burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
  navlinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&document.body.classList.contains('menu-open'))setMenu(false);
  });

  /* Бегущая строка */
  const MQ='<span>0.0% алкоголя</span><span class="o">•</span><span>Настоящий сидровый вкус</span><span class="o">•</span><span>ГОСТ</span><span class="o">•</span><span>White Phoenix</span><span class="o">•</span><span>Сделано в России</span><span class="o">•</span>';
  ['mq1','mq2'].forEach(id=>{
    const t=document.getElementById(id);
    if(!t)return;
    let copies=4;
    t.innerHTML=MQ.repeat(copies);
    /* Заполняем, пока трек не станет минимум вдвое шире экрана (чётное число копий — шов на -50% бесшовный) */
    while(t.scrollWidth<innerWidth*2&&copies<12){
      copies+=2;
      t.innerHTML=MQ.repeat(copies);
    }
    requestAnimationFrame(()=>t.classList.add('go'));
  });

  /* Скролл-скраб: предзагруженные кадры высокого качества */
  /* ===== Наборы кадров =====
     DESKTOP_FRAMES — текущие горизонтальные кадры.
     MOBILE_FRAMES — вертикальные кадры 9:16 (1080×1920), схема:
       https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-01.webp
       https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-02.webp
       ... (двузначная нумерация по порядку)
     Как только массив будет заполнен ссылками, телефоны (≤768px)
     автоматически перейдут на него с полноэкранным cover-отображением. */
  const DESKTOP_FRAMES = ["https://sidrhaus-create.github.io/si/assets/zerocider_asset_04_3cc9473f5b.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_05_110b95d500.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_06_0042483a6d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_07_7d883bb8d9.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_08_74113ad742.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_09_b8fe38f754.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_10_316c70033b.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_11_29124efd7d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_12_dacd47fe05.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_13_a85cd989fa.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_14_a6b37278fe.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_15_13a2cd2bd3.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_16_8e95e9431e.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_17_82c1fd5af2.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_18_7f91864136.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_19_3da363a942.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_20_2e467b653c.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_21_0857dc7afd.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_22_a5f134ace7.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_23_46e5e44eb2.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_24_9970f2717c.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_25_918a64e7fe.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_26_283b29d32d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_27_d6b109955a.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_28_1f98f3be77.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_29_e14c4dcfff.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_30_59f773ef2d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_31_97b4d35409.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_32_258a1b6b3f.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_33_9944ff48c8.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_34_0131310e38.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_35_ada020edac.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_36_c52f45b74c.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_37_c6911efaa7.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_38_37eeee3c6d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_39_b7b99c04f1.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_40_d43dd9ba55.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_41_4fc4190631.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_42_20f04c766c.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_43_0a5cfb9fb6.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_44_6fdac8774f.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_45_97c7008e46.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_46_42061d4026.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_47_c7fed475b5.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_48_031d8ff843.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_49_4d716a4f63.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_50_e068148b50.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_51_86a0038d0e.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_52_0dabf6b71f.webp"];
  const MOBILE_FRAMES = [
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-01.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-02.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-03.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-04.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-05.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-06.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-07.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-08.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-09.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-10.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-11.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-12.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-13.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-14.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-15.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-16.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-17.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-18.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-19.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-20.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-21.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-22.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-23.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-24.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-25.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-26.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-27.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-28.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-29.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-30.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-31.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-32.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-33.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-34.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-35.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-36.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-37.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-38.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-39.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-40.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-41.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-42.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-43.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-44.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-45.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-46.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-47.webp",
    "https://sidrhaus-create.github.io/si/assets/mobile-frames/frame-48.webp"
  ];
  const mobileFramesQuery = matchMedia('(max-width: 768px)');
  function pickFrames(){
    return (mobileFramesQuery.matches && MOBILE_FRAMES.length) ? MOBILE_FRAMES : DESKTOP_FRAMES;
  }
  let FRAMES = pickFrames();
  /* Режим отрисовки: cover — когда кадры соответствуют ориентации экрана,
     contain — временный fallback: горизонтальные кадры на телефоне */
  let usingMobileSet = FRAMES===MOBILE_FRAMES;
  let FRAME_SEQUENCE = (mobile && !usingMobileSet)
    ? FRAMES.filter((_,i)=>i%2===0||i===FRAMES.length-1)
    : FRAMES;
  const canvas=document.getElementById('scrub');
  const ctx=canvas.getContext('2d',{alpha:false,desynchronized:true});
  let imgs=new Array(FRAME_SEQUENCE.length);
  let cw=0,ch=0,requestedFrame=0,lastDrawn=-1,canvasRAF=0;
  function reselectFrames(){
    const next=pickFrames();
    if(next===FRAMES)return false;
    FRAMES=next;
    usingMobileSet=FRAMES===MOBILE_FRAMES;
    FRAME_SEQUENCE=(mobile && !usingMobileSet)
      ? FRAMES.filter((_,i)=>i%2===0||i===FRAMES.length-1)
      : FRAMES;
    imgs=new Array(FRAME_SEQUENCE.length);
    requestedFrame=0;lastDrawn=-1;
    [0,1,2].forEach(i=>{if(i<FRAME_SEQUENCE.length)loadFrame(i,'high');});
    return true;
  }

  function queueCanvas(){
    if(!canvasRAF)canvasRAF=requestAnimationFrame(()=>{
      canvasRAF=0;drawFrame(requestedFrame);
    });
  }
  function loadFrame(i,priority='auto'){
    if(imgs[i]){
      if(priority==='high')imgs[i].fetchPriority='high';
      return imgs[i];
    }
    const im=new Image();
    im.decoding='async';
    im.fetchPriority=priority;
    im.onload=()=>{if(i===requestedFrame||(i===0&&lastDrawn<0))queueCanvas();};
    im.onerror=()=>{if(i===requestedFrame)queueCanvas();};
    im.src=FRAME_SEQUENCE[i];
    imgs[i]=im;
    return im;
  }

  [0,1,2].forEach(i=>{if(i<FRAME_SEQUENCE.length)loadFrame(i,'high');});
  if(FRAME_SEQUENCE.length>3)loadFrame(FRAME_SEQUENCE.length-1,'low');
  let preloadCursor=Math.min(3,FRAME_SEQUENCE.length);
  function schedulePreload(){
    if(preloadCursor>=FRAME_SEQUENCE.length)return;
    if('requestIdleCallback' in window)requestIdleCallback(preloadBatch,{timeout:700});
    else setTimeout(()=>preloadBatch(),120);
  }
  function preloadBatch(deadline){
    let count=0;
    while(preloadCursor<FRAME_SEQUENCE.length&&count<4&&
      (!deadline||deadline.didTimeout||deadline.timeRemaining()>3)){
      loadFrame(preloadCursor,'low');preloadCursor++;count++;
    }
    schedulePreload();
  }
  schedulePreload();

  function resizeCanvas(){
    const dpr=Math.min(devicePixelRatio||1,2);
    cw=canvas.clientWidth;ch=canvas.clientHeight;
    canvas.width=Math.max(1,Math.round(cw*dpr));
    canvas.height=Math.max(1,Math.round(ch*dpr));
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality='high';
    ctx.fillStyle='#5D2F6A';
    ctx.fillRect(0,0,cw,ch);
    lastDrawn=-1;
  }

  function findLoadedFrame(index){
    const exact=imgs[index];
    if(exact?.complete&&exact.naturalWidth)return index;
    for(let d=1;d<FRAME_SEQUENCE.length;d++){
      const before=index-d,after=index+d;
      if(before>=0&&imgs[before]?.complete&&imgs[before].naturalWidth)return before;
      if(after<FRAME_SEQUENCE.length&&imgs[after]?.complete&&imgs[after].naturalWidth)return after;
    }
    return -1;
  }
  function drawFrame(frameIndex){
    const i=Math.max(0,Math.min(FRAME_SEQUENCE.length-1,Math.round(frameIndex)));
    loadFrame(i,'high');
    if(i+1<FRAME_SEQUENCE.length)loadFrame(i+1,'high');
    if(i+2<FRAME_SEQUENCE.length)loadFrame(i+2,'auto');
    const loadedIndex=findLoadedFrame(i);
    if(loadedIndex<0||loadedIndex===lastDrawn)return;
    const im=imgs[loadedIndex];
    const iw=im.naturalWidth, ih=im.naturalHeight;
    /* Однотонный фирменный фон (виден только в contain-fallback) */
    ctx.fillStyle='#5D2F6A';
    ctx.fillRect(0,0,cw,ch);
    /* cover — для вертикального мобильного набора 9:16 и для десктопа;
       contain — только временный fallback: горизонтальные кадры на телефоне */
    const fallbackContain = mobile && !usingMobileSet;
    const scale = fallbackContain
      ? Math.min(cw/iw,ch/ih)
      : Math.max(cw/iw,ch/ih);
    const width=iw*scale,height=ih*scale;
    ctx.drawImage(im,(cw-width)/2,(ch-height)/2,width,height);
    lastDrawn=loadedIndex;
    if(!canvas.classList.contains('ready'))canvas.classList.add('ready');
  }

  /* Прогресс героя + зоны плашек */
  const hero=document.getElementById('hero');
  const stage=hero?hero.querySelector('.stage'):null;
  /* Если предок в Tilda имеет overflow — position:sticky не работает; детектируем и включаем fixed-фолбэк */
  let stickyBroken=false,stickyChecks=30;
  const panels=[...document.querySelectorAll('.panel')];
  let activePanel=null;
  const cue=document.getElementById('cue');
  const paras=[...document.querySelectorAll('[data-para]')];
  const pipe=document.getElementById('pipe');
  const spineFill=document.getElementById('spinefill');
  const progress=document.getElementById('progress');
  const backToTop=document.getElementById('backtotop');
  const metrics={heroTop:0,heroHeight:0,heroRange:1,vhStep:1,vh:0,pipeTop:0,pipeHeight:1,pageRange:1};
  const paraMetrics=paras.map(el=>({el,center:0,amt:parseFloat(el.dataset.para)||0.1}));
  let scrollRAF=0,measureRAF=0;
  function docTop(el){return scrollY+el.getBoundingClientRect().top;}
  /* Стабильная высота экрана: не дёргается при скрытии адресной строки */
  function setStableViewport(){
    document.documentElement.style.setProperty('--stable-vh', window.innerHeight+'px');
  }
  setStableViewport();
  function measure(){
    measureRAF=0;
    resizeCanvas();
    queueCanvas();
    metrics.heroTop=docTop(hero);
    metrics.heroHeight=hero.offsetHeight;
    const stageH=stage?stage.offsetHeight:innerHeight;
    metrics.heroRange=Math.max(1,metrics.heroHeight-stageH); /* CSS даёт ≈ 3 экрана реального скролла */
    metrics.vhStep=metrics.heroRange/6;                       /* 6 логических шагов по 0,5 экрана: 3 видео + 3 плашки */
    metrics.vh=innerHeight;
    metrics.pipeTop=pipe?docTop(pipe):0;
    metrics.pipeHeight=pipe?Math.max(1,pipe.offsetHeight):1;
    metrics.pageRange=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    paraMetrics.forEach(item=>{item.center=docTop(item.el)+item.el.offsetHeight/2;});
    updateScroll();
  }
  function queueMeasure(){
    if(!measureRAF)measureRAF=requestAnimationFrame(measure);
  }
  function updateScroll(){
    scrollRAF=0;
    const y=window.scrollY;
    const vh=metrics.vh||window.innerHeight;
    /* relativeScroll: 0..6 логических шагов; один шаг равен половине viewport */
    const relativeScroll=Math.min(metrics.heroRange,Math.max(0,y-metrics.heroTop));
    const step=metrics.vhStep;

    /* --- фолбэк сломанного sticky --- */
    if(stage){
      if(!stickyBroken&&stickyChecks>0&&y>metrics.heroTop+8&&y<metrics.heroTop+metrics.heroRange-8){
        stickyChecks--;
        const st=stage.getBoundingClientRect().top;
        if(st<-6||st>6){stickyBroken=true;}
      }
      if(stickyBroken){
        if(y<metrics.heroTop){stage.classList.remove('is-fixed','is-end');}
        else if(y<metrics.heroTop+metrics.heroRange){stage.classList.add('is-fixed');stage.classList.remove('is-end');}
        else{stage.classList.remove('is-fixed');stage.classList.add('is-end');}
      }
    }
    /* Этап видео: 0..3 логических шага (≈ 1,5 viewport) — от первого до последнего кадра.
       При videoProgress=1 последний кадр отрисован и остаётся на canvas (мы его не очищаем). */
    const videoProgress=Math.min(1,Math.max(0,relativeScroll/(3*step)));
    const frameIndex=Math.min(FRAME_SEQUENCE.length-1,Math.round(videoProgress*(FRAME_SEQUENCE.length-1)));
    if(frameIndex!==requestedFrame){requestedFrame=frameIndex;queueCanvas();}
    cue.classList.toggle('hide',relativeScroll>step*0.06);
    /* Плашки: по одному логическому шагу (≈ 0,5 viewport) на каждую. */
    const panelIndex=relativeScroll<3*step?-1:Math.min(panels.length-1,Math.floor((relativeScroll-3*step)/step));
    if(panelIndex!==activePanel){
      panels.forEach((pl,i)=>{
        const isActive=panelIndex>=0&&i===panelIndex;
        pl.classList.toggle('is-active',isActive);
        pl.classList.toggle('is-past',panelIndex>=0&&i<panelIndex);
        pl.classList.toggle('is-next',panelIndex<0||i>panelIndex);
        pl.setAttribute('aria-hidden',String(!isActive));
      });
      activePanel=panelIndex;
    }
    progress.style.transform='scaleX('+Math.min(1,Math.max(0,y/metrics.pageRange))+')';
    nav.classList.toggle('solid',y>30);
    if(backToTop)backToTop.classList.toggle('show',y>metrics.heroTop+metrics.heroHeight);
    paraMetrics.forEach(item=>{
      const c=(item.center-y-vh/2)/vh;
      item.el.style.transform='translateY('+(-c*item.amt*100)+'px)';
    });
    if(spineFill){
      const pipeP=Math.min(1,Math.max(0,(y+vh*0.62-metrics.pipeTop)/(metrics.pipeHeight*0.82)));
      spineFill.style.transform='scaleY('+pipeP+')';
    }
  }
  function onScroll(){
    if(!scrollRAF)scrollRAF=requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll',onScroll,{passive:true});

  /* Сплит-заголовки по буквам */
  document.querySelectorAll('.h-split').forEach(h=>{
    const words=h.textContent.trim().split(/\s+/);
    h.textContent='';
    words.forEach(w=>{
      const ws=document.createElement('span');ws.className='w';
      [...w].forEach((ch,i)=>{
        const l=document.createElement('span');l.className='l';
        l.style.transitionDelay=(i*0.035)+'s';
        l.textContent=ch;ws.appendChild(l);
      });
      h.appendChild(ws);
    });
  });
  const ioH=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ioH.unobserve(e.target);}});},{threshold:.4});
  document.querySelectorAll('.h-split').forEach(h=>ioH.observe(h));

  /* Reveal */
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){
      const d=parseFloat(e.target.dataset.d||0);
      e.target.style.transitionDelay=(d*0.1)+'s';
      e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.18});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* Бутылки веером */
  const b3=document.getElementById('bottles3');
  const io2=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target);}});},{threshold:.3});
  if(b3)io2.observe(b3);

  /* Шаги производства: прорисовка контура */
  const steps=[...document.querySelectorAll('.step')];
  const io3=new IntersectionObserver(es=>{es.forEach(e=>{
    if(e.isIntersecting){
      const st=e.target;
      st.querySelectorAll('.draw [data-line]').forEach((p,i)=>{
        if(!p.style.animationDelay) p.style.animationDelay=(i*0.045)+'s';
      });
      st.classList.add('in');
      io3.unobserve(st);
    }});},{threshold: mobile? .22 : .35});
  steps.forEach(s=>io3.observe(s));

  /* Активные пункты меню */
  const secs=['chto-eto','vkusy','kak-eto','gde-kupit'];
  const links=[...navlinks.querySelectorAll('a')];
  const io4=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){
      links.forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id));
    }});
  },{rootMargin:'-42% 0px -52% 0px'});
  secs.forEach(id=>{const el=document.getElementById(id);if(el)io4.observe(el);});

  /* Лёгкая Ozon-карусель: нативный scroll-snap + стрелки/индикаторы */
  const ozonTrack=document.getElementById('ozon-track');
  const ozonCards=ozonTrack?[...ozonTrack.querySelectorAll('.ozon-card')]:[];
  const ozonDots=[...document.querySelectorAll('.ozon-dot')];
  const ozonPrev=document.querySelector('.ozon-prev');
  const ozonNext=document.querySelector('.ozon-next');
  let ozonRAF=0;
  function setOzonSlide(index){
    ozonDots.forEach((dot,i)=>{
      const active=i===index;
      dot.classList.toggle('active',active);
      dot.setAttribute('aria-pressed',String(active));
    });
  }
  function updateOzonSlide(){
    ozonRAF=0;
    if(!ozonTrack||!ozonCards.length)return;
    const left=ozonTrack.scrollLeft;
    let best=0,dist=Infinity;
    ozonCards.forEach((card,i)=>{
      const d=Math.abs(card.offsetLeft-ozonTrack.offsetLeft-left);
      if(d<dist){dist=d;best=i;}
    });
    setOzonSlide(best);
  }
  function scrollOzon(index){
    if(!ozonTrack||!ozonCards[index])return;
    const left=ozonCards[index].offsetLeft-ozonTrack.offsetLeft;
    ozonTrack.scrollTo({left,behavior:reduced?'auto':'smooth'});
    setOzonSlide(index);
  }
  if(ozonTrack){
    ozonTrack.addEventListener('scroll',()=>{
      if(!ozonRAF)ozonRAF=requestAnimationFrame(updateOzonSlide);
    },{passive:true});
    ozonPrev?.addEventListener('click',()=>{
      const active=Math.max(0,ozonDots.findIndex(dot=>dot.classList.contains('active')));
      scrollOzon(Math.max(0,active-1));
    });
    ozonNext?.addEventListener('click',()=>{
      const active=Math.max(0,ozonDots.findIndex(dot=>dot.classList.contains('active')));
      scrollOzon(Math.min(ozonCards.length-1,active+1));
    });
    ozonDots.forEach((dot,i)=>dot.addEventListener('click',()=>scrollOzon(i)));
  }

  if(backToTop){
    backToTop.addEventListener('click',()=>hero.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'}));
  }

  /* Тилт карточек с бутылками (десктоп) */
  if(!mobile && !reduced){
    document.querySelectorAll('.tilt').forEach(card=>{
      let r;
      card.addEventListener('pointerenter',()=>{r=card.getBoundingClientRect();});
      card.addEventListener('pointermove',e=>{
        if(!r)r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-0.5;
        const y=(e.clientY-r.top)/r.height-0.5;
        card.style.transform='rotateY('+(x*10)+'deg) rotateX('+(-y*8)+'deg)';
      });
      card.addEventListener('pointerleave',()=>{r=null;card.style.transform='';});
    });
  }

  let resizeT=0;
  function onViewportChange(){
    setStableViewport();
    if(reselectFrames())resizeCanvas();
    queueMeasure();updateOzonSlide();
  }
  window.addEventListener('resize',()=>{
    if(!mobileQuery.matches)setMenu(false);
    clearTimeout(resizeT);
    resizeT=setTimeout(onViewportChange,200); /* debounce: не пересчитывать на каждый твик адресной строки */
  },{passive:true});
  window.addEventListener('load',()=>{setStableViewport();queueMeasure();},{once:true});
  window.addEventListener('orientationchange',onViewportChange,{passive:true});
  if('ResizeObserver' in window&&hero){
    /* Tilda может отрисовать блок с задержкой — ловим смену размеров самого hero */
    let lastH=0;
    new ResizeObserver(entries=>{
      const h=entries[0].contentRect.height;
      if(Math.abs(h-lastH)>4){lastH=h;queueMeasure();}
    }).observe(hero);
  }
  /* Tilda может показать блок позже загрузки — подстраховочные замеры */
  [300,900,2200].forEach(t=>setTimeout(queueMeasure,t));
  if(document.fonts?.ready)document.fonts.ready.then(queueMeasure);
  queueMeasure();
});
