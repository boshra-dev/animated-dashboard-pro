const petals = Array.from({ length: 12 });

export default function LogoLoader() {
  const colors = [
    "#A5B4FC",
    "#9BAAF5",
    "#909FEF",
    "#8694E8",
    "#7B89E2",
    "#716EDB",
    "#6653D5",
    "#5C38CE",
    "#512DC2",
    "#4623AD",
    "#3B1E98",
    "#312E81",
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      overflow="visible"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="25"
          rx="4"
          ry="12"
          fill={colors[i]}
          transform={`rotate(${i * 30} 50 50)`}
          style={{
            animation: `fadeIn 1.2s ease forwards`,
            animationDelay: `${i * 0.08}s`,
            opacity: 0,
          }}
        />
      ))}

      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
    </svg>
  );
}
