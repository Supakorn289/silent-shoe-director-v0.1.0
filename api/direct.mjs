import {dispatch} from '../lib/vercel-dispatch.mjs';
export default function handler(req,res){return dispatch(req,res,'direct')}
