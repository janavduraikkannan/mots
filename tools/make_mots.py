"""One-time conversion of Palabras (Spanish) into Mots (French). Kept for reference: run it on a fresh copy of
Palabras' index.html to see exactly what changed. The French sentence engine lives in engine.js and is inlined here."""
import re, sys

src = open(sys.argv[1]).read()
eng = open(sys.argv[2]).read()
s = src

def rep(old, new, count=1):
    global s
    n = s.count(old)
    if n != count:
        raise SystemExit(f'expected {count}, found {n}: {old[:90]!r}')
    s = s.replace(old, new)

def rep_line(start, new):
    """replace the one whole line that starts with `start`"""
    global s
    lines = s.split('\n')
    hits = [i for i, l in enumerate(lines) if l.startswith(start)]
    if len(hits) != 1:
        raise SystemExit(f'line start {start[:60]!r}: {len(hits)} hits')
    lines[hits[0]] = new
    s = '\n'.join(lines)

# ---------- the engine ----------
a = s.index('<script id="engine">'); b = s.index('</script>', a)
s = s[:a] + '<script id="engine">\n' + eng.replace('if(typeof module!==\'undefined\')module.exports', 'if(typeof module!==\'undefined\'&&typeof window===\'undefined\')module.exports') + '\n' + s[b:]

# ---------- head, colours, header ----------
rep('<title>Palabras · Spanish practice with Felicísimo</title>', '<title>Mots · French practice with Félicien</title>')
rep('<link rel="icon" href="img/felicisimo/happy.svg?v=1" type="image/svg+xml">', '<link rel="icon" href="img/felicien/happy.svg?v=1" type="image/svg+xml">')
rep('--accent:#B23A26; --accent-ink:#FFF6E8; --accent-shadow:#701F12; --accent2:#2D5193; --accent2-ink:#FFFFFF; --brand:#2D5193;',
    '--accent:#2D4D8F; --accent-ink:#FFF6E8; --accent-shadow:#16284F; --accent2:#B23A26; --accent2-ink:#FFFFFF; --brand:#26375F;')
rep('--accent:#E07A58; --accent-ink:#1E1B17; --accent-shadow:#7E3A22; --accent2:#8FB0E6; --accent2-ink:#111A2C; --brand:#8FB0E6;',
    '--accent:#8FB0E6; --accent-ink:#111A2C; --accent-shadow:#2D4D8F; --accent2:#E07A58; --accent2-ink:#1E1B17; --brand:#8FB0E6;')
rep('<a class="brand" href="./" aria-label="Palabras home"><svg class="gi" aria-hidden="true"><use href="#gi-guitar"/></svg><b class="lw" data-en="words">Palabras</b><span>Español</span></a><a class="langsw alllang" href="../learnlanguage/" title="Linguae: every language site, with one account">All languages</a><a class="langsw" href="../verba/" title="Same account, separate XP: practice Latin on Verba">Latin ↗</a>',
    '<a class="brand" href="./" aria-label="Mots home"><svg class="gi" aria-hidden="true"><use href="#gi-quill-ink"/></svg><b class="lw" data-en="words">Mots</b><span>Français</span></a><a class="langsw alllang" href="../linguae/" title="Linguae: every language site, with one account">All languages</a><a class="langsw" href="../verba/" title="Same account, separate XP: practice Latin on Verba">Latin ↗</a><a class="langsw" href="../palabras/" title="Same account, separate XP: practice Spanish on PALABRAS_KEEP">Spanish ↗</a>')
rep('<span class="rank" id="hudRank">Estudiante</span>', '<span class="rank" id="hudRank">Élève</span>')
rep('Spanish leaderboard <span class="live off"', 'French leaderboard <span class="live off"')
rep('<option value="I">Spanish I</option><option value="II">Spanish II</option><option value="III">Spanish III Honors</option><option value="IV">Spanish IV Honors</option><option value="AP">AP Spanish Language</option><option value="done">Finished Spanish</option>',
    '<option value="I">French I</option><option value="II">French II</option><option value="III">French III</option><option value="IV">French IV</option><option value="AP">AP French Language</option><option value="done">Finished French</option>')

# ---------- hero, drill, footer, bar ----------
rep('<img class="felixbig" src="img/felicisimo/delighted.svg?v=1" alt="Felicísimo, the Palabras cat">', '<img class="felixbig" src="img/felicien/delighted.svg?v=1" alt="Félicien, the Mots cat">')
rep("<h1>Learn Spanish by <em>writing</em> it.</h1>", "<h1>Learn French by <em>writing</em> it.</h1>")
rep("<p>Sentences built fresh from Spanish I through AP Spanish. Earn XP, keep your streak alive, and ask Felicísimo when you're stuck.</p>",
    "<p>Sentences built fresh from French I through AP French. Earn XP, keep your streak alive, and ask Félicien when you're stuck.</p>")
