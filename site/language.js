/* ---------- French: how the language behaves in the shared practice code ----------
   Each piece here is called by a shared script (named beside it). Grammar itself is in engine.js. */
/* js/core.js glossify(): fold a word so accents don't stop a hover definition from matching */
const foldWord=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC').toLowerCase();
/* capitalize the first letter, after any opening ¿ ¡ or highlight marker */
const capES=s=>String(s).replace(/^([\u0001]*)(\p{L})/u,(m,a,b)=>a+b.toUpperCase());
/* js/drill.js next(): the sentence as shown, without its end mark */
const sentenceText=q=>capES(q.display);
/* js/drill.js: get a new question ready */
function prep(x){x.mode=(x.choice||x.form)?'blank':modeSel();if(!x.choice)x.latin=capES(x.display)+x.end;x.greeting=R(GREETINGS);return x}
/* ---------- charts beside the sentence: buildCharts() runs once at start-up, renderCharts(q) on every new sentence ---------- */
function buildCharts(){
  const set=h=>{$('cbody').hidden=h;$('ctoggle').textContent=h?'Show':'Hide';store.set('chartsHidden',h)};
  $('ctoggle').addEventListener('click',()=>set(!$('cbody').hidden));set(store.get('chartsHidden',false));
}
const PRS=['je','tu','il, elle, on','nous','vous','ils, elles'];
const pv=(v,t,p)=>contract((p===0?'je ':'')+vphrase(vb(v),t,p)).replace(/^j'|^je /,'');
function conjT(cap_,verbs,t,note){
  return `<div class="cwrap"><table><caption>${cap_}</caption><tr><th></th>${verbs.map(v=>`<th>${v}</th>`).join('')}</tr>${[0,1,2,3,4,5].map(p=>`<tr><th>${PRS[p]}</th>${verbs.map(v=>`<td>${esc(vphrase(vb(v),t,p))}</td>`).join('')}</tr>`).join('')}</table>${note?`<p class="hint">${note}</p>`:''}</div>`}
function listT(cap_,head,rows,note){return `<div class="cwrap"><table><caption>${cap_}</caption><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map((c,i)=>i?`<td>${c}</td>`:`<th>${c}</th>`).join('')}</tr>`).join('')}</table>${note?`<p class="hint">${note}</p>`:''}</div>`}
const CHARTS={
  pres:()=>conjT('Present tense: regular verbs',['parler','finir','vendre'],'pres','Spelling changes: nous mangeons, nous commençons; j’achète, je préfère, j’appelle, je paie. Before a vowel, je becomes j’.'),
  irrpres:()=>conjT('Present tense: key irregular verbs',['être','avoir','aller','faire'],'pres','aller + infinitive = futur proche (je vais manger); venir de + infinitive = passé récent (je viens de manger).'),
  pc:()=>listT('Passé composé: avoir or être + past participle',['','avoir','être'],[0,1,2,3,4,5].map(p=>[PRS[p],vf(vb('avoir'),'pres',p)+' parlé',vf(vb('être'),'pres',p)+' allé(e)'+(p>2?'s':'')]),'Participles: -er → -é, -ir → -i, -re → -u. Irregular: été, eu, fait, pris, mis, dit, écrit, lu, vu, bu, pu, voulu, dû, su, venu, ouvert, reçu. Être verbs (DR MRS VANDERTRAMP: devenir, revenir, monter, rester, sortir, venir, aller, naître, descendre, entrer, rentrer, tomber, retourner, arriver, mourir, partir) and every reflexive verb use être, and the participle agrees with the subject: elle est allée, ils se sont levés. With avoir, it agrees with a direct object pronoun before it: je l’ai vue. Plus-que-parfait: imparfait of avoir or être + participle (j’avais parlé).'),
  impf:()=>conjT('Imparfait',['parler','finir','être'],'impf','Take the nous form of the present, drop -ons, add -ais, -ais, -ait, -ions, -iez, -aient: nous finissons → je finissais. Only être is irregular (ét-).'),
  futcond:()=>listT('Futur simple and conditionnel: endings on the infinitive',['','Futur','Conditionnel'],[0,1,2,3,4,5].map(p=>[PRS[p],'parler'+FUT_END[p],'parler'+IMPF_END[p]]),'-re verbs drop the e: vendr-. Irregular stems (same for both): ser- (être), aur- (avoir), ir- (aller), fer- (faire), pourr-, voudr-, devr-, saur-, viendr-, verr-, enverr-. The conditional uses the imparfait endings.'),
  subj:()=>conjT('Present subjunctive',['parler','finir','vendre'],'subj','Take the ils form of the present, drop -ent, add -e, -es, -e, -ions, -iez, -ent (nous and vous look like the imparfait). Irregular: être (sois), avoir (aie), aller (aille), faire (fasse), pouvoir (puisse), savoir (sache), vouloir (veuille). Used after que with wishes, necessity (il faut que), emotion, doubt, and pour que, avant que, bien que.'),
  cmd:()=>listT('Commands (impératif)',['','affirmative','negative'],[['tu','parle, finis, vends (no -s for -er verbs)','ne parle pas'],['nous','parlons (let’s speak)','ne parlons pas'],['vous','parlez','ne parlez pas']],'Irregular: sois, soyons, soyez (être); aie, ayons, ayez (avoir); va (aller); sache (savoir). Pronouns follow an affirmative command with hyphens (prends-le, donne-le-moi, lève-toi) and go before a negative one (ne le prends pas, ne te lève pas).'),
  agree:()=>listT('Articles, adjectives and determiners',['','masc. sing.','fem. sing.','masc. pl.','fem. pl.'],[['the','le (l’)','la (l’)','les','les'],['a, some','un','une','des','des'],['some (partitive)','du (de l’)','de la (de l’)','des','des'],['adjective','petit','petite','petits','petites'],['-eux, -if, -er','heureux, sportif, cher','heureuse, sportive, chère','heureux, sportifs','heureuses, sportives'],['this, these','ce (cet)','cette','ces','ces'],['my','mon','ma (mon)','mes','mes'],['our','notre','notre','nos','nos']],'Most adjectives go after the noun; beau, bon, grand, jeune, joli, mauvais, nouveau, petit, vieux go before (bel, nouvel, vieil before a vowel). à + le = au, à + les = aux, de + le = du, de + les = des. After a negative, un, une, du, de la and des become de: je n’ai pas de chien.'),
  pron:()=>listT('Pronouns',['','subject','direct object','indirect object','reflexive'],[['I / me','je','me','me','me'],['you','tu','te','te','te'],['he, she, it','il, elle','le, la','lui','se'],['we / us','nous','nous','nous','nous'],['you (formal or all)','vous','vous','vous','vous'],['they','ils, elles','les','leur','se']],'Order before the verb: me, te, se, nous, vous → le, la, les → lui, leur → y → en (il me le donne, je le lui donne, j’y vais, j’en mange). Me, te, le, la and se become m’, t’, l’, s’ before a vowel. y replaces à + a place or thing; en replaces de + a noun (some, of it).')
};
function renderCharts(qq){
  const ids=(qq&&qq.charts&&qq.charts.length?qq.charts:['pres']).filter(id=>CHARTS[id]);
  $('cbody').innerHTML=ids.map(id=>CHARTS[id]()).join('');
}
/* ---------- identify the use (js/identify.js) ---------- */
const normU=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z ]/g,' ').replace(/\b(passe compose|imparfait|imperfect|subjunctive|subjonctif|subj|the|use|usage|of|a|an|it|is|its|this|type|for a|for an|helping verb|auxiliary|pronoun)\b/g,' ').replace(/\s+/g,' ').trim();
/* the highlighted words: the token itself plus any words it governs (por el parque) */
function spanIdx(qq,tok){const i=qq.tokens.indexOf(tok);return[i,i+(tok.span||0)]}
function phraseOf(qq,tok){const[a,b]=spanIdx(qq,tok);return contract(qq.tokens.slice(a,b+1).filter(t=>!t.hide).map(t=>t.la).join(' '))}
function latinMarked(qq,tok){
  const[a,b]=spanIdx(qq,tok),pre='';
  const words=[];qq.tokens.forEach((t,j)=>{if(t.hide)return;words.push({w:t.la+(t.post||''),m:j>=a&&j<=b})});
  let txt=words.map((x,i)=>(x.m?'\u0001':'')+x.w+(x.m?'\u0002':'')).join(' ');
  txt=contract(txt.replace(/\u0002 \u0001/g,' '));txt=capES(pre+txt.replace(/^\u0001/,'').replace(/^/,txt.startsWith('\u0001')?'\u0001':''));
  return esc(txt).replace(/\u0001/g,'<mark>').replace(/\u0002/g,'</mark>')+qq.end;
}
function pickXC(qq){
  if(!qq||qq.choice||!qq.tokens)return null;
  const c=qq.tokens.filter(t=>t.cids&&TY(t.cids[0])&&!XC_SKIP(t,qq));if(!c.length)return null;
  const pref=qq.topic&&ID_TOPIC[qq.topic.id],a=pref&&c.find(t=>pref.includes(TY(t.cids[0])));if(a)return a;
  return R(c);
}
function makeIdentify(){
  const fromIds=ids=>[...new Set(ids.flatMap(t=>ID_TOPIC[t]||[]))];
  const ft=fromIds([...tFocus]);let types=tab==='uses'?[...uSel]:tab==='build'?[]:(ft.length?ft:fromIds([...selected]));
  if(!types.length)types=Object.keys(TYPES).filter(x=>!/^sj/.test(x)||[...selected].some(t=>/^sj/.test(t)));
  for(let tries=0;tries<200;tries++){
    const ty=R(types);ALT=[];let qq;try{qq=TYPES[ty].gen?TYPES[ty].gen():idQuestion(ty)}catch(e){continue}
    const tok=qq.tokens.find(t=>t.cids&&TY(t.cids[0])===ty);if(!tok)continue;
    qq.idType=ty;qq.idTok=tok;if(!useEnMark(qq))continue;qq.topic={id:'identify',level:{pc:'II',imp:'II',aux:'II',y:'II',en:'II',subj:'III'}[TYPES[ty].c],name:'Identify: uses of '+USES[TYPES[ty].c].name};
    qq.topic.level=TYPES[ty].level||USES[TYPES[ty].c].level||qq.topic.level||'I';
    return qq;
  }
  return makeQuestion(selected.size?selected:new Set(['pcimp']));
}
/* js/check.js checkT(): the feedback line for a checked translation (r: the grader's result) */
function resultLine(r,model,why,order,e2l,inp){
  let li;
  if(r.ok&&!r.macron)li=`<li class="ok"><b class="ok">Correct.</b> ${model}</li>`;
  else if(r.ok)li=`<li class="mac"><b class="ok">Correct</b>, <b class="mac">but check the accents.</b> With every accent mark: ${model}</li>`;
  else if(r.essential)li=`<li class="bad"><b class="bad">Incorrect: an accent mark matters here.</b> <span class="la">${esc(r.essential.join(', '))}</span> is a different form. The answer is ${model}</li>`;
  else li=`<li class="bad"><b class="bad">${r.empty?'No answer given.':'Incorrect.'}</b>${why}${why?'<br>':' '}One correct answer: ${model}${order}${r.empty?'':'<br><button class="btn quiet" id="override">Count my answer as correct</button>'}</li>`;
  return li;
}
/* js/check.js: typing helpers in the answer box and the question box, and the letter buttons */
function setupTyping(){
  const MAC={'e/':'é','E/':'É','a\\':'à','e\\':'è','u\\':'ù','A\\':'À','E\\':'È','U\\':'Ù','a^':'â','e^':'ê','i^':'î','o^':'ô','u^':'û','A^':'Â','E^':'Ê','I^':'Î','O^':'Ô','U^':'Û','e"':'ë','i"':'ï','u"':'ü','E"':'Ë','I"':'Ï','U"':'Ü','c\\':'ç','C\\':'Ç','e´':'é','a`':'à','e`':'è','u`':'ù'};
  const accType=(t,only)=>{const p=t.selectionStart,v=t.value,k=v.slice(p-2,p);if(p>1&&MAC[k]&&(!only||only.includes(k[1]))){t.value=v.slice(0,p-2)+MAC[k]+v.slice(p);t.setSelectionRange(p-1,p-1)}};
  $('qbody').addEventListener('input',e=>{const t=e.target;if(t.tagName!=='INPUT'||q.mode==='l2e'||q.mode==='id')return;accType(t)});
  $('macrons').innerHTML=['é','è','ê','ë','à','â','ç','î','ï','ô','û','ù','œ'].map(c=>`<button type="button" aria-label="Insert ${c}">${c}</button>`).join('');
  $('askq').addEventListener('input',e=>accType(e.target,'´`'));
}
/* js/vocab.js: the word to type when a vocabulary line is clicked */
function vocabWords(v){
  const i=v.indexOf(' : '),la=(i<0?v:v.slice(0,i)).trim(),en=i<0?'':v.slice(i+3).trim();
  let laW;const plain=la.replace(/\s*\([^)]*\)/g,'').trim();
  if(/^(le|la|les) \S+$/.test(plain))laW=plain.split(' ')[1];else if(/^l[’'][^\s]+$/.test(plain))laW=plain.slice(2);
  else if(!/[,;/]/.test(plain)&&plain.split(' ').length<=3&&!/…/.test(plain))laW=plain;
  else laW=(plain.match(/^[^\s,(/]+/)||[plain])[0];
  const enW=en.split(/[;,]/)[0].replace(/\([^)]*\)/g,'').replace(/^to /,'').replace(/\s+/g,' ').trim()||en;
  return{la:laW,en:enW};
}
