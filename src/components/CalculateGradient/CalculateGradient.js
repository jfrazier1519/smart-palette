const CalculateGradient = ({ palette }) => {
  if (!palette || palette.length < 2) {
    return "linear-gradient(89deg, #ff5edf 0%, #04c8de 100%)"; // Default fallback gradient
  }

  // Helper function to calculate brightness from hex color
  const getBrightness = (hex) => {
    if (!hex) return 0;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  // Helper function to calculate Euclidean distance between two colors
  const colorDistance = (color1, color2) => {
    if (!color1 || !color2) return 0;
    const r1 = parseInt(color1.hex.slice(1, 3), 16);
    const g1 = parseInt(color1.hex.slice(3, 5), 16);
    const b1 = parseInt(color1.hex.slice(5, 7), 16);

    const r2 = parseInt(color2.hex.slice(1, 3), 16);
    const g2 = parseInt(color2.hex.slice(3, 5), 16);
    const b2 = parseInt(color2.hex.slice(5, 7), 16);

    return Math.sqrt(
      Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
    );
  };

  const sortedPalette = [...palette].sort(
    (a, b) => b.probability - a.probability
  );
  const dominantColor = sortedPalette[0];

  let maxDistance = 0;
  let mostContrastingColor = null;

  sortedPalette.slice(1).forEach((color) => {
    const distance = colorDistance(dominantColor, color);

    if (distance > maxDistance) {
      maxDistance = distance;
      mostContrastingColor = color;
    }
  });

  const contrastingColor = mostContrastingColor;

  // Ensure the lighter color is on the left
  const dominantBrightness = getBrightness(dominantColor.hex);
  const contrastingBrightness = getBrightness(contrastingColor.hex);

  const brighterOnLeft =
    dominantBrightness >= contrastingBrightness
      ? dominantColor.hex
      : contrastingColor.hex;

  const darkerOnRight =
    brighterOnLeft === dominantColor.hex
      ? contrastingColor.hex
      : dominantColor.hex;

  return `linear-gradient(89deg, ${brighterOnLeft} 0%, ${darkerOnRight} 100%)`;
};

export default CalculateGradient;
