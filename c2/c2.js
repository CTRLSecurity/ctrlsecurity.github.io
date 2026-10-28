(function(){
const I18N={
pt:{
'nav.services':'Serviços','nav.method':'Método','nav.manifesto':'Manifesto','nav.blog':'Blog','nav.contact':'Contato','nav.cta':'Fale com um especialista <span class="arr">→</span>',
'hero.eyebrow':'Cyber Security · Est. 2024','hero.h1':['Segurança','como <em>controle.</em>'],
'hero.sub':'Pentest, forense, AppSec, testes em LLM/AI e treinamento. Um time que pensa como atacante e constrói como engenheiro.',
'hero.cta1':'Agendar diagnóstico <span class="arr">→</span>','hero.cta2':'Testar meu LLM/AI',
'svc.eyebrow':'[ §02 ] Serviços','svc.h2':['Cinco frentes.','Uma <em>disciplina.</em>'],
'svc.lead':'Somos um time enxuto que entrega profundidade onde importa, do código ao modelo.',
's1.t':'Pentest & Red Team','s1.d':'Simulamos adversários reais em web, API, mobile, cloud e engenharia social. Mostramos o que poderia dar errado antes que aconteça.','s1.g':['Web & API','Mobile','Cloud','Red team'],
's2.t':'AppSec','s2.d':'Revisão de código, threat modeling e SAST/DAST no pipeline. Segurança que vive no repositório, não no PDF.','s2.g':['Code review','Threat modeling','SAST / DAST','Secure SDLC'],
's3.t':'Testes em LLM/AI','s3.b':'Novo','s3.d':'Red teaming de modelos e agentes: prompt injection, jailbreak, vazamento de dados e abuso de ferramentas. Seu modelo também é superfície de ataque.','s3.g':['Prompt injection','Jailbreak','Data leakage','OWASP LLM Top 10'],
's4.t':'Forense','s4.d':'Investigação digital com rigor pericial: análise de memória, disco e logs, reconstrução de linha do tempo e laudo técnico.','s4.g':['Memória & disco','Timeline','Cadeia de custódia','Laudo técnico'],
's5.t':'Treinamento','s5.d':'CTFs sob medida, workshops para devs e tabletop exercises para liderança. Time preparado é time mais barato.','s5.g':['CTF','Workshops','Tabletop','Mentoria'],
'm.eyebrow':'[ §03 ] Método','m.h2':['Diagnóstico','em <em>72 horas.</em>'],'m.demo':'Demonstração',
'm.p':'Reconhecimento leve, superfície de ataque mapeada, prioridades claras. Sem compromisso. Sem discurso de venda.',
'm.c1':'Mapeamento de superfície externa','m.c2':'Bateria OWASP LLM Top 10 em modelos','m.c3':'Relatório priorizado por impacto × esforço',
'mani.eyebrow':'[ §04 ] Manifesto','mani.text':'Segurança não é um produto que se compra. É uma *disciplina* que se pratica todos os dias, em cada commit, em cada prompt e em cada decisão de arquitetura.',
'b.eyebrow':'[ §05 ] Publicações','b.h2':'Do campo.','b.all':'Arquivo completo <span class="arr">→</span>','b.read':'de leitura',
'c.eyebrow':'[ §06 ] Próximo movimento','c.h2':['Pronto pra','<em>testar</em> suas','defesas?'],'c.btn':'Agendar diagnóstico gratuito <span class="arr">→</span>','c.note':'resposta em 4h úteis',
'f.tag':'Cyber security sob medida para times que levam ameaças a sério.','f.svc':'Serviços','f.co':'Empresa','f.careers':'Carreiras','f.contact':'Contato','f.policy':'Política responsável','f.rights':'Todos os direitos reservados',
'bl.eyebrow':'Blog · Publicações','bl.h1':['Do','<em>campo.</em>'],'bl.lead':'Relatórios, guias e notas de campo sobre pentest, AppSec, forense e segurança de LLM/AI.','bl.allf':'Todos',
'po.back':'← Voltar ao blog','po.prev':'Anterior','po.next':'Próximo','po.ctah':'Quer que a gente teste o seu?','po.ctab':'Fale com um especialista <span class="arr">→</span>'
},
en:{
'nav.services':'Services','nav.method':'Method','nav.manifesto':'Manifesto','nav.blog':'Blog','nav.contact':'Contact','nav.cta':'Talk to an expert <span class="arr">→</span>',
'hero.eyebrow':'Cyber Security · Est. 2024','hero.h1':['Security','as <em>control.</em>'],
'hero.sub':'Pentest, forensics, AppSec, LLM/AI testing and training. A team that thinks like an attacker and builds like an engineer.',
'hero.cta1':'Book a diagnosis <span class="arr">→</span>','hero.cta2':'Test my LLM/AI',
'svc.eyebrow':'[ §02 ] Services','svc.h2':['Five fronts.','One <em>discipline.</em>'],
'svc.lead':"We're a lean team delivering depth where it matters, from code to model.",
's1.t':'Pentest & Red Team','s1.d':'We simulate real adversaries across web, API, mobile, cloud and social engineering. We show what could go wrong before it happens.','s1.g':['Web & API','Mobile','Cloud','Red team'],
's2.t':'AppSec','s2.d':'Code review, threat modeling and SAST/DAST in the pipeline. Security that lives in the repo, not in a PDF.','s2.g':['Code review','Threat modeling','SAST / DAST','Secure SDLC'],
's3.t':'LLM/AI Testing','s3.b':'New','s3.d':'Red teaming for models and agents: prompt injection, jailbreaks, data leakage and tool abuse. Your model is attack surface too.','s3.g':['Prompt injection','Jailbreak','Data leakage','OWASP LLM Top 10'],
's4.t':'Forensics','s4.d':'Digital investigation with expert-witness rigor: memory, disk and log analysis, timeline reconstruction and technical report.','s4.g':['Memory & disk','Timeline','Chain of custody','Expert report'],
's5.t':'Training','s5.d':'Custom CTFs, developer workshops and tabletop exercises for leadership. A prepared team is a cheaper team.','s5.g':['CTF','Workshops','Tabletop','Mentorship'],
'm.eyebrow':'[ §03 ] Method','m.h2':['Diagnosis','in <em>72 hours.</em>'],'m.demo':'Illustrative demo',
'm.p':'Light recon, attack surface mapped, clear priorities. No commitment. No sales pitch.',
'm.c1':'External surface mapping','m.c2':'OWASP LLM Top 10 battery on models','m.c3':'Report prioritized by impact × effort',
'mani.eyebrow':'[ §04 ] Manifesto','mani.text':"Security isn't a product you buy. It's a *discipline* you practice every day, in every commit, in every prompt and in every architecture decision.",
'b.eyebrow':'[ §05 ] Writing','b.h2':'From the field.','b.all':'Full archive <span class="arr">→</span>','b.read':'read',
'c.eyebrow':'[ §06 ] Next move','c.h2':['Ready to','<em>test</em> your','defenses?'],'c.btn':'Book a free diagnosis <span class="arr">→</span>','c.note':'reply within 4 business hours',
'f.tag':'Bespoke cyber security for teams that take threats seriously.','f.svc':'Services','f.co':'Company','f.careers':'Careers','f.contact':'Contact','f.policy':'Responsible policy','f.rights':'All rights reserved',
'bl.eyebrow':'Blog · Writing','bl.h1':['From the','<em>field.</em>'],'bl.lead':'Reports, guides and field notes on pentest, AppSec, forensics and LLM/AI security.','bl.allf':'All',
'po.back':'← Back to blog','po.prev':'Previous','po.next':'Next','po.ctah':'Want us to test yours?','po.ctab':'Talk to an expert <span class="arr">→</span>'
}};

const TERM={
recon:{pt:[['p','$ '],['','ctrlsec recon --target acme.corp\n'],['d','[00:00] › mapeando superfície externa...\n'],['d','[00:12] › 47 hosts, 142 portas, 8 subdomínios\n'],['d','[00:34] › analisando configurações TLS...\n'],['w','[!] 3 certificados expiram em < 30d\n'],['w','[!] TLS 1.0 ativo em api.acme.corp\n'],['x','[x] .git/ exposto em static.acme.corp\n'],['p','\nreport'],['',' › '],['ok','12 critical / 34 high / 89 medium\n'],['d','priorizado por impacto × exploitabilidade\n\n'],['p','$ ']],
en:[['p','$ '],['','ctrlsec recon --target acme.corp\n'],['d','[00:00] › mapping external surface...\n'],['d','[00:12] › 47 hosts, 142 ports, 8 subdomains\n'],['d','[00:34] › scanning TLS configurations...\n'],['w','[!] 3 certificates expiring in < 30d\n'],['w','[!] TLS 1.0 enabled on api.acme.corp\n'],['x','[x] exposed .git/ on static.acme.corp\n'],['p','\nreport'],['',' › '],['ok','12 critical / 34 high / 89 medium\n'],['d','prioritized by impact × exploitability\n\n'],['p','$ ']]},
llm:{pt:[['p','$ '],['','ctrlsec llm-probe --model acme-assistant --suite owasp-llm\n'],['d','[00:00] › carregando 412 payloads (LLM01–LLM10)...\n'],['d','[00:41] › LLM01 injeção indireta via PDF anexado...\n'],['w','[!] system prompt vazado em 3/40 tentativas\n'],['x','[x] tool call não autorizada: send_email()\n'],['w','[!] PII retornada após jailbreak por role-play\n'],['d','[03:12] › LLM06 testando exfiltração via RAG...\n'],['x','[x] documentos de outro tenant no contexto\n'],['p','\nreport'],['',' › '],['ok','4 critical / 9 high / 17 medium\n\n'],['p','$ ']],
en:[['p','$ '],['','ctrlsec llm-probe --model acme-assistant --suite owasp-llm\n'],['d','[00:00] › loading 412 payloads (LLM01–LLM10)...\n'],['d','[00:41] › LLM01 indirect injection via attached PDF...\n'],['w','[!] system prompt leaked in 3/40 attempts\n'],['x','[x] unauthorized tool call: send_email()\n'],['w','[!] PII returned after role-play jailbreak\n'],['d','[03:12] › LLM06 testing exfiltration via RAG...\n'],['x','[x] other-tenant documents in context\n'],['p','\nreport'],['',' › '],['ok','4 critical / 9 high / 17 medium\n\n'],['p','$ ']]},
forensic:{pt:[['p','$ '],['','ctrlsec dfir --image srv-db01.e01 --mem srv-db01.raw\n'],['d','[00:00] › verificando hash SHA-256... ok\n'],['d','[00:08] › cadeia de custódia registrada #CC-2026-114\n'],['d','[01:22] › extraindo processos da memória...\n'],['w','[!] processo órfão: svch0st.exe (PID 4412)\n'],['x','[x] beacon C2 a cada 300s → 185.**.**.12\n'],['d','[04:51] › reconstruindo timeline (MFT, evtx, prefetch)\n'],['w','[!] logs limpos em 14/10 03:12, artefatos recuperados\n'],['p','\ntimeline'],['',' › '],['ok','acesso inicial 05/10 · 9 dias de permanência\n\n'],['p','$ ']],
en:[['p','$ '],['','ctrlsec dfir --image srv-db01.e01 --mem srv-db01.raw\n'],['d','[00:00] › verifying SHA-256 hash... ok\n'],['d','[00:08] › chain of custody logged #CC-2026-114\n'],['d','[01:22] › extracting processes from memory...\n'],['w','[!] orphan process: svch0st.exe (PID 4412)\n'],['x','[x] C2 beacon every 300s → 185.**.**.12\n'],['d','[04:51] › rebuilding timeline (MFT, evtx, prefetch)\n'],['w','[!] logs wiped 10/14 03:12, artifacts recovered\n'],['p','\ntimeline'],['',' › '],['ok','initial access 10/05 · 9 days dwell time\n\n'],['p','$ ']]}
};

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const B=document.body.dataset,pageLang=B.pageLang;
let lang=pageLang||localStorage.getItem('ctrlsec-lang')||'pt';
if(pageLang)localStorage.setItem('ctrlsec-lang',pageLang);
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];

function render(){
  document.documentElement.lang=lang==='pt'?'pt-BR':'en';
  const d=I18N[lang];
  $$('[data-lang-only]').forEach(el=>{el.hidden=el.dataset.langOnly!==lang});
  $$('[data-i18n]').forEach(el=>{
    const v=d[el.dataset.i18n];if(v==null)return;
    if(el.dataset.mode==='lines'){el.innerHTML=v.map(l=>'<span class="line"><span>'+l+'</span></span>').join('')}
    else if(el.dataset.mode==='tags'){el.innerHTML=v.map(t=>'<span>'+t+'</span>').join('')}
    else el.innerHTML=v;
  });
  buildManifesto();
  $$('.filters button[data-tag=""]').forEach(b=>b.click());
  $$('.lang').forEach(l=>{l.dataset.l=lang;$$('button',l).forEach(b=>b.classList.toggle('on',b.dataset.lang===lang))});
  restartTerm();
}
function setLang(l){
  if(l===lang)return;
  if(pageLang){localStorage.setItem('ctrlsec-lang',l);location.href=B.altUrl||B.blogUrl||'/';return}
  lang=l;localStorage.setItem('ctrlsec-lang',l);
  if(reduce){render();return}
  document.body.classList.add('swapping');
  setTimeout(()=>{render();requestAnimationFrame(()=>document.body.classList.remove('swapping'))},250);
}
$$('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));

/* Keep the contact address out of the static markup and assemble it on click. */
function contactAddress(){
  const local=['ctrl','plus','security'].join('.');
  const domain=['gmail','com'].join('.');
  return local+String.fromCharCode(64)+domain;
}
$$('[data-contact-link]').forEach(link=>link.addEventListener('click',e=>{
  e.preventDefault();
  location.href='mailto:'+contactAddress();
}));

/* manifesto */
function buildManifesto(){
  const el=$('#mani');if(!el)return;
  el.innerHTML=I18N[lang]['mani.text'].split(' ').map(w=>{const acc=/^\*.*\*/.test(w);return '<span class="w'+(acc?' acc':'')+'">'+w.replace(/\*/g,'')+'</span>'}).join(' ');
  onScroll();
}

/* terminal */
let tab='recon',typer=null,termSeen=false;
function restartTerm(){
  const body=$('#term-body');if(!body)return;
  clearTimeout(typer);body.innerHTML='';
  const seq=TERM[tab][lang];
  if(reduce||!termSeen){body.innerHTML=seq.map(([c,t])=>'<span class="'+c+'">'+esc(t)+'</span>').join('')+'<span class="caret"></span>';if(!termSeen&&!reduce)body.innerHTML='<span class="caret"></span>';return}
  let i=0,j=0,span=null;const caret=document.createElement('span');caret.className='caret';body.appendChild(caret);
  (function step(){
    if(i>=seq.length)return;
    const [c,t]=seq[i];
    if(!span){span=document.createElement('span');span.className=c;body.insertBefore(span,caret)}
    const fast=c==='d'||c==='w'||c==='x'||c==='ok';
    const chunk=fast?Math.min(t.length-j,4):1;
    span.textContent+=t.slice(j,j+chunk);j+=chunk;
    if(j>=t.length){i++;j=0;span=null;typer=setTimeout(step,t.endsWith('\n')?(fast?140:380):20)}
    else typer=setTimeout(step,fast?10:28+Math.random()*30);
  })();
}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
$$('.tabs button').forEach(b=>b.addEventListener('click',()=>{tab=b.dataset.tab;$$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));restartTerm()}));

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.id==='term'&&!termSeen){termSeen=true;restartTerm()}io.unobserve(e.target)}}),{threshold:.18,rootMargin:'0px 0px -6% 0px'});
$$('.reveal,.stagger,.mask-h,#term').forEach(el=>io.observe(el));

