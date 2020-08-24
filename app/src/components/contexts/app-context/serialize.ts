// string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined
const serialize = (data?: any, options?: RequestInit): RequestInit => {
  const headers = {
    ...options?.headers,
    "Access-Control-Allow-Origin": "*",
  };
  const type = typeof data;
  if (type === "string" && data?.length > 0 && data[0] === "{")
    return {
      ...options,
      body: data,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };
  if (
    data === undefined ||
    data === null ||
    data instanceof String ||
    data instanceof Blob ||
    data instanceof ArrayBuffer ||
    data instanceof ArrayBuffer ||
    data instanceof FormData ||
    data instanceof URLSearchParams ||
    data instanceof ReadableStream
  )
    return { ...options, body: data };
  if (data instanceof Number)
    return {
      ...options,
      body: data.toString(),
      headers: headers,
    };
  if (data instanceof Object)
    return {
      ...options,
      body: JSON.stringify(data),
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };
  return {
    ...options,
    body: data,
    headers: headers,
  };
};

export default serialize;
