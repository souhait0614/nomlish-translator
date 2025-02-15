import { setTimeout } from "node:timers/promises";
import { assert, test } from "vitest";
import { NomlishTranslator } from "../../index.ts";

const testText = "吾輩は猫である。名前はまだ無い。";

test("single translate", async () => {
  const translator = new NomlishTranslator();
  const result = await translator.translate(testText);
  console.log(result);
  assert.exists(result);
});

test("multi translate", async () => {
  const translator = new NomlishTranslator();
  for await (const index of Array.from({ length: 10 }).keys()) {
    const result = await translator.translate(testText);
    console.log(`${index + 1}. ${result}\n`);
    assert.exists(result);
    await setTimeout(50);
  }
});
