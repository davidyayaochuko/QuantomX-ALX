import { useState, FormEvent } from 'react';

type Props = {
  types: string[];
  onUpdate: (name: string, schedule: { open: string; close: string }) => void;
};

export default function ScheduleForm({ types, onUpdate }: Props) {
  const [selected, setSelected] = useState(types[0] || '');
  const [open, setOpen] = useState('09:00');
  const [close, setClose] = useState('17:00');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(selected, { open, close });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Set Availability</h5>
      <div className="row g-2 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Open Time</label>
          <input
            type="time"
            className="form-control"
            value={open}
            onChange={(e) => setOpen(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Close Time</label>
          <input
            type="time"
            className="form-control"
            value={close}
            onChange={(e) => setClose(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary" type="submit">Save Sched</button>
        </div>
      </div>
    </form>
  );
}