rep_line('        <div class="bubble" id="heroBubble">',
    '        <div class="bubble" id="heroBubble"><span class="lw" tabindex="0" data-en="hello!">Bonjour</span> ! I\'m <span class="lw" tabindex="0" data-en="my name (it comes from Felix, “lucky”)">Félicien</span>, Fēlix\'s French cousin. Pick some topics and <span class="lw" tabindex="0" data-en="let\'s go!">allons-y</span> !</div>')
rep('<h2>Why this form? <span class="hint">Uses of ser, estar, por, para, the preterite, the imperfect and the subjunctive. Closed on every new problem; opening one voids extra credit for it.</span></h2>',
    '<h2>Why this form? <span class="hint">Uses of the passé composé, the imparfait, avoir or être, the subjunctive, y and en. Closed on every new problem; opening one voids extra credit for it.</span></h2>')
rep("<span class=\"hint\" id=\"machint\">or type ' after a vowel (a' → á) and ~ after n (n~ → ñ)</span>",
    "<span class=\"hint\" id=\"machint\">or type e/ → é, e\\ → è, e^ → ê, e\" → ë and c\\ → ç (the same for a, i, o, u)</span>")
rep('<div class="felixcol"><img id="felix" src="img/felicisimo/happy.svg?v=1" alt="Felicísimo looking happy"><b>Felicísimo</b><small>AI tutor cat</small></div>',
    '<div class="felixcol"><img id="felix" src="img/felicien/happy.svg?v=1" alt="Félicien looking happy"><b>Félicien</b><small>AI tutor cat</small></div>')
rep('Felicísimo is Fēlix from <a href="../verba/">Verba</a>, dressed for Spanish class.', 'Félicien is Fēlix from <a href="../verba/">Verba</a>, dressed for French class (beret, stripes and a baguette).')
rep('<label><input type="radio" name="mode" value="e2l" checked> English to Spanish</label>', '<label><input type="radio" name="mode" value="e2l" checked> English to French</label>')
rep('<label><input type="radio" name="mode" value="l2e"> Spanish to English</label>', '<label><input type="radio" name="mode" value="l2e"> French to English</label>')
rep('<label title="Also use vosotros, the “you all” of Spain. Ustedes is always accepted."><input type="checkbox" id="limit"> Use vosotros (Spain)</label>',
    '<label title="Show questions with inversion (Parles-tu …?) instead of est-ce que. Both, and intonation, are always accepted."><input type="checkbox" id="limit"> Questions with inversion</label>')

# ---------- UI constants and storage ----------
rep("const LEVELS=[['I','Spanish I'],['II','Spanish II'],['III','Spanish III Honors'],['IV','Spanish IV Honors'],['AP','AP Spanish Language']];",
    "const LEVELS=[['I','French I'],['II','French II'],['III','French III'],['IV','French IV'],['AP','AP French Language']];")
rep("/* Accounts are shared with Verba (Latin): the profile, login and AI settings are global; XP, levels, streaks and topics belong to Spanish only. */",
    "/* Accounts are shared with Verba (Latin) and PALABRAS_KEEP (Spanish): the profile, login and AI settings are global; XP, levels, streaks and topics belong to French only. */")
rep("const LANG='es',", "const LANG='fr',")
rep("const SK=k=>(GLOBAL_KEYS.includes(k)?'verba.':'palabras.')+k;", "const SK=k=>(GLOBAL_KEYS.includes(k)?'verba.':'mots.')+k;")
rep("const capES=s=>String(s).replace(/^([¿¡\\u0001]*)(\\p{L})/u,(m,a,b)=>a+b.toUpperCase());", "const capES=s=>String(s).replace(/^([\\u0001]*)(\\p{L})/u,(m,a,b)=>a+b.toUpperCase());")
rep("// Spanish words with hover definitions. In fixed text, write {Spanish|English}; AI replies send a word→meaning map instead.",
    "// French words with hover definitions. In fixed text, write {French|English}; AI replies send a word→meaning map instead.")
