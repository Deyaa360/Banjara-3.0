/**
 * Utility function to generate correct image paths for both local development and GitHub Pages deployment
 */
export function getImagePath(path: string): string {
  // Use a leading slash only if the path doesn't already have one
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // For client-side, we can use the basePath from window location
  if (typeof window !== 'undefined') {
    const basePath = window.location.pathname.startsWith('/Banjara0.2') ? '/Banjara0.2' : '';
    return `${basePath}${normalizedPath}`;
  }
  
  // For server-side, we'll use the environment variable configured in next.config.js
  const isGithubPages = process.env.GITHUB_ACTIONS || false;
  const repoName = 'Banjara0.2';
  const basePath = isGithubPages ? `/${repoName}` : '';
  
  return `${basePath}${normalizedPath}`;
}