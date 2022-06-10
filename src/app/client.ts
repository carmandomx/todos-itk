export async function client(endpoint: RequestInfo, options?: RequestInit) {
    const { body, ...customConfig } = options ?? {}
    const headers = { 'Content-Type': 'application/json' }
    const config: RequestInit = {
      method: body ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    }
  
    if (body) {
      config.body = JSON.stringify(body)
    }
  
    let data
    try {
      const response = await fetch(endpoint, config)
      data = await response.json()
      if (response.ok) {
          console.log(data)
        return data
      }
      throw new Error(response.statusText)
    } catch (err) {
        if (err instanceof Error) {

            return Promise.reject(err.message ? err.message : data)
        }
    }
  }
  
  
  client.get = function (endpoint: RequestInfo, customConfig?: RequestInit) {
    return client(endpoint, { ...customConfig, method: 'GET' })
  }