export const getUrlSearchParamsStr = (options: Record<string, string>) => {
  const params = new URLSearchParams()

  for (const option in options) {
    params.set(option, options[option])
  }
  return params.toString()
}
