/* ---------- Mots's Practice Test mode: the pages it lists, the study guide, and the verb test with its answer checker ----------
   The mechanics (the tab, the page, check-as-you-go or check-at-the-end, the AI explanations) are in js/tests.js, which is the same on
   every practice site. This file holds what is specific to French.

   PTESTS.groups   the groups the tab lists; each page is {id, kind:'test'|'guide', title, blurb}
   PTESTS.guide    id → the study guide page, as HTML
   PTESTS.tests    id → {title, intro, bank(), make(), grade(q, raw, strict), tutor, rules, describe(q)}
   Everything is inside one function so none of these names clash with the rest of the site. */
const PTESTS=(function(){
  /* ================= The verbs and the conjugation engine ================= */
  const PAST_STYLE='prog';
  const TENSE_NAME={pres:'present (présent)',fut:'future (futur simple)',imp:'imperfect (imparfait)'};
  const VERBS=[
    {inf:'parler',kind:'-er verb',gloss:'to speak',base:'speak',s3:'speaks',ing:'speaking',stem:'parl',fs:'parler',is:'parl'},
    {inf:'finir',kind:'-ir verb',gloss:'to finish',base:'finish',s3:'finishes',ing:'finishing',stem:'fin',fs:'finir',is:'finiss'},
    {inf:'vendre',kind:'-re verb',gloss:'to sell',base:'sell',s3:'sells',ing:'selling',stem:'vend',fs:'vendr',is:'vend'},
    {inf:'aller',kind:'irregular verb',gloss:'to go',base:'go',s3:'goes',ing:'going',pres:['vais','vas','va','allons','allez','vont'],fs:'ir',is:'all'},
    {inf:'être',kind:'irregular verb',gloss:'to be',base:'be',ing:'being',pres:['suis','es','est','sommes','êtes','sont'],fs:'ser',is:'ét',enPres:['am','are','is','are','are','are'],enImp:['was','were','was','were','were','were']},
    {inf:'avoir',kind:'irregular verb',gloss:'to have',base:'have',s3:'has',ing:'having',pres:['ai','as','a','avons','avez','ont'],fs:'aur',is:'av',noProg:true,enImp:Array(6).fill('had')},
    {inf:'faire',kind:'irregular verb',gloss:'to do, make',base:'make',s3:'makes',ing:'making',pres:['fais','fais','fait','faisons','faites','font'],fs:'fer',is:'fais'},
    {inf:'prendre',kind:'irregular verb',gloss:'to take',base:'take',s3:'takes',ing:'taking',pres:['prends','prends','prend','prenons','prenez','prennent'],fs:'prendr',is:'pren'}
  ];
  const END={'-er verb':['e','es','e','ons','ez','ent'],'-ir verb':['is','is','it','issons','issez','issent'],'-re verb':['s','s','','ons','ez','ent']};
  const FUT_END=['ai','as','a','ons','ez','ont'],IMP_END=['ais','ais','ait','ions','iez','aient'];
  function variants(v,t,p){
    if(t==='pres')return[v.pres?[[v.pres[p],'']]:[[v.stem,'s'],[END[v.kind][p],'e']]];
    if(t==='fut')return[[[v.fs,'s'],[FUT_END[p],'e']]];
    return[[[v.is,'s'],[IMP_END[p],'e']]];
  }
  /* a form is a list of [text, role] pieces: s stem, e ending, t tense sign, '' plain; every accepted spelling is a "variant" */
  const join=segs=>segs.map(x=>x[0]).join('');
  const forms=(v,t,p)=>variants(v,t,p).map(join);

  /* ================= Making a test ================= */
  const PERSON=['I','you (sing.)','he/she','we','you all','they'];
  const AM=['am','are','is','are','are','are'],WAS=['was','were','was','were','were','were'];
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  function english(v,t,p){
    const s=p===2?pick(['he','she']):PERSON[p];
    if(t==='pres'){
      if(v.enPres)return s+' '+v.enPres[p];
      return v.noProg||Math.random()<.5?s+' '+(p===2?v.s3:v.base):s+' '+AM[p]+' '+v.ing;
    }
    if(t==='fut')return s+' will '+(v.enFut||v.base);
    if(v.enImp)return s+' '+v.enImp[p];
    return PAST_STYLE==='past'?s+' '+v.past:s+' '+WAS[p]+' '+v.ing;
  }
  const label=(t,p)=>TENSE_NAME[t]+', “'+PERSON[p]+'”';
  /* 18 questions: every person in every tense once, with the verbs shuffled so each is used before any repeats */
  function make(){
    const slots=[];
    ['pres','fut','imp'].forEach(t=>{for(let p=0;p<6;p++)slots.push([t,p])});
    const pool=shuffle(VERBS.concat(VERBS,VERBS));
    return shuffle(slots).map(([t,p])=>{const v=pool.pop();return{v,t,p,en:english(v,t,p),answers:forms(v,t,p)}});
  }

  /* ================= Checking an answer (code only; the AI never decides) ================= */
  /* the subject pronoun is optional; accents are checked, but a missing one only counts as a small slip */
  const clean=s=>(s||'').normalize('NFC').toLowerCase().replace(/[’`´]/g,"'").replace(/[^a-zàâäçéèêëîïôöùûüÿœ' -]/g,'').trim().replace(/\s+/g,' ')
    .replace(/^(je|tu|il|elle|on|nous|vous|ils|elles)\s+(?=\S)/,'').replace(/^j'\s*/,'');
  const bare=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/œ/g,'oe');
  /* which forms of this verb the student's spelling actually is, so the note can say what they wrote instead */
  function diagnose(q,raw){
    const b=bare(clean(raw)),hits=[];
    ['pres','fut','imp'].forEach(t=>{for(let p=0;p<6;p++){if(forms(q.v,t,p).some(f=>bare(f)===b))hits.push(label(t,p))}});
    return hits;
  }
  function grade(q,raw,strict){
    const c=clean(raw);
    if(!c)return{status:'bad',note:'No answer.'};
    if(q.answers.includes(c))return{status:'ok'};
    if(q.answers.some(a=>bare(a)===bare(c)))return{status:strict?'bad':'warn',note:'Right letters, but check the accents.'};
    const hits=diagnose(q,raw);
    return{status:'bad',note:hits.length?'That spelling is the '+hits.join(' or ')+' form of '+q.v.inf+'.':'That isn’t a form of '+q.v.inf+' in these tenses.'};
  }

  /* ================= What the AI is told ================= */
  const RULES=[
    'Subject pronouns: je (j’ before a vowel), tu, il / elle, nous, vous, ils / elles. The student may leave the pronoun out; only the verb form is graded.',
    'Present of regular verbs: drop -er / -ir / -re and add endings. -er: -e, -es, -e, -ons, -ez, -ent (parle, parles, parle, parlons, parlez, parlent). -ir: -is, -is, -it, -issons, -issez, -issent (finis ... finissent). -re: -s, -s, nothing, -ons, -ez, -ent (vends, vends, vend, vendons, vendez, vendent).',
    'Irregular present: être (suis, es, est, sommes, êtes, sont), avoir (ai, as, a, avons, avez, ont), aller (vais, vas, va, allons, allez, vont), faire (fais, fais, fait, faisons, faites, font), prendre (prends, prends, prend, prenons, prenez, prennent).',
    'Future: the whole infinitive (for -re verbs, without the final e) plus the endings of avoir: -ai, -as, -a, -ons, -ez, -ont (parlerai, finiras, vendra). Irregular future stems: être ser-, avoir aur-, aller ir-, faire fer-; prendre is regular (prendr-).',
    'Imperfect: take the nous form of the present, drop -ons, and add -ais, -ais, -ait, -ions, -iez, -aient (nous parlons → parlais; nous finissons → finissais; nous vendons → vendais; nous faisons → faisais; nous prenons → prenais). The only irregular stem is être: ét- (étais, étais, était, étions, étiez, étaient).'
  ].join('\n');
  const describe=(q,n,raw,note)=>({n,english:q.en,verb:q.v.inf+' ('+q.v.kind+')',target:label(q.t,q.p),student:raw||'(blank)',correct:q.answers.join(' or '),checker:note});

  const bank=()=>VERBS.map(v=>`<div><b class="la">${v.inf}</b> <i>(${v.gloss})</i></div>`).join('');

  const tests={
    pfi:{
      title:'Present, future & imperfect practice test',
      intro:'Write the French for each phrase; the verb to use is shown beside it. Your answers are graded by code, and the AI then explains anything you missed.',
      bankTitle:'Verbs on this test',
      tutor:'You are a friendly French tutor. A student took a practice test on the present, future and imperfect tenses.',
      rules:RULES,
      bank,make,grade,describe,hint:q=>q.v.inf
    }
  };

  /* ================= The study guide ================= */
  const persons=['je / j’','tu','il / elle','nous','vous','ils / elles'];
  const seg=([text,role])=>text?(role?`<span class="pt-${role}">${text}</span>`:text):'';
  const form=segs=>segs.map(seg).join('');
  const cell=(v,t,p)=>`<td class="f">${variants(v,t,p).map(form).join('<span class="or">or</span>')}</td>`;
  const byInf=inf=>VERBS.find(v=>v.inf===inf);
  /* one table: a tense, with a column per verb */
  function table(t,infs){
    const vs=infs.map(byInf);
    return`<div class="ptscroll"><table${vs.length<4?` class="narrow${vs.length}"`:''}><thead><tr><th></th>${vs.map(v=>`<th>${v.inf}<small>${v.head||v.gloss}</small></th>`).join('')}</tr></thead><tbody>`+
      persons.map((n,p)=>`<tr><th scope="row">${n}</th>${vs.map(v=>cell(v,t,p)).join('')}</tr>`).join('')+`</tbody></table></div>`;
  }
  const L=s=>`<i class="la">${s}</i>`;
  const note=(h,body)=>`<aside class="ptnote"><b>${h}</b>${body}</aside>`;
  const allV=['parler','finir','vendre'];
  const guide=()=>`
<header class="pthero">
  <p class="lkick">Study guide · French</p>
  <h1>Present, future &amp; imperfect verbs</h1>
  <p class="lblurb">Every form on the test is a stem plus an ending. Learn which stem and which endings each tense uses and you can build any verb.</p>
  <div class="ptanat" role="img" aria-label="finiss, ions: we were finishing">
    <div><span class="pt-s">finiss</span><small>stem</small></div><div><span class="pt-e">ions</span><small>ending</small></div>
    <p>nous finissions: we were finishing</p>
  </div>
  <nav class="ptjump" aria-label="Sections">${[['build','Building a form'],['present','Present'],['future','Future'],['imperfect','Imperfect'],['irregular','Irregular verbs'],['english','English to French'],['traps','Traps']].map(([id,n])=>`<a href="#" data-jump="pt-${id}">${n}</a>`).join('')}</nav>
</header>

<section id="pt-build"><h2>Building any form</h2>
  <div class="ptpanel"><ol class="ptsteps">
    <li>Look at the <b>infinitive</b>: ${L('-er')} (${L('parler')}), ${L('-ir')} (${L('finir')}), ${L('-re')} (${L('vendre')}), or one of the irregular verbs below.</li>
    <li>Pick the <b>tense</b> from the English: simple (${L('I speak')}) is present, ${L('will')} is future, ${L('was ___ing')} is imperfect.</li>
    <li>Find the <b class="pt-s">stem</b> that tense uses, then add the <b class="pt-e">ending</b> for the person.</li>
  </ol></div>
  <p class="ptlegend"><span class="pt-s">stem</span><span class="pt-e">ending</span></p>
  <p>On the test you can write just the verb (${L('parlons')}) or the pronoun too (${L('nous parlons')}); both are graded the same way.</p>
</section>

<section id="pt-present"><h2>Present tense</h2>
  <p class="sub">“I speak, I am speaking.” French has one present for both.</p>
  ${table('pres',allV)}
  ${note('Same sound, different spelling.',`<p>For ${L('-er')} verbs, ${L('je parle, tu parles, il parle')} and ${L('ils parlent')} all sound the same, but each ending is still written. ${L('-re')} verbs have no ending at all in the ${L('il / elle')} form: ${L('il vend')}.</p>`)}
</section>

<section id="pt-future"><h2>Future tense</h2>
  <p class="sub">“I will speak.” Keep the whole infinitive, then add the endings of ${L('avoir')}.</p>
  ${table('fut',allV)}
  <div class="ptpanel"><p>For ${L('-re')} verbs, drop the final ${L('e')} first: ${L('vendre')} becomes ${L('vendr-')}, so ${L('je vendrai')}. The endings are the same for every verb, even the irregular ones; only the stem changes (see below).</p></div>
</section>

<section id="pt-imperfect"><h2>Imperfect tense</h2>
  <p class="sub">“I was speaking, I used to speak.”</p>
  <div class="ptpanel">
    <p class="ptrecipe"><span class="pt-s">nous-form stem</span><span class="plus">+</span><span class="pt-e">ending</span></p>
    <p>Take the ${L('nous')} form of the present, drop ${L('-ons')}, and add ${L('-ais, -ais, -ait, -ions, -iez, -aient')}. That is why ${L('finir')} keeps its ${L('-iss-')}: ${L('nous finissons')} gives ${L('je finissais')}.</p>
  </div>
  ${table('imp',allV)}
  ${note('The only odd stem is être.',`<p>${L('nous sommes')} would give ${L('som-')}, but the imperfect stem is ${L('ét-')}: ${L('j’étais, nous étions')}.</p>`)}
</section>

<section id="pt-irregular"><h2>Irregular verbs on the test</h2>
  <p class="sub">The present has to be learned. The future stem is the only change in the future, and the imperfect uses the ${L('nous')} stem.</p>
  <h3>Present</h3>${table('pres',['être','avoir','aller','faire','prendre'])}
  <h3>Future</h3>${table('fut',['être','avoir','aller','faire','prendre'])}
  <h3>Imperfect</h3>${table('imp',['être','avoir','aller','faire','prendre'])}
</section>

<section id="pt-english"><h2>Reading the English</h2>
  <p class="sub">The English wording tells you the tense before you write a letter.</p>
  <div class="ptscroll"><table class="plain"><thead><tr><th>English looks like</th><th>Tense</th><th>Example</th></tr></thead><tbody>
    <tr><td>I speak, I am speaking</td><td>present</td><td class="f">je parle</td></tr>
    <tr><td>will ___</td><td>future</td><td class="f">nous finirons</td></tr>
    <tr><td>was / were ___ing</td><td>imperfect</td><td class="f">ils vendaient</td></tr>
  </tbody></table></div>
  <p>Then match the subject to the ending: <b>you (sing.)</b> is ${L('tu')}, <b>you all</b> is ${L('vous')}, <b>he / she</b> is ${L('il / elle')}.</p>
</section>

<section id="pt-traps"><h2>Easy points to lose</h2>
  <ul class="pttraps">
    <li><b>Future endings are added to the infinitive.</b> ${L('je parlerai')}, not ${L('je parlai')}.</li>
    <li><b>-re verbs lose their e in the future.</b> ${L('vendrai')}, not ${L('vendreai')}.</li>
    <li><b>The imperfect of -ir verbs keeps -iss-.</b> ${L('je finissais')}, not ${L('je finais')}.</li>
    <li><b>${L('vous faites')} is irregular.</b> Not ${L('faisez')}. Same for ${L('vous êtes')}, not ${L('étez')}.</li>
    <li><b>${L('faire')} in the imperfect is ${L('faisais')}.</b> The ${L('fais-')} stem comes from ${L('nous faisons')}, spelled with ${L('ai')} even though it sounds like ${L('e')}.</li>
    <li><b>Accents matter.</b> ${L('tu es')} (you are) and ${L('êtes')}, ${L('prendrai')}, ${L('étais')}. A missing accent counts as a small slip unless you turn on the strict option.</li>
  </ul>
</section>`;

  return{
    groups:[{
      id:'pfi',title:'Present, future & imperfect verbs',blurb:'French verb test',
      pages:[
        {id:'pfi-test',kind:'test',test:'pfi',title:'Practice Test',blurb:'18 phrases to write in French: every person in the present, future and imperfect'},
        {id:'pfi-guide',kind:'guide',title:'Study Guide',blurb:'How each form is built, with the irregular verbs and the traps to avoid'}
      ]}],
    guide:{'pfi-guide':guide},
    tests,
    /* exposed so the checker can be tested without a browser */
    _engine:{forms,make,grade,VERBS}
  };
})();
