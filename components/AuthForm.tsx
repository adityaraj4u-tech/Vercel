'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMessage('');
    try {
      const supabase = getSupabase();
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
        if (error) throw error;
        if (!data.session) { setMessage('Account created. Check your email if confirmation is enabled, then log in.'); return; }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Authentication succeeded but no user session was found.');
      const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
      router.replace(profile?.role === 'admin' ? '/admin' : '/dashboard');
      router.refresh();
    } catch (err) { setMessage(err instanceof Error ? err.message : 'Authentication failed'); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen grid place-items-center p-6">
    <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-7 shadow-lg border border-slate-200">
      <h1 className="text-2xl font-bold">NTA CBT</h1><p className="mt-1 text-slate-500">{mode === 'login' ? 'Sign in to continue' : 'Create a student account'}</p>
      {mode === 'signup' && <input className="mt-6 w-full rounded-lg border p-3" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />}
      <input className="mt-4 w-full rounded-lg border p-3" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input className="mt-4 w-full rounded-lg border p-3" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required />
      <button disabled={busy} className="mt-5 w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white disabled:opacity-60">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Sign up'}</button>
      {message && <p className="mt-4 rounded-lg bg-slate-100 p-3 text-sm">{message}</p>}
      <button type="button" onClick={()=>{setMode(mode==='login'?'signup':'login');setMessage('')}} className="mt-4 text-sm text-indigo-700 underline">{mode === 'login' ? 'Create an account' : 'Already have an account? Sign in'}</button>
    </form>
  </main>;
}
