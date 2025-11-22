export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MaraSondu WRUAS Forum"
    >
      {/* Water droplet */}
      <path
        d="M30 15C30 15 22 25 22 32C22 36.4 25.6 40 30 40C34.4 40 38 36.4 38 32C38 25 30 15 30 15Z"
        fill="currentColor"
        className="text-primary"
      />
      
      {/* Two rivers forming M */}
      <path
        d="M12 45C12 45 15 35 20 30L30 45L40 30C45 35 48 45 48 45"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-chart-4"
      />
      
      {/* Leaf elements */}
      <path
        d="M8 25C8 25 10 20 15 20C15 20 13 25 8 25Z"
        fill="currentColor"
        className="text-chart-2"
      />
      <path
        d="M52 25C52 25 50 20 45 20C45 20 47 25 52 25Z"
        fill="currentColor"
        className="text-chart-5"
      />
      
      {/* Text */}
      <text x="65" y="25" className="fill-foreground font-bold text-lg" style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
        MaraSondu
      </text>
      <text x="65" y="40" className="fill-muted-foreground text-xs" style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif' }}>
        WRUAS Forum
      </text>
    </svg>
  );
}
