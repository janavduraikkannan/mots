/* ===================== ENGINE ===================== */
const R=a=>a[Math.floor(Math.random()*a.length)], chance=p=>Math.random()<p;
const T6=s=>s.split(' ');
let INV=false; // model answers for questions use inversion (Parles-tu …?) instead of est-ce que; both are always accepted
function setLimit(on){INV=!!on}
let ALT=[];
const GN={m:'masculine',f:'feminine'};
const TN={pres:'present',pc:'passé composé',impf:'imparfait',fut:'futur simple',cond:'conditionnel',pqp:'plus-que-parfait',futant:'futur antérieur',condp:'conditionnel passé',subj:'present subjunctive',subjp:'past subjunctive',proche:'futur proche (aller + infinitive)',recent:'passé récent (venir de + infinitive)',prog:'être en train de + infinitive',imp:'imperative'};
const PERS=['je','tu','il / elle / on','nous','vous','ils / elles'];
const VOW=/^[aeiouyéèêëàâîïôûùœh]/i;
const stripA=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').normalize('NFC');

/* ---------- verbs ---------- */
/* inf|english|past|past participle|-ing|object tags|flags|spelling   flags: T takes an object, M motion to (à), F motion from (de), S activity in a place, D can take an indirect object (à quelqu'un), R reflexive, E passé composé with être
   spelling: c -cer, g -ger, e e→è (acheter), é é→è (préférer), l double l (appeler), t double t (jeter), y y→i (payer) */
const VERBS=`parler|speak|spoke|spoken|speaking|L|TS|
aimer|like|liked|liked|liking|tfwimvgpa|T|
regarder|watch|watched|watched|watching|v|T|
écouter|listen to|listened to|listened to|listening to|m|T|
manger|eat|ate|eaten|eating|f|TS|g
chercher|look for|looked for|looked for|looking for|tpaw|T|
trouver|find|found|found|finding|tpaw|T|
acheter|buy|bought|bought|buying|tfwi|TD|e
préparer|prepare|prepared|prepared|preparing|f|TD|
cuisiner|cook|cooked|cooked|cooking|f|TS|
porter|carry|carried|carried|carrying|t|T|
aider|help|helped|helped|helping|p|T|
visiter|visit|visited|visited|visiting|c|T|
appeler|call|called|called|calling|p|T|l
attendre|wait for|waited for|waited for|waiting for|p|T|
utiliser|use|used|used|using|t|T|
laver|wash|washed|washed|washing|t|T|
payer|pay for|paid for|paid for|paying for|tf|T|y
commencer|begin|began|begun|beginning|sv|T|c
donner|give|gave|given|giving|tfw|TD|
montrer|show|showed|shown|showing|tw|TD|
envoyer|send|sent|sent|sending|w|TD|y
apporter|bring|brought|brought|bringing|tf|TD|
prêter|lend|lent|lent|lending|tw|TD|
expliquer|explain|explained|explained|explaining|q|TD|
raconter|tell|told|told|telling|x|TD|
oublier|forget|forgot|forgotten|forgetting|tw|T|
fermer|close|closed|closed|closing|o|T|
nettoyer|clean|cleaned|cleaned|cleaning|tc|T|y
essayer|try|tried|tried|trying|f|T|y
préférer|prefer|preferred|preferred|preferring|fdv|T|é
commander|order|ordered|ordered|ordering|fd|T|
gagner|win|won|won|winning|G|T|
rencontrer|meet|met|met|meeting|p|T|
inviter|invite|invited|invited|inviting|p|T|
dessiner|draw|drew|drawn|drawing|a|T|
jouer|play|played|played|playing|g|TS|
habiter|live|lived|lived|living||S|
travailler|work|worked|worked|working||S|
étudier|study|studied|studied|studying|s|TS|
danser|dance|danced|danced|dancing||S|
chanter|sing|sang|sung|singing|m|TS|
nager|swim|swam|swum|swimming||S|g
marcher|walk|walked|walked|walking||M|
voyager|travel|traveled|traveled|traveling||M|g
arriver|arrive|arrived|arrived|arriving||ME|
entrer|enter|entered|entered|entering||ME|
rentrer|go home|went home|gone home|going home||E|
rester|stay|stayed|stayed|staying||SE|
tomber|fall|fell|fallen|falling||E|
monter|go up|went up|gone up|going up||E|
retourner|go back|went back|gone back|going back||ME|
finir|finish|finished|finished|finishing|hsfv|T|
choisir|choose|chose|chosen|choosing|tfwv|T|
réussir|pass|passed|passed|passing|s|T|
remplir|fill|filled|filled|filling|B|T|
réfléchir|think|thought|thought|thinking|||
grandir|grow up|grew up|grown up|growing up|||
vendre|sell|sold|sold|selling|tfw|TD|
entendre|hear|heard|heard|hearing|pam|T|
perdre|lose|lost|lost|losing|tw|T|
rendre|return|returned|returned|returning|tw|TD|
répondre|answer|answered|answered|answering|q|TA|
descendre|go down|went down|gone down|going down||E|
être|be|was|been|being|||
avoir|have|had|had|having|tfaw|T|
aller|go|went|gone|going||ME|
faire|make|made|made|making|fh|TS|
prendre|take|took|taken|taking|tfd|T|
apprendre|learn|learned|learned|learning|L|T|
comprendre|understand|understood|understood|understanding|qLs|T|
venir|come|came|come|coming||MFE|
revenir|come back|came back|come back|coming back||FE|
devenir|become|became|become|becoming||E|
pouvoir|be able to|could|been able to|being able to|||
vouloir|want|wanted|wanted|wanting|tfd|T|
devoir|have to|had to|had to|having to|||
savoir|know|knew|known|knowing|q|T|
connaître|know|knew|known|knowing|pc|T|
dire|say|said|said|saying||D|
écrire|write|wrote|written|writing|w|TD|
lire|read|read|read|reading|w|T|
mettre|put|put|put|putting|t|T|
voir|see|saw|seen|seeing|pavc|T|
boire|drink|drank|drunk|drinking|d|T|
partir|leave|left|left|leaving||FE|
sortir|go out|went out|gone out|going out||FE|
dormir|sleep|slept|slept|sleeping||S|
ouvrir|open|opened|opened|opening|o|T|
recevoir|get|got|gotten|getting|w|T|
croire|believe|believed|believed|believing|||
courir|run|ran|run|running||S|
vivre|live|lived|lived|living||S|
conduire|drive|drove|driven|driving|r|T|
se lever|get up|got up|gotten up|getting up||RE|e
se laver|wash up|washed up|washed up|washing up||RE|
se coucher|go to bed|went to bed|gone to bed|going to bed||RE|
se réveiller|wake up|woke up|woken up|waking up||RE|
s'habiller|get dressed|got dressed|gotten dressed|getting dressed||RE|
se brosser|brush $P teeth|brushed $P teeth|brushed $P teeth|brushing $P teeth||RE|
se promener|take a walk|took a walk|taken a walk|taking a walk||RE|e
s'amuser|have fun|had fun|had fun|having fun||RE|
se reposer|rest|rested|rested|resting||RE|
se dépêcher|hurry|hurried|hurried|hurrying||RE|
se souvenir|remember|remembered|remembered|remembering||E|
douter|doubt|doubted|doubted|doubting|||
penser|think|thought|thought|thinking|||
espérer|hope|hoped|hoped|hoping|||é
souhaiter|wish|wished|wished|wishing|||
falloir|be necessary|was necessary|been necessary|being necessary|||`.split('\n').map(l=>{
  const[inf,e,past,pp,ing,obj,fl,sc]=l.split('|');const refl=/^s(e |')/.test(inf),base=refl?inf.replace(/^s(e |')/,''):inf;
  const cls=/er$/.test(base)&&base!=='aller'?'er':/ir$/.test(base)?'ir':/re$/.test(base)?'re':'x';
  return{inf,base,refl,e,past,pp,ing,obj,fl,sc:sc||'',cls,stem:base.slice(0,-2),irr:null,etre:fl.includes('E')};
});
const vb=x=>VERBS.find(v=>v.inf===x||v.base===x&&!v.refl)||VERBS.find(v=>v.base===x);
/* irregular verbs: present, past participle, future stem, subjunctive (when not regular from ils / nous) */
const IRR={
  'être':{pres:T6('suis es est sommes êtes sont'),pp:'été',fs:'ser',subj:T6('sois sois soit soyons soyez soient'),impf:'ét',imp:T6('sois soyons soyez')},
  avoir:{pres:T6('ai as a avons avez ont'),pp:'eu',fs:'aur',subj:T6('aie aies ait ayons ayez aient'),imp:T6('aie ayons ayez')},
  aller:{pres:T6('vais vas va allons allez vont'),pp:'allé',fs:'ir',subj:T6('aille ailles aille allions alliez aillent'),imp:T6('va allons allez')},
  faire:{pres:T6('fais fais fait faisons faites font'),pp:'fait',fs:'fer',subj:T6('fasse fasses fasse fassions fassiez fassent')},
  prendre:{pres:T6('prends prends prend prenons prenez prennent'),pp:'pris'},
  venir:{pres:T6('viens viens vient venons venez viennent'),pp:'venu',fs:'viendr'},
  pouvoir:{pres:T6('peux peux peut pouvons pouvez peuvent'),pp:'pu',fs:'pourr',subj:T6('puisse puisses puisse puissions puissiez puissent')},
  vouloir:{pres:T6('veux veux veut voulons voulez veulent'),pp:'voulu',fs:'voudr',subj:T6('veuille veuilles veuille voulions vouliez veuillent')},
  devoir:{pres:T6('dois dois doit devons devez doivent'),pp:'dû',fs:'devr'},
  savoir:{pres:T6('sais sais sait savons savez savent'),pp:'su',fs:'saur',subj:T6('sache saches sache sachions sachiez sachent'),imp:T6('sache sachons sachez')},
  'connaître':{pres:T6('connais connais connaît connaissons connaissez connaissent'),pp:'connu'},
  dire:{pres:T6('dis dis dit disons dites disent'),pp:'dit'},
  'écrire':{pres:T6('écris écris écrit écrivons écrivez écrivent'),pp:'écrit'},
  lire:{pres:T6('lis lis lit lisons lisez lisent'),pp:'lu'},
  mettre:{pres:T6('mets mets met mettons mettez mettent'),pp:'mis'},
  voir:{pres:T6('vois vois voit voyons voyez voient'),pp:'vu',fs:'verr'},
  boire:{pres:T6('bois bois boit buvons buvez boivent'),pp:'bu'},
  partir:{pres:T6('pars pars part partons partez partent'),pp:'parti'},
  sortir:{pres:T6('sors sors sort sortons sortez sortent'),pp:'sorti'},
  dormir:{pres:T6('dors dors dort dormons dormez dorment'),pp:'dormi'},
  ouvrir:{pres:T6('ouvre ouvres ouvre ouvrons ouvrez ouvrent'),pp:'ouvert'},
  recevoir:{pres:T6('reçois reçois reçoit recevons recevez reçoivent'),pp:'reçu',fs:'recevr'},
  croire:{pres:T6('crois crois croit croyons croyez croient'),pp:'cru'},
  courir:{pres:T6('cours cours court courons courez courent'),pp:'couru',fs:'courr'},
  vivre:{pres:T6('vis vis vit vivons vivez vivent'),pp:'vécu'},
  conduire:{pres:T6('conduis conduis conduit conduisons conduisez conduisent'),pp:'conduit'},
  envoyer:{fs:'enverr'},
  falloir:{pres:['','','faut','','',''],pp:'fallu',fs:'faudr',subj:['','','faille','','',''],impf:'fall'},
};
for(const [pre,b] of [['ap','prendre'],['com','prendre'],['re','venir'],['de','venir'],['sou','venir']]){const I=IRR[b];IRR[pre+b]={pres:I.pres.map(x=>pre+x),pp:pre+I.pp,fs:I.fs?pre+I.fs:undefined}}
IRR.souvenir.pres=IRR.venir.pres.map(x=>'sou'+x);
VERBS.forEach(v=>v.irr=IRR[v.base]||null);
/* the stem with its spelling change, for forms whose ending is silent (je, tu, il, ils) or starts with a or o */
function stemFor(v,soft,beforeAO){
  let s=v.stem;
  if(v.cls!=='er')return s;
  if(beforeAO){if(v.sc==='c')return s.slice(0,-1)+'ç';if(v.sc==='g')return s+'e'}
  if(soft){
    if(v.sc==='e'){const i=s.lastIndexOf('e');return s.slice(0,i)+'è'+s.slice(i+1)}
    if(v.sc==='é'){const i=s.lastIndexOf('é');return s.slice(0,i)+'è'+s.slice(i+1)}
    if(v.sc==='l'||v.sc==='t')return s+s.slice(-1);
    if(v.sc==='y')return s.slice(0,-1)+'i';
  }
  return s;
}
const PRES_END={er:'e es e ons ez ent',ir:'is is it issons issez issent',re:'s s  ons ez ent'};
function presF(v,p){
  const I=v.irr||{};if(I.pres)return I.pres[p];
  const soft=[0,1,2,5].includes(p);let st=stemFor(v,soft&&v.cls==='er',p===3&&v.cls==='er');
  return st+T6(PRES_END[v.cls])[p];
}
function futStem(v){const I=v.irr||{};if(I.fs)return I.fs;
  if(v.cls==='er'&&['e','l','t','y'].includes(v.sc))return stemFor(v,true)+'er';
  return v.cls==='re'?v.base.slice(0,-1):v.base}
const IMPF_END=T6('ais ais ait ions iez aient'),FUT_END=T6('ai as a ons ez ont');
function impfStem(v,p){const I=v.irr||{};if(I.impf)return I.impf;
  if(v.cls==='er'&&[0,1,2,5].includes(p)&&(v.sc==='c'||v.sc==='g'))return stemFor(v,false,true);
  if(v.cls==='er')return v.stem;
  return presF(v,3).replace(/ons$/,'')}
function subjF(v,p){
  const I=v.irr||{};if(I.subj)return I.subj[p];
  const E=T6('e es e ions iez ent')[p];
  if(p===3||p===4){const n=v.cls==='er'?v.stem:presF(v,3).replace(/ons$/,'');return n+E}
  return presF(v,5).replace(/ent$/,'')+E;
}
function ppBase(v){const I=v.irr||{};if(I.pp)return I.pp;return v.cls==='er'?v.stem+'é':v.cls==='ir'?v.stem+'i':v.stem+'u'}
/* past participle agreement: g m|f, k 0|1 */
function ppAgree(pp,g,k){if(pp==='dû')return g==='f'||k?'du'+(g==='f'?'e':'')+(k?'s':''):pp;
  let s=pp;if(g==='f')s+='e';if(k&&!/s$/.test(pp))s+='s';else if(k&&g==='f')s+='s';return s}
function vf(v,t,p){
  switch(t){
    case'pres':return presF(v,p);
    case'impf':return impfStem(v,p)+IMPF_END[p];
    case'fut':return futStem(v)+FUT_END[p];
    case'cond':return futStem(v)+IMPF_END[p];
    case'subj':return subjF(v,p);
    case'imp':{const I=v.irr||{};const i={1:0,3:1,4:2}[p];if(I.imp)return I.imp[i];let f=presF(v,p);if(p===1&&(v.cls==='er'||v.base==='ouvrir'))f=f.replace(/s$/,'');return f}
  }
  return'';
}
const REFL=T6('me te se nous vous se');
const COMPOUND={pc:'pres',pqp:'impf',futant:'fut',condp:'cond',subjp:'subj'};
const SIMPLE=['pres','impf','fut','cond','subj'];
const vforms=v=>{const a=SIMPLE.flatMap(t=>[0,1,2,3,4,5].map(p=>vf(v,t,p)));const pp=ppBase(v);a.push(pp,pp+'e',pp+'s',pp+'es',v.base);return a.filter(Boolean)};
const auxOf=v=>v.etre||v.refl?vb('être'):vb('avoir');
/* the full verb phrase in one string, for conjugation drills */
function vphrase(v,t,p,g='m',k=0){
  if(COMPOUND[t]){const a=auxOf(v),pp=ppBase(v);return vf(a,COMPOUND[t],p)+' '+(a.base==='être'?ppAgree(pp,g,k):pp)}
  if(t==='proche')return vf(vb('aller'),'pres',p)+' '+v.base;
  if(t==='recent')return vf(vb('venir'),'pres',p)+' de '+v.base;
  return vf(v,t,p);
}
const SCV={c:'(-çons)',g:'(-geons)',e:'(è)',é:'(è)',l:'(-lle)',t:'(-tte)',y:'(i)'};
function verbV(v){
  const e=v.e.replace('$P','one’s');let tag='';
  if(v.irr&&v.base!=='envoyer')tag=' (irreg.)';else if(v.sc)tag=' '+SCV[v.sc];
  const extra=v.base==='brosser'?' les dents':'';
  return`${v.inf}${extra}${tag} : to ${v.base==='pouvoir'?'be able to, can':v.base==='devoir'?'have to, must':e}${v.etre||v.refl?' (with être)':''}`;
}

