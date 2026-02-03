import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
export function getCommands() {
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
export function cleanInput(input) {
    return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}
export function startRepl() {
    const readLine = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    });
    readLine.prompt();
    readLine.on("line", async (input) => {
        console.log(getCommands()[input].callback(getCommands()) ?? `Unknown command: ${input}`);
    });
}
