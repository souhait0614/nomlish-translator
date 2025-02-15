import { fetch, getText } from "./fetch.ts";
import type { TranslateParams } from "./types.ts";

const defaultParams: TranslateParams = {
  siteUrl: "https://racing-lagoon.info/nomu/translate.php",
  level: 2,
  options: "nochk",
};

/**
 * Webスクレイピングを行い文字列をノムリッシュ翻訳するクラス
 *
 * @example
 * ```typescript
 * const translator = new NomlishTranslator({
 *   siteUrl: "https://example.com",
 *   level: 2,
 *   options: "nochk",
 * });
 * ```
 */
export class NomlishTranslator {
  #token: Promise<string>;
  #params: TranslateParams;

  constructor(params?: Partial<TranslateParams>) {
    this.#params = { ...defaultParams, ...params };
    this.#token = this.#getToken();
  }

  #getToken = async () => {
    const html = await fetch(this.#params.siteUrl).then(getText);
    const token = html.match(/name="token" value="(.*)"/)?.at(1);
    if (!token) throw new Error("Failed to get token");
    return token;
  };

  #translate = async (input: string) => {
    const token = await this.#token;
    const params = new URLSearchParams({
      before: input,
      level: this.#params.level.toString(),
      options: this.#params.options,
      token,
      transbtn: "",
    });
    const html = await fetch(this.#params.siteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }).then(getText);
    if (html.includes("CSRF check failed")) {
      throw new Error("CSRF check failed");
    }
    const output = html
      .match(/<textarea.*name="after1".*?>([\S\s]*?)<\/textarea>/)
      ?.at(1);
    if (!output) throw new Error("Failed to get output");
    return output;
  };

  translate = async (input: string): Promise<string> => {
    try {
      const output = await this.#translate(input);
      return output;
    } catch (e) {
      if (e instanceof Error && e.message === "CSRF check failed") {
        this.#token = this.#getToken();
        const output = await this.#translate(input);
        return output;
      }
      throw e;
    }
  };
}
