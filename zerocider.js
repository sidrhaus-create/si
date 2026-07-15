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
  const MQ='<span>0.0% алкоголя</span><span class="o">•</span><span>Настоящий сидровый вкус</span><span class="o">•</span><span>ГОСТ Р 59480-2021</span><span class="o">•</span><span>White Phoenix</span><span class="o">•</span><span>Сделано в России</span><span class="o">•</span>';
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
  const imgs = FRAMES.map(src=>{const im=new Image(); im.decoding='async'; im.src=src; return im;});
  let cw=0, ch=0;

  function resize(){
    const dpr=Math.min(devicePixelRatio||1, 2);
    cw=canvas.clientWidth; ch=canvas.clientHeight;
    canvas.width=cw*dpr; canvas.height=ch*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize();
  window.addEventListener('resize',resize);

  function drawImg(im){
    if(!im || !im.complete || !im.naturalWidth) return;
    const iw=im.naturalWidth, ih=im.naturalHeight;
    const s=Math.max(cw/iw, ch/ih);
    const w=iw*s, h=ih*s;
    ctx.drawImage(im, (cw-w)/2, (ch-h)/2, w, h);
  }
  function drawFrame(f){
    const i=Math.max(0, Math.min(FRAMES.length-1, Math.round(f)));
    drawImg(imgs[i]);
  }
  imgs[0].onload = ()=> drawFrame(0);

  /* Прогресс героя + зоны плашек */
  const hero=document.getElementById('hero');
  const panels=[...document.querySelectorAll('.panel')];
  const cue=document.getElementById('cue');
  let target=0, current=0;

  function heroProgress(){
    const r=hero.getBoundingClientRect();
    const total=hero.offsetHeight-window.innerHeight;
    return Math.min(1,Math.max(0,-r.top/total));
  }
  function updateHero(){
    const p=heroProgress();
    target = p*(FRAMES.length-1);
    cue.classList.toggle('hide', p>0.04);
    const zones=panels.length;
    panels.forEach((pl,i)=>{
      const a=i/zones, b=(i+1)/zones;
      pl.classList.toggle('on', p>=a-0.02 && p<b-0.06);
    });
  }

  const paras=[...document.querySelectorAll('[data-para]')];
  const fab=document.getElementById('fab');
  const gde=document.getElementById('gde-kupit');

  function loop(){
    /* Плавное следование за скроллом */
    const smooth = reduced ? 1 : 0.16;
    current += (target-current)*smooth;
    drawFrame(current);

    /* Прогресс */
    const sc=document.documentElement;
    const pr=sc.scrollTop/(sc.scrollHeight-sc.clientHeight);
    document.getElementById('progress').style.width=(pr*100)+'%';

    /* Параллакс */
    const vhv=window.innerHeight;
    paras.forEach(el=>{
      const r=el.getBoundingClientRect();
      const c=(r.top+r.height/2 - vhv/2)/vhv;
      const amt=parseFloat(el.dataset.para)||0.1;
      el.style.transform='translateY('+(-c*amt*100)+'px)';
    });

    /* Плавающая CTA */
    if(fab){
      const heroDone = hero.getBoundingClientRect().bottom < vhv*0.5;
      const gdeR = gde.getBoundingClientRect();
      const nearGde = gdeR.top < vhv*0.9;
      fab.classList.toggle('show', heroDone && !nearGde);
    }

    fillSpine();
    requestAnimationFrame(loop);
  }

  function onScroll(){
    updateHero();
    nav.classList.toggle('solid', scrollY>30);
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

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

  /* Заполнение линии производства */
  const pipe=document.getElementById('pipe');
  const spineFill=document.getElementById('spinefill');
  function fillSpine(){
    if(!pipe)return;
    const r=pipe.getBoundingClientRect();
    const vhv=window.innerHeight;
    const p=Math.min(1,Math.max(0,(vhv*0.62-r.top)/(r.height*0.82)));
    spineFill.style.height=(p*100)+'%';
  }

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
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-0.5;
        const y=(e.clientY-r.top)/r.height-0.5;
        card.style.transform='rotateY('+(x*10)+'deg) rotateX('+(-y*8)+'deg)';
      });
      card.addEventListener('pointerleave',()=>{card.style.transform='';});
    });
  }

  /* Кнопка со splash */
  const btn=document.getElementById('ctabtn');
  if(btn){
    btn.addEventListener('click',e=>{
      const r=btn.getBoundingClientRect();
      const rip=document.createElement('span');rip.className='rip';
      const s=Math.max(r.width,r.height);
      rip.style.width=rip.style.height=s+'px';
      rip.style.left=(e.clientX-r.left-s/2)+'px';
      rip.style.top=(e.clientY-r.top-s/2)+'px';
      btn.appendChild(rip);
      setTimeout(()=>rip.remove(),650);
      document.getElementById('gde-kupit').scrollIntoView({behavior: reduced?'auto':'smooth'});
    });
  }

  requestAnimationFrame(loop);
});