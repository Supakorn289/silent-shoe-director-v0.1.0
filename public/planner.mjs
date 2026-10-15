export const VERSION='0.1.5';
export const SHOE_TYPES={flipflop:'รองเท้าแตะหูคีบ',slide:'รองเท้าแตะแบบสวม',sneaker:'รองเท้าผ้าใบ',loafer:'รองเท้าคัทชู/โลฟเฟอร์',heel:'รองเท้าส้นสูง',other:'รองเท้าประเภทอื่น'};
export const TABLES={linen:{label:'ผ้าลินินสีครีม',en:'cream linen-covered tabletop, warm diffused window light, soft neutral shadows'},wood:{label:'โต๊ะไม้โทนอุ่น',en:'warm oak tabletop, gentle sunlight, subtle natural wood grain'},white:{label:'โต๊ะสตูดิโอสีขาว',en:'clean matte off-white studio product table, balanced shadow-free softbox light'},cafe:{label:'โต๊ะคาเฟ่มินิมอล',en:'minimalist café tabletop, warm ivory and wood palette, restrained decor'},stone:{label:'โต๊ะหินโทนพรีเมียม',en:'light beige stone tabletop, controlled high-end product lighting, restrained soft reflection'}};
export const NAILS={natural:{label:'ธรรมชาติ',en:'clean short natural nails, no polish'},nude:{label:'นู้ด',en:'short-to-medium nude polished nails'},red:{label:'แดงไวน์',en:'short glossy wine-red manicure'},french:{label:'เฟรนช์',en:'subtle French-tip manicure'},pink:{label:'ชมพูอ่อน',en:'pale pink glossy manicure'}};
export const SLEEVES={bare:{label:'แขนเปล่า',en:'bare wrists and forearms'},white:{label:'เสื้อเชิ้ตขาว',en:'clean white shirt cuffs'},knit:{label:'ไหมพรมครีม',en:'beige ribbed knit long sleeves'},sheer:{label:'แขนซีทรูขาว',en:'delicate translucent white long sleeves'},black:{label:'แขนยาวดำ',en:'minimal black long sleeves'}};
export const ACCESSORIES={none:{label:'ไม่มี',en:'no hand accessories'},bracelet:{label:'กำไลบาง',en:'single thin gold bracelet on one wrist'},ring:{label:'แหวนเรียบ',en:'one minimal ring, avoid obstructing product'},both:{label:'กำไล + แหวน',en:'subtle bracelet and simple thin ring'}};
export const SHOT_MODES={heroDetail:{label:'Hero → Detail',clips:['pair hero framing and smooth pickup','fine detail close-up and final product hold']},holdRotate:{label:'Hold → Rotate',clips:['careful pickup and held front/upper reveal','subtle tilt or controlled rotation showing supported angles']},pairSingle:{label:'Pair → Single Focus',clips:['both shoes arranged as original pair','one shoe lifted while other remains anchored on table']}};
export const DEMO_ACTIONS={showPair:{label:'โชว์รองเท้าทั้งคู่',summary:'เห็นทั้งคู่แบบชัดเจน',instruction:'Present the pair clearly before isolating any single shoe.',minHands:'one',preferredHands:'two'},singleHold:{label:'หยิบขึ้นมาโชว์',summary:'ยกขึ้นมาให้เห็นทรง',instruction:'Lift one shoe in a clean, stable hold with the silhouette fully legible.',minHands:'one',preferredHands:'one'},rotatePair:{label:'หมุน/เอียงรองเท้า',summary:'ขยับให้เห็นหลายมุม',instruction:'Use one physically plausible gentle rotation or tilt to reveal photographed angles without hiding the product.',minHands:'one',preferredHands:'two'},pressSoftness:{label:'กดให้ดูนุ่ม',summary:'กดเบา ๆ ให้เห็นการยุบตัวเล็กน้อย',instruction:'Gently press the upper or sidewall to suggest softness with light visible compression only.',minHands:'one',preferredHands:'one'},soleFlex:{label:'งอพื้นเบา ๆ',summary:'โชว์ความยืดหยุ่นแบบพอดี',instruction:'Apply only a light flex test of the sole if physically plausible for this shoe type; never fold aggressively.',minHands:'two',preferredHands:'two'},tapTogether:{label:'ชนรองเท้าเบา ๆ',summary:'แตะรองเท้าทั้งสองเข้าหากัน',instruction:'Softly tap the two shoes together once or twice in a controlled elegant movement.',minHands:'two',preferredHands:'two'},placePickup:{label:'วางลงแล้วหยิบขึ้น',summary:'เพิ่มจังหวะให้คลิปไม่แข็ง',instruction:'Place the shoe down neatly and pick it up again in one tidy controlled motion.',minHands:'one',preferredHands:'one'},detailTouch:{label:'แตะจุดเด่น / buckle / strap',summary:'ใช้นิ้วชี้จุดสำคัญ',instruction:'Use fingertips to point at or lightly touch the most important visible detail such as strap, buckle, stitching or texture.',minHands:'one',preferredHands:'one'}};
export const PHOTO_ROLES={
 overall:{name:'ภาพรองเท้าภาพรวม',role:'PRODUCT MASTER — exact pair silhouette, left/right orientation, dominant color, toe shape, straps, logos and markings',focus_th:'วิเคราะห์เฉพาะคู่รองเท้าโดยรวม เช่น ทรง สี หัวรองเท้า จำนวนชิ้นส่วน ตำแหน่งสาย และเครื่องหมายที่มองเห็นจริง',ignore_th:'เมินฉากหลัง พร็อพ มือ โต๊ะ และข้อความตกแต่งที่ไม่ใช่ตัวสินค้า',authority_th:'ใช้เป็นภาพสินค้าหลักที่มีสิทธิ์สูงสุดในการคุมตัวตนสินค้า'},
 side:{name:'ภาพรองเท้าด้านข้าง',role:'SIDE VIEW — real sidewall, heel height, profile, and observed shape (never infer unseen geometry)',focus_th:'วิเคราะห์โปรไฟล์ด้านข้าง ความหนาพื้น ความสูงส้น เส้นสายด้านข้าง และสัดส่วนข้างรองเท้า',ignore_th:'เมินองค์ประกอบอื่นที่ไม่ใช่รูปทรงด้านข้างของรองเท้า',authority_th:'ใช้เติมข้อมูลมุมข้างและสัดส่วนที่ภาพรวมอาจไม่ชัด'},
 detail:{name:'ภาพดีเทลรองเท้า',role:'DETAIL MACRO — only the actually visible stitching, strap attachment, texture, hardware and markings',focus_th:'วิเคราะห์เฉพาะจุดดีเทล เช่น พื้นผิว วัสดุ ตะเข็บ จุดต่อสาย หัวเข็มขัด โลโก้ และลายผิวที่เห็นจริง',ignore_th:'เมินรูปทรงส่วนที่อยู่นอกกรอบดีเทลและเมินองค์ประกอบประกอบฉาก',authority_th:'ใช้คุมรายละเอียดจุดใกล้และองค์ประกอบเล็กที่ต้องรักษาให้ตรง'},
 sole:{name:'ภาพพื้นรองเท้าด้านล่าง',role:'OUTSOLE — photographed tread pattern and sole appearance, not evidence of slip-resistance performance',focus_th:'วิเคราะห์เฉพาะพื้นรองเท้าด้านล่าง ลวดลาย ร่องดอกยาง และลักษณะผิวใต้พื้นเท่าที่เห็นจริง',ignore_th:'เมินการเคลมประสิทธิภาพที่พิสูจน์ไม่ได้ เช่น กันลื่นจริงแค่ไหน หรือทนทานแค่ไหน',authority_th:'ใช้คุม outsole และลายพื้นใต้รองเท้าเท่านั้น'},
 scene:{name:'ภาพฉากโต๊ะ',role:'SCENE MASTER — surface, props, composition, lighting direction and stable tabletop layout; do not use as product identity',focus_th:'วิเคราะห์โต๊ะ ฉาก พร็อพ ตำแหน่งของตกแต่ง แสง และบรรยากาศโดยรวมของพื้นที่รีวิว',ignore_th:'เมินการระบุตัวสินค้าเป็นหลัก และเมินรายละเอียดเล็กที่ไม่ส่งผลต่อ composition',authority_th:'ถ้ามีภาพฉากจริง ให้ภาพนี้มีสิทธิ์เหนือ preset ของ Table Scene'},
 hand:{name:'ภาพมืออ้างอิง',role:'HAND MODEL — nail style, sleeve and accessories identity; do not treat hand image as product identity',focus_th:'วิเคราะห์เฉพาะมือ เล็บ แขนเสื้อ โทนผิว แหวน กำไล และลักษณะการจัดวางมือ',ignore_th:'เมินสินค้าและฉากหลังในภาพมือ ยกเว้นใช้เพื่อเข้าใจการจับวัตถุคร่าว ๆ',authority_th:'ถ้ามีภาพมือจริง ให้ภาพนี้มีสิทธิ์เหนือ preset ของ Hand Model Styling'},
 endFrame:{name:'เฟรมสุดท้ายของคลิปแรก',role:'ACTUAL SH_01 FINAL FRAME — continuation state for the start of SH_02. Best as start-frame input when supported',focus_th:'วิเคราะห์ state สุดท้ายของช็อตก่อนหน้า เช่น มุมสินค้า ตำแหน่งมือ องค์ประกอบบนโต๊ะ แสง และตำแหน่งในเฟรม',ignore_th:'เมินการคาดเดาทิศทางการเคลื่อนไหวที่ภาพนิ่งพิสูจน์ไม่ได้',authority_th:'ใช้เป็นภาพเริ่มต้นของช็อตถัดไปเพื่อ continuity เมื่อเครื่องมือรองรับ start frame'}
};
const validImage=x=>typeof x==='string'&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/i.test(x);
const allowedDemoActionKeys=()=>Object.keys(DEMO_ACTIONS);
const dedupe=items=>[...new Set(items)];
export const initialProject=()=>({format:'SILENT_SHOE_DIRECTOR_PROJECT',schemaVersion:1,appVersion:VERSION,product:{name:'',type:'flipflop',color:'',facts:'',identityRules:'',price:''},studio:{table:'linen',nail:'nude',sleeve:'knit',accessory:'bracelet',handCount:'two',demoActions:['showPair','rotatePair','detailTouch'],lighting:'soft',motion:'minimal',style:'heroDetail',clipCount:2,clipDuration:8,model:'gemini-3.5-flash-lite'},references:{overall:null,side:null,detail:null,sole:null,scene:null,hand:null,endFrame:null},analyses:{},aiPlan:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
export const safeText=(v,n=400)=>String(v??'').slice(0,n);
export function normalizedProject(input){
 const initial=initialProject();if(!input||typeof input!=='object')return initial;
 const product={...initial.product,...(input.product||{})}, studio={...initial.studio,...(input.studio||{})};
 const refs={...initial.references};for(const k of Object.keys(refs)){const item=input.references?.[k];if(item&&typeof item==='object'){const dataUrl=validImage(item.dataUrl)?item.dataUrl:null;refs[k]={fileName:safeText(item.fileName,240),dataUrl,note:safeText(item.note,3000),unavailable:Boolean(item.unavailable)};}}
 studio.clipCount=Number(studio.clipCount)===1?1:2;studio.clipDuration=Number(studio.clipDuration)===10?10:8;for(const [k,map,fallback] of [['table',TABLES,'linen'],['nail',NAILS,'nude'],['sleeve',SLEEVES,'knit'],['accessory',ACCESSORIES,'bracelet'],['style',SHOT_MODES,'heroDetail']])if(!map[studio[k]])studio[k]=fallback;
 if(!SHOE_TYPES[product.type])product.type='other';
 studio.handCount=studio.handCount==='one'?'one':'two';studio.motion=['static','minimal','gentle'].includes(studio.motion)?studio.motion:'minimal';
 studio.lighting=['soft','daylight','studio'].includes(studio.lighting)?studio.lighting:'soft';
 const allowed=allowedDemoActionKeys();
 const requested=Array.isArray(studio.demoActions)?studio.demoActions.filter(x=>allowed.includes(x)):[];
 studio.demoActions=dedupe(requested).slice(0,6); if(!studio.demoActions.length)studio.demoActions=[...(studio.handCount==='two'?['showPair','rotatePair','detailTouch']:['singleHold','detailTouch'])];
 return {...initial,...input,product,studio,references:refs,analyses:input.analyses&&typeof input.analyses==='object'?input.analyses:{},aiPlan:input.aiPlan||null,format:initial.format,schemaVersion:1,appVersion:VERSION};
}
export function handDirection(studio){return `${studio.handCount==='one'?'one adult hand':'two adult hands'}, ${NAILS[studio.nail].en}; ${SLEEVES[studio.sleeve].en}; ${ACCESSORIES[studio.accessory].en}. Show only hands and forearms, never elbows above mid-forearm, face, head, torso, legs or feet. Natural five-finger anatomy.`}
export function selectedDemoActions(project){const p=normalizedProject(project);return p.studio.demoActions.map(key=>({key,...DEMO_ACTIONS[key]})).filter(x=>x.label)}
export function demoActionSummary(project){const p=normalizedProject(project);const actions=selectedDemoActions(p);return actions.length?actions.map(x=>x.label).join(' · '):'ไม่มี action เพิ่มเติม'}
function shoeBehaviorGuidance(type){
 switch(type){
  case 'flipflop': return 'Open sandal / flip-flop logic: preserve thong or open-front structure and do not twist the sole aggressively.';
  case 'slide': return 'Slide / clog logic: keep the wide upper and entry opening intact; gentle press or light flex is acceptable only if supported by the product photos.';
  case 'sneaker': return 'Sneaker logic: preserve the structured upper; avoid extreme flex or compression.';
  case 'loafer': return 'Loafer logic: preserve structure and clean lines; avoid softness demos that collapse the silhouette.';
  case 'heel': return 'Heel logic: protect the heel geometry and balance; avoid tap or bend actions that look unsafe.';
  default: return 'Unknown shoe category: favor conservative elegant handling and avoid exaggerated material tests.';
 }
}
function isActionAllowed(project,key){
 const p=normalizedProject(project), handCount=p.studio.handCount, type=p.product.type;
 if(!DEMO_ACTIONS[key])return false;
 if(DEMO_ACTIONS[key].minHands==='two'&&handCount!=='two')return false;
 if(type==='heel'&&['tapTogether','soleFlex'].includes(key))return false;
 if(type==='loafer'&&['pressSoftness','soleFlex'].includes(key))return false;
 return true;
}
function materialGuard(project){
 const p=normalizedProject(project), blocked=p.studio.demoActions.filter(x=>!isActionAllowed(p,x));
 const kept=p.studio.demoActions.filter(x=>isActionAllowed(p,x));
 return {kept:kept.length?kept:[p.studio.handCount==='two'?'showPair':'singleHold','detailTouch'].filter(x=>DEMO_ACTIONS[x]),blocked};
}
function actionBeatText(project,index){
 const p=normalizedProject(project), {kept}=materialGuard(p), two=p.studio.handCount==='two';
 const has=k=>kept.includes(k);
 const actionOpen=has('showPair')?(two?'Show the full pair clearly, one shoe per hand or both visible on table before pickup.':'Show the full pair or anchored pair state clearly before isolating one shoe.'):'Start with a stable clean product arrangement.';
 const mid=[];
 if(has('singleHold'))mid.push('lift one shoe into a stable hero hold');
 if(has('rotatePair'))mid.push(two?'rotate or tilt the pair in a controlled two-hand presentation':'apply one gentle rotation/tilt of the lifted shoe');
 if(has('pressSoftness'))mid.push('lightly press the upper or sidewall to suggest softness');
 if(has('soleFlex'))mid.push('demonstrate only a light sole flex without folding');
 if(has('tapTogether'))mid.push('softly tap the two shoes together once or twice');
 if(has('placePickup'))mid.push('place the shoe down neatly then pick it up again');
 if(has('detailTouch'))mid.push('use fingertips to point at one verified detail');
 const middle=mid.length?mid.join(', then '):'keep the product stable and legible';
 const end=index===0?'end in a steady final pose that can continue into the next shot':'settle into a tidy final pose without drifting composition';
 return [
  `0–2s: ${actionOpen}`,
  `2–5s: ${middle}.`,
  `5–8s: ${end}.`
 ];
}
// Duration is explicit, never inferred from the number of shots. Eight-second projects retain their original three beats.
function durationBeats(p,index,beats){
 if(p.studio.clipDuration!==10)return beats;
 const detail=index===0
  ? 'Hold the same continuous composition for a readable close study of one REAL photographed identifying feature (toe shape, strap attachment or visible texture). Move the shoe gently, without changing grip, inventing a new angle or adding a cut.'
  : 'Keep the actual carry-over grip, table and lighting; dwell on one verified visible product detail in the same take. Maintain clean hands and do not reveal unseen sides or unsupported features.';
 return [beats[0],beats[1],`5–8s: ${detail}`,beats[2].replace(/^5–8s:/,'8–10s:')];
}
export function shotSpec(project,index){
 const p=normalizedProject(project), count=p.studio.clipCount;
 const style=SHOT_MODES[p.studio.style];
 const one=count===1;
 const beats=durationBeats(p,index,actionBeatText(p,index));
 const actionSummary=demoActionSummary(p);
 return index===0?{
 id:'SH_01',title:one?'รีวิวช็อตเดียว · Hero + Detail':'เปิดตัวสินค้า · จับและโชว์',intent:one?'One take: show hero shape then one supported detail':'Establish exact shoe identity and present carefully',
 focus:one?'overview and one selected visible detail':'overall',
 beats,
 motion:'locked-off / very slow shallow push-in only when it improves visibility',continuity:`Opening shot. Establish same hands, manicure, sleeves, accessories and entire tabletop for shot 2. Selected demo actions: ${actionSummary}.`,recommended:['overall','scene','hand']
 }: {id:'SH_02',title:style.label+' · รายละเอียดต่อเนื่อง',intent:style.clips[1],focus:p.studio.style==='pairSingle'?'single while second shoe stays anchored':'supported shape, upper texture and details',beats:[
 `0–2s: Begin with the same shoe orientation, hand-contact points, sleeves, bracelet and table composition as SH_01 final frame (if actual frame uploaded).`,
 `2–5s: ${beats[1].replace(/^2–5s: /,'')} Keep product identity dominant and avoid undocumented reveals.`,
  ...(p.studio.clipDuration===10?[
   `5–8s: ${beats[2].replace(/^5–8s: /,'')} Continue without cuts or an unsupported reveal.`,
    `8–10s: ${beats[3].replace(/^8–10s: /,'')} Use the same hand identity and calm tabletop atmosphere; settle the actual final frame for the next clip.`
   ]:[`5–8s: ${beats[2].replace(/^5–8s: /,'')} Use the same hand identity and calm tabletop atmosphere.`])
 ],
 motion:'minimal stable product-follow; no automatic zoom oscillation',continuity:'Use the actual uploaded SH_01 final frame when available. Carry hand contact points, product orientation, table props, and warm light forward. No location change.',recommended:['overall','scene','hand','detail','side','endFrame']};
}
export function referencePlan(project,index){
 const p=normalizedProject(project),shot=shotSpec(p,index);const selected=['overall','scene'];
 if(index>0){if(p.studio.style==='holdRotate')selected.push('side');else selected.push('detail');}
 if(p.references.hand?.dataUrl)selected.push('hand');
 if(index>0){selected.push('detail','side','endFrame')}
 if(p.studio.style==='heroDetail'&&index===0 &&p.references.detail?.dataUrl)selected.push('detail');
 const all=[...new Set(selected)].map((key)=>{
 const ref=p.references[key];const available=Boolean(validImage(ref?.dataUrl)&&safeText(ref?.fileName).trim());
 const required=key==='overall';return {key,name:PHOTO_ROLES[key].name,role:PHOTO_ROLES[key].role,required,kind:key==='endFrame'?'start_frame':'ingredient',available,fileName:available?ref.fileName:null,dataUrl:available?ref.dataUrl:null,missingReason:!available?key==='endFrame'?'ยังไม่ได้อัปโหลดเฟรมสุดท้ายจริง':ref?.unavailable?'ผู้ใช้เลือกไม่มีภาพนี้':'ยังไม่ได้อัปโหลดรูป':''};
 });
 let i=0;for(const r of all){if(r.available)r.imageLabel=`Image ${String.fromCharCode(65+i++)}`;else r.imageLabel=null}
 return {all,available:all.filter(x=>x.available),missing:all.filter(x=>!x.available),missingRequired:all.filter(x=>x.required&&!x.available),shot};
}
export function referenceManifest(project,index){const ref=referencePlan(project,index);const lines=[`IMAGE REFERENCE MANIFEST FOR ${ref.shot.id} — attach these REAL image files in the order listed:`];if(!ref.available.length)lines.push('NO ACTUAL PHOTOS ATTACHED. Do not pretend they exist.');
 for(const x of ref.available)lines.push(`${x.imageLabel} — "${x.fileName}"
ROLE: ${x.role}
INPUT MODE: ${x.kind==='start_frame'?'Prefer first-frame image-to-video mode if supported; otherwise an actual additional reference photo':'ingredient/reference photo'}`);
 if(ref.missing.length){lines.push('REFERENCE IMAGES NOT PROVIDED (do NOT claim attached):');for(const x of ref.missing)lines.push(`- ${x.name} (${x.key}): ${x.missingReason}${x.required?' [PRODUCT MASTER REQUIRED FOR HIGH-FIDELITY]':''}`)}
 lines.push('Important: filenames are reference labels, not automatic attachments. The user must select real image files in Google Flow/Veo. If the chosen mode accepts fewer references, prioritize the product master and the relevant scene; use a real prior final frame as start frame when supported.');return lines.join('\n\n')}
function viewLocks(p){const c=p.product,notes=Object.entries(p.analyses||{}).filter(([k,v])=>v&&v.observedDetails_th?.length).map(([k,v])=>`${k} OBSERVED: ${v.observedDetails_th.slice(0,7).join('; ')}. UNKNOWN: ${(v.unknownDetails_th||[]).slice(0,5).join('; ')}`);
 return [`Product name: ${safeText(c.name,150)||'Unspecified shoe'}`,`Type: ${SHOE_TYPES[c.type]}`,`User-described color: ${safeText(c.color,200)||'not specified; keep actual master image color'}`,`User-supplied product facts (not independent verification): ${safeText(c.facts,2500)||'none'}`,`Specific locked details described by user: ${safeText(c.identityRules,1800)||'none'}`,`AI per-photo observations (only where inspected): ${notes.join(' | ')||'not inspected; use visible references conservatively'}`,`Price is contextual metadata only and must NEVER be shown as text in video: ${safeText(c.price,80)||'unspecified'}`].join('\n')}
export function composePrompt(project,index){
 const p=normalizedProject(project),spec=shotSpec(p,index),ref=referencePlan(p,index),st=p.studio;
 const dir=p.aiPlan?.shots?.find(x=>x.id===spec.id)||{};
 const motion=st.motion==='static'?'tripod locked, near-zero camera travel':st.motion==='gentle'?'very gentle intentional product-follow movements only':'minimal micro-motion, camera mostly locked';
 const env=p.references.scene?.dataUrl?'Use the real SCENE photo as the authoritative tabletop setting; do not substitute a new room.':`No uploaded table scene photo. Use a ${TABLES[st.table].en}. A descriptive preset is NOT an uploaded image.`;
 const extra=Object.entries(p.analyses).filter(([k,a])=>a?.shotSuggestions_th?.length).map(([k,a])=>`${k}: ${a.shotSuggestions_th.slice(0,3).join('; ')}`).join(' | ');
 const {kept,blocked}=materialGuard(p);
 const actionLines=kept.map(k=>`- ${DEMO_ACTIONS[k].instruction}`);
 const guardLines=[
  '- Keep all actions elegant, product-led and physically plausible.',
  '- Never squeeze, bend or strike the shoes so hard that the silhouette collapses or fidelity drifts.',
  '- Hands must not cover the main identifying features for more than a moment.',
  '- No toy-like exaggerated movement, no comedy shaking, no chaotic motion.',
  `- ${shoeBehaviorGuidance(p.product.type)}`,
  ...(blocked.length?[`- Requested but blocked by guardrails: ${blocked.map(k=>DEMO_ACTIONS[k].label).join(', ')}. Replace with a safer elegant hold or detail touch.`]:[])
 ];
 const lines=[referenceManifest(p,index),'',`SILENT SHOE DIRECTOR — ${spec.id} · VERTICAL 9:16 · ${st.clipDuration} SECONDS`,`One continuous tabletop shoe product shot. STRICTLY SILENT: no speech, voice-over, music, audible sound effects, ambient audio, sound track, subtitles, captions, artificial on-screen text, price tags, call-to-action overlays or watermarks. Preserve only product branding that is physically present in the source photos; do not invent or rewrite logos.`,
 `PRODUCT FIDELITY (highest priority):\n${viewLocks(p)}`,
 `ENVIRONMENT LOCK: ${env} Keep this exact tabletop background throughout the clip; no try-on room, no people beyond hands, no cut to other locations. ${st.lighting==='daylight'?'Diffused daylight.':st.lighting==='studio'?'Controlled neutral studio softbox.':'Soft smooth attractive product lighting.'}`,
 `HAND IDENTITY LOCK: ${handDirection(st)} ${p.references.hand?.dataUrl?'The uploaded actual hand photo is authoritative for visible nails, sleeves, skin tone and accessories; preset styling is only a fallback and MUST NOT override that photo.':'No actual hand image supplied; follow the user selected styling presets.'} Use the same hands for the entire shot and across any second clip. No accidental changes in nail color, jewelry or sleeve style.`,
 `HAND / PAIR SETUP: ${st.handCount==='two'?'Use two hands when useful, ideally one shoe per hand for pair demonstrations.':'Use a single hand as the main performer; if a second hand appears at all, it must not become dominant.'}`,
 `PRODUCT DEMO ACTIONS SELECTED: ${kept.map(k=>DEMO_ACTIONS[k].label).join(' · ')}. Execute only actions supported by the real photos:\n${actionLines.join('\n')}`,
 `ACTION SAFETY GUARD:\n${guardLines.join('\n')}`,
 `SHOT INTENT: ${spec.intent}. ${dir.visualAction_en?`DIRECTOR-SUGGESTED ACTION (subject to photo evidence): ${safeText(dir.visualAction_en,1200)}.`:''}`,
 `SHOT TIMELINE (follow in the same take):\n${spec.beats.join('\n')}`,
 `CAMERA: ${motion}; ${spec.motion}. ${dir.camera_en?`Additional director note: ${safeText(dir.camera_en,700)}`:''} Shoe silhouette must be legible; hands never hide the distinctive detail. Avoid excessive zoom in-out, jitter and violent rotation.`,
 `PHYSICAL CONTINUITY: ${spec.continuity} ${index===1&&!ref.available.some(x=>x.key==='endFrame')?'Actual previous final frame NOT supplied yet. Do not claim to match a non-existent still. Use only planned matching action and product identity.':''}`,
 extra?`EVIDENCE-BASED SHOT IDEAS: ${extra}`:'',
 `NEGATIVE: face, head, full body, feet wearing shoes, spoken presenter, voiceover, narration, music, singing, audio, subtitles, TikTok caption, promo text, generated letters, unrelated story, shifting background, extra shoes, mirror-swapped left/right pair, mutated outsole, hallucinated heel or strap, deformed fingers, extra fingers, impossible grip, product color drift, strange camera transition.`
 ];return lines.filter(Boolean).join('\n\n')}
export function createProduction(project){const p=normalizedProject(project);return {name:p.product.name||'Shoe Review',app:'Silent Shoe Director',version:VERSION,format:'SILENT_SHOE_DIRECTOR_FLOW_PACK',direction:'Tabletop-only · hands only · silent · no overlays',clipDurationSeconds:p.studio.clipDuration,shots:Array.from({length:p.studio.clipCount},(_,i)=>({id:`SH_0${i+1}`,seconds:p.studio.clipDuration,title:shotSpec(p,i).title,referencePlan:referencePlan(p,i).all.map(({dataUrl,...rest})=>rest),prompt:composePrompt(p,i)})),createdAt:new Date().toISOString()}}
export function validateImport(raw){if(!raw||raw.format!=='SILENT_SHOE_DIRECTOR_PROJECT'||raw.schemaVersion!==1)throw Error('ไฟล์ Import ไม่ใช่ Silent Shoe Director schema v1');
 const json=JSON.stringify(raw);if(json.length>52*1024*1024)throw Error('ไฟล์โปรเจกต์ใหญ่เกิน 52MB');
 for(const k of Object.keys(raw.references||{})){if(!Object.hasOwn(PHOTO_ROLES,k))throw Error(`พบ role รูปภาพที่ไม่รู้จัก: ${k}`);const d=raw.references[k]?.dataUrl;if(d&&!validImage(d))throw Error(`รูป ${k} ไม่ใช่ภาพ PNG/JPG/WebP ที่รองรับ`)}return normalizedProject(raw)}
