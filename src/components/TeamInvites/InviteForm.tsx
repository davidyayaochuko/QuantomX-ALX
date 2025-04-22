/*
src/components/TeamInvites/InviteForm.tsx
*/
import React, { useState, FormEvent } from 'react';
import { Form as RForm, Button as RButton } from 'react-bootstrap';

type Props = {
  onInvite: (email: string, role: string) => void;
};

const roles = [
  'Facility Manager',
  'Office Administrator',
  'Department Head',
  'HR Manager',
  'Executive',
  'IT Administrator',
];

export default function InviteForm({ onInvite }: { onInvite: (e: string,r: string) => void }) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(roles[0]);
    const submit = (e: FormEvent) => { e.preventDefault(); onInvite(email, role); setEmail(''); setRole(roles[0]); };
    return (
      <RForm onSubmit={submit} className="mx-auto" style={{ maxWidth: 600 }}>
        <h5>Invite Member</h5>
        <RForm.Group className="mb-3">
          <RForm.Label>Email</RForm.Label>
          <RForm.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </RForm.Group>
        <RForm.Group className="mb-3">
          <RForm.Label>Role</RForm.Label>
          <RForm.Select value={role} onChange={e=>setRole(e.target.value)}>
            {roles.map(r=> <option key={r}>{r}</option>)}
          </RForm.Select>
        </RForm.Group>
        <RButton variant="primary" type="submit">Send Invite</RButton>
      </RForm>
    );
  }
