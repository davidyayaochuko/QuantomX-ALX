import { useState, FormEvent } from 'react';

type Props = {
  types: string[];
  onUpdate: (name: string, attrs: { capacity: number; amenities: string[] }) => void;
};

export default function AttributeForm({ types, onUpdate }: Props) {
  const [selected, setSelected] = useState(types[0] || '');
  const [capacity, setCapacity] = useState<number>(0);
  const [amenities, setAmenities] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(selected, {
      capacity,
      amenities: amenities
        .split(',')
        .map((a) => a.trim())
        .filter((a) => a),
    });
    setCapacity(0);
    setAmenities('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Set Attributes</h5>
      <div className="row g-2 align-items-end">
        <div className="col-md-3">
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
          <label className="form-label">Capacity</label>
          <input
            type="number"
            min={0}
            className="form-control"
            value={capacity}
            onChange={(e) => setCapacity(+e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Amenities (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary" type="submit">Save Attr</button>
        </div>
      </div>
    </form>
  );
}
