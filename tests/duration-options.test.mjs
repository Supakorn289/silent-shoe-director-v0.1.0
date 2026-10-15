import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
  initialProject,normalizedProject,validateImport,shotSpec,
  composePrompt,createProduction,referencePlan
} from '../public/planner.mjs';

const tinyImage='data:image/png;base64,'+Buffer.from('test-png').toString('base64');
const example=()=>{
 const p=initialProject();
 p.product.name='Square Toe Shoe';
 p.references.overall={dataUrl:tinyImage,fileName:'shoe-original.png'};
 p.references.scene={dataUrl:tinyImage,fileName:'table-scene.jpg'};
 p.references.hand={dataUrl:tinyImage,fileName:'hand-model.webp'};
 return p;
};

// Compatibility: old exports have no clipDuration property and remain 8 seconds.
test('v0.1.4 project imports as 8 seconds without schema migration',()=>{
 const p=example();delete p.studio.clipDuration;p.appVersion='0.1.4';
 const imported=validateImport(JSON.parse(JSON.stringify(p)));
 assert.equal(imported.schemaVersion,1);
 assert.equal(imported.studio.clipDuration,8);
 assert.deepEqual(createProduction(imported).shots.map(x=>x.seconds),[8,8]);
 assert.equal(imported.references.overall.fileName,'shoe-original.png');
});

test('duration input normalized strictly to 8 or 10',()=>{
 const p=example();
 assert.equal(initialProject().studio.clipDuration,8);
 for(const v of [null,0,9,11,-10,'oops',{}]){
  p.studio.clipDuration=v;assert.equal(normalizedProject(p).studio.clipDuration,8);
 }
 for(const v of [10,'10']){
  p.studio.clipDuration=v;assert.equal(normalizedProject(p).studio.clipDuration,10);
 }
});

test('8-second mode preserves three exact original beats and metadata',()=>{
 const p=example();p.studio.clipDuration=8;
 for(const i of [0,1]){
  const beats=shotSpec(p,i).beats;
  assert.equal(beats.length,3);
  assert.deepEqual(beats.map(x=>x.split(':')[0]),['0–2s','2–5s','5–8s']);
  const prompt=composePrompt(p,i);
  assert.match(prompt,/VERTICAL 9:16 · 8 SECONDS/);
  assert.doesNotMatch(prompt,/8–10s:/);
 }
 const flow=createProduction(p);
 assert.equal(flow.clipDurationSeconds,8);
 assert.deepEqual(flow.shots.map(s=>s.seconds),[8,8]);
});

test('10-second mode has four contiguous intentional beats per shot',()=>{
 const p=example();p.studio.clipDuration=10;
 for(const i of [0,1]){
  const beats=shotSpec(p,i).beats;
  assert.equal(beats.length,4);
  assert.deepEqual(beats.map(x=>x.split(':')[0]),['0–2s','2–5s','5–8s','8–10s']);
  assert.match(beats[2],/detail|identifying feature|photographed/i);
  assert.match(beats[3],/end|pose|settle/i);
  const prompt=composePrompt(p,i);
  assert.match(prompt,/VERTICAL 9:16 · 10 SECONDS/);
  assert.match(prompt,/8–10s:/);
  assert.match(prompt,/STRICTLY SILENT/);
  assert.match(prompt,/HAND IDENTITY LOCK/);
 }
 const flow=createProduction(p);
 assert.equal(flow.clipDurationSeconds,10);
 assert.deepEqual(flow.shots.map(s=>s.seconds),[10,10]);
 assert.ok(flow.shots.every(s=>!('voiceover' in s)));
});

test('10 seconds in single-clip mode is a self-contained take with stable product references',()=>{
 const p=example();p.studio.clipCount=1;p.studio.clipDuration=10;
 const flow=createProduction(p);
 assert.equal(flow.shots.length,1);
 assert.equal(flow.shots[0].seconds,10);
 assert.match(flow.shots[0].prompt,/One take/);
 assert.match(flow.shots[0].prompt,/Image A — "shoe-original.png"/);
 assert.match(flow.shots[0].prompt,/Image B — "table-scene.jpg"/);
 assert.match(flow.shots[0].prompt,/Image C — "hand-model.webp"/);
});

test('10s end frame is not hallucinated and retains real filename when supplied',()=>{
 const p=example();p.studio.clipDuration=10;
 assert.equal(referencePlan(p,1).available.some(x=>x.key==='endFrame'),false);
 p.references.endFrame={dataUrl:tinyImage,fileName:'SH_01_endframe_actual.png'};
 const refs=referencePlan(p,1);
 assert.equal(refs.available.find(x=>x.key==='endFrame').fileName,'SH_01_endframe_actual.png');
 assert.match(composePrompt(p,1),/SH_01_endframe_actual.png/);
 assert.match(composePrompt(p,1),/8–10s:/);
 const imported=validateImport(JSON.parse(JSON.stringify(p)));
 assert.equal(imported.studio.clipDuration,10);
 assert.equal(imported.references.endFrame.fileName,'SH_01_endframe_actual.png');
});

test('UI and AI director source paths use selectable duration',async()=>{
 const [html,ui,server]=await Promise.all(['public/index.html','public/app.mjs','server.mjs'].map(p=>readFile(new URL('../'+p,import.meta.url),'utf8')));
 assert.match(html,/id="clipDuration"/);
 assert.match(html,/<option value="10">10 วินาที/);
 assert.match(ui,/state\.studio\.clipDuration/);
 assert.match(server,/each \$\{p\.studio\.clipDuration\} sec/);
});