rep("LANG_KEYS.forEach(k=>{const v=readLS('palabras.'+k);if(v!==undefined)l[k]=v});", "LANG_KEYS.forEach(k=>{const v=readLS('mots.'+k);if(v!==undefined)l[k]=v});")
rep("/* The account document holds Verba's Latin progress at the top level, the shared profile and settings, and each other language under its own key (\"es\"). */",
    "/* The account document holds Verba's Latin progress at the top level, the shared profile and settings, and each other language under its own key (\"es\", \"fr\"). */")
rep("LANG_KEYS.forEach(k=>{if(k in r){try{localStorage.setItem('palabras.'+k,JSON.stringify(r[k]))}catch(e){}}});", "LANG_KEYS.forEach(k=>{if(k in r){try{localStorage.setItem('mots.'+k,JSON.stringify(r[k]))}catch(e){}}});")

# ---------- onboarding ----------
s = s.replace("{face:'fish',", "{face:'delighted',").replace("onbFace('fish')", "onbFace('delighted')")
rep(" {face:'delighted',say:'{¡Hola!|hello!} I’m {Felicísimo|super happy (my name; feliz means happy)}, your Spanish tutor cat and Fēlix’s cousin. Let’s get you set up. It takes about 5 minutes.',",
    " {face:'delighted',say:'{Bonjour !|hello!} I’m {Félicien|my name (it comes from Felix, “lucky”)}, your French tutor cat and Fēlix’s cousin. Let’s get you set up. It takes about 5 minutes.',")
rep('<h2 id="onbTitle">Practice Spanish sentences, one at a time</h2>', '<h2 id="onbTitle">Practice French sentences, one at a time</h2>')
rep('<p>Pick the topics your class has covered, translate sentences between English and Spanish, and earn XP for a daily streak.</p>', '<p>Pick the topics your class has covered, translate sentences between English and French, and earn XP for a daily streak.</p>')
rep('(Already use Verba for Latin? Your key and account work here too.)', '(Already use Verba for Latin or PALABRAS_KEEP for Spanish? Your key and account work here too.)')
rep('I have a Verba or Palabras account: log in', 'I have a Verba, PALABRAS_KEEP or Mots account: log in')
rep(" {face:'delighted',say:'{¡Muy bien!|very good!} You’re all set. Here are a few tricks before you start.',", " {face:'delighted',say:'{Très bien !|very good!} You’re all set. Here are a few tricks before you start.',")
rep('<li>Hover over (or tap) a Spanish word with a dotted underline to see what it means.</li>', '<li>Hover over (or tap) a French word with a dotted underline to see what it means.</li>')
rep("<li>Type accents with the buttons, or type ' after a vowel (a' → á) and ~ after n (n~ → ñ).</li>", "<li>Type accents with the buttons, or type e/ → é, e\\\\ → è, e^ → ê, e\" → ë and c\\\\ → ç (the same for a, i, o and u).</li>")
rep("{face:'happy',say:'{¡Hola otra vez!|hello again!} Log in and I’ll bring back your XP, streak and settings. Verba accounts work here too.',",
    "{face:'happy',say:'{Re-bonjour !|hello again!} Log in and I’ll bring back your XP, streak and settings. Verba and PALABRAS_KEEP accounts work here too.',")
rep("latH('{¡Hola otra vez!|hello again!}", "latH('{Re-bonjour !|hello again!}")
rep("toast('happy','{¡Hola otra vez!|hello again!} Your progress is loaded.')", "toast('happy','{Re-bonjour !|hello again!} Your progress is loaded.')")
rep("toast('laughing',`${stats.streak} in a row! {¡Olé!|bravo!}, you're on fire!`)", "toast('laughing',`${stats.streak} in a row! {Bravo !|well done!} You're on fire!`)")

