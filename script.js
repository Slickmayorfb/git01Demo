const $=s=>document.querySelector(s);
// Add events here: {title,date,time,venue,bring,desc}. The live site currently has none upcoming.
const upcoming=[], past=[];
function render(list,el,isPast){
  if(!list.length){el.innerHTML=isPast?'':'<div class="empty" style="grid-column:1/-1">No upcoming events right now — check back soon or <a href="#">get in touch</a> to find out what\'s planned.</div>';return}
  el.innerHTML=list.map((e,i)=>`<article class="ev ${isPast?'past':''}"><div class="top">${e.title}</div><div class="body"><p>📅 ${e.date} · ${e.time}</p><p>📍 ${e.venue}</p><p>${e.desc}</p></div>${isPast?'':`<div class="foot"><button class="btn" data-i="${i}">Register</button></div>`}</article>`).join('');
}
render(upcoming,$('#upList'),false);render(past,$('#pastList'),true);
$('#upList').addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;const ev=upcoming[b.dataset.i];
  $('#mDate').textContent=ev.date;$('#mTime').textContent=ev.time;$('#mVenue').textContent=ev.venue;$('#mBring').textContent=ev.bring||'';
  $('#modal').classList.add('show')});
$('#close').onclick=()=>$('#modal').classList.remove('show');
$('#modal').onclick=e=>{if(e.target.id==='modal')e.target.classList.remove('show')};
$('#alg').onchange=e=>$('#algW').classList.toggle('hide',e.target.value!=='Yes');
$('#loc').onchange=e=>$('#locW').classList.toggle('hide',e.target.value!=='Other');
$('#famNo').onclick=()=>$('#famBox').classList.add('hide');
document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{
  const d=document.createElement('div');d.className='person';
  d.innerHTML=`<input placeholder="${b.dataset.add} name"><select><option>0 - 6</option><option>7 - 11</option><option>12 - 15</option><option>16 - 25</option><option>26 &amp; Above</option></select><button type="button" class="ghost" style="margin:0">✕</button>`;
  d.querySelector('button').onclick=()=>d.remove();$('#people').append(d)});
$('#submit').onclick=()=>{
  const miss=[...document.querySelectorAll('#form input:not([type=checkbox]),#form select')].filter(f=>!f.closest('.hide')&&!f.closest('#people')&&!f.closest('#locW')&&!f.value);
  if(miss.length||!$('#c1').checked){$('#err').textContent='Please complete all required fields and accept the consent statement.';return}
  $('#err').textContent='';$('#ok').classList.remove('hide')};
// nav
$('#burger').onclick=()=>$('#nav').classList.toggle('show');
document.querySelector('.dd>button').onclick=e=>e.target.parentNode.classList.toggle('open');
// demo: uncomment to preview the registration modal
// upcoming.push({title:'Sample Workshop',date:'Sat 10 Oct 2026',time:'10:00–13:00',venue:'The Light Box',bring:'Bring a notebook',desc:'A free skills session.'});render(upcoming,$('#upList'),false);