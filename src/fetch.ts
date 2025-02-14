import baseFetch from "cross-fetch";
import makeFetchCookie from "fetch-cookie";

const fetch = makeFetchCookie(baseFetch);

const getText = (res: Response) => {
  if (!res.ok) throw new Error(res.statusText);
  return res.text();
};

export { fetch, getText };
