'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';

type Test={id:string;title:string;duration_minutes:number;total_marks:number};
export default function Dashboard(){
 const [tests,setTests]=useState<Test[]>([]); const [name,setName]=useState('Student'); const [error,setError]=useState('');
 useEffect(()=>{(async()=>{try{const s=getSupabase(); const {data:{user}}=await s.auth.getUser(); if(!user){location.href='/login';return;} const {data:p}=await s.from('users').select('name,role').eq('id',user.id).single(); if(p?.role==='admin'){location.href='/admin';return;} setName(p?.name||'Student'); const {data,error}=await s.from('tests').select('*').order('created_at',{ascending:false}); if(error)throw error; setTests(data||[]);}catch(e){setError(e instanceof Error?e.message:'Unable to load tests')}})()},[]);
 return <main className="min-h-screen p-6"><div className="mx-auto max-w-5xl"><header className="flex items-center justify-between"><div><p className="text-sm text-slate-500">Welcome</p><h1 className="text-3xl font-bold">{name}</h1></div><button onClick={async()=>{await getSupabase().auth.signOut();location.href='/login'}} className="rounded-lg border bg-white px-4 py-2">Sign out</button></header><div className="mt-8">{error&&<p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}<h2 className="text-xl font-bold">Available tests</h2>{tests.length===0?<div className="mt-4 rounded-xl border bg-white p-8 text-slate-500">No tests are available yet.</div>:<div className="mt-4 grid gap-4 md:grid-cols-2">{tests.map(t=><article key={t.id} className="rounded-xl border bg-white p-5 shadow-sm"><h3 className="text-lg font-bold">{t.title}</h3><p className="mt-2 text-sm text-slate-500">{t.duration_minutes} min · {t.total_marks} marks</p><Link href={`/exam/${t.id}`} className="mt-5 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">Start test</Link></article>)}</div>}</div></div></main>
}