/* ---------- English verb phrases ---------- */
function s3(b){const[w,...r]=b.split(' ');const x=w==='have'?'has':w==='be'?'is':/(s|sh|ch|x|o|z)$/.test(w)?w+'es':/[^aeiou]y$/.test(w)?w.slice(0,-1)+'ies':w+'s';return[x,...r].join(' ')}
const BE=['am','are','is','are','are','are'],WAS=['was','were','was','were','were','were'];
const POSS_E=['my','your','his','our','your','their'];
function fixP(s,ep,g){return s.replace(/\$P/g,ep===2?(g==='f'?'her':'his'):POSS_E[ep])}
/* every acceptable English verb phrase for a tense (first = the model answer). ep: 0 I, 1 you, 2 he/she/it, 3 we, 4 you all, 5 they */
function ev(v,t,ep,neg,g){
  const b=v.e,s=ep===2,be=BE[ep],was=WAS[ep],has=s?'has':'have',dO=s?'does':'do',pp=v.pp,ing=v.ing,P=a=>a.map(x=>fixP(x,ep,g));
  if(v.base==='être')return P(evBe(t,ep,neg));
  const X={
    pres:neg?[`${dO} not ${b}`,`${be} not ${ing}`]:[s?s3(b):b,`${be} ${ing}`,`${dO} ${b}`],
    prog:neg?[`${be} not ${ing}`]:[`${be} ${ing}`,`${be} busy ${ing}`],
    pc:neg?[`did not ${b}`,`${has} not ${pp}`]:[v.past,`${has} ${pp}`,`did ${b}`],
    impf:neg?[`did not use to ${b}`,`used to not ${b}`,`${was} not ${ing}`,`did not ${b}`,`would not ${b}`]:[`used to ${b}`,`${was} ${ing}`,v.past,`would ${b}`],
    fut:neg?[`will not ${b}`,`${be} not going to ${b}`]:[`will ${b}`,`${be} going to ${b}`,`shall ${b}`],
    cond:neg?[`would not ${b}`]:[`would ${b}`],
    pqp:neg?[`had not ${pp}`]:[`had ${pp}`],
    futant:neg?[`will not have ${pp}`]:[`will have ${pp}`],
    condp:neg?[`would not have ${pp}`]:[`would have ${pp}`],
    proche:neg?[`${be} not going to ${b}`,`will not ${b}`]:[`${be} going to ${b}`,`will ${b}`],
    recent:neg?[`${has} not just ${pp}`]:[`${has} just ${pp}`,`just ${v.past}`]
  }[t]||[b];
  return P(X);
}
function evBe(t,ep,neg){
  const be=BE[ep],was=WAS[ep],n=neg?' not':'',has=ep===2?'has':'have';
  return{pres:[be+n],prog:[`${be}${n} being`],pc:[was+n,`${has}${n} been`],impf:[was+n,...(neg?[]:['used to be'])],fut:[`will${n} be`,`${be}${n} going to be`],cond:[`would${n} be`],pqp:[`had${n} been`],futant:[`will${n} have been`],condp:[`would${n} have been`],proche:[`${be}${n} going to be`,`will${n} be`],recent:[`${has}${n} just been`]}[t]||[be+n];
}
/* question order: [helper, rest of verb] */
function evQ(v,t,ep,g){
  const b=v.e,s=ep===2,be=BE[ep],was=WAS[ep],P=a=>a.map(([x,y])=>[x,fixP(y,ep,g)]);
  if(v.base==='être')return{pres:[[be,'']],pc:[[was,'']],impf:[[was,'']],fut:[['will','be']],cond:[['would','be']],pqp:[['had','been']]}[t]||[[be,'']];
  return P({pres:[[s?'does':'do',b],[be,v.ing]],prog:[[be,v.ing]],pc:[['did',b],[s?'has':'have',v.pp]],impf:[['did','use to '+b],[was,v.ing]],fut:[['will',b],[be,'going to '+b]],cond:[['would',b]],pqp:[['had',v.pp]],proche:[[be,'going to '+b],['will',b]],recent:[[s?'has':'have','just '+v.pp]]}[t]||[[s?'does':'do',b]]);
}

/* ---------- nouns ---------- */
/* singular|plural|gender|english|english plural|tags|flags   tags: p person, k family, a animal, w written, o opens, s school, h homework, c building, l outdoor place, f food, d drink, t thing, i instrument, m music, v something to watch, g sport, q problem or question, x story, r vehicle
   flags: S usually singular, M mass noun (takes du / de la), I irregular plural */
const NOUNS=`garçon|garçons|m|boy|boys|p
fille|filles|f|girl|girls|p
homme|hommes|m|man|men|p
femme|femmes|f|woman|women|p
ami|amis|m|friend|friends|p
amie|amies|f|friend (f.)|friends (f.)|p
frère|frères|m|brother|brothers|pk
sœur|sœurs|f|sister|sisters|pk
cousin|cousins|m|cousin|cousins|pk
cousine|cousines|f|cousin (f.)|cousins (f.)|pk
grand-père|grands-pères|m|grandfather|grandfathers|pk|SI
grand-mère|grands-mères|f|grandmother|grandmothers|pk|SI
père|pères|m|father|fathers|pk|S
mère|mères|f|mother|mothers|pk|S
oncle|oncles|m|uncle|uncles|pk
tante|tantes|f|aunt|aunts|pk
professeur|professeurs|m|teacher|teachers|p
élève|élèves|m|student|students|p
voisin|voisins|m|neighbor|neighbors|p
voisine|voisines|f|neighbor (f.)|neighbors (f.)|p
enfant|enfants|m|child|children|p
chien|chiens|m|dog|dogs|a
chat|chats|m|cat|cats|a
oiseau|oiseaux|m|bird|birds|a|I
cheval|chevaux|m|horse|horses|a|I
livre|livres|m|book|books|wo
lettre|lettres|f|letter|letters|w
journal|journaux|m|newspaper|newspapers|w|I
magazine|magazines|m|magazine|magazines|w
histoire|histoires|f|story|stories|xw
leçon|leçons|f|lesson|lessons|sq
examen|examens|m|test|tests|s
devoirs|devoirs|m|homework|homework|h|P
classe|classes|f|class|classes|s
maison|maisons|f|house|houses|c
école|écoles|f|school|schools|c
bibliothèque|bibliothèques|f|library|libraries|c
magasin|magasins|m|store|stores|c
marché|marchés|m|market|markets|c
musée|musées|m|museum|museums|c
restaurant|restaurants|m|restaurant|restaurants|c
cinéma|cinémas|m|movie theater|movie theaters|c
boulangerie|boulangeries|f|bakery|bakeries|c
gare|gares|f|train station|train stations|c
hôpital|hôpitaux|m|hospital|hospitals|c|I
parc|parcs|m|park|parks|l
plage|plages|f|beach|beaches|l
ville|villes|f|city|cities|l
jardin|jardins|m|garden|gardens|l
pomme|pommes|f|apple|apples|f
pain|pains|m|bread|bread|f|SM
fromage|fromages|m|cheese|cheese|f|SM
gâteau|gâteaux|m|cake|cakes|f|I
soupe|soupes|f|soup|soups|f|SM
croissant|croissants|m|croissant|croissants|f
baguette|baguettes|f|baguette|baguettes|f
salade|salades|f|salad|salads|f
eau|eaux|f|water|water|d|SM
lait|laits|m|milk|milk|d|SM
jus|jus|m|juice|juice|d|SM
café|cafés|m|coffee|coffee|d|SM
thé|thés|m|tea|tea|d|SM
table|tables|f|table|tables|t
chaise|chaises|f|chair|chairs|t
sac|sacs|m|bag|bags|tB
stylo|stylos|m|pen|pens|t
ordinateur|ordinateurs|m|computer|computers|t
téléphone|téléphones|m|phone|phones|t
clé|clés|f|key|keys|t
cadeau|cadeaux|m|gift|gifts|t|I
photo|photos|f|photo|photos|t
voiture|voitures|f|car|cars|tr
vélo|vélos|m|bike|bikes|tr
porte|portes|f|door|doors|o
fenêtre|fenêtres|f|window|windows|o
film|films|m|movie|movies|v
match|matchs|m|game|games|vG
chanson|chansons|f|song|songs|m
musique|musiques|f|music|music|m|SM
guitare|guitares|f|guitar|guitars|i
piano|pianos|m|piano|pianos|i
football|footballs|m|soccer|soccer|g|S
tennis|tennis|m|tennis|tennis|g|S
basket|baskets|m|basketball|basketball|g|S
problème|problèmes|m|problem|problems|q
question|questions|f|question|questions|q
réponse|réponses|f|answer|answers|q
carte|cartes|f|map|maps|t
œil|yeux|m|eye|eyes|b|I
travail|travaux|m|job|jobs|j|I
français|français|m|French|French|L|S
anglais|anglais|m|English|English|L|S
espagnol|espagnol|m|Spanish|Spanish|L|S
allemand|allemand|m|German|German|L|S
chinois|chinois|m|Chinese|Chinese|L|S`.split('\n').map(l=>{const[fr,pl,g,e,ep,tag,fl]=l.split('|');return{fr,pl,g,e,ep,tag,sgOnly:(fl||'').includes('S'),mass:(fl||'').includes('M'),irrPl:(fl||'').includes('I'),plOnly:(fl||'').includes('P')}});
const NAMES=`Luc|m
Marie|f
Paul|m
Sophie|f
Thomas|m
Léa|f
Hugo|m
Chloé|f
Antoine|m
Emma|f
Julien|m
Inès|f`.split('\n').map(l=>{const[fr,g]=l.split('|');return{fr,pl:fr,g,e:fr,ep:fr,tag:'pn',name:true,sgOnly:true}});
const PLACES=['Paris','Lyon','Marseille','Montréal','Québec','Bruxelles','Genève','Dakar','Nice','Bordeaux'].map(x=>({fr:x,e:{Montréal:'Montreal','Québec':'Quebec City',Bruxelles:'Brussels','Genève':'Geneva'}[x]||x}));
const ALLN=[...NOUNS,...NAMES];
const nn=x=>ALLN.find(n=>n.fr===x);
const PEOPLE=ALLN.filter(n=>n.tag.includes('p'));
const startsV=w=>VOW.test(w)&&!/^h(é|a|o)ros|^hollande|^haricot/i.test(w);
const nounV=n=>n.name?`${n.fr} : ${n.e}`:`${startsV(n.fr)?'l’':n.g==='m'?'le ':'la '}${n.fr}${startsV(n.fr)?` (${n.g}.)`:''}${n.irrPl||n.pl!==n.fr+'s'&&n.pl!==n.fr?` (pl. ${n.pl})`:''} : ${n.e}`;
const aAn=w=>/^[aeiou]/i.test(w)&&!/^(uni|use|eu)/i.test(w)?'an':'a';

/* ---------- adjectives ---------- */
/* masculine|feminine (or empty for regular)|english|tags|B before the noun|comparative|superlative   irregular forms: m|f|mp|fp|before-vowel m */
const ADJ=`grand||tall|ptclao|B|taller|tallest
petit||short|ptclao|B|shorter|shortest
jeune||young|pa|B|younger|youngest
vieux|vieille|old|ptcwa|B|older|oldest|vieux|vieilles|vieil
beau|belle|beautiful|ptclo|B|more beautiful|most beautiful|beaux|belles|bel
joli||pretty|tclo|B|prettier|prettiest
bon|bonne|good|fwvsp|B|better|best
mauvais||bad|fwvs|B|worse|worst
nouveau|nouvelle|new|tcwior|B|newer|newest|nouveaux|nouvelles|nouvel
gentil|gentille|nice|pa||nicer|nicest
sympathique||nice|p||nicer|nicest
intelligent||smart|pa||smarter|smartest
travailleur|travailleuse|hard-working|p||more hard-working|most hard-working
paresseux|paresseuse|lazy|pa||lazier|laziest|paresseux|paresseuses
drôle||funny|pvx||funnier|funniest
amusant||fun|pvx||more fun|most fun
ennuyeux|ennuyeuse|boring|pvswx||more boring|most boring|ennuyeux|ennuyeuses
sportif|sportive|athletic|p||more athletic|most athletic
heureux|heureuse|happy|p||happier|happiest|heureux|heureuses
content||happy|p||happier|happiest
fatigué||tired|p||more tired|most tired
malade||sick|pa||sicker|sickest
triste||sad|p||sadder|saddest
occupé||busy|p||busier|busiest
nerveux|nerveuse|nervous|p||more nervous|most nervous|nerveux|nerveuses
fâché||angry|p||angrier|angriest
rouge||red|tro||redder|reddest
bleu||blue|tro||bluer|bluest
vert||green|tr||greener|greenest
blanc|blanche|white|tar||whiter|whitest
noir||black|tar||blacker|blackest
gris||gray|ta||grayer|grayest|gris|grises
délicieux|délicieuse|delicious|f||more delicious|most delicious|délicieux|délicieuses
cher|chère|expensive|tfcwr||more expensive|most expensive
intéressant||interesting|wvsx||more interesting|most interesting
difficile||difficult|sq||more difficult|most difficult
facile||easy|sq||easier|easiest
long|longue|long|wvsx|B|longer|longest
important||important|qs||more important|most important`.split('\n').map(l=>{const[m,f0,e,tags,pos,ce,se,mp0,fp0,mv]=l.split('|');
  const f=f0||(/e$/.test(m)?m:m+'e'),mp=mp0||(/[sx]$/.test(m)?m:/eau$/.test(m)?m+'x':m+'s'),fp=fp0||(/s$/.test(f)?f:f+'s');
  return{m,f,mp,fp,mv:mv||m,e,tags,before:pos==='B',ce,se}});
const adjF=(a,g,k,nextV)=>k?(g==='f'?a.fp:a.mp):(g==='f'?a.f:(nextV?a.mv:a.m));
const adjV=a=>(a.m===a.f?a.m:`${a.m}, ${a.f}`)+(a.mv!==a.m?` (${a.mv} before a vowel)`:'')+' : '+a.e;
const adjTok=(a,g,k,cid='adj',both,nextV)=>{const t={la:adjF(a,g,k,nextV),lemma:a.m,cids:[cid],concept:`adjective, ${GN[g]} ${k?'plural':'singular'}${a.before?' (goes before the noun)':''}`,forms:[a.m,a.f,a.mp,a.fp,a.mv],vocab:adjV(a)};if(both&&a.m!==a.f)t.alt=[adjF(a,g==='f'?'m':'f',k,nextV)];return t};
const fitsN=(a,n)=>[...n.tag].some(c=>a.tags.includes(c==='k'||c==='n'?'p':c));
const adjFor=(n,before)=>{const c=ADJ.filter(a=>fitsN(a,n)&&(before==null||a.before===before));return c.length?R(c):null};

/* ---------- determiners and pronouns ---------- */
const POSS=[['mon','ma','mes','my'],['ton','ta','tes','your'],['son','sa','ses','his'],['notre','notre','nos','our'],['votre','votre','vos','your'],['leur','leur','leurs','their']];
const POSS_V={0:'mon, ma, mes : my',1:'ton, ta, tes : your',2:'son, sa, ses : his, her, its',3:'notre, nos : our',4:'votre, vos : your',5:'leur, leurs : their'};
const SUBJS=[
 {fr:'je',en:'I',eo:'me',p:0,ep:0},{fr:'tu',en:'you',eo:'you',p:1,ep:1},
 {fr:'il',en:'he',eo:'him',p:2,ep:2,g:'m'},{fr:'elle',en:'she',eo:'her',p:2,ep:2,g:'f'},
 {fr:'vous',en:'you (formal)',eo:'you (formal)',p:4,ep:1,formal:1,sg:1},
 {fr:'nous',en:'we',eo:'us',p:3,ep:3},{fr:'vous',en:'you all',eo:'you all',p:4,ep:4},
 {fr:'ils',en:'they',eo:'them',p:5,ep:5,g:'m',alt:['elles']},{fr:'elles',en:'they',eo:'them',p:5,ep:5,g:'f',alt:['ils']}];
const SUBJV={'you all':['you all','you',"y'all",'you guys'],'you (formal)':['you (formal)','you']};
const DOP={m:['le','les'],f:['la','les']},IOP=T6('me te lui nous vous leur'),IOE=['me','you','him','us','you all','them'];
const DOPP=T6('me te le nous vous les');
const W=(la,vocab,cids,concept)=>({la,lemma:la,cids:cids||[],concept:concept||'',forms:[],vocab:vocab||null});
const SMALL={'à':'à : to, at, in','dans':'dans : in, inside','de':'de : of, from','avec':'avec : with','ne':'ne … pas : not','pas':'ne … pas : not','que':'que : that, which, than','et':'et : and','si':'si : if','pour':'pour : for, in order to','chez':'chez : at (someone’s) place','en':'en : in, to (a country); some, of it','y':'y : there','mais':'mais : but','quand':'quand : when','ou':'ou : or','où':'où : where'};
const SW=(la,cids)=>W(la,SMALL[la]||null,cids);

/* ---------- elision and contraction (applied to every joined sentence) ----------
   Articles carry an invisible marker (⁠) so that only the article le / les contracts (à le → au, de les → des),
   never the pronoun (je viens de le faire). */
const AM='⁠';
const contract=s=>{
  let x=' '+String(s)+' ';
  x=x.replace(/([\s\u0001\u0002])(je|me|te|se|le|la|ne|de|que|jusque|lorsque|puisque)(⁠?)\s+([\u0001\u0002]*)(?=[aeiouyéèêëàâîïôûùœh])/gi,(m,a,w,am,mk)=>a+w.slice(0,-1)+"'"+am+mk);
  x=x.replace(/([\s\u0001\u0002])(ce)\s+([\u0001\u0002]*)(?=(est|était|étaient|sera)\b)/gi,(m,a,w,mk)=>a+"c'"+mk);
  x=x.replace(/([\s\u0001\u0002])(si)\s+([\u0001\u0002]*)(?=ils?\b)/gi,(m,a,w,mk)=>a+(w[0]==='S'?'S':'s')+"'"+mk);
  x=x.replace(/([\s\u0001\u0002])([àÀ])\s+([\u0001\u0002]*)le⁠(?=\s)/g,(m,a,w,mk)=>a+mk+(w==='À'?'Au':'au'));
  x=x.replace(/([\s\u0001\u0002])([àÀ])\s+([\u0001\u0002]*)les⁠(?=\s)/g,(m,a,w,mk)=>a+mk+(w==='À'?'Aux':'aux'));
  x=x.replace(/([\s\u0001\u0002])([dD])e\s+([\u0001\u0002]*)le⁠(?=\s)/g,(m,a,w,mk)=>a+mk+w+'u');
  x=x.replace(/([\s\u0001\u0002])([dD])e\s+([\u0001\u0002]*)les⁠(?=\s)/g,(m,a,w,mk)=>a+mk+w+'es');
  return x.replace(/⁠/g,'').replace(/\s+/g,' ').trim();
};
const frJoin=ts=>contract(ts.filter(t=>!t.hide).map(t=>t.la+(t.post||'')).join(' '));
const esJoin=frJoin;

