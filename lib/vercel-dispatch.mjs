import {handleRequest} from '../server.mjs';
export async function dispatch(req,res,route){
 const started=Date.now();
 const incoming=String(req.url||'');
 // Route mapping is explicit; never rely on rewrite semantics or arbitrary user-supplied path.
 req.url='/api/'+route+(incoming.includes('?')?incoming.slice(incoming.indexOf('?')):'');
 try{
  await handleRequest(req,res);
 }catch(error){
  console.error('[silent-shoe-api-unhandled]',{route,error:error?.message||'unexpected error',stack:error?.stack});
  if(!res.writableEnded){res.writeHead(500,{'content-type':'application/json; charset=utf-8'});res.end(JSON.stringify({code:'UNEXPECTED_FUNCTION_ERROR',error:'Internal server error'}))}
 }finally{
  console.info('[silent-shoe-api]',JSON.stringify({route,method:req.method||'',statusCode:res.statusCode||null,durationMs:Date.now()-started}));
 }
}