# ---------- AI prompts ----------
rep_line("  const t=await aiChat([{role:'system',content:'You grade Spanish translation exercises",
    "  const t=await aiChat([{role:'system',content:'You grade French translation exercises for a high school student. The reference answer is known to be correct. Mark the student correct only if their sentence means the same as the reference: same subject, person, number, tense, mood, and same objects. Accept any valid phrasing, synonym or natural word order, either English article, and normal regional variants (déjeuner or dîner as Quebec and France use them, voiture or auto, portable or cellulaire). All three ways of asking a question are fine: est-ce que, inversion (Parles-tu …?) and rising intonation (Tu parles … ?), and ne may be dropped only in English to French answers if everything else is right, but then name it as informal in the reason. tu or vous are both fine for you unless the English says formal or plural; vous is right for you all. Ignore capitalization, punctuation, the space before ? ! : ; and whether hyphens are typed. A missing or wrong accent mark does not make an answer wrong unless it turns the word into a different word or form (ou versus où, a versus à, la versus là, du versus dû, parle versus parlé); in that case it is wrong. Missing elision (je aime, le école) and missing contraction (à le, de les) are wrong. Forgive obvious spelling typos (swapped, missing, doubled or extra letters) when the intended word is clear and the slip does not create a different real word or a different grammatical form; still mark it correct and name the typo in the reason. A difference in gender or number agreement (including a past participle that must agree, elle est allée), tense, person or mood is never a typo: le maison, allé for allée, and finis for finisse are wrong. In English to French, the passé composé and the imparfait are not interchangeable when the English makes the meaning clear, avoir and être are not interchangeable as helping verbs, the subjunctive is required where the reference uses it, and un, une, du, de la or des become de after a negative (je n’ai pas de chat). Object pronouns go before the verb they belong to (je le vois, je vais le voir). '+")
rep("    'In the reason, mark every Spanish word or phrase as {Spanish|short English meaning}, for example {comió|ate (he/she)}. Reply only with JSON, with the keys in this order: {\"compare\": \"very short word-by-word check, e.g. comio=comió accent only ok; libros~libro wrong number\", \"correct\": true or false, \"reason\": \"one short sentence for the student\"}.'},",
    "    'In the reason, mark every French word or phrase as {French|short English meaning}, for example {a mangé|ate (he/she)}. Reply only with JSON, with the keys in this order: {\"compare\": \"very short word-by-word check, e.g. ecole=école accent only ok; livre~livres wrong number\", \"correct\": true or false, \"reason\": \"one short sentence for the student\"}.'},")
rep("{role:'user',content:`Direction: ${c.e2l?'English to Spanish':'Spanish to English'}", "{role:'user',content:`Direction: ${c.e2l?'English to French':'French to English'}")
rep_line("const MOODS={happy:", "const MOODS={happy:'friendly default',delighted:'excited: a great question, or the student is on the right track, or proud and triumphant when they nail a tricky one',laughing:'something funny, or a silly mix-up',adoring:'the student did something impressive or thanked you',sly:'a teasing hint or playful nudge, or you caught a question fishing for the answer',cheeky:'warm and encouraging, a little affectionate',shocked:'surprised: a big mistake or a tricky exception',sad:'sympathetic: the student is struggling or got it wrong',grumpy:'mock-grumpy about French irregular verbs, silent letters, or being asked for the answer outright'};")
rep("const GREET_MOODS=['happy','delighted','cheeky','sly','fish'];", "const GREET_MOODS=['happy','delighted','cheeky','sly'];")
rep("const REACT_MOODS={ok:['happy','delighted','adoring','fish','laughing'],", "const REACT_MOODS={ok:['happy','delighted','adoring','laughing'],")
rep_line('const PERSONA="You are Felicísimo,',
    'const PERSONA="You are Félicien, the cheerful cat mascot of Mots, a French practice site. You are the French cousin of Fēlix, the Latin cat of Verba (Félicien is a real French name that comes from Felix, which means lucky or happy). You wear a red beret and a striped shirt and carry a baguette. Be warm, encouraging and a little playful, with the occasional light cat pun, but keep every explanation accurate, clear and short. You always choose the expression Félicien shows, as \\"mood\\", from this list: "+Object.entries(MOODS).map(([k,v])=>k+\' (\'+v+\')\').join(\', \')+". You may sprinkle in a French word or short phrase now and then, playfully or in context (for example bonjour !, très bien !, bravo !, attention !, courage !). Mark EVERY French word or phrase in your reply text, including words quoted from the exercise, right where it appears, as {French|short English meaning}, for example: {Très bien !|very good!}, the ending of {ils mangent|they eat} is silent, and {elle est allée|she went} uses être, so the participle agrees. Mark each French word or phrase separately, keep the French inside the braces exactly as you want it shown (with accents), and never put quotation marks, braces or a | inside the English part. Do not mark English words, and do not use this markup in any other JSON field. Before the student has submitted, give only a word\'s general dictionary meaning in the English part, never its translation within the exercise or which form it takes in it. ";')
