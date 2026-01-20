export function cleanInput(input: string): string[] {
  return input.split(" ").filter(str => str.length > 0);
}
