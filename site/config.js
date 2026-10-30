/* ---------- Mots: everything about this site that isn't grammar ----------
   The shared code (index.html, keys.html, getkey.html, css/ and js/) is identical on every practice site.
   This folder, site/, holds what differs: this file (names, text, lists), cat.js (the tutor cat and its AI prompts),
   language.js (how the language behaves in the shared code), engine.js (sentences and grading), uses.js and theme.css. */
const SITE={
  id:"mots", // the folder name; prefix for this language's saved progress (mots.xp) and for keys like mots-onboarded
  name:"Mots", title:"Mots · French practice with Félicien",
  langKey:"fr", // where this language's progress sits in the shared account document (Verba: null, the top level)
  cat:"Félicien", catDir:"felicien", catV:"1", // the tutor cat: name, img/<catDir>/, and the image version (bump it to refresh caches)
  proudFace:"delighted", // the face shown when setup is done
  board:"boardfr", otherBoard:"board", // this site's Firestore leaderboard, and the one checked before freeing a username
  acctIcon:"castle", // game-icons symbol on the Account button (the sprite in index.html has them all)
  limitDefault:false, // whether the bar's checkbox (#limit) starts ticked
  confetti:['#B23A26','#2D5193','#C8901A','#4E7A2E','#E9DEC7'],
  laurea:["Couronne", "crown: completed AP French"], honors:["Honores", "honors"], // [word, meaning] for the AP tag and the honors heading
  pageAccent:"#2D5193", pageButton:"#B23A26" // link and button colours on keys.html and getkey.html
};
const LANG_NAME="French";
/* text the shared code drops into its messages; {word|meaning} marks a hover definition */
const TXT={
  onbHello:"{Bonjour !|hello!} I’m {Félicien|my name (it comes from Felix, “lucky”)}, your French tutor cat and Fēlix’s cousin. Let’s get you set up. It takes about 5 minutes.",
  onbAlso:" (Already use Verba for Latin or Palabras for Spanish? Your key and account work here too.)",
  onbLogin:"I have a Verba, Palabras or Mots account: log in",
  onbDone:"{Très bien !|very good!} You’re all set. Here are a few tricks before you start.",
  onbTyping:`<li>Type accents with the buttons, or type e/ → é, e\\ → è, e^ → ê, e" → ë and c\\ → ç (the same for a, i, o and u).</li>
   `,
  onbBack:"{Re-bonjour !|hello again!} Log in and I’ll bring back your XP, streak and settings. Verba and Palabras accounts work here too.",
  helloAgain:"{Re-bonjour !|hello again!}",
  useOf:"use of ",
  wellDone:"{Bien joué !|well done!}",
  onFire:"{Bravo !|well done!} You're on fire!",
  whoIsnt:"Mots (and Verba)",
  loginHint:"Capital letters and accents don’t matter: “Sofía” can log in as “sofia”. Your Verba username works here too.",
  sameAccount:"This is the same account as Verba (Latin).",
  famous:"Famous figures",
  usernameHint:"Accents and capitals are fine: “Sofía” and “sofia” count as the same name. Your username is shared with Verba.",
  mottoEg:"e.g. Petit à petit, l’oiseau fait son nid (little by little, the bird builds its nest)",
  apToast:"{Couronne|crown} earned! You finished AP French. {Bien joué !|well done!}",
  usePlaceholder:"Type the use, like “location” or “purpose”",
  xcHint:"Name why one word is used for bonus XP.",
  marks:"accents",
  markMatters:"the accent mark",
  diffForm:"a different form or word",
  anyOrder:"",
  award:()=>`<b>${LWS('Couronne','crown')}</b><br>For completing AP French Language. Your crown shows beside your name on the French leaderboard and your profile.`
};
/* pieces of index.html (filled in by js/site-fill.js) */
const HTML={
  nav:"<a class=\"brand\" href=\"./\" aria-label=\"Mots home\"><svg class=\"gi\" aria-hidden=\"true\"><use href=\"#gi-quill-ink\"/></svg><b class=\"lw\" data-en=\"words\">Mots</b><span>Français</span></a><a class=\"langsw alllang\" href=\"../linguae/\" title=\"Linguae: every language site, with one account\">All languages</a><a class=\"langsw\" href=\"../verba/\" title=\"Same account, separate XP: practice Latin on Verba\">Latin ↗</a><a class=\"langsw\" href=\"../palabras/\" title=\"Same account, separate XP: practice Spanish on Palabras\">Spanish ↗</a>",
  boardTitle:"French leaderboard",
  heroP:"Sentences built fresh from French I through AP French. Earn XP, keep your streak alive, and ask Félicien when you're stuck.",
  heroBubble:"<span class=\"lw\" tabindex=\"0\" data-en=\"hello!\">Bonjour</span> ! I'm <span class=\"lw\" tabindex=\"0\" data-en=\"my name (it comes from Felix, “lucky”)\">Félicien</span>, Fēlix's French cousin. Pick some topics and <span class=\"lw\" tabindex=\"0\" data-en=\"let's go!\">allons-y</span> !",
  usesTab:"Why this form?",
  chartsTitle:"Charts for this sentence",
  usesHead:"Why this form? <span class=\"hint\">Uses of the passé composé, the imparfait, avoir or être, the subjunctive, y and en. Closed on every new problem; opening one voids extra credit for it.</span>",
  macLabel:"Insert an accented letter",
  macHint:"or type e/ → é, e\\ → è, e^ → ê, e\" → ë and c\\ → ç (the same for a, i, o, u)",
  credits:"Icons by Lorc and Delapouite from <a href=\"https://game-icons.net\" target=\"_blank\" rel=\"noopener\">game-icons.net</a> (CC BY 3.0). Félicien is Fēlix from <a href=\"../verba/\">Verba</a>, dressed for French class (beret, stripes and a baguette). Theme switch after Adam Argyle (web.dev, Apache 2.0) with Feather Icons. Confetti by <a href=\"https://github.com/catdad/canvas-confetti\" target=\"_blank\" rel=\"noopener\">canvas-confetti</a>. Read the <a href=\"https://github.com/janavduraikkannan/Verba/blob/main/PRIVACY.md\" target=\"_blank\" rel=\"noopener\">privacy statement</a> (shared by Verba, Palabras and Mots) before making an account.",
  limit:"<label title=\"Show questions with inversion (Parles-tu …?) instead of est-ce que. Both, and intonation, are always accepted.\"><input type=\"checkbox\" id=\"limit\"> Questions with inversion</label>"
};
/* ---------- courses and topics ---------- */
const LEVELS=[['I','French I'],['II','French II'],['III','French III'],['IV','French IV'],['AP','AP French Language']];
const TAUGHT=new Set([]); // topics covered in the class notes (to be filled in from the notes)
const COURSE={I:'French I',II:'French II',III:'French III',IV:'French IV',AP:'AP French Language'};
const COURSES=[['','Not set'],['I','French I'],['I+','French I – completed'],['II','French II'],['II+','French II – completed'],['III','French III'],['III+','French III – completed'],['IV','French IV'],['IV+','French IV – completed'],['AP','AP French Language'],['AP+','AP French Language – completed']];
const COURSE_SHORT={I:'French I',II:'French II',III:'French III',IV:'French IV',AP:'AP French'};
/* ---------- ranks and badges ---------- */
const RANKS=[['Élève','student'],['Apprenti','apprentice'],['Voyageur','traveler'],['Explorateur','explorer'],['Causeur','conversationalist'],['Conteur','storyteller'],['Poète','poet'],['Sage','sage'],['Maître','master'],['Légende','legend']];
const RANK_INFO=['Every French speaker starts here.','Learning the basics, one verb at a time.','Ready for a trip: you can order, ask and get around.','Off the beaten path, trying new tenses.','You can keep a real conversation going.','You can tell a whole story in the past.','Your French has style.','You know why every form is the way it is.','A master of the language.','A legend, the top rank on Mots. Levels keep going from here.'];
/* [icon, word, meaning, what earns it, earned?] for a profile's honors */
const BADGES=(r,place,wplace,lv,best)=>[['laurel-crown','Couronne','crown','Completed AP French',r.course==='AP+'],['trophy','Champion de la semaine','champion of the week','#1 on this week’s leaderboard',wplace===1],['trophy','Podium','podium','Top 3 of all time',place>0&&place<=3],
    ['castle','Causeur','conversationalist','Reached Level 5',lv>=5],['castle','Maître','master','Reached Level 9',lv>=9],['laurel-crown','Légende','legend','Reached Level 10',lv>=10],
    ['fluffy-flame','Trois jours','three days','A 3-day streak',best>=3],['fluffy-flame','Une semaine','one week','A 7-day streak',best>=7],['fluffy-flame','Un mois','one month','A 30-day streak',best>=30],['fluffy-flame','Cent jours','a hundred days','A 100-day streak',best>=100],
    ['round-star','Mille','a thousand','1,000 XP',r.xp>=1000],['round-star','Dix mille','ten thousand','10,000 XP',r.xp>=10000]];
