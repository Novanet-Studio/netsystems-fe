export function isActive(url: { pathname: any }, link: any): boolean {
  return url.pathname === link;
}