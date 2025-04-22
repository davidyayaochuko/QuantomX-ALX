import { useState, ChangeEvent } from 'react';

type Props = {
  types: string[];
  onUpload: (name: string, files: File[]) => void;
};

export default function LayoutUploader({ types, onUpload }: Props) {
  const [selected, setSelected] = useState(types[0] || '');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((f) => URL.createObjectURL(f)));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    onUpload(selected, files);
    setFiles([]);
    setPreviews([]);
  };

  return (
    <div className="mb-4">
      <h5>Upload Layouts / Floorplans</h5>
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
        <div className="col-md-4">
          <label className="form-label">Select Files</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*,application/pdf"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary" onClick={handleUpload} disabled={!files.length}>
            Upload
          </button>
        </div>
      </div>

      {/* Preview section if desired */}
      {previews.length > 0 && (
        <div className="mt-3">
          <h6>Preview</h6>
          <div className="d-flex gap-2 flex-wrap">
            {previews.map((src, idx) => (
              <img key={idx} src={src} alt="preview" style={{ maxWidth: '100px' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
