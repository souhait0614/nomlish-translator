import { resolve } from "jsr:@std/path/posix";
import { build, emptyDir } from "jsr:@deno/dnt";

const outDir = resolve(Deno.cwd(), "./built-packages");

await emptyDir(outDir);

await build({
  entryPoints: ["./index.ts"],
  outDir,
  shims: {
    deno: true,
  },
  test: false,
  typeCheck: false,
  package: {
    name: `@souhait0614/nomlish-translator`,
    version: "0.0.0",
  },
});