/* nav state */
const nav=$('.nav');const lights=$$('.light');
function onScroll(){
  const y=scrollY;nav.classList.toggle('scrolled',y>20);
  const probe=40;nav.classList.toggle('on-light',lights.some(s=>{const r=s.getBoundingClientRect();return r.top<=probe&&r.bottom>=probe}));
  const m=$('#mani');
  if(m){const r=m.getBoundingClientRect(),vh=innerHeight;const p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.35)));const ws=$$('.w',m);const n=Math.round(p*ws.length);ws.forEach((w,k)=>w.classList.toggle('lit',reduce||k<n))}
  const pr=$('.progress');if(pr){const h=document.documentElement.scrollHeight-innerHeight;pr.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')'}
  const spot=$('.hero .spot');if(spot&&!reduce)spot.style.transform='translateY('+y*.25+'px)';
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);

/* burger */
const bgr=$('.burger');if(bgr)bgr.addEventListener('click',()=>document.body.classList.toggle('menu-open'));
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));

/* hero pointer */
const hero=$('.hero'),lock=$('.lock');
if(!reduce&&matchMedia('(pointer:fine)').matches){
  if(hero&&lock){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;hero.style.setProperty('--mx',x+'px');hero.style.setProperty('--my',y+'px');const nx=x/r.width-.5,ny=y/r.height-.5;lock.style.transform='translate('+nx*-24+'px,'+ny*-24+'px) rotateY('+nx*14+'deg) rotateX('+ny*-14+'deg)'});
  hero.addEventListener('pointerleave',()=>lock.style.transform='');}
  $$('[data-magnet]').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.25+'px,'+(e.clientY-r.top-r.height/2)*.35+'px)'});b.addEventListener('pointerleave',()=>b.style.transform='')});
}

/* telemetry */
const hex=()=>Math.random().toString(16).slice(2,8).toUpperCase();
setInterval(()=>{const a=$('#tel-hash'),b=$('#tel-ping');if(a)a.textContent='0x'+hex();if(b)b.textContent=(8+Math.random()*9).toFixed(1)+'ms'},900);

/* boot */
/* blog filters */
$$('.filters').forEach(f=>f.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',f).forEach(x=>x.classList.toggle('on',x===b));const t=b.dataset.tag;$$('.rows .row').forEach(r=>r.classList.toggle('hide',!!t&&r.dataset.tag!==t))}));
const yr=$('#year');if(yr)yr.textContent=new Date().getFullYear();
render();onScroll();
const boot=()=>setTimeout(()=>document.body.classList.add('ready'),reduce||!$('#intro')?0:1000);
if(document.readyState==='complete')boot();else addEventListener('load',boot);
setTimeout(()=>document.body.classList.add('ready'),2600);
})();
