'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [name,setName]=useState('');
  const [rollNo,setRollNo]=useState('');
  const [error,setError]=useState('');
  function enter(){
    if(!name.trim()||!rollNo.trim()){setError('Please enter your name and roll number.');return;}
    localStorage.setItem('gec-student',JSON.stringify({name:name.trim(),rollNo:rollNo.trim()}));
    router.push('/dashboard');
  }
  return <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-5 text-white">
    <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center">
      <header className="w-full text-center">
        <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full border-4 border-white/80 bg-white text-xl font-black text-indigo-800 shadow-xl">GEC<br/>BANKA</div>
        <h1 className="text-2xl font-extrabold tracking-wide md:text-4xl">GOVERNMENT ENGINEERING COLLEGE BANKA</h1>
        <p className="mt-2 text-sm text-indigo-200">Department of Science, Technology and Technical Education, Government of Bihar</p>
      </header>
      <section className="mt-10 w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 p-7 text-center shadow-2xl backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-200">Online Assessment</p>
        <h2 className="mt-3 text-5xl font-black md:text-6xl">TECH QUIZ</h2>
        <p className="mt-3 text-slate-300">Enter your details to view available tests.</p>
        <div className="mt-7 space-y-3 text-left">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Student Name" className="w-full rounded-xl border border-white/20 bg-white p-3.5 text-slate-900 outline-none" />
          <input value={rollNo} onChange={e=>setRollNo(e.target.value)} placeholder="Roll Number" className="w-full rounded-xl border border-white/20 bg-white p-3.5 text-slate-900 outline-none" />
          <button onClick={enter} className="w-full rounded-xl bg-indigo-500 px-5 py-3.5 font-bold hover:bg-indigo-400">Continue to Tests</button>
        </div>
        {error&&<p className="mt-3 text-sm text-red-300">{error}</p>}
      </section>
      <a href="/admin/login" className="mt-6 text-sm text-indigo-200 underline">Admin login</a>
    </div>
  </main>;
}

// Production refresh marker: 2026-08-11
