import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

export function startRepl(): void {
  const readLine = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });
  readLine.prompt();

  readLine.on("line", async (input: string): Promise<void> => {
    const words = cleanInput(input);
    if (words.length === 0) {
      readLine.prompt();
      return;
    }

    const commandName = words[0];
    console.log(`Your command was: ${commandName}`);
    readLine.prompt();
  });
}
