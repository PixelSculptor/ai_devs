import { parseArgs } from "util";

export const { values } = parseArgs({
    args: Bun.argv,
    options: {
      taskName: {
        type: 'string',
      },
    },
    strict: true,
    allowPositionals: true,
  });
  