rep_line('const GREETINGS=[',
    'const GREETINGS=["{Bonjour !|hello!} I\'m {Félicien|my name}. Stuck on a verb? Ask me anything about the grammar.","{Bienvenue !|welcome!} Curiosity never hurt this cat. What would you like to know?","Nine lives, and I\'ve spent every one of them conjugating verbs. Ask away!","Purr-haps a question about the passé composé? I\'m all ears (both of them).","My cousin Fēlix does Latin and Felicísimo does Spanish. I do French. Ask me anything!","Tip from a wise cat: ask about the rules, not the answer, and your score stays safe.","Need a paw with this one? General grammar questions are always free.","{Attention !|watch out!} Accents can change a word: {où|where} is not {ou|or}.","{Salut !|hi!} Ready to {écrire|to write} some French?","{Courage !|you\'ve got this!} Questions about grammar are always welcome."];')
rep_line('const THINKING=[',
    'const THINKING=["{Félicien|my name} is flipping through the dictionary","Sharpening claws on the subjunctive","Asking the other cats at the {boulangerie|bakery}","Chasing a silent letter around the room","Conjugating very carefully","Checking with {l’Académie française|the French Academy}","Pawing through the verb charts","Napping on it for a second","{Je réfléchis|I\'m thinking}… whiskers twitching","{Petit à petit|little by little}: checking carefully","{Un instant !|one moment!} The answer is on the tip of my tongue"];')
rep("const COURSE={I:'Spanish I',II:'Spanish II',III:'Spanish III Honors',IV:'Spanish IV Honors',AP:'AP Spanish Language'};", "const COURSE={I:'French I',II:'French II',III:'French III',IV:'French IV',AP:'AP French Language'};")
rep_line(' I:"This is a Spanish I exercise',
    ' I:"This is a French I exercise, so be LIGHT about what counts as leading; beginners are expected to ask lots of questions about forms. NOT leading (judge as fine): how a verb conjugates or a noun or adjective changes, including a word from this sentence, when the student names the form they want or proposes it themselves (for example \'is the nous form of manger mangeons?\' or \'livre is masculine, so is it le livre?\'); confirming the student\'s own reasoning about an ending, gender, agreement, elision or accent; general grammar; what a construction does; vocabulary meanings; how to approach the sentence. TOO leading only if the student asks you to: give the answer or translate any part of the sentence; decide which person, tense, gender or number a word needs in THIS sentence (the choice itself, not the form once chosen); decide between two words or articles for THIS sentence; or check, correct, confirm or fill in their draft.",')
rep_line(' II:"This is a Spanish II exercise',
    ' II:"This is a French II exercise, so be MODERATE about what counts as leading. NOT leading: how a verb conjugates when the student names the form or proposes it themselves; confirming the student\'s own reasoning about a paradigm; general grammar, including the general rules for the passé composé versus the imparfait, avoir versus être, and where object pronouns go; vocabulary meanings; how to approach the sentence. TOO leading: asking for the answer or any part of the translation; asking which tense, helping verb, person or pronoun THIS sentence needs; asking for a form of a word in the sentence without naming which form; or asking you to check, correct, confirm or fill in their draft.",')
rep_line(' III:"This is a Spanish III Honors exercise',
    ' III:"This is a French III exercise, so be FIRM about what counts as leading; students should know their forms. NOT leading: general grammar, how a construction works in general (for example when the subjunctive is used), vocabulary meanings, how to approach the sentence. TOO leading: asking for the answer or any part of the translation; asking for or confirming any specific form of a word from this sentence; asking whether THIS sentence needs the subjunctive, which tense, or which construction; or asking you to check, correct, confirm or fill in their draft.",')
rep_line(' IV:"This is a Spanish IV Honors exercise',
    ' IV:"This is a French IV exercise, so be FIRM about what counts as leading; students should know their forms. NOT leading: general grammar, how a construction works in general, vocabulary meanings. TOO leading: asking for the answer or any part of the translation; asking for or confirming any specific form of a word from this sentence; asking which mood, tense or construction anything in this sentence needs; or asking you to check, correct, confirm or fill in their draft.",')
rep_line(' AP:"This is an AP Spanish Language exercise',
    ' AP:"This is an AP French Language exercise, so be STRICT about what counts as leading. NOT leading: general grammar and vocabulary meanings. TOO leading: anything that resolves part of this specific exercise, including any form, mood, tense, construction or translation of something in it, or checking, correcting, confirming or filling in their draft."};')
rep('You are tutoring a high school Spanish student.', 'You are tutoring a high school French student.')
rep("q.mode==='id'?'identify the use (of ser, estar, por, para, the preterite, the imperfect or the subjunctive) that a highlighted Spanish word shows'",
    "q.mode==='id'?'identify the use (of the passé composé, the imparfait, avoir or être as the helping verb, the subjunctive, y or en) that a highlighted French word shows'")