/* noun phrase. o: det def|indef|part|poss|demo|none, pp possessor 0-5, pg possessor gender, neg (un/du → de), adj, cid, both (adjective may be either gender) */
function np(n,k,o={}){
  if(n.sgOnly)k=0;if(n.plOnly)k=1;if(o.adj==='auto')o=Object.assign({},o,{adj:adjFor(n,o.adjPos)});
  const g=n.g,toks=[];let det=n.name?'none':(o.det||'def');
  if(det==='indef'&&n.mass)det='part';if(det==='part'&&!n.mass&&!k)det='indef';
  const nounW=k?n.pl:n.fr,a=o.adj||null,nV=startsV(nounW);
  const first=a&&a.before?adjF(a,g,k,nV):nounW,fV=startsV(first);
  const noun={la:nounW,lemma:n.fr,cids:[o.cid||'noun'],concept:`noun, ${GN[g]} ${k?'plural':'singular'}`,forms:[n.fr,n.pl],vocab:nounV(n),n};
  let en=[];const eN=k?n.ep:n.e,ad=a?a.e+' ':'',bare=n.tag==='g';
  if(det==='def'){toks.push({la:(k?'les':g==='m'?'le':'la')+AM,lemma:'le',cids:['art'],concept:`definite article, ${GN[g]} ${k?'plural':'singular'}`,forms:['le','la','les',"l'"],vocab:'le, la, l’, les : the',art:1});en=bare?[ad+eN,'the '+ad+eN]:o.generic?['the '+ad+eN,ad+eN]:['the '+ad+eN]}
  else if(det==='indef'||det==='part'){
    const negDe=o.neg&&!o.keepArt;
    const la=negDe?'de':det==='part'?(k?'des':g==='m'?'de le'+AM:'de la'):(k?'des':g==='m'?'un':'une');
    toks.push({la,lemma:det==='part'?'du':'un',cids:[negDe?'negde':det==='part'?'part':'art'],concept:negDe?'de (un, une, du, des become de after a negative)':det==='part'?'partitive article (some)':`indefinite article, ${GN[g]} ${k?'plural':'singular'}`,forms:['un','une','des','du','de','la',"l'"],vocab:det==='part'?'du, de la, de l’, des : some':'un, une : a, an; des : some',alt:!negDe&&k&&a&&a.before?['de']:null});
    en=negDe?(k||det==='part'?['any '+ad+eN,ad+eN]:[aAn(ad+eN)+' '+ad+eN,'any '+ad+eN]):k||det==='part'?['some '+ad+eN,ad+eN]:[aAn(ad+eN)+' '+ad+eN]}
  else if(det==='poss'){const P=POSS[o.pp];const la=k?P[2]:(g==='f'&&!fV?P[1]:P[0]);
    toks.push({la,lemma:P[0],cids:['poss'],concept:'possessive adjective'+(g==='f'&&fV&&!k&&o.pp<3?' (mon, ton, son before a vowel)':''),forms:P.slice(0,3),vocab:POSS_V[o.pp]});
    const pe=o.pp===2?(o.pg==='f'?'her':'his'):POSS[o.pp][3];
    en=[pe+' '+ad+eN];if(o.pp===2)en.push(...['his','her','its'].filter(x=>x!==pe).map(x=>x+' '+ad+eN));if(o.pp===4)en.push('your '+ad+eN)}
  else if(det==='demo'){const la=k?'ces':g==='f'?'cette':fV?'cet':'ce';
    toks.push({la,lemma:'ce',cids:['demo'],concept:'demonstrative adjective'+(la==='cet'?' (cet before a vowel)':''),forms:['ce','cet','cette','ces'],vocab:'ce, cet, cette, ces : this, that; these, those'});
    en=k?['these '+ad+eN,'those '+ad+eN]:['this '+ad+eN,'that '+ad+eN]}
  else en=[ad+eN];
  if(a&&a.before)toks.push(adjTok(a,g,k,o.adjCid||'adj',o.both,nV));
  toks.push(noun);
  if(a&&!a.before)toks.push(adjTok(a,g,k,o.adjCid||'adj',o.both));
  return{toks,en,g,k,n,p:k?5:2,ep:k?5:2,person:n.tag.includes('p')||n.tag.includes('a'),det,
    dop:DOP[g][k],doE:n.tag.includes('p')?(k?'them':g==='f'?'her':'him'):(k?'them':'it'),eo:en};
}
const num=n=>n.sgOnly?0:n.plOnly?1:(chance(.4)?1:0);
const pick=(arr,ex=[])=>{const c=arr.filter(x=>!ex.includes(x));return c.length?R(c):null};
const tidy=s=>s.replace(/\s+/g,' ').replace(/ ,/g,',').replace(/,+/g,',').replace(/^[, ]+|[, ]+$/g,'').trim();
function cross(...parts){let out=[''];for(const p of parts){const a=Array.isArray(p)?p:[p];out=out.flatMap(x=>a.map(y=>x+' '+y));if(out.length>240)out=out.slice(0,240)}return[...new Set(out.map(tidy))]}
/* a subject: a pronoun (o.ps = which persons are allowed) or a noun phrase */
function subject(o={}){
  const used=o.used||[];
  if(o.kind==='pron'||(o.kind!=='noun'&&chance(o.pron==null?.5:o.pron))){
    let c=SUBJS.filter(s=>(!s.formal||o.formal!==false)&&(!o.ps||o.ps.includes(s.p)));if(!c.length)c=SUBJS.filter(s=>!s.formal);
    const s=R(c),tok={la:s.fr,lemma:s.fr,cids:['subj'],concept:'subject pronoun',forms:[],vocab:s.fr==='vous'?'vous : you (formal, or more than one person)':null,alt:s.alt||null,pron:1};
    const g=s.g||(chance(.5)?'m':'f'),k=s.sg?0:s.p>2?1:0;
    return{toks:[tok],en:SUBJV[s.en]||[s.en],eo:[s.eo],p:s.p,ep:s.ep,g,gKnown:!!s.g,pron:s,k};
  }
  const n=o.n||pick(o.pool||PEOPLE,used);used.push(n);const k=o.k!=null&&!n.sgOnly?o.k:num(n);
  const r=np(n,k,o.np||{});return Object.assign(r,{gKnown:true});
}
/* clitics in French order: me te se nous vous, then le la les, then lui leur, then y, then en */
const CL_RANK={refl:0,io1:0,do:1,io:2,y:3,en:4};
const clTok=(c,role)=>({la:c,lemma:c,cids:[role==='io1'?'io':role],role,concept:{refl:'reflexive pronoun',io:'indirect object pronoun',io1:'indirect object pronoun',do:'direct object pronoun',y:'the pronoun y',en:'the pronoun en'}[role],forms:['me','te','se','nous','vous','le','la','les','lui','leur','y','en'],vocab:{refl:'me, te, se, nous, vous : myself, yourself, himself …',io:'me, te, lui, nous, vous, leur : (to) me, you, him/her …',io1:'me, te, lui, nous, vous, leur : (to) me, you, him/her …',do:'me, te, le, la, nous, vous, les : me, you, him/her/it …',y:'y : there (replaces à + a place or thing)',en:'en : some, of it, of them (replaces de + a noun)'}[role]});
const orderCl=a=>a.slice().sort((x,y)=>CL_RANK[x.role]-CL_RANK[y.role]);
const AUXV={avoir:'avoir : to have (helping verb for most verbs)','être':'être : to be (helping verb for verbs of motion and reflexive verbs)'};
/* the verb and everything that wraps it: ne … pas, the pronouns, a helping verb, a past participle or an infinitive.
   o: neg, cl (clitic tokens), g, k (the subject, for agreement), gKnown, doAg {g,k} (a direct object pronoun before avoir), vcids, noAgree.
   returns {toks, verb (the token that carries the tense), inv(subjToken) → the tokens with the subject inverted} */
function vgroup(v,t,p,o={}){
  const cl=orderCl(o.cl||[]),ne=o.neg?[SW('ne',['neg'])]:[],pas=o.neg?[Object.assign(SW(o.negWord||'pas',['neg']),o.negWord?{vocab:NEGW[o.negWord]}:{})]:[];
  const mk=(la,lemma,extra)=>Object.assign({la,lemma,cids:[...(o.vcids||[]),t],concept:`${PERS[p]}, ${TN[t]}`,forms:vforms(v),vocab:verbV(v),vb:v,t,p},extra||{});
  const joinInv=(tok,s)=>{const f=tok.la,needT=/[ae]$/.test(f)&&/^(il|elle|on)$/.test(s.la);return Object.assign({},tok,{la:f+(needT?'-t-':'-')+s.la,alt:s.alt?s.alt.map(a=>f+(needT?'-t-':'-')+a):null})};
  if(COMPOUND[t]){
    const a=auxOf(v),pp0=ppBase(v),etre=a.base==='être';
    let ag=null;if(etre&&!o.noAgree)ag={g:o.g||'m',k:o.k||0};else if(!etre&&o.doAg)ag=o.doAg;
    const ppla=ag?ppAgree(pp0,ag.g,ag.k):pp0;
    const aux={la:vf(a,COMPOUND[t],p),lemma:a.inf,cids:[etre?(v.refl?'auxRefl':'auxEtre'):'auxAvoir'],concept:`${PERS[p]}, ${TN[COMPOUND[t]]} of ${a.base} (helping verb)`,forms:vforms(a),vocab:AUXV[a.base],aux:1};
    const ppt=mk(ppla,v.inf,{concept:`past participle${ag&&(ag.g==='f'||ag.k)?` (agrees: ${GN[ag.g]} ${ag.k?'plural':'singular'})`:''}, ${TN[t]}`});
    if(ag&&etre&&!o.gKnown&&pp0!==ppAgree(pp0,'f',ag.k))ppt.alt=[ppAgree(pp0,ag.g==='f'?'m':'f',ag.k)];
    return{toks:[...ne,...cl,aux,...pas,ppt],verb:ppt,aux,inv:s=>[...ne,...cl,joinInv(aux,s),...pas,ppt]};
  }
  if(t==='proche'||t==='recent'||t==='prog'){
    const hv=vb(t==='proche'?'aller':t==='recent'?'venir':'être'),h={la:vf(hv,'pres',p),lemma:hv.inf,cids:[t],concept:`${PERS[p]}, present of ${hv.base}`,forms:vforms(hv),vocab:{proche:'aller (+ infinitive) : to be going to',recent:'venir de (+ infinitive) : to have just',prog:'être en train de (+ infinitive) : to be in the middle of'}[t],t,vb:hv,p};
    const link=t==='recent'?[SW('de',[t])]:t==='prog'?[W('en train de','être en train de : to be busy doing',[t])]:[];
    const inf=mk(v.base,v.inf,{concept:'infinitive',cids:[...(o.vcids||[]),'inf']});
    return{toks:[...ne,h,...pas,...link,...cl,inf],verb:h,inv:s=>[...ne,joinInv(h,s),...pas,...link,...cl,inf]};
  }
  const vt=mk(vf(v,t,p),v.inf);
  return{toks:[...ne,...cl,vt,...pas],verb:vt,inv:s=>[...ne,...cl,joinInv(vt,s),...pas]};
}
const NEGW={pas:'ne … pas : not',jamais:'ne … jamais : never',plus:'ne … plus : no longer, not anymore',rien:'ne … rien : nothing',personne:'ne … personne : nobody'};

const TIMEADV={pres:[["aujourd'hui",'today'],['tous les jours','every day'],['le samedi','on Saturdays'],['souvent','often']],prog:[['maintenant','now']],pc:[['hier','yesterday'],['hier soir','last night'],['la semaine dernière','last week']],
  impf:[['tous les jours','every day'],['souvent','often'],['le samedi','on Saturdays'],['toujours','always']],fut:[['demain','tomorrow'],['la semaine prochaine','next week'],["l'année prochaine",'next year']],proche:[['demain','tomorrow'],['ce soir','tonight']],cond:[],pqp:[],recent:[]};
const MENT=[['rapidement','quickly'],['lentement','slowly'],['facilement','easily'],['attentivement','carefully'],['tranquillement','calmly']];
const advTok=(fr,en,cid='adv')=>({la:fr,lemma:fr,cids:[cid],concept:'adverb',forms:[],vocab:`${fr} : ${en}`});
const objFor=v=>[...NOUNS,...NAMES].filter(n=>[...n.tag].some(c=>v.obj.includes(c==='k'||c==='n'?'p':c)));
const MV=VERBS.filter(v=>/M/.test(v.fl)),FROMV=VERBS.filter(v=>/F/.test(v.fl)),SV=VERBS.filter(v=>/S/.test(v.fl)&&!v.refl);
const TV=VERBS.filter(v=>v.fl.includes('T')),DV=VERBS.filter(v=>v.fl.includes('D')&&v.fl.includes('T')),RV=VERBS.filter(v=>v.refl);
const PLACE_IN=()=>NOUNS.filter(n=>/[cl]/.test(n.tag));
const GENERIC=['aimer','préférer'];
const PART_V=['manger','boire','acheter','prendre','vouloir','avoir','commander','préparer','cuisiner','faire','apporter','donner','vendre','essayer'];   // aimer le fromage: the article is "the" in French but often not in English
const IO_FOR=['acheter','préparer','faire'];
const PLACE_FOR={habiter:['maison','ville'],dormir:['maison'],nager:['plage'],courir:['parc','plage'],rester:['maison','école','bibliothèque','parc'],travailler:['magasin','restaurant','école','bibliothèque','musée','marché','boulangerie','hôpital'],'étudier':['bibliothèque','maison','école'],danser:['maison','école','restaurant'],cuisiner:['maison','restaurant'],manger:['restaurant','maison','école','parc','plage'],chanter:['maison','école'],jouer:['parc','maison','école','plage'],parler:['maison','école','restaurant','parc'],vivre:['ville','maison']};
const IN_E={plage:['at','on'],école:['at','in'],maison:['at home','home','in the house','at the house'],cinéma:['at','in'],parc:['in','at'],ville:['in','downtown']};