/* ---------- profiles: animal names, pictures and banners ---------- */
const ANIMALS=[['Loup','wolf'],['Renard','fox'],['Ours','bear'],['Aigle','eagle'],['Lion','lion'],['Cheval','horse'],['Corbeau','raven'],['Colombe','dove'],['Dauphin','dolphin'],['Cerf','stag'],['Hibou','owl'],['Taureau','bull'],['Lièvre','hare'],['Oie','goose'],['Chat','cat'],['Abeille','bee']];
/* Profile pictures: freely licensed photos from Wikimedia Commons (credits are loaded live from Commons), or your own upload. */
const PICS=[
  {id:'hugo',n:'Victor Hugo',g:'fig',f:['Victor Hugo by Étienne Carjat 1876 - full.jpg','Victor Hugo by Étienne Carjat 1876.jpg'],pos:'50% 25%'},
  {id:'curie',n:'Marie Curie',g:'fig',f:['Marie Curie c1920.jpg','Marie Curie c. 1920s.jpg'],pos:'50% 25%'},
  {id:'moliere',n:'Molière',g:'fig',f:['Molière Mignard Chantilly.jpg','Moliere2.jpg'],pos:'50% 25%'},
  {id:'monet',n:'Claude Monet',g:'fig',f:['Claude Monet 1899 Nadar crop.jpg','Claude Monet 1899 Nadar.jpg'],pos:'50% 25%'},
  {id:'jeanne',n:'Jeanne d’Arc',g:'fig',f:['Joan of Arc miniature graded.jpg','Jeanne d\'Arc - Panthéon III.jpg'],pos:'50% 30%'},
  {id:'napoleon',n:'Napoléon',g:'fig',f:['Jacques-Louis David - The Emperor Napoleon in His Study at the Tuileries - Google Art Project.jpg'],pos:'50% 20%'},
  {id:'chanel',n:'Coco Chanel',g:'fig',f:['Coco Chanel, 1920.jpg'],pos:'50% 25%'},
  {id:'eiffel',n:'Tour Eiffel',g:'place',f:['Tour Eiffel Wikimedia Commons.jpg','Eiffel Tower from the Champ de Mars, Paris 2014.jpg'],pos:'50% 50%'},
  {id:'louvre',n:'The Louvre',g:'place',f:['Louvre Museum Wikimedia Commons.jpg','Louvre 2007 02 24 c.jpg'],pos:'50% 50%'},
  {id:'montstmichel',n:'Mont-Saint-Michel',g:'place',f:['Mont-Saint-Michel vu du ciel.jpg','Mont Saint-Michel 2007.jpg'],pos:'50% 50%'},
  {id:'arc',n:'Arc de Triomphe',g:'place',f:['Arc de Triomphe, Paris 21 October 2010.jpg','Arc de Triomphe.jpg'],pos:'50% 50%'},
  {id:'notredame',n:'Notre-Dame de Paris',g:'place',f:['Notre-Dame de Paris 2013-07-24.jpg','Notre Dame de Paris DSC 0846w.jpg'],pos:'50% 50%'},
  {id:'versailles',n:'Versailles',g:'place',f:['Chateau Versailles Galerie des Glaces.jpg','Château de Versailles, Galerie des Glaces.jpg'],pos:'50% 50%'},
  {id:'frontenac',n:'Château Frontenac, Québec',g:'place',f:['Château Frontenac 03.jpg','Chateau Frontenac 01.jpg'],pos:'50% 50%'}];
const BANNERS=[['c:blue','#2D4D8F','Bleu'],['c:red','#B23A26','Rouge'],['c:gold','#C8901A','Or'],['c:green','#3F7A3A','Vert'],['c:purple','#6B2D5C','Violet'],['c:stone','#8C8273','Pierre']];
