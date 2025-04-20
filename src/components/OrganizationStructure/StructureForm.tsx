import { useState, FormEvent } from 'react';

type Props = {
  onAdd: (entry: { department: string; team?: string }) => void;
};

export default function StructureForm({ onAdd }: Props) {
  const [department, setDepartment] = useState('');
  const [team, setTeam] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!department.trim()) return;

    onAdd({ department, team: team || undefined });
    setDepartment('');
    setTeam('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="form-group mb-2">
        <label>Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="form-control"
          placeholder="e.g. Engineering"
          required
        />
      </div>
      <div className="form-group mb-2">
        <label>Team (optional)</label>
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="form-control"
          placeholder="e.g. Frontend"
        />
      </div>
      <button type="submit" className="btn btn-success">Add</button>
    </form>
  );
}