/* one clause. returns its French pieces and English pieces; stmtOf / question builders put them in order */
function clause(o={}){
  const t=o.t||'pres',used=o.used||[];
  let v=o.v;
  if(!v){let pool=o.pool||TV;if(o.need)pool=pool.filter(x=>[...o.need].every(f=>x.fl.includes(f)));if(o.obj!==false&&!o.pool&&!/[MSF]/.test(o.need||''))pool=pool.filter(x=>x.obj);if(o.vf)pool=pool.filter(o.vf);v=R(pool)}
  const sb=o.subj||subject({used,ps:o.ps,kind:o.sk,pron:o.pron,k:o.k,formal:o.formal,np:o.subjNp,pool:o.subjPool});
  const p=sb.p,ep=sb.ep,neg=!!o.neg,A=[],cl=[];let ioPhrase=null,altA=null,doAg=null,eV=null;
  if(v.refl)cl.push(clTok(REFL[p],'refl'));
  /* direct object */
  let ob=null;
  if(v.obj&&o.obj!==false&&v.fl.includes('T')){
    let pool=objFor(v).filter(n=>!used.includes(n)&&(!o.objTag||[...n.tag].some(c=>o.objTag.includes(c))));
    if(o.objPool){const fo=objFor(v);pool=o.objPool.filter(n=>!used.includes(n)&&fo.includes(n))}
    if(!pool.length)pool=objFor(v);
    const n=o.objN||R(pool);used.push(n);let k=o.ok!=null?o.ok:num(n);
    let det=o.objDet||(n.name?'none':R(['def','def','indef','poss']));
    if(GENERIC.includes(v.base)&&(det==='indef'||det==='part'))det='def';
    if(n.mass&&(det==='indef'||det==='part'))det=PART_V.includes(v.base)?'part':'def';
    const jouer=v.base==='jouer'&&/[gi]/.test(n.tag);
    if(jouer){det='def';k=0}
    ob=np(n,k,Object.assign({det,pp:R([0,1,2,3,5]),pg:R(['m','f']),neg:neg&&!['être'].includes(v.base),generic:GENERIC.includes(v.base)},o.objNp||{}));
    if(v.base==='faire'&&n.fr==='devoirs')eV={e:'do',past:'did',pp:'done',ing:'doing'};
    if(n.tag==='L'){ob=np(n,0,{det:'def'});ob.toks[0]=Object.assign({},ob.toks[0],{opt:v.base==='parler',hide:v.base==='parler'});ob.en=[n.e];A.push(...ob.toks)}
    else if(jouer){A.push(SW(n.tag==='g'?'à':'de',['jouer']),...ob.toks);ob.en=n.tag==='g'?[ob.n.e]:['the '+ob.n.e,ob.n.e]}
    else if(v.fl.includes('A')){ob=np(n,k,{det:R(['def','poss']),pp:R([0,1,3])});A.push(SW('à',['verbA']),...ob.toks)}
    else if((o.dop||o.io==='both')&&!(ob.det!=='def'&&ob.det!=='poss'&&ob.det!=='demo'&&!ob.n.name)){cl.push(clTok(ob.dop,'do'));doAg={g:ob.g,k:ob.k}}
    else A.push(...ob.toks);
  }
  const usedDop=cl.some(c=>c.role==='do');
  /* indirect object */
  if(o.io&&v.fl.includes('D')){
    if(o.io==='noun'){const n=pick(PEOPLE,used);used.push(n);const ik=num(n),inp=np(n,ik,{det:R(['def','poss']),pp:R([0,1,3]),pg:'m'});
      const aTok=Object.assign(SW('à',['io']),{concept:'à before the indirect object'});ioPhrase={toks:[aTok,...inp.toks],en:inp.en}}
    else{const iop=R([0,1,2,3,5].filter(x=>x!==p&&!(x===2&&p===2&&!sb.pron)&&!(v.refl&&x===p)));cl.push(clTok(IOP[iop],iop===2||iop===5?'io':'io1'));ioPhrase={en:[iop===2?R(['him','her']):IOE[iop]]}}
  }
  /* English after-verb pieces */
  let eRest=[];
  const obE=ob?(usedDop?[ob.doE]:ob.en):null;
  if(ioPhrase){
    const pr=IO_FOR.includes(v.base)?'for':'to';
    if(ioPhrase.toks){A.push(...ioPhrase.toks);eRest=obE?(usedDop?cross(obE,pr,ioPhrase.en):[...cross(obE,pr,ioPhrase.en),...cross(ioPhrase.en,obE)]):cross(pr,ioPhrase.en)}
    else eRest=obE?(usedDop?cross(obE,pr,ioPhrase.en):[...cross(ioPhrase.en,obE),...cross(obE,pr,ioPhrase.en)]):[...cross(pr,ioPhrase.en),ioPhrase.en[0]];
  }else if(obE)eRest=obE;
  /* place */
  let plE=null;
  if(o.place){
    const toward=v.fl.includes('M')&&(o.place==='to'||!v.fl.includes('F')),from=v.fl.includes('F')&&!toward;
    const allow=!toward&&!from&&PLACE_FOR[v.base];
    if(chance(.25)&&(toward||from)&&!o.noCity&&!['sortir','entrer','descendre','monter','rentrer'].includes(v.base)){const c=R(PLACES);A.push(SW(toward?'à':'de',['place'+(toward?'a':'de')]),W(c.fr,`${c.fr} : ${c.e}`));plE=cross(toward?(v.base==='arriver'?['in','at']:['to']):['from',...(v.base==='partir'||v.base==='sortir'?['']:[])],c.e)}
    else{
      const n=pick(allow?allow.map(nn):PLACE_IN().filter(x=>x.fr!=='hôpital'||!toward),used)||nn('maison');used.push(n);
      const det=R(['def','def','def','demo']),pn=np(n,0,{det,pp:R([0,1,3])});
      const pr=v.base==='entrer'?'dans':toward?'à':from?'de':'à';
      A.push(SW(pr,['place'+(pr==='à'?'a':pr)]),...pn.toks);
      if(!toward&&!from&&pr==='à'&&/c/.test(n.tag)&&det==='def')altA=[...A.slice(0,-pn.toks.length-1),SW('dans',['placedans']),...pn.toks];
      const ep_=toward?(v.base==='arriver'?['at','in','to']:v.base==='entrer'?['','into']:['to']):from?(v.base==='partir'?['','from']:v.base==='sortir'?['of','from']:['from']):(IN_E[n.fr]||['in','at']);
      plE=n.fr==='maison'&&det==='def'?(toward?['home','to the house']:from?['from home','from the house']:['at home','home','in the house','at the house']):cross(ep_,pn.en);
    }
  }
  if(o.con){const n=pick(PEOPLE,used);used.push(n);const k=num(n),cn=np(n,k,{det:R(['def','poss']),pp:R([0,1,3])});A.push(SW('avec',['avec']),...cn.toks);plE=plE?cross(plE,'with',cn.en):cross('with',cn.en);if(altA)altA.push(SW('avec',['avec']),...cn.toks)}
  if(v.base==='mettre'&&!o.place){const pl=np(nn(R(['table','chaise'])),0,{det:'def'});A.push(SW('sur',['placesur']),...pl.toks);plE=plE?cross(plE,'on',pl.en):cross('on',pl.en)}
  if(v.base==='brosser')A.unshift(W('les dents','les dents : teeth',['refl'],'body part'));
  let advE=null,advT=null;
  if(o.adv){const L=o.adv==='ment'?MENT:(TIMEADV[t]||[]);if(L.length){const[a,e]=R(L);advT=advTok(a,e,o.adv==='ment'?'ment':'adv');advE=e}}
  const vg=vgroup(v,t,p,{neg,cl,g:sb.g,k:sb.k,gKnown:sb.gKnown,doAg:usedDop&&doAg?doAg:null,vcids:o.vcids,noAgree:v.base==='brosser',negWord:o.negWord});
  const vE=eV?Object.assign({},eV,{base:'x'}):v;
  return{v,vE,t,p,ep,g:sb.g,sb,ob,vg,A,altA,advT,advE,eRest:[eRest.length?eRest:'',plE||''],used,neg,cl};
}
/* French statement order and English versions */
function stmtOf(c,o={}){
  const S0=c.sb.toks;
  const mid=c.advT&&/^(souvent|toujours)$/.test(c.advT.la)&&!['proche','recent','prog'].includes(c.t);
  if(mid){const vt=COMPOUND[c.t]?c.vg.toks.slice(0,-1):c.vg.toks,rest=COMPOUND[c.t]?c.vg.toks.slice(-1):[];
    const tokens=[...S0,...vt,c.advT,...rest,...c.A];const alts=[[...S0,...c.vg.toks,...c.A,c.advT]];if(c.altA)alts.push([...S0,...vt,c.advT,...rest,...c.altA]);
    const vp=ev(c.vE,c.t,c.ep,c.neg,c.g);return{tokens,ens:[...cross(c.sb.en,vp,c.eRest[0],c.eRest[1],c.advE),...cross(c.sb.en,c.advE,vp,c.eRest[0],c.eRest[1])],altTokens:alts}}
  const tokens=[...S0,...c.vg.toks,...c.A,...(c.advT?[c.advT]:[])];
  const alts=[];
  if(c.altA)alts.push([...S0,...c.vg.toks,...c.altA,...(c.advT?[c.advT]:[])]);
  if(c.advT){alts.push([c.advT,...S0,...c.vg.toks,...c.A]);if(c.advT.cids[0]==='ment')alts.push([...S0,...c.vg.toks.slice(0,-1),c.advT,c.vg.toks[c.vg.toks.length-1],...c.A])}
  const vp=ev(c.vE,c.t,c.ep,c.neg,c.g).map(x=>c.negWord?x:x);
  const subjE=c.sb.en;
  let ens=cross(subjE,vp,c.eRest[0],c.eRest[1],c.advE||'');
  if(c.advE)ens=[...ens,...cross(c.advE+',',subjE,vp,c.eRest[0],c.eRest[1])];
  return{tokens,ens,altTokens:alts};
}
function S(tokens,ens,end='.',o={}){return Object.assign({tokens,en:ens[0],enAlt:ens.slice(1),end,altTokens:[]},o)}
const st=(c,o)=>{const r=stmtOf(c,o);return S(r.tokens,r.ens,'.',{altTokens:r.altTokens})};
const ACT=VERBS.filter(v=>/[TMFSR]/.test(v.fl)&&!['être','avoir','pouvoir','devoir','falloir','vouloir','savoir','connaître','douter','penser','espérer','souhaiter','croire','se souvenir'].includes(v.inf));
const isRegPres=v=>!v.irr&&!v.sc&&!v.refl;
/* any clause: picks a verb, then adds what that verb needs (a place for verbs of motion and activity) */
function anyC(o={}){
  const pool=(o.pool||ACT).filter(v=>!o.vf||o.vf(v));const v=o.v||R(pool.length?pool:ACT);
  const tr=v.fl.includes('T')&&o.obj!==false;
  const place=o.place!=null?o.place:(!tr&&!v.refl&&/[MFS]/.test(v.fl))||(tr&&v.fl.includes('S')&&chance(.2));
  return clause(Object.assign({},o,{v,place:place&&/[MFS]/.test(v.fl)?(o.place||true):false}));
}
const gC=o=>st(anyC(o),o);
const possO=()=>({det:'poss',pp:R([0,1,2,3,5]),pg:R(['m','f'])}),demoO=()=>({det:'demo'});

/* ---------- être, avoir, il y a ---------- */
const JOBS=[['professeur','professeure','professeurs','professeures','teacher','teachers'],['médecin','médecin','médecins','médecins','doctor','doctors'],['étudiant','étudiante','étudiants','étudiantes','student','students'],['avocat','avocate','avocats','avocates','lawyer','lawyers'],['cuisinier','cuisinière','cuisiniers','cuisinières','cook','cooks'],['infirmier','infirmière','infirmiers','infirmières','nurse','nurses'],['chanteur','chanteuse','chanteurs','chanteuses','singer','singers'],['boulanger','boulangère','boulangers','boulangères','baker','bakers']];
const NUMS=['','une','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze'],NUMSE=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
const NAT=[['français','française','françaises','French'],['canadien','canadienne','canadiennes','Canadian'],['américain','américaine','américaines','American'],['belge','belge','belges','Belgian'],['suisse','suisse','suisses','Swiss'],['sénégalais','sénégalaise','sénégalaises','Senegalese']];
function beTok(t,p,use){const v=vb('être'),g=vgroup(v,t,p,{});g.verb.cids=[use,t];return g.verb}
function predSubj(o={}){return subject(Object.assign({pron:.45,np:{det:R(['def','def','poss','demo']),pp:R([0,1,3])}},o))}
function gEtre(use,t){
  t=t||'pres';use=use||R(['desc','desc','occ','orig','nat','rel','loc']);
  const s=use==='rel'?subject({kind:'noun',pool:NAMES}):predSubj({pool:use==='desc'?ALLN.filter(n=>n.tag&&!/[hg]/.test(n.tag)&&!n.mass):PEOPLE,ps:[0,1,2,3,4,5]});
  const neg=chance(.2),vg=vgroup(vb('être'),t,s.p,{neg});vg.verb.cids=['etre'+use,t];const be=evBe(t,s.ep,neg),A=[];let rest;
  if(use==='desc'){const n=s.n||{tag:'p'},a=adjFor(n)||R(ADJ.filter(x=>x.tags.includes('p')));A.push(adjTok(a,s.g,s.k,'adj',!s.gKnown));rest=a.e}
  else if(use==='occ'){const j=R(JOBS),f=s.g==='f';const jt={la:s.k?j[f?3:2]:j[f?1:0],lemma:j[0],cids:['job'],concept:'noun (no article after être for a job)',forms:j.slice(0,4),vocab:`${j[0]}${j[1]!==j[0]?', '+j[1]:''} : ${j[4]}`};if(!s.gKnown&&j[1]!==j[0])jt.alt=[s.k?j[f?2:3]:j[f?0:1]];A.push(jt);rest=s.k?j[5]:aAn(j[4])+' '+j[4]}
  else if(use==='orig'){const pl=R(PLACES);A.push(SW('de',['orig']),W(pl.fr,`${pl.fr} : ${pl.e}`));rest='from '+pl.e}
  else if(use==='nat'){const x=R(NAT),f=s.g==='f';const la=s.k?(f?x[2]:x[0]+(/s$/.test(x[0])?'':'s')):(f?x[1]:x[0]);const tk={la,lemma:x[0],cids:['adj'],concept:'nationality (no capital letter in French)',forms:[x[0],x[1],x[2]],vocab:`${x[0]}, ${x[1]} : ${x[3]}`};if(!s.gKnown&&x[0]!==x[1])tk.alt=[s.k?(f?x[0]+(/s$/.test(x[0])?'':'s'):x[2]):(f?x[0]:x[1])];A.push(tk);rest=x[3]}
  else if(use==='loc'){const pl=R([...PLACE_IN(),nn('table'),nn('chaise')]),pn=np(pl,0,{det:pl.fr==='maison'?R(['def','poss']):'def',pp:R([0,1,3])}),on=/^(table|chaise)$/.test(pl.fr);
    A.push(SW(on?'sur':'à',['place']),...pn.toks);rest=pl.fr==='maison'&&pn.det==='def'?['at home','home']:cross(on?['on']:(IN_E[pl.fr]||['in','at']),pn.en)}
  else{const fam=R(NOUNS.filter(n=>n.tag==='pk'&&n.g===s.g)),pp=R([0,1,3]),f=np(fam,0,{det:'poss',pp});A.push(...f.toks);rest=f.en}
  return S([...s.toks,...vg.toks,...A],cross(s.en,be,rest))
}
const AVOIR_X=[['faim','hungry'],['soif','thirsty'],['froid','cold'],['chaud','hot'],['sommeil','sleepy'],['peur','afraid','scared'],['raison','right'],['tort','wrong']];
function gAvoir(){
  const r=R([0,0,1,2,2]);
  if(r===0)return gC({v:vb('avoir'),objDet:R(['indef','indef','def','poss']),neg:chance(.3)});
  const s=predSubj({pool:PEOPLE}),neg=chance(.25),vg=vgroup(vb('avoir'),'pres',s.p,{neg});vg.verb.cids=['avoirx','pres'];
  if(r===1){const n=R([8,10,12,15,16,17,40]),w={8:'huit',10:'dix',12:'douze',15:'quinze',16:'seize',17:'dix-sept',40:'quarante'}[n];
    return S([...s.toks,...vg.toks,W(w,`${w} : ${n}`),W('ans','un an : a year (avoir … ans : to be … years old)')],cross(s.en,BE[s.ep]+(neg?' not':''),[`${n} years old`,`${n}`]))}
  const[x,...e]=R(AVOIR_X);return S([...s.toks,...vg.toks,W(x,`avoir ${x} : to be ${e[0]}`)],cross(s.en,BE[s.ep]+(neg?' not':''),e))
}
function gIlya(t='pres'){
  const kind=R(['p','p','t','a']),n=R(kind==='p'?PEOPLE.filter(x=>!x.name&&!x.sgOnly&&!x.tag.includes('k')):kind==='a'?NOUNS.filter(x=>x.tag==='a'):NOUNS.filter(x=>/^[twf]/.test(x.tag)&&!x.sgOnly&&!x.mass)),k=chance(.6)?1:0;
  const pl=kind==='p'?R(NOUNS.filter(x=>/[cl]/.test(x.tag)&&x.fr!=='maison')):kind==='a'?R([nn('parc'),nn('jardin'),nn('maison')]):R([nn('table'),nn('sac'),nn('maison'),nn('magasin')]),pn=np(pl,0,{det:'def'}),neg=chance(.25);
  const ya={la:t==='pres'?'il y a':'il y avait',lemma:'il y a',cids:['ilya'],concept:'there is / there are',forms:['il y a','il y avait','il y a eu'],vocab:'il y a : there is, there are (il y avait: there was, there were)'};
  let toks,e;
  if(k&&!neg){const q=R([2,3,4,5,10]),w=NUMS[q]||'dix';toks=[ya,W(w==='une'?'un':w,`${w} : ${NUMSE[q]}`),{la:n.pl,lemma:n.fr,cids:['noun'],concept:'plural noun',forms:[n.fr,n.pl],vocab:nounV(n)}];e=`${NUMSE[q]} ${n.ep}`}
  else{const a=np(n,k,{det:'indef',neg});toks=[...(neg?[SW('ne',['neg']),{...ya,la:'il y',cids:['ilya']},W('a'),SW('pas',['neg'])]:[ya]),...a.toks];if(neg){toks=[W('il'),SW('ne',['neg']),W('y'),Object.assign(W('a'),{cids:['ilya'],vocab:ya.vocab}),SW('pas',['neg']),...a.toks]}e=a.en[0]}
  const on=/^(table)$/.test(pl.fr),pr=on?'sur':/^(sac|maison|magasin|jardin)$/.test(pl.fr)?'dans':'à';
  const plEn=pl.fr==='maison'?['in the house','at home','at the house']:cross(on?['on']:['in','at'],pn.en);
  return S([...toks,SW(pr,['place']),...pn.toks],cross(`there ${neg?(k?'are not':'is not'):k?(t==='pres'?'are':'were'):(t==='pres'?'is':'was')}`,neg?[e,e.replace(/^(a|an) /,'any ')]:e,plEn))
}

/* ---------- verb + infinitive ---------- */
function modalE(m,t,ep,neg){
  const s=ep===2,be=BE[ep],was=WAS[ep],dO=s?'does':'do',n=neg;
  const T={vouloir:{pres:n?[`${dO} not want to`]:[s?'wants to':'want to'],impf:n?['did not want to']:['wanted to','used to want to'],cond:n?['would not like to']:['would like to','would want to']},
    pouvoir:{pres:n?['cannot',`${be} not able to`]:['can',`${be} able to`],impf:n?['could not',`${was} not able to`]:['could',`${was} able to`],cond:n?['could not','would not be able to']:['could','would be able to']},
    devoir:{pres:n?['must not','should not']:['must',`${s?'has':'have'} to`,'should'],cond:n?['should not']:['should','ought to']},
    aimer:{pres:n?[`${dO} not like to`]:[s?'likes to':'like to',s?'loves to':'love to']},
    'préférer':{pres:n?[`${dO} not prefer to`]:[s?'prefers to':'prefer to','would rather']}};
  return(T[m][t]||T[m].pres);
}
function gModal(o={}){
  const m=R(o.mods||['vouloir','pouvoir','devoir','aimer','préférer']),tense=o.t&&['impf','cond'].includes(o.t)&&modalE(m,o.t,0,false)!==modalE(m,'pres',0,false)?o.t:'pres';
  const c=o.c||anyC(Object.assign({},o.co||{},{t:'pres',pool:(o.co&&o.co.pool)||ACT.filter(v=>v.base!=='aller'||m!=='aller')}));
  const mv=vb(m),neg=c.neg,g=vgroup(mv,tense,c.p,{neg,vcids:['modal']});g.verb.cids=['modal',tense];
  if(m==='devoir')g.verb.vocab='devoir : must, to have to; (conditional) should';if(m==='pouvoir')g.verb.vocab='pouvoir : can, to be able to';
  const inf={la:c.v.base,lemma:c.v.inf,cids:['inf'],concept:'infinitive',forms:[c.v.base],vocab:verbV(c.v)};
  const cl=orderCl(c.cl);
  const tokens=[...c.sb.toks,...g.toks,...cl,inf,...c.A,...(c.advT?[c.advT]:[])];
  const altTokens=c.altA?[[...c.sb.toks,...g.toks,...cl,inf,...c.altA,...(c.advT?[c.advT]:[])]]:[];
  if(c.advT)altTokens.push([c.advT,...c.sb.toks,...g.toks,...cl,inf,...c.A]);
  const base=fixP(c.vE.e,c.ep,c.g);
  let ens=cross(c.sb.en,modalE(m,tense,c.ep,neg),base,c.eRest[0],c.eRest[1],c.advE||'');
  if(m==='aimer'&&!neg)ens.push(...cross(c.sb.en,c.ep===2?'likes':'like',fixP(c.vE.ing,c.ep,c.g),c.eRest[0],c.eRest[1],c.advE||''));
  if(m==='préférer')ens=ens.map(e=>e.replace('would rather '+base.split(' ')[0]+' to',''));
  return S(tokens,ens,'.',{altTokens});
}
function gAller(){return chance(.5)?gC({v:vb('aller'),place:'to',adv:chance(.4)?'time':null}):gC({t:'proche',adv:chance(.4)?'time':null,vcids:['proche']})}

