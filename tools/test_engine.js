const E=require(require('path').join(__dirname,'..','engine.js'));
let n=0,bad=[],errs=0;const seen=new Set();
for(const t of E.TOPICS){for(let i=0;i<60;i++){let q;try{q=E.makeQuestion(new Set([t.id]))}catch(e){errs++;if(errs<6)console.log('ERR',t.id,e.message);continue}
  n++;const fr=q.display;
  // the model answer must grade as correct, in both directions
  if(!q.form){const r=E.gradeLatin(q,fr);if(!r.ok||r.macron)bad.push([t.id,'fr',fr]);const r2=E.gradeEnglish(q,q.en);if(!r2.ok)bad.push([t.id,'en',q.en]);
    for(const a of q.altTokens){const af=E.contract(a.filter(x=>!x.hide).map(x=>x.la).join(' '));if(!E.gradeLatin(q,af).ok)bad.push([t.id,'alt',af])}}
  else{const r=E.gradeLatin(q,q.tokens[0].la);if(!r.ok)bad.push([t.id,'form',q.tokens[0].la])}
  if(/(^| )(de le|à le|à les|de les)( |$)|(^| )(je|le|la|ne|de|que|me|te|se) [aeiouéèêh]/i.test(fr))bad.push([t.id,'elision',fr]);
  if(/undefined|NaN|null/.test(fr+q.en))bad.push([t.id,'undef',fr+' | '+q.en]);
  if(i<2&&!seen.has(t.id)){console.log(t.id.padEnd(8),fr+q.end,' || ',q.en);seen.add(t.id+i)}
}}
for(const ty of Object.keys(E.TYPES))for(let i=0;i<20;i++){try{const q=E.idQuestion(ty);if(!q.tokens.some(t=>t.cids&&t.cids[0]===ty))bad.push(['id',ty,q.display])}catch(e){bad.push(['iderr',ty,e.message])}}
console.log('questions',n,'errors',errs,'problems',bad.length);console.log(bad.slice(0,25).map(b=>b.join(' :: ')).join('\n'));
// build-your-own and focus
{let n=0,bad2=[];const fr=E.FRAMES.map(f=>f[0]),ing=E.ING_ALL.map(x=>x[0]);
 for(let i=0;i<1500;i++){const F=new Set(fr.filter(()=>Math.random()<.4));if(!F.size)F.add('stmt');const I=new Set(ing.filter(()=>Math.random()<.3));
   let q;try{q=E.makeBuilt(F,I,String(1+Math.floor(Math.random()*3)),new Set())}catch(e){bad2.push('ERR '+e.message);continue}n++;
   if(!E.gradeLatin(q,q.display).ok||!E.gradeEnglish(q,q.en).ok||/undefined/.test(q.display+q.en))bad2.push(q.topic.name+' :: '+q.display+' :: '+q.en)}
 const ids=E.TOPICS.map(t=>t.id);
 for(let i=0;i<800;i++){const sel=new Set(ids.filter(()=>Math.random()<.2));if(!sel.size)continue;const foc=new Set([...sel].filter(()=>Math.random()<.4));
   let q;try{q=E.makeFocused(sel,foc)}catch(e){bad2.push('FERR '+e.message);continue}n++;if(!E.gradeLatin(q,q.form?q.tokens[0].la:q.display).ok)bad2.push('focus :: '+q.display)}
 console.log('built+focused',n,'problems',bad2.length);console.log(bad2.slice(0,10).join('\n'));}