rep("c.e2l?'translate English into Spanish':'translate Spanish into English'", "c.e2l?'translate English into French':'translate French into English'")

# ---------- Félicien's pictures ----------
rep("const FV='?v=1',felixImg=m=>`img/felicisimo/${FACES[m]?m:'happy'}.svg${FV}`,faceImg=m=>`img/felicisimo/face-${FACES[m]?m:'happy'}.svg${FV}`;",
    "const FV='?v=1',felixImg=m=>`img/felicien/${FACES[m]?m:'happy'}.svg${FV}`,faceImg=m=>`img/felicien/face-${FACES[m]?m:'happy'}.svg${FV}`;")
rep("f.alt=`Felicísimo looking ${m}`", "f.alt=`Félicien looking ${m}`")

# ---------- charts ----------
a = s.index("const PRS=['yo',"); b = s.index("function renderCharts(qq){")
s = s[:a] + r'''const PRS=['je','tu','il, elle, on','nous','vous','ils, elles'];
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
''' + s[b:]
rep("  $('cbody').classList.toggle('novos',!VOS);\n", "")

# ---------- ranks, courses, awards ----------
rep_line("const RANKS=[['Estudiante'", "const RANKS=[['Élève','student'],['Apprenti','apprentice'],['Voyageur','traveler'],['Explorateur','explorer'],['Causeur','conversationalist'],['Conteur','storyteller'],['Poète','poet'],['Sage','sage'],['Maître','master'],['Légende','legend']];")
rep_line("const COURSES=[['','Not set']", "const COURSES=[['','Not set'],['I','French I'],['I+','French I – completed'],['II','French II'],['II+','French II – completed'],['III','French III'],['III+','French III – completed'],['IV','French IV'],['IV+','French IV – completed'],['AP','AP French Language'],['AP+','AP French Language – completed']];")
rep("const COURSE_SHORT={I:'Spanish I',II:'Spanish II',III:'Spanish III',IV:'Spanish IV',AP:'AP Spanish'};", "const COURSE_SHORT={I:'French I',II:'French II',III:'French III',IV:'French IV',AP:'AP French'};")
rep_line("const ANIMALS=[['Lobo'", "const ANIMALS=[['Loup','wolf'],['Renard','fox'],['Ours','bear'],['Aigle','eagle'],['Lion','lion'],['Cheval','horse'],['Corbeau','raven'],['Colombe','dove'],['Dauphin','dolphin'],['Cerf','stag'],['Hibou','owl'],['Taureau','bull'],['Lièvre','hare'],['Oie','goose'],['Chat','cat'],['Abeille','bee']];")
rep("${LWS('Corona','crown: completed AP Spanish')}", "${LWS('Couronne','crown: completed AP French')}")
a = s.index("const PICS=["); b = s.index("const PIC=Object.fromEntries")
s = s[:a] + '''const PICS=[
  {id:'hugo',n:'Victor Hugo',g:'fig',f:['Victor Hugo by Étienne Carjat 1876 - full.jpg','Victor Hugo by Étienne Carjat 1876.jpg'],pos:'50% 25%'},
  {id:'curie',n:'Marie Curie',g:'fig',f:['Marie Curie c1920.jpg','Marie Curie c. 1920s.jpg'],pos:'50% 25%'},
  {id:'moliere',n:'Molière',g:'fig',f:['Molière Mignard Chantilly.jpg','Moliere2.jpg'],pos:'50% 25%'},
  {id:'monet',n:'Claude Monet',g:'fig',f:['Claude Monet 1899 Nadar crop.jpg','Claude Monet 1899 Nadar.jpg'],pos:'50% 25%'},
  {id:'jeanne',n:'Jeanne d’Arc',g:'fig',f:['Joan of Arc miniature graded.jpg','Jeanne d\\'Arc - Panthéon III.jpg'],pos:'50% 30%'},
  {id:'napoleon',n:'Napoléon',g:'fig',f:['Jacques-Louis David - The Emperor Napoleon in His Study at the Tuileries - Google Art Project.jpg'],pos:'50% 20%'},
  {id:'chanel',n:'Coco Chanel',g:'fig',f:['Coco Chanel, 1920.jpg'],pos:'50% 25%'},
  {id:'eiffel',n:'Tour Eiffel',g:'place',f:['Tour Eiffel Wikimedia Commons.jpg','Eiffel Tower from the Champ de Mars, Paris 2014.jpg'],pos:'50% 50%'},
  {id:'louvre',n:'The Louvre',g:'place',f:['Louvre Museum Wikimedia Commons.jpg','Louvre 2007 02 24 c.jpg'],pos:'50% 50%'},
  {id:'montstmichel',n:'Mont-Saint-Michel',g:'place',f:['Mont-Saint-Michel vu du ciel.jpg','Mont Saint-Michel 2007.jpg'],pos:'50% 50%'},
  {id:'arc',n:'Arc de Triomphe',g:'place',f:['Arc de Triomphe, Paris 21 October 2010.jpg','Arc de Triomphe.jpg'],pos:'50% 50%'},
  {id:'notredame',n:'Notre-Dame de Paris',g:'place',f:['Notre-Dame de Paris 2013-07-24.jpg','Notre Dame de Paris DSC 0846w.jpg'],pos:'50% 50%'},
  {id:'versailles',n:'Versailles',g:'place',f:['Chateau Versailles Galerie des Glaces.jpg','Château de Versailles, Galerie des Glaces.jpg'],pos:'50% 50%'},
  {id:'frontenac',n:'Château Frontenac, Québec',g:'place',f:['Château Frontenac 03.jpg','Chateau Frontenac 01.jpg'],pos:'50% 50%'}];
''' + s[b:]
rep_line("const BANNERS=[['c:red'", "const BANNERS=[['c:blue','#2D4D8F','Bleu'],['c:red','#B23A26','Rouge'],['c:gold','#C8901A','Or'],['c:green','#3F7A3A','Vert'],['c:purple','#6B2D5C','Violet'],['c:stone','#8C8273','Pierre']];")
rep("hex(await sha('palabras-chain:'+acct.key+':'+i))", "hex(await sha('mots-chain:'+acct.key+':'+i))")
s = s.replace("boardes", "boardfr")
rep_line("const RANK_INFO=['Every Spanish speaker", "const RANK_INFO=['Every French speaker starts here.','Learning the basics, one verb at a time.','Ready for a trip: you can order, ask and get around.','Off the beaten path, trying new tenses.','You can keep a real conversation going.','You can tell a whole story in the past.','Your French has style.','You know why every form is the way it is.','A master of the language.','A legend, the top rank on Mots. Levels keep going from here.'];")
s = s.replace("LWS('Leyenda','legend')", "LWS('Légende','legend')").replace("'Progress to Leyenda'", "'Progress to Légende'")
rep("asked Felicísimo a question", "asked Félicien a question")
rep_line("  const B=[['laurel-crown','Corona'", "  const B=[['laurel-crown','Couronne','crown','Completed AP French',r.course==='AP+'],['trophy','Champion de la semaine','champion of the week','#1 on this week’s leaderboard',wplace===1],['trophy','Podium','podium','Top 3 of all time',place>0&&place<=3],")
rep("['castle','Conversador','conversationalist','Reached Level 5',lv>=5],['castle','Maestro','master','Reached Level 9',lv>=9],['laurel-crown','Leyenda','legend','Reached Level 10',lv>=10],",
    "['castle','Causeur','conversationalist','Reached Level 5',lv>=5],['castle','Maître','master','Reached Level 9',lv>=9],['laurel-crown','Légende','legend','Reached Level 10',lv>=10],")
