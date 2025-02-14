/**
 * @module
 *
 * 文字列をノムリッシュ翻訳します。
 *
 * @example
 * ```typescript
 * import { NomlishTranslator } from "@souhait0614/nomlish-translator";
 * const translator = new NomlishTranslator();
 * const result = await translator.translate("吾輩は猫である。名前はまだ無い。");
 * console.log(result); // "人類の上位種である吾輩は獣である。名前はまだクリスタルがこの世に存在していた頃の話…ヴァニティー。"
 * ```
 */

export { NomlishTranslator } from "./src/NomlishTranslator.ts";
export type { TranslateParams } from "./src/types.ts";
