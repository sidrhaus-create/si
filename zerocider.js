document.addEventListener('DOMContentLoaded',()=>{
  /* Нормируем длину контуров у линий с data-line для эффекта прорисовки */
  document.querySelectorAll('.draw [data-line]').forEach(el=>el.setAttribute('pathLength','1'));
  document.querySelectorAll('.draw .hatch').forEach(el=>el.setAttribute('pathLength','1'));

  const mobile = matchMedia('(max-width:900px)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Курсорное свечение */
  const glow=document.getElementById('glow');
  window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});

  /* Навбар + бургер */
  const nav=document.getElementById('nav');
  const burger=document.getElementById('burger');
  const navlinks=document.getElementById('navlinks');
  burger.addEventListener('click',()=>navlinks.classList.toggle('open'));
  navlinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navlinks.classList.remove('open')));

  /* Бегущая строка */
  const MQ='<span>0.0% алкоголя</span><span class="o">•</span><span>Настоящий сидровый вкус</span><span class="o">•</span><span>ГОСТ</span><span class="o">•</span><span>White Phoenix</span><span class="o">•</span><span>Сделано в России</span><span class="o">•</span>';
  ['mq1','mq2'].forEach(id=>{const t=document.getElementById(id); if(t) t.innerHTML=MQ+MQ;});

  /* Искры */
  const emb=document.getElementById('embers');
  const nEmb = mobile? 9 : 16;
  for(let i=0;i<nEmb;i++){const d=document.createElement('div');d.className='ember';
    const s=2+Math.random()*3.5;d.style.width=s+'px';d.style.height=s+'px';
    d.style.left=(Math.random()*100)+'%';
    d.style.setProperty('--dx',(Math.random()*60-30)+'px');
    d.style.animationDuration=(7+Math.random()*8)+'s';
    d.style.animationDelay=(Math.random()*9)+'s';
    emb.appendChild(d);}

  /* Скролл-скраб: предзагруженные кадры высокого качества */
  const FRAMES = ["https://sidrhaus-create.github.io/si/assets/zerocider_asset_04_3cc9473f5b.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_05_110b95d500.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_06_0042483a6d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_07_7d883bb8d9.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_08_74113ad742.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_09_b8fe38f754.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_10_316c70033b.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_11_29124efd7d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_12_dacd47fe05.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_13_a85cd989fa.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_14_a6b37278fe.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_15_13a2cd2bd3.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_16_8e95e9431e.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_17_82c1fd5af2.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_18_7f91864136.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_19_3da363a942.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_20_2e467b653c.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_21_0857dc7afd.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_22_a5f134ace7.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_23_46e5e44eb2.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_24_9970f2717c.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_25_918a64e7fe.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_26_283b29d32d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_27_d6b109955a.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_28_1f98f3be77.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_29_e14c4dcfff.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_30_59f773ef2d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_31_97b4d35409.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_32_258a1b6b3f.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_33_9944ff48c8.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_34_0131310e38.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_35_ada020edac.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_36_c52f45b74c.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_37_c6911efaa7.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_38_37eeee3c6d.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_39_b7b99c04f1.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_40_d43dd9ba55.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_41_4fc4190631.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_42_20f04c766c.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_43_0a5cfb9fb6.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_44_6fdac8774f.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_45_97c7008e46.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_46_42061d4026.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_47_c7fed475b5.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_48_031d8ff843.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_49_4d716a4f63.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_50_e068148b50.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_51_86a0038d0e.webp","https://sidrhaus-create.github.io/si/assets/zerocider_asset_52_0dabf6b71f.webp"];
  const canvas=document.getElementById('scrub');
  const ctx=canvas.getContext('2d',{alpha:false});
  const imgs=new Array(FRAMES.length);
  let cw=0, ch=0;

  function loadFrame(i,priority='auto'){
    if(imgs[i])return imgs[i];
    const im=new Image();
    im.decoding='async';
    im.fetchPriority=priority;
    im.onload=queueCanvas;
    im.src=FRAMES[i];
    imgs[i]=im;
    return im;
  }
  loadFrame(0,'high');
  loadFrame(1,'high');
  const preloadFrames=()=>FRAMES.forEach((_,i)=>loadFrame(i,i<4?'high':'low'));
  if('requestIdleCallback' in window)requestIdleCallback(preloadFrames,{timeout:1800});
  else setTimeout(preloadFrames,450);

  function resizeCanvas(){
    const dpr=Math.min(devicePixelRatio||1, 2);
    cw=canvas.clientWidth; ch=canvas.clientHeight;
    canvas.width=cw*dpr; canvas.height=ch*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle='#3B1943';
    ctx.fillRect(0,0,cw,ch);
  }

  function drawImg(im){
    if(!im || !im.complete || !im.naturalWidth) return;
    const iw=im.naturalWidth, ih=im.naturalHeight;
    const s=Math.max(cw/iw, ch/ih);
    const w=iw*s, h=ih*s;
    ctx.drawImage(im, (cw-w)/2, (ch-h)/2, w, h);
  }
  function drawFrame(f){
    const i=Math.max(0, Math.min(FRAMES.length-1, Math.round(f)));
    let im=loadFrame(i,i<4?'high':'auto');
    if(!im.complete || !im.naturalWidth){
      for(let d=1;d<FRAMES.length;d++){
        const near=imgs[i-d]||imgs[i+d];
        if(near?.complete && near.naturalWidth){im=near;break;}
      }
    }
    drawImg(im);
  }

  /* Прогресс героя + зоны плашек */
  const hero=document.getElementById('hero');
  const panels=[...document.querySelectorAll('.panel')];
  const cue=document.getElementById('cue');
  let target=0, current=0;
  const paras=[...document.querySelectorAll('[data-para]')];
  const pipe=document.getElementById('pipe');
  const spineFill=document.getElementById('spinefill');
  const progress=document.getElementById('progress');
  const metrics={heroTop:0,heroHeight:0,heroRange:1,pipeTop:0,pipeHeight:1,pageRange:1};
  const paraMetrics=paras.map(el=>({el,center:0,amt:parseFloat(el.dataset.para)||0.1}));
  let canvasRAF=0,scrollRAF=0,measureRAF=0;

  function renderCanvas(){
    canvasRAF=0;
    const smooth = reduced ? 1 : 0.16;
    current += (target-current)*smooth;
    if(Math.abs(target-current)<0.03)current=target;
    drawFrame(current);
    if(current!==target)canvasRAF=requestAnimationFrame(renderCanvas);
  }
  function queueCanvas(){
    if(!canvasRAF)canvasRAF=requestAnimationFrame(renderCanvas);
  }
  function docTop(el){return scrollY+el.getBoundingClientRect().top;}
  function measure(){
    measureRAF=0;
    resizeCanvas();
    metrics.heroTop=docTop(hero);
    metrics.heroHeight=hero.offsetHeight;
    metrics.heroRange=Math.max(1,metrics.heroHeight-innerHeight);
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
    const vh=window.innerHeight;
    const p=Math.min(1,Math.max(0,(y-metrics.heroTop)/metrics.heroRange));
    target=p*(FRAMES.length-1);
    queueCanvas();
    cue.classList.toggle('hide',p>0.04);
    panels.forEach((pl,i)=>{
      const a=i/panels.length,b=(i+1)/panels.length;
      const last=i===panels.length-1;
      pl.classList.toggle('on',p>=a-0.02&&(last||p<b-0.02));
      pl.classList.toggle('past',!last&&p>=b-0.02);
    });
    progress.style.width=((y/metrics.pageRange)*100)+'%';
    nav.classList.toggle('solid',y>30);
    paraMetrics.forEach(item=>{
      const c=(item.center-y-vh/2)/vh;
      item.el.style.transform='translateY('+(-c*item.amt*100)+'px)';
    });
    if(spineFill){
      const pipeP=Math.min(1,Math.max(0,(y+vh*0.62-metrics.pipeTop)/(metrics.pipeHeight*0.82)));
      spineFill.style.height=(pipeP*100)+'%';
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

  window.addEventListener('resize',queueMeasure,{passive:true});
  window.addEventListener('load',queueMeasure,{once:true});
  if(document.fonts?.ready)document.fonts.ready.then(queueMeasure);
  queueMeasure();
});
