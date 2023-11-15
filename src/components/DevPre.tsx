/**
 * dev 环境下展示对象用
 * @example
 * <pre>{JSON.stringify(obj, null, 2)}</pre>
 */
export default (props: { obj: any }) => {
  if (import.meta.env.DEV)
    return <pre className="text-xs">{JSON.stringify(props.obj, null, 2)}</pre>

  return null
}