/* ---------- questions: est-ce que, inversion, intonation ---------- */
const invPron=sb=>sb.pron?sb.toks[0]:{la:sb.k?(sb.g==='f'?'elles':'ils'):(sb.g==='f'?'elle':'il'),lemma:'il',cids:['subj'],concept:'subject pronoun (inversion)',forms:[],vocab:null};
const ESTCE=()=>W('est-ce que','est-ce que … : (turns a sentence into a question)',['estceque']);
function gQues(o={}){
  const kind=o.kind||R(['yn','yn','que','qui','ou','quand','pourquoi']);
  const tail=c=>[...c.A,...(c.advT?[c.advT]:[])];
  if(kind==='yn'){const c=o.c||anyC(Object.assign({adv:chance(.2)?'time':null},o.co||{}));
    const plain=[...c.sb.toks,...c.vg.toks,...tail(c)],ec=[ESTCE(),...plain];
    const canInv=!(c.sb.pron&&c.sb.p===0),inv=canInv?(c.sb.pron?[...c.vg.inv(c.sb.toks[0]),...tail(c)]:[...c.sb.toks,...c.vg.inv(invPron(c.sb)),...tail(c)]):null;
    const toks=INV&&inv?inv:ec,alts=[...(toks===ec?[]:[ec]),plain,...(inv&&toks!==inv?[inv]:[])];
    const ens=evQ(c.vE,c.t,c.ep,c.g).flatMap(([h,m])=>cross(c.neg?h+' not':h,c.sb.en,m,c.eRest[0],c.eRest[1],c.advE||''));
    if(c.neg)ens.push(...evQ(c.vE,c.t,c.ep,c.g).flatMap(([h,m])=>cross(h+"n't",c.sb.en,m,c.eRest[0],c.eRest[1],c.advE||'')));
    return S(toks,ens,'?',{altTokens:alts});}
  if(kind==='qui'){const c=anyC(Object.assign({},o.co||{},{subj:{toks:[],en:['who'],p:2,ep:2,g:'m',k:0,gKnown:true}}));const q=W('qui','qui : who?',['qw']);
    return S([q,...c.vg.toks,...tail(c)],cross('who',ev(c.vE,c.t,2,false,c.g),c.eRest[0],c.eRest[1]),'?',{altTokens:[[W('qui est-ce qui'),...c.vg.toks,...tail(c)]]});}
  const qw={que:['que','what','que, qu’est-ce que : what?'],ou:['où','where','où : where?'],quand:['quand','when','quand : when?'],pourquoi:['pourquoi','why','pourquoi : why?']}[kind];
  const co=Object.assign({},o.co||{},{neg:false});
  if(kind==='que')Object.assign(co,{vf:v=>v.fl.includes('T')&&!/p/.test(v.obj)&&!v.fl.includes('A')&&v.base!=='jouer',obj:true,dop:false,io:co.io==='both'?'pron':co.io});
  if(kind==='ou'){co.pool=SV.filter(v=>!v.refl);co.place=false;}
  const c=anyC(co);
  let A=tail(c),rest=[c.eRest[0],c.eRest[1]];
  if(kind==='que'){if(!c.ob||c.ob.n.tag==='L')return gQues(o);A=A.filter(t=>!c.ob.toks.includes(t));rest=[c.eRest[0]===c.ob.en||c.eRest[0]===''?'':'',c.eRest[1]];
    if(c.A.some(t=>t.cids[0]==='io'))return gQues(o)}
  const qtok=W(qw[0],qw[2],['qw']);
  const ec=kind==='que'?[W("qu'est-ce que",qw[2],['qw']),...c.sb.toks,...c.vg.toks,...A]:[qtok,ESTCE(),...c.sb.toks,...c.vg.toks,...A];
  const canInv=!(c.sb.pron&&c.sb.p===0);
  const inv=canInv?(c.sb.pron?[qtok,...c.vg.inv(c.sb.toks[0]),...A]:kind==='que'?null:[qtok,...c.sb.toks,...c.vg.inv(invPron(c.sb)),...A]):null;
  const alts=[];if(inv)alts.push(inv);if(kind!=='que'&&kind!=='pourquoi')alts.push([...c.sb.toks,...c.vg.toks,...A,qtok]);
  const toks=INV&&inv?inv:ec;if(toks===inv)alts.splice(0,1,ec);
  const ens=evQ(c.vE,c.t,c.ep,c.g).flatMap(([h,m])=>cross(qw[1],h,c.sb.en,m,kind==='que'?'':rest[0],rest[1]));
  return S(toks,ens,'?',{altTokens:alts});
}

/* ---------- articles, adjectives ---------- */
function gIrrPl(){
  const n=R(NOUNS.filter(x=>x.irrPl&&!x.sgOnly)),a=adjFor(n);
  const vs=TV.filter(v=>v.obj&&objFor(v).includes(n));
  if(vs.length&&chance(.6))return gC({v:R(vs),objN:n,ok:1,objDet:R(['def','indef','poss']),vcids:[]});
  const s=np(n,1,{det:R(['def','def','demo','poss']),pp:R([0,1,3]),cid:'irrpl'}),neg=chance(.2),vg=vgroup(vb('être'),'pres',5,{neg}),ad=a||ADJ.find(x=>x.m==='beau');
  return S([...s.toks,...vg.toks,adjTok(ad,n.g,1,'adj')],cross(s.en,'are'+(neg?' not':''),ad.e));
}
function gAdj(pos){
  if(chance(.35)&&pos!=='B')return gEtre('desc');
  const ap=pos==='B'?true:undefined,has=n=>!n.name&&!!adjFor(n,ap);
  return chance(.5)?gC({sk:'noun',subjNp:{adj:'auto',adjPos:ap,det:R(['def','indef'])},subjPool:PEOPLE.filter(has),vf:v=>v.fl.includes('T')&&!v.fl.includes('A')}):gC({vf:v=>v.fl.includes('T')&&!v.fl.includes('A')&&v.base!=='jouer'&&objFor(v).some(has),objPool:NOUNS.filter(has),objNp:{adj:'auto',adjPos:ap},objDet:R(['def','indef'])});
}
function gPart(){
  const neg=chance(.3),v=vb(R(['manger','boire','acheter','prendre','vouloir','avoir','commander','préparer']));
  const pool=objFor(v).filter(n=>n.mass||/[fd]/.test(n.tag));
  return gC({v,objPool:pool.length?pool:undefined,objDet:R(['part','part','indef']),neg,t:R(['pres','pres','pc'])});
}

/* ---------- commands (impératif) ---------- */
const TONIC={me:'moi',te:'toi'};
function gCmd(kind,o={}){
  kind=kind||R(['tu','tu','nous','vous']);
  const p={tu:1,nous:3,vous:4}[kind],neg=o.neg!=null?o.neg:chance(.35);
  const c=o.c||anyC(Object.assign({pool:ACT.filter(v=>!['pouvoir','devoir','falloir','vouloir','avoir','être','savoir','se souvenir'].includes(v.inf)),objDet:R(['def','def','indef'])},o.co||{},{neg:false,subj:{toks:[],en:[''],p,ep:kind==='nous'?3:1,g:'m',k:kind==='tu'?0:1,gKnown:false}}));
  const v=c.v;let cl=orderCl(c.cl);
  if(!neg&&!v.refl&&c.ob&&!cl.some(x=>x.role==='do')&&chance(o.dopChance||0)&&['def','poss','demo'].includes(c.ob.det)&&!c.A.some(t=>t.cids[0]==='jouer'||t.cids[0]==='verbA')){cl=orderCl([...cl,clTok(c.ob.dop,'do')]);c.A=c.A.filter(t=>!c.ob.toks.includes(t));c.eRest[0]=c.eRest[0]===c.ob.en?[c.ob.doE]:c.eRest[0]}
  const form=vf(v,'imp',p),cname={tu:'tu',nous:'nous',vous:'vous'}[kind];
  let vt;
  const vtok=(la,extra)=>Object.assign({la,lemma:v.inf,cids:['cmd'+kind],concept:`${neg?'negative ':''}${cname} command (impératif)`,forms:[...vforms(v),vf(v,'imp',1),vf(v,'imp',3),vf(v,'imp',4)],vocab:verbV(v),vb:v,t:'imp',p},extra||{});
  if(neg)vt=[SW('ne',['neg']),...cl,vtok(form),SW('pas',['neg'])];
  else{const aff=[...cl.filter(x=>x.role==='do'),...cl.filter(x=>x.role!=='do')].map(x=>TONIC[x.la]&&(x.role==='refl'||x.role==='io1')?TONIC[x.la]:x.la);
    vt=[vtok(form+aff.map(x=>'-'+x).join(''),{concept:`${cname} command${aff.length?' with the pronoun after it, joined by a hyphen':''} (impératif)`})]}
  let voc=[],vE='';
  if(kind!=='nous'&&chance(o.vocChance==null?.35:o.vocChance)){const who=kind==='tu'?R(NAMES):R([['monsieur','sir'],['madame',"ma'am"],['les enfants','kids'],['mes amis','my friends']]);
    const la=who.fr||who[0];voc=[Object.assign(W(la,who.fr?null:`${who[0]} : ${who[1]}`),{post:','})];vE=(who.e||who[1])+','}
  const base=fixP(c.vE.e,1,'m');
  let ens;
  if(kind==='nous')ens=cross(neg?["let's not",'let us not']:["let's",'let us'],base,c.eRest[0],c.eRest[1]);
  else ens=cross(vE,neg?["don't",'do not']:[''],base,c.eRest[0],c.eRest[1]);
  if(kind==='vous')ens=[ens[0]+' (vous)',...ens];
  return S([...voc,...vt,...c.A],ens,kind==='nous'?'.':'!',{cmdKind:kind,altTokens:kind==='nous'?[[...voc,...vt,...c.A]]:[]});
}

/* ---------- comparisons and superlatives ---------- */
function gComp(){
  const people=chance(.7),pool=people?PEOPLE:NOUNS.filter(x=>/[wfsvtc]/.test(x.tag)&&x.tag!=='h'&&!x.mass);
  const used=[];
  const s=subject({kind:'noun',pool,used,np:{det:R(['def','poss']),pp:R([0,1,3])}}),a=adjFor(s.n)||R(ADJ.filter(x=>x.tags.includes('p'))),s2n=pick(pool.filter(n=>n.tag===s.n.tag||people),used)||pick(pool,used)||R(PEOPLE),s2=np(s2n,s.k&&!s2n.sgOnly?1:0,{det:R(['def','poss']),pp:R([0,1,3])});
  const vg=vgroup(vb('être'),'pres',s.p,{}),be=BE[s.ep],kind=R(a.m==='bon'?['irr','irr','moins']:['plus','plus','moins','aussi']);
  const que=Object.assign(SW('que',['comp']),{vocab:'que : than, as'});
  if(kind==='irr'){const f=adjF({m:'meilleur',f:'meilleure',mp:'meilleurs',fp:'meilleures',mv:'meilleur'},s.g,s.k);return S([...s.toks,...vg.toks,{la:f,lemma:'meilleur',cids:['comp'],concept:'irregular comparative (bon → meilleur)',forms:['meilleur','meilleure','meilleurs','meilleures'],vocab:'bon, bonne : good (meilleur: better)'},que,...s2.toks],cross(s.en,be,'better than',s2.en))}
  const w={plus:['plus','plus … que : more … than'],moins:['moins','moins … que : less … than'],aussi:['aussi','aussi … que : as … as']}[kind];
  const aE=kind==='plus'?a.ce:kind==='moins'?'less '+a.e:'as '+a.e,link=kind==='aussi'?'as':'than';
  const alt=kind==='plus'&&!/^more /.test(a.ce)?['more '+a.e]:[];
  return S([...s.toks,...vg.toks,W(w[0],w[1],['comp']),adjTok(a,s.g,s.k,'adj'),que,...s2.toks],cross(s.en,be,[aE,...alt],link,s2.en));
}
const SUP_IN=[['de la classe','in the class'],["de l'école",'in the school'],['de la famille','in the family'],['de la ville','in the city']];
function gSup(){
  const n=R(PEOPLE.filter(x=>!x.name&&!x.tag.includes('k'))),k=num(n),a=adjFor(n)||R(ADJ.filter(x=>x.tags.includes('p'))),s=subject({kind:'noun',pool:NAMES.filter(x=>x.g===n.g),k:0});
  const neg=false,g=n.g,art=(k?'les':g==='f'?'la':'le')+AM,pl=k?'les':s.n.g==='f'?'la':'le';
  const subj=k?{toks:[W(n.g==='f'?R(['Marie et Léa','Sophie et Chloé']):R(['Luc et Paul','Hugo et Thomas']))],p:5,ep:5,en:['they']}:s;
  if(k)subj.en=[subj.toks[0].la.replace(' et ',' and ')];
  const g2=k&&subj.toks[0].la==='Marie et Léa'?'f':g,nounT={la:k?n.pl:n.fr,lemma:n.fr,cids:['noun'],concept:'noun',forms:[n.fr,n.pl],vocab:nounV(n)};
  const vg=vgroup(vb('être'),'pres',subj.p,{}),[ph,phE]=R(SUP_IN);
  const artT={la:art,lemma:'le',cids:['sup'],concept:'definite article in a superlative',forms:['le','la','les'],vocab:'le plus … : the most …',art:1},plus={la:'plus',lemma:'plus',cids:['sup'],concept:'superlative',forms:[],vocab:'le / la / les plus … : the most …'};
  const at=adjTok(a,g,k,'adj');
  const toks=a.before?[...subj.toks,...vg.toks,artT,plus,adjTok(a,g,k,'adj',false,startsV(nounT.la)),nounT,W(ph)]:[...subj.toks,...vg.toks,artT,nounT,Object.assign({},artT),plus,at,W(ph)];
  return S(toks,cross(subj.en,k?'are':'is','the',a.se,k?n.ep:n.e,phE));
}

/* ---------- y and en ---------- */
function gYen(ty){
  ty=ty||R(['yPlace','yPlace','yThing','enSome','enSome','enNum','enDe']);
  const t=R(['pres','pres','pc','proche']);
  if(ty==='yPlace'){const c=clause({v:vb(R(['aller','aller','arriver','retourner','rester','travailler','habiter'])),place:'to',t,noCity:true});
    const A=c.A.filter(x=>!/^place/.test(x.cids[0])&&!(c.A.indexOf(x)>0&&c.A[0].cids[0].startsWith('place')&&x!==c.A[0]));
    const i=c.A.findIndex(x=>/^place/.test(x.cids[0]));if(i<0)return gYen(ty);
    const kept=c.A.slice(0,i);const y=clTok('y','y');y.cids=['yPlace'];
    const vg=vgroup(c.v,t,c.p,{neg:chance(.2),cl:[...c.cl,y],g:c.g,k:c.sb.k,gKnown:c.sb.gKnown});
    return S([...c.sb.toks,...vg.toks,...kept],cross(c.sb.en,ev(c.v,t,c.ep,vg.toks[0].la==='ne',c.g),'there'))}
  if(ty==='yThing'){const s=subject({pron:.7}),v=vb('répondre'),n=R(NOUNS.filter(x=>x.tag==='q'&&x.fr!=='réponse')),k=num(n);const y=clTok('y','y');y.cids=['yThing'];
    const vg=vgroup(v,t,s.p,{cl:[y],g:s.g,k:s.k});return S([...s.toks,...vg.toks],cross(s.en,ev(v,t,s.ep,false,s.g),'it',...(k?[]:[])).concat(cross(s.en,ev(v,t,s.ep,false,s.g),k?'them':'it')))}
  if(ty==='enDe'){const c=clause({v:vb(R(['venir','revenir','sortir','partir'])),place:'from',t,noCity:true});const i=c.A.findIndex(x=>/^place/.test(x.cids[0]));if(i<0)return gYen(ty);
    const en=clTok('en','en');en.cids=['enDe'];const vg=vgroup(c.v,t,c.p,{cl:[...c.cl,en],g:c.g,k:c.sb.k,gKnown:c.sb.gKnown});
    return S([...c.sb.toks,...vg.toks],cross(c.sb.en,ev(c.v,t,c.ep,false,c.g),['from there','']))}
  const v=vb(R(['manger','boire','acheter','prendre','vouloir','avoir','commander']));
  const c=clause({v,objPool:objFor(v).filter(n=>n.mass||/[fd]/.test(n.tag)),objDet:ty==='enNum'?'indef':'part',t:ty==='enNum'?'pres':t,ok:ty==='enNum'?1:undefined});
  if(!c.ob)return gYen(ty);
  const en=clTok('en','en');en.cids=[ty];
  if(ty==='enNum'){const q=R([2,3,4,5]),w=NUMS[q];const vg=vgroup(v,'pres',c.p,{cl:[en]});
    return S([...c.sb.toks,...vg.toks,W(w,`${w} : ${NUMSE[q]}`)],cross(c.sb.en,ev(v,'pres',c.ep,false,c.g),NUMSE[q],['','of them']))}
  const neg=chance(.25),vg=vgroup(v,t,c.p,{neg,cl:[en],g:c.g,k:c.sb.k});
  return S([...c.sb.toks,...vg.toks],cross(c.sb.en,ev(v,t,c.ep,neg,c.g),neg?['any','any of it','any of them']:['some','some of it','some of them']));
}