rep("['fluffy-flame','Tres días','three days','A 3-day streak',best>=3],['fluffy-flame','Una semana','one week','A 7-day streak',best>=7],['fluffy-flame','Un mes','one month','A 30-day streak',best>=30],['fluffy-flame','Cien días','a hundred days','A 100-day streak',best>=100],",
    "['fluffy-flame','Trois jours','three days','A 3-day streak',best>=3],['fluffy-flame','Une semaine','one week','A 7-day streak',best>=7],['fluffy-flame','Un mois','one month','A 30-day streak',best>=30],['fluffy-flame','Cent jours','a hundred days','A 100-day streak',best>=100],")
rep("['round-star','Mil','a thousand','1,000 XP',r.xp>=1000],['round-star','Diez mil','ten thousand','10,000 XP',r.xp>=10000]", "['round-star','Mille','a thousand','1,000 XP',r.xp>=1000],['round-star','Dix mille','ten thousand','10,000 XP',r.xp>=10000]")
rep("<dt>Spanish course</dt>", "<dt>French course</dt>")
rep('<label class="pf">Spanish course <span class="opt">', '<label class="pf">French course <span class="opt">')
rep("<p class=\"hint\">Pick “completed” if you finished that course and aren’t taking Spanish anymore.</p>", "<p class=\"hint\">Pick “completed” if you finished that course and aren’t taking French anymore.</p>")
rep('<label class="pf">Motto <span class="opt">optional · shown on your profile, Spanish welcome</span><input id="pMotto" maxlength="80" value="${esc(p.motto)}" placeholder="e.g. Poco a poco se va lejos (little by little, you go far)"></label>',
    '<label class="pf">Motto <span class="opt">optional · shown on your profile, French welcome</span><input id="pMotto" maxlength="80" value="${esc(p.motto)}" placeholder="e.g. Petit à petit, l’oiseau fait son nid (little by little, the bird builds its nest)"></label>')
