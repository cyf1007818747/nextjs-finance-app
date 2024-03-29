// graphql/builder.ts

// 1.
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { DateTimeResolver } from "graphql-scalars";
import { prisma } from "@/app/lib/db";

// 2.
export const builder = new SchemaBuilder<{
  // 3.
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  // 4.
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

// 5.
builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.addScalarType("Date", DateTimeResolver, {});
