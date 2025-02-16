export function Istatistics() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width="20"
        height="20"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="currentColor"
      >
        {/* Eje vertical */}
        <path d="M3 3v18"></path>
        {/* Eje horizontal */}
        <path d="M3 21h18"></path>
        {/* Barras */}
        <rect x="6" y="14" width="3" height="7" rx="1"></rect>
        <rect x="12" y="10" width="3" height="11" rx="1"></rect>
        <rect x="18" y="5" width="3" height="16" rx="1"></rect>
      </svg>
    );
  }
  