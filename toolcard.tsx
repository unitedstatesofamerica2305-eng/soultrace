export default function ToolCard({
  title,
  desc
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}