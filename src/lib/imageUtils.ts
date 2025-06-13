/**
 * Generates responsive image sizes string for Next.js Image component
 * 
 * @param options Configuration options for sizes
 * @returns A sizes string for the Next.js Image component
 */
export function getResponsiveSizes({
  mobile = '100vw',
  tablet = '50vw',
  desktop = '33vw',
  breakpoints = {
    mobile: 640,
    tablet: 1024
  }
}: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  breakpoints?: {
    mobile: number;
    tablet: number;
  };
} = {}) {
  return `(max-width: ${breakpoints.mobile}px) ${mobile}, (max-width: ${breakpoints.tablet}px) ${tablet}, ${desktop}`;
}

/**
 * Calculates the aspect ratio for an image
 * 
 * @param width Image width
 * @param height Image height
 * @returns CSS aspect ratio string
 */
export function getAspectRatio(width: number, height: number): string {
  return `${width} / ${height}`;
}

/**
 * Determines if an image should be loaded with priority based on its position
 * 
 * @param index Position of the image in a list
 * @param threshold Number of images to prioritize
 * @returns Boolean indicating if the image should be prioritized
 */
export function shouldPrioritize(index: number, threshold: number = 2): boolean {
  return index < threshold;
}

/**
 * Generates a simple color-based blur data URL
 * 
 * @param color Hex color code (e.g., #ffffff)
 * @returns A data URL for a blurred placeholder
 */
export function createColorPlaceholder(color: string = '#1c1917'): string {
  // Remove # if present
  const hexColor = color.startsWith('#') ? color.slice(1) : color;
  
  // Convert to base64
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="${hexColor}"><rect width="100" height="100" /></svg>`
  ).toString('base64')}`;
}

export default {
  getResponsiveSizes,
  getAspectRatio,
  shouldPrioritize,
  createColorPlaceholder
};