import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {setTimeout as delay} from 'node:timers/promises';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
function start(port='0'){
 const child=spawn(process.execPath,['--env-file-if-exists=.env','server.mjs'],{cwd:root,env:{...process.env,PORT:String(port),HOST:'127.0.0.1',GEMINI_API_KEY:''},stdio:['ignore','pipe','pipe']});
 let log=''; child.stdout.on('data',b=>log+=String(b)); child.stderr.on('data',b=>log+=String(b));
 return {child,output:()=>log};
}
async function waitFor(fn,ms=4500){const until=Date.now()+ms;while(Date.now()<until){const value=fn();if(value)return value;await delay(25)}return null}
async function stop(child){if(child.exitCode===null&&!child.killed)child.kill();if(child.exitCode===null)await Promise.race([new Promise(resolve=>child.once('exit',resolve)),delay(2500)]);}

test('npm dev entrypoint binds an actual HTTP port and stays alive',async()=>{
 const server=start();try{
  const match=await waitFor(()=>server.output().match(/running at http:\/\/127\.0\.0\.1:(\d+)/));
  assert.ok(match,`Server failed to listen:\n${server.output()}`);
  const port=Number(match[1]); assert.ok(port>0);
  assert.equal(server.child.exitCode,null,'the dev process must remain alive');
  const response=await fetch(`http://127.0.0.1:${port}/api/health`);
  assert.equal(response.status,200); const body=await response.json();
  assert.equal(body.version,'0.1.4'); assert.equal(body.ok,true);
  const home=await fetch(`http://127.0.0.1:${port}/`);assert.equal(home.status,200);
 }finally{await stop(server.child)}
});

test('port conflict prints actionable error and exits nonzero',async()=>{
 const first=start();let second;
 try{
  const match=await waitFor(()=>first.output().match(/running at http:\/\/127\.0\.0\.1:(\d+)/));
  assert.ok(match,`Primary server did not start:\n${first.output()}`);
  second=start(match[1]);
  const msg=await waitFor(()=>second.output().includes('EADDRINUSE')||second.output().includes('already in use') ? second.output() : null);
  assert.ok(msg,`Port collision did not produce actionable error: ${second.output()}`);
  assert.match(msg,/PORT=3036/);
  await waitFor(()=>second.child.exitCode!==null);
  assert.equal(second.child.exitCode,1);
 }finally{if(second)await stop(second.child);await stop(first.child)}
});
