export const fetchWithRetry = (
  input: RequestInfo,
  init?: RequestInit & { retries: number },
) =>
  fetch(input, init).then((res) => {
    if (res.ok) {
      return res.json()
    }
    if (init?.retries && init.retries > 0) {
      return fetchWithRetry(input, { ...init, retries: init.retries - 1 })
    }
    throw new Error(res.status as any)
  })
