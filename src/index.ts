import type { ValidateFunction } from "ajv";
import type { FromSchema } from "json-schema-to-ts";

import Ajv from "ajv";
import dynamicDefaults from "ajv-keywords/dist/definitions/dynamicDefaults";
import uuid from "uuid-random";

import Credentials from "./schemas/credentials";
import Data from "./schemas/data";
import Importmap from "./schemas/importmap";
import Page, { plainPage } from "./schemas/page";

export type TPage = FromSchema<typeof plainPage> & {
  $children?: TPage[];
  $index: number;
  $next?: TPage;
  $prev?: TPage;
  $siblings: TPage[];
  branch: TPage[];
  buffer?: string;
  children?: TPage[];
  contenteditable: boolean;
  html: Promise<string> | string;
  i: string;
  index: number;
  next?: TPage;
  parent?: TPage;
  path: string;
  prev?: TPage;
  root: TPage;
  sfc: Promise<string>;
  siblings: TPage[];
  title: string;
  to: string;
};
dynamicDefaults.DEFAULTS.uuid = (): (() => string) => () => uuid();
const useDefaults = true;
const coerceTypes = true;
const esm = true;
const removeAdditional = true;
const code = { esm };
export type TCredentials = FromSchema<typeof Credentials>;
export type TImportmap = FromSchema<typeof Importmap>;
const schemas = [Credentials, Page, Data, Importmap];
const keywords = [dynamicDefaults()];
const ajv = new Ajv({
  code,
  coerceTypes,
  keywords,
  removeAdditional,
  schemas,
  useDefaults,
});
export const validatePage = ajv.getSchema(
  "urn:jsonschema:page",
) as ValidateFunction;
export const validateCredentials = ajv.getSchema(
  "urn:jsonschema:credentials",
) as ValidateFunction;
export const validateData = ajv.getSchema(
  "urn:jsonschema:data",
) as ValidateFunction;
export const validateImportmap = ajv.getSchema(
  "urn:jsonschema:importmap",
) as ValidateFunction;
