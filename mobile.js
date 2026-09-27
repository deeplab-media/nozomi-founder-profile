// Mobile layout and motion. Loaded after locale-ja.js because some rows are
// injected there. Desktop keeps its grids: every .m-* class only styles <=700px.
(() => {
 const mobile=matchMedia('(max-width:700px)'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const motionOk=()=>mobile.matches&&!reduced.matches;
 const ease='cubic-bezier(.22,1,.36,1)';
 // Entrance motion only plays while scrolling down; content met on the way back
 // up (e.g. after jumping to #lien-he) simply appears, which keeps upward scrolling calm.
 let lastY=scrollY,goingUp=false;
 addEventListener('scroll',()=>{const y=scrollY;if(y!==lastY)goingUp=y<lastY;lastY=y},{passive:true});
 const once=(el,fn,options)=>{const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){io.unobserve(entry.target);fn(entry.target,goingUp||entry.boundingClientRect.bottom<innerHeight*.35)}}),options);io.observe(el)};
 // Only content still below the fold is pre-hidden; it reveals as it enters.
 const below=el=>el.getBoundingClientRect().top>innerHeight;
 const reach={rootMargin:'0px 0px -4% 0px'};
 const intro=document.documentElement.classList.contains('m-intro');

 /* ---------- Swipe rows: [selector, card width, edge bleed, continuous flow] ---------- */
 const rows=[
  ['#nozomi .workforce-gallery','84%','18px',true],
  ['#nozomi .multisector-grid','62%','16px',true],
  ['#enmusubi .enmusubi-pillars','78%'],
  ['#enmusubi .health-mosaic','80%','20px',true],
  ['#enmusubi .lab-gallery-grid','80%','16px',true],
  ['#enmusubi .medical-partners','80%'],
  ['#enmusubi .programs','82%'],
  ['#cong-dong .community-grid','84%']
 ];
 const FLOW_SPEED=26; // px per second
 rows.forEach(([selector,card,bleed,flow])=>{
  const row=document.querySelector(selector);
  if(!row||row.classList.contains('m-swipe'))return;
  const items=[...row.children];
  row.classList.add('m-swipe');
  if(flow)row.classList.add('m-flow');
  row.style.setProperty('--card',card);
  if(bleed)row.style.setProperty('--bleed',bleed);

  // Flow rows get one aria-hidden copy of their cards so the loop never ends.
  const clones=flow?items.map(item=>{const copy=item.cloneNode(true);copy.classList.add('m-clone');copy.setAttribute('aria-hidden','true');copy.querySelectorAll('a,button').forEach(el=>el.tabIndex=-1);return copy}):[];
  row.append(...clones);
  const loopWidth=()=>clones.length?clones[0].offsetLeft-items[0].offsetLeft:Infinity;

  const dots=document.createElement('div');
  dots.className='m-dots';
  dots.setAttribute('aria-hidden','true');
  // Horizontal-only scrolling so the page never moves vertically.
  const goTo=i=>row.scrollTo({left:items[i].offsetLeft-items[0].offsetLeft,behavior:reduced.matches?'auto':'smooth'});
  items.forEach((item,i)=>{
   const dot=document.createElement('button');
   dot.type='button';dot.tabIndex=-1;
   dot.addEventListener('click',()=>{pause(4000);goTo(i)});
   dots.append(dot);
  });
  row.after(dots);

  let current=-1;
  const setActive=index=>{
   if(index===current)return;current=index;
   items.forEach((item,i)=>item.classList.toggle('is-active',i===index));
   [...dots.children].forEach((dot,i)=>dot.classList.toggle('on',i===index));
  };
  const measure=()=>{
   const origin=items[0].offsetLeft,x=row.scrollLeft%loopWidth();
   if(!flow&&x>=row.scrollWidth-row.clientWidth-4)return setActive(items.length-1);
   let best=0;
   items.forEach((item,i)=>{if(Math.abs(item.offsetLeft-origin-x)<Math.abs(items[best].offsetLeft-origin-x))best=i});
   if(flow&&loopWidth()-x<Math.abs(items[best].offsetLeft-origin-x))best=0;
   setActive(best);
  };
  let frame=0;
  row.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(()=>{frame=0;measure()})},{passive:true});
  setActive(0);

  // Continuous drift: runs while on screen, yields to the finger, resumes after.
  let visible=false,resumeAt=0,raf=0,pos=0,last=0,resumeTimer=0;
  const canRun=()=>flow&&visible&&motionOk()&&!document.hidden&&Date.now()>=resumeAt;
  const step=now=>{
   raf=0;
   if(!canRun()){row.classList.remove('is-flowing');return}
   pos+=FLOW_SPEED*Math.min(now-last,50)/1000;last=now;
   const width=loopWidth();if(pos>=width)pos-=width;
   row.scrollLeft=pos;
   raf=requestAnimationFrame(step);
  };
  const kick=()=>{
   if(raf||!canRun())return;
   pos=row.scrollLeft%loopWidth();row.scrollLeft=pos;
   row.classList.add('is-flowing');last=performance.now();raf=requestAnimationFrame(step);
  };
  function pause(ms){
   resumeAt=Date.now()+ms;cancelAnimationFrame(raf);raf=0;row.classList.remove('is-flowing');
   clearTimeout(resumeTimer);if(ms<1e8)resumeTimer=setTimeout(kick,ms+50);
  }
  if(flow){
   row.addEventListener('touchstart',()=>pause(1e9),{passive:true});
   row.addEventListener('touchend',()=>pause(2600),{passive:true});
   row.addEventListener('pointerdown',()=>pause(1e9),{passive:true});
   row.addEventListener('pointerup',()=>pause(2600),{passive:true});
   row.addEventListener('wheel',()=>pause(2600),{passive:true});
   new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visible?setTimeout(kick,1200):pause(0)},{threshold:.15}).observe(row);
   document.addEventListener('visibilitychange',kick);
  }

  // Entrance: the first cards wait off to the right and glide in once the row is reached.
  if(motionOk()&&below(row)){
   const first=items.slice(0,3);
   first.forEach((item,i)=>{item.classList.add('m-pre-x');item.style.setProperty('--d',i*110+'ms')});
   once(row,(_,skip)=>{
    first.forEach(item=>item.classList.add(skip?'m-now':'m-in'));
    setTimeout(()=>first.forEach(item=>{item.classList.remove('m-pre-x','m-in','m-now');item.style.removeProperty('--d')}),skip?60:1500);
   },reach);
  }
 });

 /* ---------- NOZOMI activity photos: swipeable card stack ---------- */
 const stack=document.querySelector('#nozomi .nozomi-gallery>.nozomi-photo-grid');
 if(stack){
  const cards=[...stack.children];
  stack.classList.add('m-stack');
  const counter=document.createElement('div');
  counter.className='m-stack-count';counter.setAttribute('aria-hidden','true');
  stack.after(counter);
  let order=cards.map((_,i)=>i),busy=false,heldUntil=0,visible=false;
  const layout=()=>{
   order.forEach((card,depth)=>{const el=cards[card];el.style.setProperty('--depth',depth);el.style.zIndex=cards.length-depth;el.classList.toggle('is-top',depth===0)});
   counter.innerHTML=`<b>${String(order[0]+1).padStart(2,'0')}</b><i></i>${String(cards.length).padStart(2,'0')}`;
  };
  layout();
  const fling=dir=>{
   if(busy)return;busy=true;
   const top=cards[order[0]];
   top.style.setProperty('--fx',dir*135+'%');top.style.setProperty('--fr',dir*16+'deg');
   top.classList.add('is-flying');
   setTimeout(()=>{
    top.classList.add('is-returning');top.classList.remove('is-flying');
    ['--dx','--rot','--fx','--fr'].forEach(v=>top.style.removeProperty(v));
    order.push(order.shift());layout();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{top.classList.remove('is-returning');busy=false}));
   },420);
  };
  let startX=0,dx=0,dragging=false;
  stack.addEventListener('pointerdown',e=>{
   if(!mobile.matches||busy)return;
   const top=cards[order[0]];if(!top.contains(e.target))return;
   dragging=true;startX=e.clientX;dx=0;heldUntil=Date.now()+7000;
   top.classList.add('is-dragging');top.setPointerCapture?.(e.pointerId);
  });
  stack.addEventListener('pointermove',e=>{
   if(!dragging)return;dx=e.clientX-startX;
   const top=cards[order[0]];top.style.setProperty('--dx',dx+'px');top.style.setProperty('--rot',dx*.05+'deg');
  });
  const release=()=>{
   if(!dragging)return;dragging=false;
   const top=cards[order[0]];top.classList.remove('is-dragging');
   if(Math.abs(dx)>70)fling(Math.sign(dx));else{top.style.removeProperty('--dx');top.style.removeProperty('--rot')}
  };
  stack.addEventListener('pointerup',release);stack.addEventListener('pointercancel',release);
  new IntersectionObserver(e=>{visible=e[0].isIntersecting},{threshold:.4}).observe(stack);
  setInterval(()=>{if(visible&&motionOk()&&!dragging&&!document.hidden&&Date.now()>heldUntil)fling(-1)},3400);
 }

 /* ---------- Japan: full-bleed photo with the heading laid over it ---------- */
 const japanCopy=document.querySelector('.japan>div');
 if(japanCopy&&!japanCopy.querySelector('.japan-head')){
  const head=document.createElement('div');head.className='japan-head';
  head.append(...[...japanCopy.children].filter(el=>el.matches('.eyebrow,h2,.jp-heading')));
  japanCopy.prepend(head);
 }

 /* ---------- Section eyebrows: "01 / LABEL" becomes number + rule + label,
    and the number is echoed as a large outlined watermark behind the title ---------- */
 if(mobile.matches)document.querySelectorAll('main section:not(.hero) .eyebrow').forEach(eyebrow=>{
  const match=eyebrow.textContent.trim().match(/^(\d{2})\s*\/\s*(.+)$/),host=eyebrow.parentElement;
  if(!match||!host.querySelector('h2'))return;
  eyebrow.classList.add('m-eb');
  eyebrow.innerHTML=`<span class="eb-num">${match[1]}</span><span class="eb-line" aria-hidden="true"></span><span>${match[2]}</span>`;
  host.dataset.num=match[1];
 });

 /* ---------- Images: shimmer while loading, soft fade when ready ---------- */
 document.querySelectorAll('main img').forEach(img=>{
  if(img.closest('.chapter-nav,.medical-logo,.experience-brand')||img.classList.contains('nozomi-brand-slogan'))return;
  img.decoding='async';
  if(img.complete&&img.naturalWidth)return;
  const box=img.closest('figure,.video-thumb')||img.parentElement;
  box.classList.add('m-loading');img.classList.add('m-fade');
  const done=()=>{box.classList.remove('m-loading');img.classList.add('is-ready')};
  img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});
 });

 /* ---------- Photo reveal: curtain wipe + zoom settle ---------- */
 document.querySelectorAll('main figure').forEach(fig=>{
  if(fig.closest('.m-swipe,.m-stack,details:not([open])')||!fig.querySelector('img')||!motionOk()||!below(fig))return;
  fig.classList.add('m-reveal');
  once(fig,(_,skip)=>{
   if(skip){fig.classList.add('instant','in','done');return}
   fig.classList.add('in');setTimeout(()=>fig.classList.add('done'),1500);
  },reach);
 });

 /* ---------- Headings rise line by line from behind a mask ---------- */
 document.querySelectorAll('.section-title h2,.story h2,.business-intro h3,.subheading h3,.multisector-heading h3,.logistics-copy h4,.workforce-copy h3,.care-editorial h3,.vision h2,.contact h2,.japan h2,.benefits h3,.product-feature h3').forEach(h=>{
  if(!motionOk()||h.closest('.m-swipe,.hero')||!below(h))return;
  const parts=h.innerHTML.split(/<br\s*\/?>/i);
  // Skip headings where an inline tag spans a line break (splitting would break it).
  if(!parts.every(p=>(p.match(/<[a-z]/gi)||[]).length===(p.match(/<\//g)||[]).length))return;
  h.innerHTML=parts.map((p,i)=>`<span class="m-line" style="--i:${i}"><span>${p}</span></span>`).join('');
  h.classList.add('m-lines');
  once(h,(_,skip)=>h.classList.add(skip?'m-now':'m-in'),reach);
 });

 /* ---------- Blocks fade up; pre-hidden so nothing flashes before animating ---------- */
 const rise=[...document.querySelectorAll('.section-title>*,.story-copy,.legacy-grid article,.brand-history,.business-intro>div,.nozomi-pillars,.logistics-copy,.multisector-heading,.nozomi-gallery>.subheading,.m-stack,.values article,.roadmap article,.benefits,.japan>div>p,.contact>div,.workforce-copy,.lab-gallery>.subheading,.experience-compact,.product-feature,.enmusubi-scenes>.subheading,#enmusubi>.subheading,#nozomi>.subheading,.medical-details>summary,.learning-details>summary,.nozomi-more>summary,.care-editorial>div,.vision>p,.vision>span,.chapter-nav,.contact-list article,.source-note,.chapter-hint,.vision-portrait')]
  .filter(el=>el.tagName!=='FIGURE'&&!el.classList.contains('m-lines')&&!el.closest('.m-swipe,.hero,details:not([open])>:not(summary)'));
 rise.forEach(el=>{
  if(!motionOk()||!below(el))return;
  const siblings=[...el.parentElement.children].filter(c=>rise.includes(c));
  el.style.setProperty('--d',(Math.max(0,siblings.indexOf(el))%4)*80+'ms');
  el.classList.add('m-pre');
  once(el,(_,skip)=>{
   el.classList.add(skip?'m-now':'m-in');
   setTimeout(()=>{el.classList.remove('m-pre','m-in','m-now');el.style.removeProperty('--d')},skip?60:1400);
  },reach);
 });

 /* ---------- Looping accents pause while off screen (saves paint during scroll) ---------- */
 document.querySelectorAll('.hero,.vision,.experience-compact,.japan').forEach(el=>new IntersectionObserver(entries=>el.classList.toggle('m-idle',!entries[0].isIntersecting)).observe(el));

 /* ---------- Seal stamps onto the page ---------- */
 const seal=document.querySelector('.seal');
 if(seal&&motionOk()&&below(seal)){
  seal.classList.add('m-pre-seal');
  once(seal,(_,skip)=>{
   if(!skip)seal.animate([{opacity:0,transform:'scale(1.9) rotate(-18deg)',filter:'blur(3px)'},{opacity:1,transform:'scale(.92) rotate(-5deg)',filter:'blur(0)',offset:.7},{transform:'scale(1) rotate(-5deg)'}],{duration:760,easing:'cubic-bezier(.5,0,.2,1)',fill:'backwards'});
   seal.classList.remove('m-pre-seal');
  },{threshold:.6});
 }

 /* ---------- Count-up for hero numbers ---------- */
 document.querySelectorAll('.hero-facts strong').forEach(el=>{
  const m=el.textContent.match(/^(\d+)(\D*)$/);
  if(!m||!motionOk())return;
  const end=+m[1],suffix=m[2],start=performance.now()+500+(intro?1350:0);
  const tick=now=>{const t=Math.min(Math.max((now-start)/1400,0),1),e=1-Math.pow(1-t,4);el.textContent=Math.round(end*e)+suffix;if(t<1)requestAnimationFrame(tick)};
  el.textContent='0'+suffix;requestAnimationFrame(tick);
 });

 /* ---------- Looping tickers (hero keywords, partner logos) ---------- */
 // Built as aria-hidden copies next to the originals so the language toggle
 // can keep rewriting the originals; tickers rebuild when those change.
 const ticker=(source,className,build)=>{
  if(!source)return;
  const wrap=document.createElement('div');
  wrap.className='m-ticker '+className;wrap.setAttribute('aria-hidden','true');
  const render=()=>{const unit=build();if(!unit)return;wrap.innerHTML=`<div class="m-ticker-track">${unit}${unit}</div>`};
  render();source.after(wrap);
  new MutationObserver(render).observe(source,{childList:true,subtree:true,characterData:true});
 };
 ticker(document.querySelector('.hero-bottom'),'m-ticker-words',()=>[...document.querySelectorAll('.hero-bottom span')].map(s=>`<span>${s.textContent}</span><i>✦</i>`).join(''));
 const brandTicker=()=>{
  const brands=document.querySelector('.experience-brands');
  if(!brands||brands.parentElement.querySelector('.m-ticker-brands'))return;
  ticker(brands,'m-ticker-brands',()=>{const logos=[...brands.querySelectorAll('img')];return logos.length?logos.map(img=>`<span><img src="${img.getAttribute('src')}" alt=""></span>`).join('').repeat(2):''});
 };
 brandTicker();
 // The Japanese toggle rewrites this whole block, so rebuild the ticker after it.
 const experience=document.querySelector('#dau-an .experience-compact');
 if(experience)new MutationObserver(brandTicker).observe(experience,{childList:true});

 /* ---------- Disclosure buttons use an icon chip, so drop text arrows ---------- */
 const stripArrow=summary=>summary.childNodes.forEach(node=>{if(node.nodeType===3&&/[↓↑]/.test(node.textContent))node.textContent=node.textContent.replace(/\s*[↓↑]\s*/g,' ')});
 document.querySelectorAll('.nozomi-more summary').forEach(summary=>{stripArrow(summary);new MutationObserver(()=>stripArrow(summary)).observe(summary,{childList:true})});

 /* ---------- Menu: lock page scroll while the full-screen menu is open ---------- */
 const menuNav=document.getElementById('navigation');
 if(menuNav)new MutationObserver(()=>{document.documentElement.classList.toggle('m-menu-open',mobile.matches&&menuNav.classList.contains('open'))}).observe(menuNav,{attributes:true,attributeFilter:['class']});

 /* ---------- Floating contact button ---------- */
 const contact=document.getElementById('lien-he'),hero=document.getElementById('top');
 if(contact&&hero){
  const fab=document.createElement('a');
  fab.className='m-fab';fab.href='#lien-he';
  const label=()=>{fab.innerHTML=`<span>${document.documentElement.lang==='ja'?'お問い合わせ':'Kết nối ngay'}</span><b aria-hidden="true">↗</b>`};
  label();document.body.append(fab);
  new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  let pastHero=false,atContact=false;
  const sync=()=>fab.classList.toggle('show',pastHero&&!atContact);
  new IntersectionObserver(e=>{pastHero=!e[0].isIntersecting;sync()}).observe(hero);
  new IntersectionObserver(e=>{atContact=e[0].isIntersecting;sync()}).observe(contact);
 }
 /* ---------- Opening splash (once per visit): 縁 brushes in, curtain lifts ---------- */
 // <head> adds html.m-intro before first paint so the page never flashes underneath.
 if(intro){
  try{sessionStorage.setItem('m-intro','1')}catch{}
  const splash=document.createElement('div');
  splash.className='m-splash';splash.setAttribute('aria-hidden','true');
  splash.innerHTML='<span class="m-splash-kanji">縁</span><span class="m-splash-label">TƯỜNG HẢI · FOUNDER PROFILE</span><i class="m-splash-line"></i>';
  document.body.append(splash);
  // A swipe or tap skips the splash instead of scrolling the page underneath it,
  // so visitors always land on the top of the hero.
  let finished=false;
  const block=e=>{if(e.cancelable)e.preventDefault()};
  const onGesture=e=>{block(e);finish()};
  const release=()=>{removeEventListener('touchmove',onGesture);removeEventListener('wheel',onGesture);removeEventListener('touchend',release)};
  const finish=()=>{
   if(finished)return;finished=true;
   scrollTo({top:0,behavior:'instant'});
   splash.classList.add('out');document.documentElement.classList.remove('m-intro');
   setTimeout(()=>splash.remove(),900);
   // keep blocking until the current gesture ends so it cannot turn into a scroll
   addEventListener('touchend',release);setTimeout(release,700);
  };
  addEventListener('touchmove',onGesture,{passive:false});
  addEventListener('wheel',onGesture,{passive:false});
  splash.addEventListener('pointerdown',finish);
  addEventListener('keydown',finish,{once:true});
  setTimeout(finish,1500);
 }
})();