/* ---------- other negatives: jamais, plus, rien, personne ---------- */
function gNegX(word){
  word=word||R(['jamais','plus','rien','personne']);const t=R(['pres','pres','pc']);
  const s=subject({pron:.6});
  const negE=(v,ep)=>{const sg=ep===2,b=v.e,dO=sg?'does':'do',has=sg?'has':'have';
    if(word==='jamais')return t==='pres'?[`never ${sg?s3(b):b}`,`${dO} not ever ${b}`]:[`never ${v.past}`,`${has} never ${v.pp}`,`did not ever ${b}`];
    if(word==='plus')return t==='pres'?[`no longer ${sg?s3(b):b}`,`${dO} not ${b} anymore`,`${dO} not ${b} any more`]:[`no longer ${v.past}`,`did not ${b} anymore`];
    return null};
  if(word==='rien'||word==='personne'){
    const pool=TV.filter(x=>!x.refl&&(word==='rien'?/[tfwdv]/.test(x.obj):/p/.test(x.obj))&&!x.fl.includes('A')&&!['avoir','jouer','parler','apprendre','savoir','connaître'].includes(x.base));const v=R(pool);
    const vg=vgroup(v,t,s.p,{neg:true,negWord:word==='rien'?'rien':'pas'});
    let toks=vg.toks;
    if(word==='personne'){const pas=toks.findIndex(x=>x.la==='pas');toks=toks.filter((x,i)=>i!==pas);toks.push(Object.assign(SW('personne',['negx']),{vocab:NEGW.personne}))}
    else toks.find(x=>x.la==='rien').cids=['negx'];
    const obj=word==='rien'?['nothing','anything']:['nobody','anybody','anyone','no one'];
    const sg=s.ep===2,dO=sg?'does':'do';
    const pos=ev(v,t,s.ep,false,s.g)[0],negs=t==='pres'?`${dO} not ${v.e}`:`did not ${v.e}`;
    return S([...s.toks,...toks],[...cross(s.en,pos,obj[0]),...cross(s.en,negs,obj.slice(1)),...(t==='pc'?cross(s.en,`${sg?'has':'have'} not ${v.pp}`,obj.slice(1)):[])]);
  }
  const c=anyC({subj:s,neg:true,negWord:word,t,pool:ACT.filter(v=>!v.refl)});c.vg.toks.find(x=>x.la===word).cids=['negx'];
  const sg=c.ep===2,b=fixP(c.vE.e,c.ep,c.g),dO=sg?'does':'do',has=sg?'has':'have';let ens;
  if(word==='plus')ens=t==='pres'?[...cross(c.sb.en,'no longer',sg?s3(b):b,c.eRest[0],c.eRest[1]),...cross(c.sb.en,`${dO} not`,b,c.eRest[0],c.eRest[1],['anymore','any more'])]:[...cross(c.sb.en,'no longer',c.vE.past,c.eRest[0],c.eRest[1]),...cross(c.sb.en,'did not',b,c.eRest[0],c.eRest[1],'anymore')];
  else ens=cross(c.sb.en,negE(c.vE,c.ep),c.eRest[0],c.eRest[1]);
  return S([...c.sb.toks,...c.vg.toks,...c.A],ens);
}

/* ---------- passé composé vs imparfait ---------- */
function gPcImp(use){
  use=use||R(['int','int','hab','desc','seq']);
  if(use==='seq'){const used=[],s=subject({used,pron:.4}),vs=[];const pool=ACT.filter(v=>!v.refl&&!v.fl.includes('A'));
    const cs=[0,1,2].map(i=>{const c=anyC({subj:s,used,t:'pc',vcids:['pcSeq'],vf:v=>!vs.includes(v.base)&&pool.includes(v)});vs.push(c.v.base);return c});
    const first=[...s.toks,...cs[0].vg.toks,...cs[0].A];first[first.length-1]=Object.assign({},first[first.length-1],{post:','});
    const tail=[...cs[1].vg.toks,...cs[1].A,SW('et'),...cs[2].vg.toks,...cs[2].A];
    const e=cs.map(c=>cross(ev(c.vE,'pc',c.ep,false,c.g)[0],c.eRest[0],c.eRest[1]));
    return S([...first,...tail],cross(s.en,e[0].map(x=>x+','),e[1],'and',e[2]).concat(cross(s.en,e[0],e[1].map(x=>x+','),'and',e[2])));}
  if(use==='hab'){const used=[],c1=anyC({used,t:'impf',vcids:['impHab'],vf:v=>v.fl.includes('T')&&!v.fl.includes('A')}),c2=clause({used,v:c1.v,t:'pc',vcids:['pcDone'],subj:c1.sb,objN:c1.ob?c1.ob.n:undefined,ok:c1.ob?c1.ob.k:undefined,objDet:c1.ob?c1.ob.det:undefined});
    const td=Object.assign(advTok('tous les jours','every day'),{post:','}),hi=advTok('hier','yesterday');
    const toks=[td,...c1.sb.toks,...c1.vg.toks,...c1.A],last=toks.length-1;toks[last]=Object.assign({},toks[last],{post:','});
    const e1=cross(c1.sb.en,['used to '+fixP(c1.vE.e,c1.ep,c1.g),c1.vE.past,'would '+fixP(c1.vE.e,c1.ep,c1.g)],c1.eRest[0]);
    const e2=cross(c1.sb.en,c1.vE.past,c2.eRest[0]);
    return S([...toks,W('mais','mais : but'),hi,...c2.sb.toks,...c2.vg.toks,...c2.A],cross('every day,',e1.map(x=>x+','),'but yesterday',e2).concat(cross(e1,'every day, but yesterday',e2)));}
  const used=[];let toks1,e1;
  if(use==='desc'){const r=R(['h','h','m']);
    if(r==='h'){const h=R([2,3,4,5,6,7,8,9,10]),vg=vgroup(vb('être'),'impf',2,{});vg.verb.cids=['impDesc','impf'];toks1=[W('il'),...vg.toks,W(NUMS[h],`${NUMS[h]} : ${NUMSE[h]}`),W('heures','une heure : an hour; il est … heures : it is … o’clock')];e1=[`it was ${NUMSE[h]} o'clock`,`it was ${NUMSE[h]}`]}
    else{const s=subject({pron:.5}),a=R(ADJ.filter(x=>x.tags.includes('p')&&!x.before)),vg=vgroup(vb('être'),'impf',s.p,{});vg.verb.cids=['impDesc','impf'];toks1=[...s.toks,...vg.toks,adjTok(a,s.g,s.k,'adj',!s.gKnown)];e1=cross(s.en,WAS[s.ep],a.e)}}
  else{const c1=anyC({used,t:'impf',vcids:['impBg'],vf:v=>!v.refl});toks1=[...c1.sb.toks,...c1.vg.toks,...c1.A];e1=cross(c1.sb.en,`${WAS[c1.ep]} ${fixP(c1.vE.ing,c1.ep,c1.g)}`,c1.eRest[0],c1.eRest[1])}
  const c2=anyC({used,t:'pc',vcids:['pcInt'],sk:'noun',vf:v=>/[MF]/.test(v.fl)&&!v.refl,place:true});
  const e2=cross(c2.sb.en,ev(c2.vE,'pc',c2.ep,false,c2.g)[0],c2.eRest[0],c2.eRest[1]);
  return S([...toks1,W('quand','quand : when'),...c2.sb.toks,...c2.vg.toks,...c2.A],cross(e1,'when',e2));
}

/* ---------- the subjunctive ---------- */
const EVv=(e,past,pp,ing)=>({e,past,pp,ing,base:'x'});
const IMPERS=[['important','important'],['nécessaire','necessary'],['essentiel','essential'],['possible','possible']];
const EMO=[['content','happy','glad'],['heureux','happy','glad'],['triste','sad'],['surpris','surprised']];
const CONJ=[['pour que','so that','pour que : so that (+ subjunctive)'],['avant que','before','avant que : before (+ subjunctive)'],['bien que','although','bien que : although (+ subjunctive)'],['à moins que','unless','à moins que : unless (+ subjunctive)']];
function subParts(c,perf,past){ // English for the clause in the subjunctive
  if(past)return cross(c.sb.en,[ev(c.vE,'pc',c.ep,false,c.g)[0],'would '+fixP(c.vE.e,c.ep,c.g),`${WAS[c.ep]} ${fixP(c.vE.ing,c.ep,c.g)}`],c.eRest[0],c.eRest[1]);
  if(perf)return cross(c.sb.en,[...ev(c.vE,'pc',c.ep,false,c.g).slice(0,2)],c.eRest[0],c.eRest[1]);
  return cross(c.sb.en,ev(c.vE,'pres',c.ep,false,c.g).slice(0,2).concat(['will '+fixP(c.vE.e,c.ep,c.g)]),c.eRest[0],c.eRest[1]);
}
function gSubj(kind,o={}){
  kind=kind||R(['W','N','E','D']);const perf=!!o.perf,mt=o.past?'impf':'pres';
  const used=[],s1=subject({used,pron:.8,ps:[0,1,2,3,4,5],formal:false});
  const ps2=[0,1,2,3,4,5].filter(x=>x!==s1.p&&!(s1.p===2&&x===2&&s1.pron&&false));
  const c=anyC({used,t:perf?'subjp':'subj',ps:ps2,pron:.65,vcids:[{W:'sjW',N:'sjN',E:'sjE',D:'sjD',C:'sjC'}[kind]],pool:ACT.filter(v=>!['aller'].includes(v.base)||kind!=='W')});
  if(c.sb.pron&&c.sb.p===s1.p&&kind!=='N')return gSubj(kind,o);
  const que=Object.assign(SW('que',['que']),{vocab:'que : that'}),body=[...c.sb.toks,...c.vg.toks,...c.A];
  const sub=subParts(c,perf,o.past);let toks,ens;
  if(kind==='W'){const mv=vb(R(['vouloir','vouloir','préférer','souhaiter'])),g=vgroup(mv,mt,s1.p,{});
    toks=[...s1.toks,...g.toks,que,...body];
    const ve={vouloir:mt==='pres'?['want','wants']:['wanted','wanted'],'préférer':mt==='pres'?['prefer','prefers']:['preferred','preferred'],souhaiter:mt==='pres'?['wish','wishes']:['wished','wished']}[mv.base];
    const vv=s1.ep===2?ve[1]:ve[0],obj=c.sb.pron?[c.sb.pron.eo]:c.sb.en,inf=fixP(c.vE.e,c.ep,c.g);
    ens=mv.base==='vouloir'?cross(s1.en,vv,obj,'to',inf,c.eRest[0],c.eRest[1]):cross(s1.en,vv,['that',''],sub);
    if(mv.base!=='vouloir')ens.push(...cross(s1.en,vv,'for',obj,'to',inf,c.eRest[0],c.eRest[1]))}
  else if(kind==='N'){const imp=chance(.5);
    if(imp){toks=[W('il'),W(mt==='pres'?'faut':'fallait','il faut que : it is necessary that, (someone) has to'),que,...body];const must=c.ep===2?['has to','must','needs to']:['have to','must','need to'];
      ens=[...cross(c.sb.en,mt==='pres'?must:['had to','needed to'],fixP(c.vE.e,c.ep,c.g),c.eRest[0],c.eRest[1]),...cross(mt==='pres'?'it is necessary':'it was necessary',['that',''],sub)]}
    else{const[x,e]=R(IMPERS),g=vgroup(vb('être'),mt,2,{});toks=[W('il'),...g.toks,W(x,`${x} : ${e}`),que,...body];
      const is=mt==='pres'?'it is':'it was',obj=c.sb.pron?[c.sb.pron.eo]:c.sb.en;ens=[...cross(is,e,['that',''],sub),...cross(is,e,'for',obj,'to',fixP(c.vE.e,c.ep,c.g),c.eRest[0],c.eRest[1])]}}
  else if(kind==='E'){const[x,...e]=R(EMO),a=ADJ.find(z=>z.m===x)||{m:x,f:x+'e',mp:x+(/s$/.test(x)?'':'s'),fp:x+'es',mv:x,e:e[0],tags:'p'},g=vgroup(vb('être'),mt,s1.p,{});
    toks=[...s1.toks,...g.toks,adjTok(a,s1.g,s1.k,'adj',!s1.gKnown),que,...body];ens=cross(s1.en,mt==='pres'?BE[s1.ep]:WAS[s1.ep],e,['that',''],sub)}
  else if(kind==='D'){const doubt=chance(.5);
    if(doubt){const g=vgroup(vb('douter'),mt,s1.p,{});toks=[...s1.toks,...g.toks,que,...body];ens=cross(s1.en,mt==='pres'?(s1.ep===2?'doubts':'doubt'):'doubted',['that',''],sub)}
    else{const v=vb(R(['penser','croire'])),g=vgroup(v,mt,s1.p,{neg:true});toks=[...s1.toks,...g.toks,que,...body];
      ens=cross(s1.en,mt==='pres'?(s1.ep===2?'does not':'do not'):'did not',v.base==='penser'?'think':['believe','think'],['that',''],sub)}}
  else{const c1=anyC({used,t:'pres',subj:s1,pool:ACT.filter(v=>!v.refl)}),[x,e,voc]=R(CONJ),cj=W(x,voc,['sjC']);
    toks=[...c1.sb.toks,...c1.vg.toks,...c1.A,cj,...body];ens=cross(c1.sb.en,ev(c1.vE,'pres',c1.ep,false,c1.g).slice(0,2),c1.eRest[0],c1.eRest[1],e,sub);
    c.vg.verb.cids=['sjC',c.t];}
  return S(toks,ens);
}

/* ---------- si clauses ---------- */
function gSi(kind){
  kind=kind||'hyp';const used=[];
  const T={open:['pres','fut'],hyp:['impf','cond'],past:['pqp','condp']}[kind];
  const c1=anyC({used,t:T[0],pool:ACT.filter(v=>!v.refl),vcids:['si1']}),c2=anyC({used,t:T[1],pool:ACT.filter(v=>!v.refl),vcids:['si2'],pron:.6});
  const si=Object.assign(SW('si',['si']),{vocab:'si : if (s’il, s’ils before il, ils)'});
  const ifE=kind==='open'?ev(c1.vE,'pres',c1.ep,false,c1.g).slice(0,1):kind==='hyp'?[c1.v.base==='être'?'were':c1.vE.past]:['had '+c1.vE.pp];
  const thenE=kind==='open'?['will '+fixP(c2.vE.e,c2.ep,c2.g)]:kind==='hyp'?['would '+fixP(c2.vE.e,c2.ep,c2.g)]:['would have '+c2.vE.pp];
  const a=cross('if',c1.sb.en,ifE.map(x=>fixP(x,c1.ep,c1.g)),c1.eRest[0],c1.eRest[1]),b=cross(c2.sb.en,thenE,c2.eRest[0],c2.eRest[1]);
  const p1=[si,...c1.sb.toks,...c1.vg.toks,...c1.A],p2=[...c2.sb.toks,...c2.vg.toks,...c2.A];
  p1[p1.length-1]=Object.assign({},p1[p1.length-1],{post:','});
  return S([...p1,...p2],[...a.flatMap(x=>b.map(y=>x+', '+y)),...a.flatMap(x=>b.map(y=>x+' '+y)),...b.flatMap(y=>a.map(x=>y+' '+x))].slice(0,400),'.',{altTokens:[[...p2,si,...c1.sb.toks,...c1.vg.toks,...c1.A]]});
}

