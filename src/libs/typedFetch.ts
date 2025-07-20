import { ZodType } from 'zod'

type HttpMethod = 'GET' | 'POST' | 'PUT'

type BaseOpts<T> = {
  url: string
  schema: ZodType<T>
  body?: unknown
  headers?: Record<string, string>
}

async function _request<T>(
  method: HttpMethod,
  { url, schema, body, headers = {} }: BaseOpts<T>
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  })

  const json = await response.json()
  if (!response.ok) {
    throw new Error(`[${response.status}] ${json?.error ?? 'Fetch failed'}`)
  }

  return schema.parse(json)
}

export const typedFetch = {
  get: <T>(opts: Omit<BaseOpts<T>, 'body'>): Promise<T> =>
    _request('GET', opts),
  post: <T>(opts: BaseOpts<T>): Promise<T> => _request('POST', opts),
  put: <T>(opts: BaseOpts<T>): Promise<T> => _request('PUT', opts)
}
