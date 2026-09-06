import React from 'react';

interface OfficialSealProps {
  size?: number;
  className?: string;
}

/**
 * Sceau/monogramme officiel AgenceOS — SVG vectoriel autonome.
 * Anneau institutionnel avec dénomination, étoile nationale (Burkina Faso)
 * et monogramme central. Aucune dépendance externe.
 */
export const OfficialSeal: React.FC<OfficialSealProps> = ({ size = 48, className = '' }) => {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Sceau officiel AgenceOS Burkina Faso"
    >
      {/* Fond du sceau */}
      <circle cx="50" cy="50" r="48" fill="#071A2E" />
      {/* Anneaux */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#C9A227" strokeWidth="2" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#C9A227" strokeWidth="0.8" opacity="0.7" />
      {/* Dénomination circulaire */}
      <defs>
        <path id={id} d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="none" />
      </defs>
      <text fontSize="7.5" fill="#C9DFF2" fontFamily="'JetBrains Mono', monospace" letterSpacing="2.2">
        <textPath href={`#${id}`} startOffset="2%">
          AGENCEOS · BURKINA FASO · DIGITALISATION ·
        </textPath>
      </text>
      {/* Étoile nationale à cinq branches (or) */}
      <path
        d="M50 24 L53.5 40.5 L70 40.5 L56.5 50.5 L61.5 66 L50 56.5 L38.5 66 L43.5 50.5 L30 40.5 L46.5 40.5 Z"
        fill="none"
        stroke="#C9A227"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Monogramme central */}
      <text
        x="50"
        y="86"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="'Public Sans', sans-serif"
        letterSpacing="1"
      >
        AOS
      </text>
    </svg>
  );
};
