/**
 * @example return arg.filter(i => !!i).join(" ")
 */
export function classNames(...arg: (string | null | undefined)[]): string {
  return arg.filter(i => !!i).join(' ')
}

/**
 * 仅在 dev 下 log
 */
export function devLog(...arg: any[]) {
  if (import.meta.env.DEV) {
    console.log(...arg)
  }
}

/**
 * @example
 * return new URL(url).host
 */
export function getDomainHost(url: string) {
  if (url.length === 0) return ''

  try {
    return new URL(url).host
  } catch (error) {
    devLog(error)

    return 'Invalid URL'
  }
}
