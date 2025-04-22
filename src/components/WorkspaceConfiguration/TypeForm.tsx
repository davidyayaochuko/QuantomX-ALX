import { useState, FormEvent } from 'react';

type Props = {
  onAdd: (name: string) => void;
};

export default function TypeForm({ onAdd }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Workspace Type (e.g. Desk, Meeting Room)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">Add Type</button>
      </div>
    </form>
  );
}
