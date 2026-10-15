import http from 'node:http';
import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {normalizedProject,initialProject,VERSION,composePrompt,shotSpec} from './public/planner.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const publicRoot=path.resolve(root,'public');
const skillRoot=path.resolve(root,'skills');
const host=process.env.HOST||'127.0.0.1';
const port=Number(process.env.PORT||3035);
const apiKey=process.env.GEMINI_API_KEY||'';
const defaultModel=process.env.GEMINI_MODEL||'gemini-3.5-flash-lite';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
const send=(res,status,body)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(JSON.stringify(body))};
async function bodyOf(req,limit=22*1024*1024){
 if(req.body!==undefined && req.body!==null){
  const value=req.body;
  let raw;
  if(Buffer.isBuffer(value))raw=value.toString('utf8');
  else if(typeof value==='string')raw=value;
  else if(typeof value==='object'){
   if(Buffer.byteLength(JSON.stringify(value),'utf8')>limit)throw Object.assign(new Error('คำขอ JSON มีขนาดเกินที่รองรับ'),{status:413});
   return value;
  }
  else throw Object.assign(new Error('รูปแบบ request body ไม่ถูกต้อง'),{status:400});
  if(Buffer.byteLength(raw,'utf8')>limit)throw Object.assign(new Error('คำขอ JSON มีขนาดเกินที่รองรับ'),{status:413});
  try{return JSON.parse(raw||'{}')}catch{throw Object.assign(new Error('รูปแบบ JSON ไม่ถูกต้อง'),{status:400})}
 }
 return new Promise((resolve,reject)=>{let chunks=[],length=0;req.on('data',chunk=>{length+=chunk.length;if(length>limit){reject(Object.assign(new Error('ส่งรูป/ข้อมูลเกินขนาด 22 MB ต่อหนึ่งคำขอ'),{status:413}));req.destroy();return}chunks.push(chunk)});req.on('end',()=>{try{resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}'))}catch{reject(Object.assign(new Error('รูปแบบ JSON ไม่ถูกต้อง'),{status:400}))}});req.on('error',reject)})}
async function skillsFor(stage){const names=stage==='vision'?['shoe-truth.md','silent-review.md']:['shoe-truth.md','silent-review.md','hand-styling.md','micro-continuity.md'];const chunks=await Promise.all(names.map(async name=>(await readFile(path.join(skillRoot,name),'utf8')).slice(0,2500)));return names.map((n,i)=>`## SKILL ${n}\n${chunks[i]}`).join('\n\n')}
function decodeImage(value){const m=/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/i.exec(value||'');if(!m||m[2].length>12_000_000)throw Object.assign(new Error('รูปต้องเป็น PNG/JPG/WebP ขนาดไม่เกินประมาณ 9MB'),{status:400});return {mimeType:m[1],data:m[2]}}
function parseJson(raw){let text=String(raw||'').trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');try{return JSON.parse(text)}catch{throw Object.assign(new Error('Gemini ตอบ JSON ไม่ครบหรือผิดรูปแบบ กรุณาลองอีกครั้ง'),{status:502,code:'INVALID_GEMINI_JSON'})}}
async function gemini({prompt,image,model,maxOutputTokens=3000}){
 if(!apiKey)throw Object.assign(new Error('ยังไม่ได้กำหนด GEMINI_API_KEY; โหมดสร้าง Prompt แบบไม่ใช้ AI ยังทำงานได้'),{status:400});
 const chosen=String(model||defaultModel).trim();if(!/^gemini-[\w.\-]+$/.test(chosen))throw Object.assign(new Error('ชื่อ Gemini model ไม่ถูกต้อง'),{status:400});
 const endpoint=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(chosen)}:generateContent`;
 const parts=[{text:prompt}];if(image)parts.push({inlineData:decodeImage(image)});
 let response;
 for(let attempt=0;attempt<2;attempt++){
  try{response=await fetch(endpoint,{method:'POST',headers:{'x-goog-api-key':apiKey,'content-type':'application/json'},body:JSON.stringify({contents:[{role:'user',parts}],generationConfig:{responseMimeType:'application/json',maxOutputTokens}}),signal:AbortSignal.timeout(22000)})}
  catch(e){throw Object.assign(new Error('ติดต่อ Gemini ไม่สำเร็จ: '+e.message),{status:503})}
  if(response.ok)break;
  if(response.status===503&&attempt===0){await new Promise(r=>setTimeout(r,1500));continue}break;
 }
 if(!response.ok){const raw=await response.text();let message='';try{message=JSON.parse(raw).error?.message||''}catch{};
  const detail=response.status===429?'Gemini API ถึงโควตาหรือ rate limit (429) ตรวจ quota ของ API key หรือรอเวลา reset':response.status===503?'Gemini กำลังโหลดสูง (503) โปรดลองใหม่ภายหลัง':response.status===404?'โมเดลนี้ไม่พร้อมใช้งานใน API key ของคุณ กรุณาเลือกโมเดลอื่น':'Gemini API error';
  throw Object.assign(new Error(`${detail}: ${message.slice(0,480)}`),{status:response.status>=400&&response.status<500?response.status:502,code:'GEMINI_ERROR'});
 }
 const data=await response.json();const candidate=data.candidates?.[0];if(candidate?.finishReason==='MAX_TOKENS')throw Object.assign(new Error('Gemini ตัดคำตอบเพราะ maxOutputTokens; ลองลดข้อมูลใน Prompt'),{status:502});
 return {data:parseJson((candidate?.content?.parts||[]).map(p=>p.text||'').join('')),model:chosen};
}
function enforceStringArray(value,limit=9){return Array.isArray(value)?value.slice(0,limit).map(x=>String(x).slice(0,260)):[]}
async function vision(req,res){const b=await bodyOf(req);const role=String(b.role||'overall');const allowed=new Set(['overall','side','detail','sole','scene','hand','endFrame']);if(!allowed.has(role))return send(res,400,{error:'image role ไม่ถูกต้อง'});
 const p=normalizedProject(b.project||initialProject());const skill=await skillsFor('vision');const name=p.references[role]?.fileName||'uploaded_image';
 const task=role==='overall'?'Inspect only the actual shoe pair as the product identity anchor: silhouette, color, left-right orientation, toe shape, straps, logos and visible markings. Ignore props, table styling and hands unless they block the shoe.':role==='side'?'Inspect only the side profile of the shoe: sidewall shape, heel height, sole thickness, profile curve and visible hardware positions. Ignore non-product decor.':role==='detail'?'Inspect only the photographed product detail region: texture, strap attachment, buckle/hardware, stitching, logo, embossing and visible material grain. Do not extrapolate unseen structure.':role==='sole'?'Inspect only the outsole / underside appearance: tread pattern, grooves, contact surface shapes and underside texture. Do not convert this into performance claims.':role==='scene'?'Describe only the tabletop scene: surface material, prop layout, dominant light direction, color palette and stable composition. Do not infer product identity.':role==='hand'?'Describe only the visible hand/forearm identity: nail polish, nail length, sleeve/cuff, jewelry, skin tone and hand appearance. Ignore the product and background except for grip context.':role==='endFrame'?'Precisely describe actual final-frame visual state: product orientation, hand contact, tabletop layout, screen position and lighting for the NEXT 8-second clip. A still image cannot reveal motion direction.':'Inspect ONLY visibly supported shoe traits; distinguish left/right shoe, shape, color, toe, strap, sole and logos where visible; do NOT invent hidden angle, materials, comfort or durability.';
 const prompt=`You are a visual evidence inspector for a SILENT HANDS-ONLY TABLETOP SHOE AD, not a story or spoken product review.\n${skill}\nROLE ${role}; ACTUAL FILE NAME ${name}.\nTASK ${task}\nUSER FACTS (do not assume independently verified): ${p.product.name} | ${p.product.facts.slice(0,1800)}\nOUTPUT compact JSON only with fields {"imageRole_th":"string","observedDetails_th":["exact observed"],"identityLocks_th":["locks"],"unknownDetails_th":["not visible"],"shotSuggestions_th":["filmable action"],"confidence_th":"cautious explanation"}. All arrays Thai. Keep the analysis tightly scoped to the declared ROLE and explicitly ignore off-target objects. Do not claim physically proved comfort, safety or durability.`;
 try{const r=await gemini({prompt,image:b.imageDataUrl,model:b.model,maxOutputTokens:2600});const a=r.data;return send(res,200,{analysis:{imageRole_th:String(a.imageRole_th||role),observedDetails_th:enforceStringArray(a.observedDetails_th),identityLocks_th:enforceStringArray(a.identityLocks_th),unknownDetails_th:enforceStringArray(a.unknownDetails_th),shotSuggestions_th:enforceStringArray(a.shotSuggestions_th),confidence_th:String(a.confidence_th||'').slice(0,450)},model:r.model});}catch(e){return send(res,e.status||502,{error:e.message,code:e.code||'VISION_FAILED'})}}
async function direct(req,res){const b=await bodyOf(req);const p=normalizedProject(b.project);const skill=await skillsFor('direct');const count=p.studio.clipCount;
 const summary=Object.fromEntries(Object.entries(p.analyses).filter(([,v])=>v).map(([k,v])=>[k,{observed:v.observedDetails_th,unknown:v.unknownDetails_th,suggestions:v.shotSuggestions_th}]));
 const prompt=`You are an expert silent tabletop shoe commercial director. You are NOT a movie writer. Use reasoning discipline: evidence > identity fidelity > physical plausibility > hand continuity > aesthetic.\n${skill}\nPRODUCT: ${JSON.stringify(p.product).slice(0,3500)}\nSTUDIO: ${JSON.stringify(p.studio)}\nEVIDENCE: ${JSON.stringify(summary).slice(0,9000)}\nOUTPUT exactly ${count} shots, each 8 sec, NO voice, NO music, NO on-screen text, NO face, NO shoe worn on feet, hands and forearms only, ONE same tabletop setting, stationary or slow controlled camera. If 2 shots, the 2nd continues the 1st instead of resetting. Respect the selected hand count and chosen demo actions from STUDIO.demoActions. Do not ask to reveal undocumented outsole. Hands can show jewelry, manicure, sleeves consistently. Produce precise human-hand manipulations and subtle camera framing. Return JSON ONLY {"shots":[{"id":"SH_01","visualAction_en":"one concise specific paragraph","camera_en":"one precise camera direction"}],"qualityNotes_th":["short Thai warnings"],"rationale_th":"why this review sequence fits the shoe"}. Match exact shot IDs SH_01 ${count===2?'and SH_02':''}. Preserve product, no narration, no overlays.`;
 try{const r=await gemini({prompt,model:b.model,maxOutputTokens:2300});const shots=r.data.shots;
  if(!Array.isArray(shots)||shots.length!==count)throw Object.assign(new Error(`โมเดลตอบจำนวนช็อตไม่ครบ ต้อง ${count}`),{status:502});
  const safe=shots.map((x,i)=>({id:`SH_0${i+1}`,visualAction_en:String(x.visualAction_en||'').slice(0,950),camera_en:String(x.camera_en||'').slice(0,450)}));
  return send(res,200,{plan:{shots:safe,qualityNotes_th:enforceStringArray(r.data.qualityNotes_th),rationale_th:String(r.data.rationale_th||'').slice(0,500)},model:r.model});
 }catch(e){return send(res,e.status||502,{error:e.message,code:e.code||'DIRECTOR_FAILED'})}}
async function models(req,res){if(!apiKey)return send(res,200,{models:[],configured:false});try{const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models',{headers:{'x-goog-api-key':apiKey},signal:AbortSignal.timeout(7000)});if(!r.ok)throw new Error('Model list unavailable');const d=await r.json();return send(res,200,{configured:true,models:(d.models||[]).filter(x=>x.supportedGenerationMethods?.includes('generateContent')).map(x=>({id:x.name.replace('models/',''),name:x.displayName})).slice(0,75)})}catch{return send(res,200,{configured:true,models:[],note:'ไม่สามารถอ่านรายการโมเดลได้'})}}
async function staticFile(req,res,pathname){let decoded;try{decoded=decodeURIComponent(pathname)}catch{return send(res,400,{error:'URL invalid'})};if(decoded==='/')decoded='/index.html';const filepath=path.resolve(publicRoot,'.'+decoded);if(!filepath.startsWith(publicRoot+path.sep))return send(res,403,{error:'Forbidden'});try{const st=await stat(filepath);if(!st.isFile())return send(res,404,{error:'Not found'});const bytes=await readFile(filepath);res.writeHead(200,{'content-type':mime[path.extname(filepath)]||'application/octet-stream','x-content-type-options':'nosniff','cache-control':'no-cache','content-length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes)}catch{return send(res,404,{error:'Not found'})}}
async function handleRequest(req,res){
 res.setHeader('x-content-type-options','nosniff');
 const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);try{
 if(req.method==='GET'&&url.pathname==='/api/health')return send(res,200,{ok:true,version:VERSION,geminiConfigured:Boolean(apiKey),localOnly:host==='127.0.0.1',service:'silent-shoe-director'});
 if(req.method==='GET'&&url.pathname==='/api/models')return await models(req,res);
 if(req.method==='POST'&&url.pathname==='/api/vision')return await vision(req,res);
 if(req.method==='POST'&&url.pathname==='/api/direct')return await direct(req,res);
 if(url.pathname.startsWith('/api/'))return send(res,404,{error:'Unknown API route'});
 if(!['GET','HEAD'].includes(req.method))return send(res,405,{error:'Method not allowed'});
 return await staticFile(req,res,url.pathname);
 }catch(e){if(!res.writableEnded)send(res,e.status||500,{error:e.message||'Internal server error'})}
}
const server=http.createServer(handleRequest);
// Cross-platform entrypoint detection: file:// + Windows backslashes is NOT a valid file URL.
// pathToFileURL handles Windows drive letters, spaces and URL escaping correctly.
const isCliEntrypoint = Boolean(process.argv[1]) && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href;
if(isCliEntrypoint){
 server.on('error',error=>{
  if(error.code==='EADDRINUSE')console.error(`ERROR: Port ${port} is already in use. Set PORT=3036 in .env or stop the existing service.`);
  else if(error.code==='EACCES')console.error(`ERROR: Permission denied for ${host}:${port}. Set an unprivileged PORT such as 3035.`);
  else console.error('ERROR: Failed to start Silent Shoe Director:',error);
  process.exitCode=1;
 });
 server.listen(port,host,()=>{
  const actualPort=server.address()?.port??port;
  console.log(`Silent Shoe Director ${VERSION} running at http://${host}:${actualPort}`);
  console.log('Keep this terminal window open; press Ctrl+C to stop the server.');
 });
}

export {server,handleRequest};
