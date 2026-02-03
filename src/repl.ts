import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./command.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex REPL",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
  };
}

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
    console.log(getCommands()[input].callback(getCommands()) ?? `Unknown command: ${input}`);
  });
}
