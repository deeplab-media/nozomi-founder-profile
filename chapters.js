// Both chapters remain in the document. Scrolling updates navigation without
// hiding content, moving focus, or capturing the visitor's wheel gestures.
const chapterLinks=[...document.querySelectorAll('[data-chapter]')];
const chapters=chapterLinks.map(link=>document.getElementById(link.dataset.chapter));
let chapterFrame=0;
function updateChapter(){
 chapterFrame=0;
 const bar=document.querySelector('.chapter-nav');
 const line=bar.getBoundingClientRect().bottom+150;
 let active=chapters[0];
 chapters.forEach(chapter=>{if(chapter.getBoundingClientRect().top<=line)active=chapter});
 chapterLinks.forEach(link=>{if(link.dataset.chapter===active.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
}
function queueChapter(){if(!chapterFrame)chapterFrame=requestAnimationFrame(updateChapter)}
addEventListener('scroll',queueChapter,{passive:true});addEventListener('resize',queueChapter);updateChapter();
