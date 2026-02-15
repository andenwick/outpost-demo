export const tokens = {
  colors: {
    primary: '#D4A574',      // warm amber/gold
    primaryDark: '#B8845A',  // darker amber
    secondary: '#2C1810',    // deep brown
    background: '#1A1A1A',   // near black
    backgroundAlt: '#242424', // slightly lighter
    surface: '#2A2218',      // warm dark surface
    text: '#F5F0EB',         // warm white
    textMuted: '#A89B8C',    // muted warm gray
    accent: '#C4463A',       // rustic red (for CTAs)
  },
  fonts: {
    heading: '"Playfair Display", Georgia, serif',
    body: '"Inter", -apple-system, sans-serif',
  },
  spacing: {
    section: '6rem',         // vertical section padding
    sectionMobile: '3rem',
    container: '1200px',     // max content width
    gap: '2rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
  }
} as const;