rep("<b>${LWS('Corona','crown')}</b><br>For completing AP Spanish Language. Your crown shows beside your name on the Spanish leaderboard and your profile.",
    "<b>${LWS('Couronne','crown')}</b><br>For completing AP French Language. Your crown shows beside your name on the French leaderboard and your profile.")
rep("toast('adoring','{Corona|crown} earned! You finished AP Spanish. {¡Bien hecho!|well done!}')", "toast('adoring','{Couronne|crown} earned! You finished AP French. {Bien joué !|well done!}')")

# ---------- identify mode, accents ----------
rep("level:{ser:'I',estar:'I',por:'II',para:'II',pret:'II',impf:'II',subj:'III'}[TYPES[ty].c]", "level:{pc:'II',imp:'II',aux:'II',y:'II',en:'II',subj:'III'}[TYPES[ty].c]")
rep("return makeQuestion(selected.size?selected:new Set(['serest']));", "return makeQuestion(selected.size?selected:new Set(['pcimp']));")
rep("if(!types.length)types=Object.keys(TYPES).filter(x=>!/^sj/.test(x)||[...selected].some(t=>/^sj|ojala/.test(t)));", "if(!types.length)types=Object.keys(TYPES).filter(x=>!/^sj/.test(x)||[...selected].some(t=>/^sj/.test(t)));")
rep_line("const normU=s=>", "const normU=s=>String(s||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z ]/g,' ').replace(/\\b(passe compose|imparfait|imperfect|subjunctive|subjonctif|subj|the|use|usage|of|a|an|it|is|its|this|type|for a|for an|helping verb|auxiliary|pronoun)\\b/g,' ').replace(/\\s+/g,' ').trim();")
rep("const[a,b]=spanIdx(qq,tok),pre=qq.end==='?'?'¿':qq.end==='!'?'¡':'';", "const[a,b]=spanIdx(qq,tok),pre='';")
rep_line("const MAC={", "const MAC={'e/':'é','E/':'É','a\\\\':'à','e\\\\':'è','u\\\\':'ù','A\\\\':'À','E\\\\':'È','U\\\\':'Ù','a^':'â','e^':'ê','i^':'î','o^':'ô','u^':'û','A^':'Â','E^':'Ê','I^':'Î','O^':'Ô','U^':'Û','e\"':'ë','i\"':'ï','u\"':'ü','E\"':'Ë','I\"':'Ï','U\"':'Ü','c\\\\':'ç','C\\\\':'Ç','e´':'é','a`':'à','e`':'è','u`':'ù'};")
rep("$('macrons').innerHTML=['á','é','í','ó','ú','ñ','ü','¿','¡'].map(", "$('macrons').innerHTML=['é','è','ê','ë','à','â','ç','î','ï','ô','û','ù','œ'].map(")
rep("$('askq').addEventListener('input',e=>accType(e.target,'~´'));", "$('askq').addEventListener('input',e=>accType(e.target,'´`'));")
rep("if(/^(el|la|los|las) \\S+$/.test(plain))laW=plain.split(' ')[1];", "if(/^(le|la|les) \\S+$/.test(plain))laW=plain.split(' ')[1];else if(/^l[’'][^\\s]+$/.test(plain))laW=plain.slice(2);")

rep("{¡Bien hecho!|well done!}", "{Bien joué !|well done!}")
rep("placeholder=\"Type the whole sentence in ${e2l?'Spanish':'English'}\"", "placeholder=\"Type the whole sentence in ${e2l?'French':'English'}\"")
# ---------- the rest of the names ----------
s = s.replace("'palabras-onboarded'", "'mots-onboarded'")
s = s.replace('Felicísimo', 'Félicien').replace('img/felicisimo/', 'img/felicien/')
s = re.sub(r'\bPalabras\b', 'Mots', s).replace('PALABRAS_KEEP', 'Palabras')
open(sys.argv[3], 'w').write(s)
print('ok', len(src), '->', len(s))