/* ---------- relative pronouns ---------- */
function gRel(){
  const kind=R(['qui','qui','que','où','dont']);
  if(kind==='qui'){const s=subject({pron:.7}),n=R(PEOPLE.filter(x=>!x.name)),k=num(n),o=np(n,k,{det:R(['def','indef'])}),v=vb(R(['connaître','voir','chercher','aimer','attendre']));
    const g=vgroup(v,'pres',s.p,{}),c=anyC({subj:{toks:[],en:[''],p:k?5:2,ep:k?5:2,g:n.g,k,gKnown:true},pool:ACT.filter(x=>!x.refl&&x.base!==v.base)});
    const q=W('qui','qui : who, that, which (subject)',['relqui']);
    return S([...s.toks,...g.toks,...o.toks,q,...c.vg.toks,...c.A],cross(s.en,ev(v,'pres',s.ep,false,s.g).slice(0,2),o.en,['who','that'],ev(c.vE,'pres',k?5:2,false,n.g).slice(0,2),c.eRest[0],c.eRest[1]))}
  if(kind==='où'){const n=R(NOUNS.filter(x=>/[cl]/.test(x.tag))),o=np(n,0,{det:'def'}),s=subject({pron:.8}),v=vb(R(['habiter','travailler','manger','étudier']));
    const g=vgroup(v,'pres',s.p,{}),a=R(ADJ.filter(x=>fitsN(x,n)&&!x.before))||ADJ.find(x=>x.m==='intéressant'),be=vgroup(vb('être'),'pres',2,{});
    return S([...o.toks,W('où','où : where (also: in which)',['relou']),...s.toks,...g.toks,...be.toks,adjTok(a,n.g,0,'adj')],cross(o.en,['where','in which'],s.en,ev(v,'pres',s.ep,false,s.g).slice(0,1),'is',a.e))}
  if(kind==='dont'){const n=R(NOUNS.filter(x=>/[wvmxq]/.test(x.tag)&&!x.sgOnly)),o=np(n,0,{det:'def'}),s=subject({pron:.8}),v=vb('parler'),g=vgroup(v,'pres',s.p,{});
    const a=R(ADJ.filter(x=>fitsN(x,n)&&!x.before))||ADJ.find(x=>x.m==='intéressant'),be=vgroup(vb('être'),'pres',2,{});
    return S([...o.toks,W('dont','dont : of which, about which, whose',['reldont']),...s.toks,...g.toks,...be.toks,adjTok(a,n.g,0,'adj')],cross(o.en,['that','which',''],s.en,[ev(v,'pres',s.ep,false,s.g)[0]+' about',ev(v,'pres',s.ep,false,s.g)[1]+' about'],'is',a.e))}
  const v=vb(R(['lire','acheter','préparer','regarder','écouter','manger','choisir'])),n=R(objFor(v).filter(x=>!x.name&&!x.mass&&!x.tag.includes('p'))),o=np(n,0,{det:'def'}),s=subject({pron:.8});
  const g=vgroup(v,'pres',s.p,{}),a=R(ADJ.filter(x=>fitsN(x,n)&&!x.before))||ADJ.find(x=>x.m==='intéressant'),be=vgroup(vb('être'),'pres',2,{});
  return S([...o.toks,W('que','que : that, which, whom (object)',['relque']),...s.toks,...g.toks,...be.toks,adjTok(a,n.g,0,'adj')],cross(o.en,['that','which',''],s.en,ev(v,'pres',s.ep,false,s.g).slice(0,2),'is',a.e))
}

/* ---------- passive voice, reported speech, conjugation drills ---------- */
function gPass(){
  const v=vb(R(['préparer','écrire','acheter','vendre','choisir','envoyer','faire','trouver','lire'])),n=R(objFor(v).filter(x=>!x.name&&!x.tag.includes('p')&&!x.mass)),k=num(n),s=np(n,k,{det:R(['def','def','poss','demo']),pp:R([0,1,3])});
  const t=R(['pres','pc']),by=R(PEOPLE),bk=num(by),b=np(by,bk,{det:R(['def','poss']),pp:R([0,1,3])}),pp=ppAgree(ppBase(v),n.g,k);
  const be=vgroup(vb('être'),t,k?5:2,{});be.verb.cids=['pass',t];
  return S([...s.toks,...be.toks,{la:pp,lemma:v.inf,cids:['pass'],concept:`past participle (agrees with the subject: ${GN[n.g]} ${k?'plural':'singular'})`,forms:vforms(v),vocab:verbV(v)},W('par','par : by'),...b.toks],cross(s.en,t==='pres'?(k?'are':'is'):(k?['were','have been']:['was','has been']),v.pp,'by',b.en))
}
function gReported(){
  const t=R(['impf','cond','pqp']),from={impf:'pres',cond:'fut',pqp:'pc'}[t],s=subject({kind:'noun',pool:PEOPLE}),c=anyC({t,pron:1,ps:[s.k?5:2]});
  const g=vgroup(vb('dire'),'pc',s.p,{});
  const f={impf:[`${WAS[c.ep]} ${fixP(c.vE.ing,c.ep,c.g)}`,fixP(c.vE.past,c.ep,c.g)],cond:['would '+fixP(c.vE.e,c.ep,c.g)],pqp:['had '+c.vE.pp]}[t];
  return S([...s.toks,...g.toks,Object.assign(SW('que',['reported']),{vocab:'que : that'}),...c.sb.toks,...c.vg.toks,...c.A],cross(s.en,'said',['that',''],c.sb.en,f,c.eRest[0],c.eRest[1]));
}
const FORM_V=()=>VERBS.filter(v=>!['falloir','douter','souhaiter','penser','espérer'].includes(v.base));
function gForm(tenses){
  const v=R(FORM_V()),t=R(tenses),p=R([0,1,2,3,4,5]),g=R(['m','f']);
  const la=contract((v.refl?REFL[p]+' ':'')+vphrase(v,t,p,g,p>2?1:0));
  const tok={la,lemma:v.inf,cids:['form',t],concept:`${PERS[p]}, ${TN[t]}`,forms:vforms(v),vocab:verbV(v),vb:v,t,p};
  if(COMPOUND[t]&&(v.etre||v.refl))tok.alt=[contract((v.refl?REFL[p]+' ':'')+vphrase(v,t,p,g==='f'?'m':'f',p>2?1:0))];
  if(t==='fut'&&v.sc==='y'){tok.alt=[...(tok.alt||[]),contract((v.refl?REFL[p]+' ':'')+v.base+FUT_END[p])]}
  const s=S([tok],[`Write the ${TN[t]} of ${v.inf} (“to ${v.e.replace('$P','one’s')}”) for ${PERS[p]}`]);s.form=1;return s;
}

/* ---------- uses (identify mode, extra credit, use charts) ---------- */
const USES={
 pc:{name:'Passé composé',word:'the passé composé',list:[
  {id:'pcDone',full:'the passé composé for a completed action',n:'Completed action',syn:['completed','complete','completed action','specific time','finished','one time','single','once','specific','ended','done','specific moment'],what:'an action finished at a specific time (hier, la semaine dernière)',la:'Hier, j’ai mangé du pain',en:'Yesterday I ate bread'},
  {id:'pcSeq',full:'the passé composé for a series of actions',n:'Series of actions',syn:['series','sequence','list','one after another','series of events','chain','steps','order','succession'],what:'actions done one after another',la:'Il est arrivé, il a mangé et il est parti',en:'He arrived, ate and left'},
  {id:'pcInt',full:'the passé composé for an interrupting action',n:'Interrupting action',syn:['interrupting','interrupt','interrupts','interruption','sudden','interrupter','new action','cuts in'],what:'the action that interrupts something already going on',la:'Je lisais quand il est arrivé',en:'I was reading when he arrived'}]},
 imp:{name:'Imparfait',word:'the imparfait',list:[
  {id:'impHab',full:'the imparfait for a habitual action',n:'Habitual or repeated',syn:['habitual','habit','repeated','routine','used to','always','every day','repetition','often','would','regularly'],what:'what used to happen again and again (tous les jours, souvent)',la:'Tous les jours, je mangeais du pain',en:'Every day I used to eat bread'},
  {id:'impBg',full:'the imparfait for an ongoing action',n:'Ongoing (background) action',syn:['ongoing','background','in progress','was ing','interrupted','while','continuous','progressive','setting','scene'],what:'an action that was in progress when something else happened',la:'Je lisais quand il est arrivé',en:'I was reading when he arrived'},
  {id:'impDesc',full:'the imparfait for time, weather or description in the past',n:'Time or description',syn:['time','age','description','telling time','weather','clock','describing','past description','feelings','background description'],what:'the time, the weather, someone’s age or a description in the past',la:'Il était trois heures',en:'It was three o’clock'}]},
 aux:{name:'avoir or être',word:'the helping verb',list:[
  {id:'auxAvoir',full:'avoir as the helping verb',n:'avoir (most verbs)',syn:['avoir','most verbs','regular','normal','default','transitive','have'],what:'most verbs form the passé composé with avoir, and the past participle doesn’t agree with the subject',la:'Elle a mangé',en:'She ate'},
  {id:'auxEtre',full:'être as the helping verb for a verb of motion or change',n:'être (motion or change: DR MRS VANDERTRAMP)',syn:['etre','être','motion','movement','change','change of state','dr mrs vandertramp','vandertramp','house of etre','coming and going','to be'],what:'aller, venir, arriver, partir, sortir, entrer, rester, tomber … use être, and the participle agrees with the subject',la:'Elle est allée',en:'She went'},
  {id:'auxRefl',full:'être as the helping verb for a reflexive verb',n:'être (reflexive verb)',syn:['reflexive','pronominal','reflexive verb','se','self','oneself','pronominal verb'],what:'every reflexive verb (se lever, s’amuser …) uses être',la:'Elle s’est levée',en:'She got up'}]},
 subj:{name:'Subjunctive',word:'the subjunctive',list:[
  {id:'sjW',full:'the subjunctive after a wish or will',n:'Wish or will',syn:['wish','wishes','want','wants','desire','will','willing','hope','preference','prefer','vouloir'],what:'someone wants, prefers or wishes that someone else do something: je veux que …',la:'Je veux que tu étudies',en:'I want you to study'},
  {id:'sjN',full:'the subjunctive after necessity or an impersonal expression',n:'Necessity (il faut que, il est important que)',syn:['necessity','necessary','il faut','must','impersonal','impersonal expression','obligation','important','essential','need'],what:'il faut que, il est nécessaire que, il est important que …',la:'Il faut que tu étudies',en:'You have to study'},
  {id:'sjE',full:'the subjunctive after an emotion',n:'Emotion',syn:['emotion','emotions','feeling','feelings','glad','happy','fear','afraid','sad','surprised','reaction'],what:'someone has feelings about what someone else does: je suis content que …',la:'Je suis content que tu viennes',en:'I’m glad you’re coming'},
  {id:'sjD',full:'the subjunctive after doubt',n:'Doubt or disbelief',syn:['doubt','denial','deny','uncertainty','disbelief','not believe','not think','unsure','douter','doubting'],what:'someone doubts or doesn’t believe something: je doute que, je ne pense pas que',la:'Je doute qu’il vienne',en:'I doubt he will come'},
  {id:'sjC',full:'the subjunctive after a conjunction',n:'Conjunction (pour que, avant que, bien que)',syn:['conjunction','pour que','avant que','bien que','a moins que','so that','before','although','unless','adverbial'],what:'pour que, avant que, bien que, à moins que …',la:'Je travaille pour que tu sois content',en:'I work so that you are happy'}]},
 y:{name:'y',word:'y',list:[
  {id:'yPlace',full:'y replacing à + a place',n:'A place (there)',syn:['place','there','location','a place','destination','where','to a place','at a place'],what:'y = there: it replaces à (or dans, en, chez) + a place',la:'Je vais au parc → J’y vais',en:'I go there'},
  {id:'yThing',full:'y replacing à + a thing',n:'à + a thing or idea',syn:['thing','idea','a thing','object','a + thing','to it','about it','it'],what:'it replaces à + a thing or an idea: répondre à la question → y répondre',la:'Je réponds à la question → J’y réponds',en:'I answer it'}]},
 en:{name:'en',word:'en',list:[
  {id:'enSome',full:'en replacing some (du, de la, des + a noun)',n:'Some (partitive)',syn:['some','partitive','any','some of it','some of them','du','de la','des','quantity unspecified'],what:'en = some, any: it replaces du, de la, de l’, des + a noun',la:'Je mange du pain → J’en mange',en:'I eat some'},
  {id:'enNum',full:'en with a number or an amount',n:'A number or amount',syn:['number','amount','quantity','how many','count','numbers','of them'],what:'with a number or an amount, en stands for the noun: j’en ai deux',la:'J’ai deux chats → J’en ai deux',en:'I have two (of them)'},
  {id:'enDe',full:'en replacing de + a place',n:'From a place (from there)',syn:['from','from there','from a place','origin','coming from','de + place','out of'],what:'en = from there: it replaces de + a place',la:'Je viens de la plage → J’en viens',en:'I come from there'}]}
};
const TYPES={};Object.entries(USES).forEach(([c,u])=>u.list.forEach(x=>TYPES[x.id]=Object.assign(x,{c})));
const TY=cid=>TYPES[cid]?cid:null;
function idQuestion(ty){
  const c=TYPES[ty].c;let q;
  if(c==='pc'||c==='imp')q=gPcImp({pcDone:'hab',impHab:'hab',pcSeq:'seq',pcInt:'int',impBg:'int',impDesc:'desc'}[ty]);
  else if(c==='aux')q=gC({t:'pc',pool:ty==='auxRefl'?RV:ty==='auxEtre'?VERBS.filter(v=>v.etre&&!v.refl&&/[MF]/.test(v.fl)||['tomber','monter','descendre','rentrer'].includes(v.base)):ACT.filter(v=>!v.etre&&!v.refl),place:ty==='auxEtre'?undefined:null});
  else if(c==='subj')q=gSubj(ty.slice(2));
  else q=gYen(ty);
  return finish(q);
}
/* which uses each topic practices, for identify mode */
const ID_TOPIC={pcimp:['pcDone','pcSeq','pcInt','impHab','impBg','impDesc'],impf:['impHab','impBg','impDesc'],pc:['pcDone','auxAvoir'],pcetre:['auxEtre','auxAvoir','auxRefl'],reflpc:['auxRefl'],
  sjwish:['sjW'],sjnec:['sjN'],sjemo:['sjE'],sjdoubt:['sjD'],sjconj:['sjC'],sjp:['sjE'],yen:['yPlace','yThing','enSome','enNum','enDe']};

/* ---------- topics by course ---------- */
const reg=cls=>v=>v.cls===cls&&isRegPres(v);
const TOPICS=[
['art','I','Nouns and adjectives','Articles and gender (le, la, l’, un, une)',()=>gC({vf:v=>v.fl.includes('T')&&!v.fl.includes('A'),objDet:R(['def','indef']),subjNp:{det:R(['def','indef'])},pron:.3})],
['plur','I','Nouns and adjectives','Plural nouns (les, des)',()=>gC({vf:v=>v.fl.includes('T'),k:1,ok:1,pron:.15})],
['irrpl','I','Nouns and adjectives','Irregular plurals (journaux, gâteaux, yeux)',gIrrPl],
['adj','I','Nouns and adjectives','Adjective agreement',()=>gAdj()],
['adjpos','I','Nouns and adjectives','Adjectives before the noun (beau, nouveau, vieux …)',()=>gAdj('B')],
['poss','I','Nouns and adjectives','Possessive adjectives (mon, ma, mes …)',()=>chance(.5)?gC({vf:v=>v.fl.includes('T')&&!v.fl.includes('A'),objNp:possO(),objDet:'poss',pron:.6}):gC({sk:'noun',subjNp:possO(),subjPool:PEOPLE.filter(x=>!x.name)})],
['demo','I','Nouns and adjectives','Demonstratives (ce, cet, cette, ces)',()=>chance(.5)?gC({vf:v=>v.fl.includes('T')&&!v.fl.includes('A'),objNp:demoO(),objDet:'demo',pron:.6}):gC({sk:'noun',subjNp:demoO(),subjPool:PEOPLE.filter(x=>!x.name)})],
['part','I','Nouns and adjectives','Partitive articles (du, de la, des)',gPart],
['per','I','Verbs','Present tense: regular -er verbs',()=>gC({vf:reg('er'),pron:.6})],
['pir','I','Verbs','Present tense: regular -ir verbs (finir)',()=>gC({vf:reg('ir'),pron:.6,pool:VERBS.filter(v=>v.cls==='ir'&&!v.irr)})],
['pre','I','Verbs','Present tense: regular -re verbs (vendre)',()=>gC({vf:reg('re'),pron:.6,pool:VERBS.filter(v=>v.cls==='re'&&!v.irr)})],
['etre','I','Verbs','être',()=>gEtre()],
['avoir','I','Verbs','avoir and avoir expressions (avoir faim, avoir … ans)',gAvoir],
['aller','I','Verbs','aller and the futur proche (aller + infinitive)',gAller],
['faire','I','Verbs','faire',()=>gC({v:vb('faire'),pron:.6})],
['spell','I','Verbs','Spelling-change verbs (acheter, préférer, appeler, manger, payer)',()=>gC({vf:v=>!!v.sc&&!v.refl&&!v.irr,pron:.6,pool:VERBS.filter(v=>v.sc&&v.fl.includes('T'))})],
['irr','I','Verbs','Irregular verbs (prendre, venir, pouvoir, vouloir, devoir …)',()=>gC({vf:v=>v.irr&&!['être','avoir','aller','faire','falloir','envoyer'].includes(v.base),pron:.6})],
['inf','I','Verbs','Verb + infinitive (vouloir, pouvoir, devoir, aimer)',()=>gModal()],
['neg','I','Sentences','Negative sentences (ne … pas, pas de)',()=>gC({neg:true})],
['ques','I','Sentences','Questions: est-ce que, inversion and question words',()=>gQues()],
['ilya','I','Sentences','il y a (there is, there are)',()=>gIlya()],
['prep','I','Sentences','Places: à and de (au, aux, du, des)',()=>gC({pool:[...MV,...FROMV,...SV].filter(v=>!v.refl),obj:false,place:true})],
['adv','I','Sentences','Time expressions (aujourd’hui, demain, souvent)',()=>gC({adv:'time',t:R(['pres','pres','proche'])})],
['pc','II','Past tenses','Passé composé with avoir',()=>gC({t:'pc',vf:v=>!v.etre&&!v.refl,adv:chance(.5)?'time':null})],
['pcetre','II','Past tenses','Passé composé with être (and agreement)',()=>gC({t:'pc',pool:VERBS.filter(v=>v.etre&&!v.refl),adv:chance(.4)?'time':null})],
['pcirr','II','Past tenses','Irregular past participles (fait, pris, vu, eu, été …)',()=>gC({t:'pc',vf:v=>v.irr&&v.irr.pp&&!['falloir'].includes(v.base)})],
['impf','II','Past tenses','Imparfait',()=>chance(.2)?gEtre('desc','impf'):gC({t:'impf',adv:chance(.7)?'time':null})],
['pcimp','II','Past tenses','Passé composé vs. imparfait',()=>gPcImp()],
['recent','II','Past tenses','Passé récent (venir de + infinitive)',()=>gC({t:'recent',vf:v=>!v.refl})],
['refl','II','Pronouns','Reflexive verbs (se lever, s’habiller)',()=>gC({pool:RV,t:'pres',adv:chance(.5)?'time':null})],
['reflpc','II','Pronouns','Reflexive verbs in the passé composé',()=>gC({pool:RV,t:'pc',adv:chance(.4)?'time':null})],
['dop','II','Pronouns','Direct object pronouns (le, la, les)',()=>chance(.25)?gModal({co:{dop:true,vf:v=>v.fl.includes('T')&&!v.refl&&!v.fl.includes('A')}}):gC({vf:v=>v.fl.includes('T')&&!v.refl&&!v.fl.includes('A')&&v.base!=='jouer',dop:true,objDet:R(['def','poss','demo']),t:R(['pres','pres','pc'])})],
['iop','II','Pronouns','Indirect object pronouns (lui, leur)',()=>gC({pool:DV,io:R(['pron','pron','noun'])})],
['dbl','II','Pronouns','Double object pronouns (le lui, me le)',()=>gC({pool:DV,io:'both',objDet:R(['def','poss']),t:R(['pres','pc'])})],
['yen','II','Pronouns','y and en',()=>gYen()],
['imp','II','Commands','Commands (impératif): tu, nous, vous',()=>gCmd(null,{dopChance:.3})],
['comp','II','Adjectives and adverbs','Comparisons (plus … que, aussi … que, meilleur)',gComp],
['sup','II','Adjectives and adverbs','Superlatives (le plus …)',gSup],
['ment','II','Adjectives and adverbs','Adverbs in -ment',()=>gC({adv:'ment'})],
['prog','II','Sentences','être en train de + infinitive',()=>gC({t:'prog',vf:v=>!v.refl})],
['fut','III','Tenses','Futur simple',()=>gC({t:'fut',adv:chance(.5)?'time':null})],
['cond','III','Tenses','Conditionnel présent',()=>chance(.3)?gModal({t:'cond',mods:['vouloir','pouvoir','devoir']}):gC({t:'cond'})],
['pqp','III','Tenses','Plus-que-parfait',()=>gC({t:'pqp'})],
['negx','III','Sentences','Other negatives (ne … jamais, plus, rien, personne)',()=>gNegX()],
['rel','III','Sentences','Relative pronouns (qui, que, où, dont)',gRel],
['sjforms','III','Subjunctive','Present subjunctive: forms',()=>gForm(['subj'])],
['sjnec','III','Subjunctive','Subjunctive: il faut que and impersonal expressions',()=>gSubj('N')],
['sjwish','III','Subjunctive','Subjunctive: wishes (vouloir que)',()=>gSubj('W')],
['sjemo','III','Subjunctive','Subjunctive: emotion',()=>gSubj('E')],
['sjdoubt','III','Subjunctive','Subjunctive: doubt',()=>gSubj('D')],
['si','IV','Tenses','si clauses (si j’avais …, je ferais …)',()=>gSi(R(['open','hyp','hyp']))],
['futant','IV','Tenses','Futur antérieur and conditionnel passé',()=>gC({t:R(['futant','condp'])})],
['sjconj','IV','Subjunctive','Subjunctive after pour que, avant que, bien que',()=>gSubj('C')],
['sjp','IV','Subjunctive','Past subjunctive (que j’aie fait)',()=>gSubj(R(['E','D']),{perf:true})],
['sjpast','IV','Subjunctive','Subjunctive after a past main verb',()=>gSubj(R(['W','N','E','D']),{past:true})],
['pass','IV','Sentences','Passive voice (être + participle + par)',gPass],
['sipast','AP','Advanced structures','si clauses in the past (si j’avais su …)',()=>gSi('past')],
['reported','AP','Advanced structures','Reported speech (il a dit que …)',gReported],
['forms','AP','Review','Conjugation sprint: every tense',()=>gForm(['pres','pc','impf','fut','cond','subj','pqp'])],
['mixed','AP','Review','Mixed review: everything',null]
].map(([id,level,group,name,gen])=>({id,level,group,name,gen}));
TOPICS.find(t=>t.id==='mixed').gen=()=>R(TOPICS.filter(t=>t.id!=='mixed'&&t.id!=='forms')).gen();

