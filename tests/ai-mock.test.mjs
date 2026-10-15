import {test,before,after} from 'node:test';import assert from 'node:assert/strict';
import {initialProject} from '../public/planner.mjs';
const realFetch=globalThis.fetch;
process.env.GEMINI_API_KEY='test-key-only';
const {server}=await import('../server.mjs?mock-ai-enabled');
let origin;let seen=[];
const png='data:image/png;base64,'+Buffer.from('this-is-mocked').toString('base64');
before(async()=>{
 globalThis.fetch=async(url,options)=>{
  if(!String(url).includes('generativelanguage.googleapis.com'))return realFetch(url,options);
  const data=JSON.parse(options.body);const parts=data.contents[0].parts;seen.push({prompt:parts[0].text,hasImage:parts.some(x=>x.inlineData)});
  const isVision=parts[0].text.includes('visual evidence inspector');
  const response=isVision?{imageRole_th:'ภาพสินค้า',observedDetails_th:['หัวรองเท้าทรงเหลี่ยม'],identityLocks_th:['คงสีครีม'],unknownDetails_th:['พื้นรองเท้าไม่ปรากฏ'],shotSuggestions_th:['จับสินค้าโชว์'],confidence_th:'จากภาพเดียวเท่านั้น'}:{shots:[{id:'SH_01',visualAction_en:'Carefully pick up the shoe',camera_en:'Locked camera'},{id:'SH_02',visualAction_en:'Continue same table and reveal documented strap',camera_en:'Soft light'}],qualityNotes_th:['อย่าเดาพื้น'],rationale_th:'แสดงรองเท้าเป็นพระเอก'};
  return new Response(JSON.stringify({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(response)}]}}]}),{status:200,headers:{'content-type':'application/json'}})
 };
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));origin=`http://127.0.0.1:${server.address().port}`;
});after(async()=>{globalThis.fetch=realFetch;await new Promise(r=>server.close(r))});
const post=(url,data)=>realFetch(origin+url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});
test('configured mock image vision includes exactly target image and semantic role',async()=>{
 const project=initialProject();project.product.name='Square toe sandal';project.references.overall={fileName:'real.png',dataUrl:null};
 const res=await post('/api/vision',{role:'overall',imageDataUrl:png,model:'gemini-3.5-flash-lite',project});assert.equal(res.status,200);const d=await res.json();assert.ok(d.analysis.identityLocks_th.length);assert.match(d.analysis.unknownDetails_th[0],/พื้น/);assert.equal(seen.at(-1).hasImage,true);assert.match(seen.at(-1).prompt,/silent/i)
});
test('configured mock AI Director uses two structured shot suggestions with no raw image attached',async()=>{
 const project=initialProject();project.product.name='Sandal';const res=await post('/api/direct',{model:'gemini-3.5-flash-lite',project});assert.equal(res.status,200);const d=await res.json();assert.deepEqual(d.plan.shots.map(s=>s.id),['SH_01','SH_02']);assert.equal(seen.at(-1).hasImage,false);assert.match(seen.at(-1).prompt,/NO music/)
});
