export const fetchPlus = (
  url: URL | string,
  options: RequestInit | undefined = {},
  retries: number = 1
): Promise<Response | void> =>
  fetch(url, options)
    .then((res: Response) => {
      if (res.ok) {
        return res;
      }
      if (retries > 0) {
        return fetchPlus(url, options, retries - 1);
      }
      throw new Error("Unable to fetch url");
    })
    .catch((error) => console.error(error.message));