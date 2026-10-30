/* ---------- French: the rest of the course's form uses, for the identify-the-use tab ----------
   Loaded after js/usemode.js. Each new use has a gen() that picks a sentence from the course's own
   topic generators and tags the one verb that shows the use. */
const LANG_NAME='French';
const useAsk=ty=>`Which use of ${USES[ty.c].word} is`;
const useOf=ty=>`use of ${USES[ty.c].word}`;
const XC_SKIP=()=>false;
const MORE_ID_TOPIC={si:['condHyp'],cond:['condPol'],reported:['condFut']};
/* topic generators return unfinished sentences; finish() builds the display text the drill shows */
function fromTopic(id){const t=TOPICS.find(x=>x.id===id);for(let i=0;i<30;i++){try{return finish(t.gen())}catch(e){}}throw new Error('no '+id+' sentence')}
function retag(x,test,id,hint){const t=x.tokens.find(test);if(!t)throw new Error('no '+id);t.cids=[id,...t.cids];if(hint)t.enHint=hint;return x}

addUses('cond',{name:'Conditionnel',word:'the conditionnel',level:'III'},[
  {id:'condHyp',full:'a hypothetical result (conditionnel)',n:'Hypothetical result',syn:['hypothetical','hypothesis','result','unreal result','contrary to fact','if then','would happen if'],what:'what would happen if something else were true',la:'Si j’avais de l’argent, je voyagerais.',en:'If I had money, I would travel.',
    gen:()=>retag(fromTopic('si'),t=>t.cids[0]==='si2'&&t.cids.includes('cond'),'condHyp')},
  {id:'condPol',full:'a polite request or wish (conditionnel)',n:'Polite request or wish',syn:['polite','politeness','courtesy','request','polite request','softened','softening','would like'],what:'softens a wish or request (je voudrais, pourriez-vous)',la:'Je voudrais un café.',en:'I would like a coffee.',
    gen:()=>retag(fromTopic('cond'),t=>t.vb&&t.cids.includes('cond')&&['vouloir','pouvoir'].includes(t.vb.inf||t.vb.base||t.lemma),'condPol',['would like','could'])},
  {id:'condFut',full:'a future in the past (conditionnel)',n:'Future in the past',syn:['future in the past','future of the past','future past','reported','reported speech','indirect speech','said would'],what:'what someone said or thought would happen later',la:'Il a dit qu’il viendrait.',en:'He said that he would come.',
    gen:()=>retag(fromTopic('reported'),t=>t.vb&&t.cids.includes('cond'),'condFut')}]);
/* y and en have no English word of their own, so English mode looks for the words they stand for */
Object.assign(TYPES.yThing,{enWords:['about it','of it','to it','it']});
Object.assign(TYPES.enNum,{enWords:'one two three four five six seven eight nine ten twelve twenty several many'.split(' ')});
Object.assign(TYPES.enDe,{enWords:['from there']});
