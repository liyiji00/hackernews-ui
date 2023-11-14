/**
 * @example return arg.filter(i => !!i).join(" ")
 */
export function classNames(...arg: (string | null | undefined)[]): string {
  return arg.filter(i => !!i).join(' ')
}