/* ---------- build your own sentence type ---------- */
const FRAMES=[['stmt','Plain statement'],['neg','Negative statement'],['yn','Yes or no question'],['qw','Question with a question word'],['modal','Verb + infinitive (vouloir, pouvoir …)'],['proche','aller + infinitive'],['cmd','Command (impératif)'],['si','si clause (si + present)']];
const ING_ALL=[['adj','Adjective agreement','Nouns'],['poss','Possessive adjectives','Nouns'],['demo','Demonstratives','Nouns'],['plur','Plural nouns','Nouns'],['part','Partitive (du, de la)','Nouns'],
 ['dop','Direct object pronoun','Objects and extras'],['iop','Indirect object pronoun','Objects and extras'],['place','Place: à, de (au, du)','Objects and extras'],['con','avec + a person','Objects and extras'],['adv','Time expression','Objects and extras'],['ment','Adverb in -ment','Objects and extras'],
 ['pres','Present','Tense'],['pc','Passé composé','Tense'],['impf','Imparfait','Tense'],['fut','Futur simple','Tense'],['cond','Conditionnel','Tense']];
const FRAME_ONLY={},FRAME_NOT={proche:['pc','impf','fut','cond'],cmd:['pc','impf','fut','cond','pres'],si:['pc','impf','fut','cond'],modal:['pc','fut']};
const ingName=id=>(ING_ALL.find(x=>x[0]===id)||[0,id])[1];
function optsFor(set){
  const o={},vf=[];const tense=['pres','pc','impf','fut','cond'].filter(x=>set.has(x));o.t=tense.length?R(tense):'pres';
  const subjObj=()=>chance(.5)?'s':'o';
  if(set.has('adj')){if(subjObj()==='s'){o.sk='noun';o.subjNp=Object.assign(o.subjNp||{},{adj:'auto'})}else{o.objNp=Object.assign(o.objNp||{},{adj:'auto'});vf.push(v=>v.fl.includes('T')&&!v.fl.includes('A'))}}
  for(const d of['poss','demo'])if(set.has(d)){const x=d==='poss'?possO():demoO();if(subjObj()==='s'&&!o.subjNp?.det){o.sk='noun';o.subjNp=Object.assign(o.subjNp||{},x);o.subjPool=PEOPLE.filter(n=>!n.name)}else{o.objNp=Object.assign(o.objNp||{},x);o.objDet=x.det;vf.push(v=>v.fl.includes('T')&&!v.fl.includes('A')&&v.base!=='jouer')}}
  if(set.has('plur')){o.k=1;o.ok=1;if(o.sk!=='noun'&&chance(.5))o.sk='noun'}
  if(set.has('part')){o.objDet='part';vf.push(v=>['manger','boire','acheter','prendre','vouloir','avoir','commander','préparer'].includes(v.base))}
  if(set.has('dop')){o.dop=true;if(!o.objDet||o.objDet==='part')o.objDet=R(['def','poss']);vf.push(v=>v.fl.includes('T')&&!v.fl.includes('A')&&v.base!=='jouer')}
  if(set.has('iop')){o.io='pron';vf.push(v=>v.fl.includes('D')&&v.fl.includes('T'))}
  if(set.has('place')&&!set.has('iop')){o.place=true;vf.push(v=>/[MFS]/.test(v.fl))}
  if(set.has('con'))o.con=true;
  if(set.has('ment'))o.adv='ment';else if(set.has('adv'))o.adv='time';
  if(vf.length)o.vf=v=>vf.every(f=>f(v))&&!v.refl;
  return o;
}
function B(frame,ings,must){
  let list=[...ings].filter(x=>!(FRAME_NOT[frame]||[]).includes(x));
  for(let tries=0;tries<40;tries++){
    const set=new Set(list);ALT=[];
    try{
      const o=optsFor(set);let q;
      if(frame==='stmt')q=gC(o);
      else if(frame==='neg')q=gC(Object.assign(o,{neg:true}));
      else if(frame==='yn')q=gQues({kind:'yn',co:o});
      else if(frame==='qw')q=gQues({kind:R(set.has('dop')?['qui','quand','pourquoi']:['que','qui','ou','quand','pourquoi']),co:o});
      else if(frame==='modal')q=gModal({co:Object.assign(o,{t:'pres'}),t:o.t});
      else if(frame==='proche')q=gC(Object.assign(o,{t:'proche'}));
      else if(frame==='cmd')q=gCmd(null,{co:o});
      else if(frame==='si')q=gSi('open');
      if(q&&q.tokens.length){q.built=[frame,...list];return q}
    }catch(e){if(typeof console!=='undefined'&&tries>35)console.warn(e)}
    if(tries>8&&tries%4===0&&list.length>1){const drop=list.map((x,i)=>i).filter(i=>list[i]!==must);if(drop.length)list.splice(R(drop),1)}
  }
  const q=gC({});q.built=[frame];return q;
}
const fitsFrame=(f,x)=>!(FRAME_NOT[f]||[]).includes(x);
function makeBuilt(frames,ings,per,focus){
  const fF=[...frames].filter(f=>focus&&focus.has(f)),fI=[...ings].filter(x=>focus&&focus.has(x));
  let frame=R([...frames]),must=null;const opts=[...fF.map(f=>['f',f]),...fI.map(x=>['i',x])];
  if(opts.length){const[k,v]=R(opts);if(k==='f')frame=v;else{must=v;const ok=[...frames].filter(f=>fitsFrame(f,v));if(ok.length&&!fitsFrame(frame,v))frame=R(ok)}}
  let pool=[...ings].filter(x=>x!==must).sort(()=>Math.random()-.5);
  const n=per==='all'?pool.length+(must?1:0):Math.min(pool.length+(must?1:0),+per);
  if(must)pool=[must,...pool];
  const q=B(frame,pool.slice(0,n),must),fn=FRAMES.find(f=>f[0]===q.built[0])[1],used=q.built.slice(1);
  q.topic={id:'built',level:'I',name:fn+(used.length?' + '+used.map(ingName).join(' + '):'')};
  return finish(q);
}
const TOPIC_PLAN={adj:{ing:['adj']},poss:{ing:['poss']},demo:{ing:['demo']},plur:{ing:['plur']},part:{ing:['part']},dop:{ing:['dop']},iop:{ing:['iop']},prep:{ing:['place']},adv:{ing:['adv']},ment:{ing:['ment']},
  pc:{ing:['pc']},impf:{ing:['impf']},fut:{ing:['fut']},cond:{ing:['cond']},neg:{frame:'neg'},ques:{frame:'yn|qw'},inf:{frame:'modal'},aller:{frame:'proche'},imp:{frame:'cmd'}};
function makeFocused(selected,focus){
  const foc=[...focus].filter(x=>selected.has(x));if(!foc.length)return makeQuestion(selected);
  const fid=R(foc),ft=TOPICS.find(t=>t.id===fid),plan=TOPIC_PLAN[fid];
  const extras=[...selected].filter(x=>x!==fid&&TOPIC_PLAN[x]&&TOPIC_PLAN[x].ing);
  if(plan&&extras.length&&chance(.65)){
    const ex=TOPIC_PLAN[R(extras)],frame=plan.frame?R(plan.frame.split('|')):'stmt';
    const q=B(frame,[...new Set([...(plan.ing||[]),...ex.ing])],plan.ing?plan.ing[0]:null);
    const extraNames=q.built.slice(1).filter(x=>!(plan.ing||[]).includes(x)).map(ingName);
    q.topic=Object.assign({},ft,{name:ft.name+(extraNames.length?' + '+extraNames.join(' + '):'')});return finish(q);
  }
  return makeQuestion(new Set([fid]));
}
function makeQuestion(selected){
  ALT=[];const pid=R([...selected]),topic=TOPICS.find(t=>t.id===pid)||TOPICS[0];let q;
  for(let i=0;i<12;i++){try{q=topic.gen();if(q&&q.tokens&&q.tokens.length)break}catch(e){if(i>10)console.warn(e)}}
  if(!q)q=gC({});
  q.topic=topic;
  if(q.form)q.tokens[0].blank=true;
  return finish(q);
}
/* final touches: the displayed sentence, which charts fit it, and the span of a helping verb + participle */
const CHART_OF={pres:'pres',pc:'pc',pqp:'pc',futant:'pc',condp:'pc',subjp:'subj',impf:'impf',fut:'futcond',cond:'futcond',subj:'subj',proche:'irrpres',recent:'irrpres',prog:'irrpres',imp:'cmd'};
const IRR_CH=['être','avoir','aller','faire','prendre','venir','pouvoir','vouloir','devoir','savoir','dire','voir'];
function finish(q){
  q.altTokens=q.altTokens||[];q.alts=q.alts||[];
  // a helping verb that carries a use (pcDone …) highlights through its participle
  q.tokens.forEach((t,i)=>{if(t.aux){const j=q.tokens.findIndex((x,k)=>k>i&&x.t&&COMPOUND[x.t]);if(j>i){t.span=j-i;const vc=q.tokens[j].cids.filter(c=>TYPES[c]&&TYPES[c].c!=='aux');if(vc.length)t.cids=[vc[0],...t.cids]}}});
  q.display=frJoin(q.tokens);
  const ch=new Set();
  for(const t of q.tokens){if(t.t&&CHART_OF[t.t])ch.add(CHART_OF[t.t]);if(t.cids&&t.cids.some(c=>/^cmd/.test(c)))ch.add('cmd');if(t.cids&&t.cids.some(c=>['art','adj','poss','demo','part','negde'].includes(c)))ch.add('agree');if(t.cids&&t.cids.some(c=>['do','io','refl','yPlace','yThing','enSome','enNum','enDe','y','en'].includes(c)))ch.add('pron');
    if(t.vb&&IRR_CH.includes(t.vb.base)&&t.t==='pres')ch.add('irrpres');}
  q.charts=[...ch].slice(0,4);if(!q.charts.length)q.charts=['pres'];
  return q;
}

/* ---------- checking answers ---------- */
/* words where the accent is the only difference from another word: a / à, ou / où, la / là, du / dû, sur / sûr … */
const CLASH=new Set('a la ou du sur des mur tache jeune peche cote'.split(' '));
const normF=s=>String(s).toLowerCase().normalize('NFC').replace(/[’‘ʼ`´]/g,"'").replace(/œ/g,'oe').replace(/æ/g,'ae').replace(/[.,!?;:"“”«»() ]/g,' ').replace(/-/g,' ').replace(/'\s+/g,"'").replace(/\s+/g,' ').trim();
const wordsS=s=>normF(s).split(' ').filter(Boolean);
function candsOf(ts,cap=600){let c=[[]];for(const t of ts){const opts=[t.la,...(t.alt||[])];if(t.opt)opts.push('');c=c.flatMap(x=>opts.map(o=>[...x,o]));if(c.length>cap)c=c.slice(0,cap)}return c.map(x=>wordsS(contract(x.filter(Boolean).join(' '))))}
function gradeTokens(sets,input){
  const u=wordsS(input);if(!u.length)return{ok:false,empty:true};
  const cands=sets.flatMap(ts=>candsOf(ts)),uk=u.join(' '),us=stripA(uk);
  if(cands.some(c=>c.join(' ')===uk))return{ok:true};
  const c=cands.find(c=>stripA(c.join(' '))===us);if(!c)return{ok:false};
  const forms=new Set(sets.flat().flatMap(t=>(t.forms||[]).map(f=>normF(f))));
  const clash=u.filter((w,i)=>w!==c[i]&&(CLASH.has(w)||forms.has(w)));
  return clash.length?{ok:false,essential:clash}:{ok:true,macron:true,missing:u.filter((w,i)=>w!==c[i])};
}
const grade=(tok,input)=>gradeTokens([[tok]],input);
const gradeLatin=(q,input)=>gradeTokens([q.tokens,...(q.altTokens||[])],input);
const normE=s=>(' '+String(s).toLowerCase().replace(/\([^)]*\)/g,' ').replace(/[’‘]/g,"'")+' ')
  .replace(/\bwon't\b/g,'will not').replace(/\bcan't\b/g,'cannot').replace(/\bshan't\b/g,'shall not').replace(/n't\b/g,' not').replace(/\bcannot\b/g,'can not')
  .replace(/\bi'm\b/g,'i am').replace(/'re\b/g,' are').replace(/\b(he|she|it|that|what|who|there|here|where|when)'s\b/g,'$1 is').replace(/'ve\b/g,' have').replace(/'ll\b/g,' will').replace(/'d\b/g,' would')
  .replace(/\bgonna\b/g,'going to').replace(/\by'all\b|\byou guys\b|\byou all\b/g,'you').replace(/\bin order to\b/g,'to').replace(/\bo'clock\b/g,'oclock')
  .replace(/[^a-z' ]/g,' ').replace(/\b(the|a|an)\b/g,' ').replace(/\s+/g,' ').trim();
function gradeEnglish(q,input){
  const u=normE(input);if(!u)return{ok:false,empty:true};
  return[q.en,...(q.enAlt||[])].some(v=>normE(v)===u)?{ok:true}:{ok:false};
}
const latinOf=ts=>frJoin(ts);
if(typeof module!=='undefined'&&typeof window==='undefined')module.exports={setLimit,makeBuilt,makeFocused,makeQuestion,TOPIC_PLAN,FRAMES,ING_ALL,TOPICS,B,grade,gradeLatin,gradeEnglish,idQuestion,USES,TYPES,VERBS,NOUNS,ADJ,vf,vphrase,finish,contract,frJoin,ID_TOPIC};

