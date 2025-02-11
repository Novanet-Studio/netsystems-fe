export function isActive(url: { pathname: string }, link: string) {
  return url.pathname === link;
}