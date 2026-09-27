// Both chapters remain in the document. Scrolling updates navigation without
// hiding content, moving focus, or capturing the visitor's wheel gestures.
const chapterBar=document.querySelector('.chapter-nav');
const chapterSection=chapterBar.closest('section');
const siteHeader=document.querySelector('header');
// Mobile: a slim fixed bar replaces the tall sticky logo bar once it scrolls away.
const chapterMini=document.createElement('nav');
chapterMini.className='chapter-mini';
chapterMini.setAttribute('aria-label','NOZOMI / ENMUSUBI');
chapterMini.innerHTML='<div class="cm-track"><i aria-hidden="true"></i><a href="#nozomi" data-chapter="nozomi"><img src="assets/logo-nozomi-mark.png" alt="NOZOMI"></a><a href="#enmusubi" data-chapter="enmusubi"><img src="assets/logo-enmusubi-mark.png" alt="ENMUSUBI"></a></div>';
document.body.append(chapterMini);
const chapterLinks=[...document.querySelectorAll('[data-chapter]')];
const chapters=[...new Set(chapterLinks.map(link=>link.dataset.chapter))].map(id=>document.getElementById(id));
let chapterFrame=0;
const mobileChapters=matchMedia('(max-width:700px)');
function updateChapter(){
 chapterFrame=0;
 const top=siteHeader.getBoundingClientRect().bottom;
 const mobile=mobileChapters.matches;
 const bar=mobile?top+48:chapterBar.getBoundingClientRect().bottom;
 const line=bar+150;
 let active=chapters[0];
 chapters.forEach(chapter=>{if(chapter.getBoundingClientRect().top<=line)active=chapter});
 chapterLinks.forEach(link=>{if(link.dataset.chapter===active.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
 const show=mobile&&chapterBar.getBoundingClientRect().bottom<top&&chapterSection.getBoundingClientRect().bottom>top+120;
 chapterMini.classList.toggle('show',show);
}
function queueChapter(){if(!chapterFrame)chapterFrame=requestAnimationFrame(updateChapter)}
addEventListener('scroll',queueChapter,{passive:true});addEventListener('resize',queueChapter);updateChapter();
