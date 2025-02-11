export function isActive(url: { pathname: string }, link: string): boolean {
  return url.pathname === link;
}