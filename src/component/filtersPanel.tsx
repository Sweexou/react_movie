export function FiltersPanel({
  minRating,
  setMinRating,
}: {
  minRating: number;
  setMinRating: (n: number) => void;
}) {
  return (
    <div style={{ padding: "1rem" }}>
      <h3>Filters</h3>
      <label>
        Minimum Rating:
        <input
          type="number"
          min="0"
          max="10"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
      </label>
    </div>
  );
}
