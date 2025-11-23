export function ErrorMessage({ message }: { message: string }) {
  return (
    <p style={{ color: "red", textAlign: "center" }}>
      ⚠️ {message}
    </p>
  );
}
