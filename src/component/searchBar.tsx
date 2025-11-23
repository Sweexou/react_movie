
export function SearchBar({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a movie..."
        style={{
          flex: 1,
          padding: "0.7rem",
          borderRadius: "8px",
          border: "1px solid gray",
        }}
      />
      <button onClick={onSubmit}>Search</button>
    </div>
  );
}
