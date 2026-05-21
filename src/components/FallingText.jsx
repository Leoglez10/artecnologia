

/**
 * FallingText Component
 * Animates text letters falling down staggered from above with realistic elastic gravity,
 * and adds an interactive physical "kick/jump" reaction on hover.
 */
export default function FallingText({ 
  text, 
  delay = 0.2, 
  stagger = 0.05, 
  className = "", 
  highlightClass = "" 
}) {
  if (!text) return null;

  // Split text into words to preserve layout structure
  const words = text.split(' ');

  // Keep track of the absolute index across all words for the animation delay
  let globalCharIndex = 0;

  return (
    <span 
      className={`inline-flex flex-wrap gap-x-3 gap-y-1 select-none ${className}`}
      aria-label={text}
    >
      {/* Dynamic inline styles for premium physics-based animations */}
      <style>{`
        @keyframes letterFall {
          0% {
            opacity: 0;
            transform: translateY(-90px) scale(0.6) rotate(-25deg);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            transform: translateY(12px) scale(1.05) rotate(8deg);
            filter: blur(0px);
          }
          80% {
            transform: translateY(-6px) scale(0.98) rotate(-3deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0);
            filter: blur(0px);
          }
        }

        @keyframes letterKick {
          0% {
            transform: translateY(0) scale(1) rotate(0);
          }
          30% {
            transform: translateY(-32px) scale(1.2) rotate(15deg);
            text-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }
          50% {
            transform: translateY(-38px) scale(1.25) rotate(-10deg);
          }
          70% {
            transform: translateY(5px) scale(0.95) rotate(4deg);
          }
          85% {
            transform: translateY(-2px) scale(1.02) rotate(-1deg);
          }
          100% {
            transform: translateY(0) scale(1) rotate(0);
          }
        }

        .falling-letter-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(-90px);
          animation: letterFall 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          will-change: transform, opacity;
          cursor: default;
          transition: color 0.3s ease;
        }

        /* Interactive kinetic reaction on hover */
        .falling-letter-char:hover {
          animation: letterKick 0.8s cubic-bezier(0.25, 1.35, 0.5, 1) forwards;
        }
      `}</style>

      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((char) => {
            const charDelay = delay + (globalCharIndex * stagger);
            globalCharIndex++;

            return (
              <span
                key={globalCharIndex}
                className={`falling-letter-char ${highlightClass}`}
                style={{ 
                  animationDelay: `${charDelay}s`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
