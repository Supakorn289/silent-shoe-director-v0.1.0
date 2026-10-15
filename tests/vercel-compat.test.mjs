import {test} from 'node:test';
import assert from 'node:assert/strict';
import health from '../api/health.mjs';
import vision from '../api/vision.mjs';
import direct from '../api/direct.mjs';
import {server} from '../server.mjs';
function fakeResponse(){
 const result={statusCode:200,headers:{},body:'',writableEnded:false};
 result.setHeader=(k,v)=>{result.headers[k]=v};
 result.writeHead=(status,headers)=>{result.statusCode=status;Object.assign(result.headers,headers||{})};
 result.end=(b='')=>{result.body=String(b||'');result.writableEnded=true};
 return result;
}
test('Vercel module import does NOT auto-listen on a TCP port',()=>{assert.equal(server.listening,false)});
test('Vercel health handler returns local API version via explicit mapping',async()=>{
 const res=fakeResponse();await health({method:'GET',url:'/ignored',headers:{}},res);
 assert.equal(res.statusCode,200);assert.equal(JSON.parse(res.body).version,'0.1.5');
});
test('Vercel request parser supports pre-parsed POST JSON without re-reading an exhausted stream',async()=>{
 const res=fakeResponse();await vision({method:'POST',url:'/ignored',headers:{},body:{role:'invalid-test-role'}},res);
 assert.equal(res.statusCode,400);assert.match(JSON.parse(res.body).error,/role/);
});
test('Vercel AI director keeps safe missing-key response',async()=>{
 const res=fakeResponse();await direct({method:'POST',url:'/ignored',headers:{},body:{project:{product:{name:'Shoe'}}}},res);
 assert.equal(res.statusCode,400);assert.match(JSON.parse(res.body).error,/API_KEY/);
});
