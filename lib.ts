import { parse } from "@babel/parser";
import { isNode, isStringLiteral } from "@babel/types";
import { PathLike, readFileSync } from "fs";



export function getAllStrings(path: PathLike) {
  const code = readFileSync(path, { encoding: "utf-8" }).toString();
  const parseResult = parse(code, { errorRecovery: true });

  let nodes: any[] = [parseResult.program];
  let strings: Array<{ loc: { line: number; column: number }; value: string }> =
    [];

  while (nodes.length > 0) {
    let currentNode = nodes.pop();

    if (isStringLiteral(currentNode)) {
      strings.push({
        loc: currentNode.loc.start,
        value: currentNode.value,
      });
    } else {
      Object.keys(currentNode).forEach((key) => {
        const prop = currentNode[key];
        if (isNode(prop)) {
          nodes.push(prop);
        } else if (Array.isArray(prop)) {
          prop.filter(isNode).forEach((node) => nodes.push(node));
        }
      });
    }
  }

  return strings;
}