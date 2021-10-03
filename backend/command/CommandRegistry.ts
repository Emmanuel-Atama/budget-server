import Command from "./Command";
import CommandHandler from "./CommandHandler";
import InvalidCommandError from "./InvalidCommandError";

export default class CommandRegistry {
    private registry: [string, CommandHandler][];

    constructor(registry: [string, CommandHandler][]) {
        this.registry = registry;
    }

    resolve(command: Command): CommandHandler {
        const resolved = this.registry.find((mapping: [string, CommandHandler]) => mapping[0] === command.getName());

        if (!resolved) {
            throw new InvalidCommandError(`Command ${command.getName()} could not be resolved. It might not be mapped to a handler.`);
        }

        return resolved[1];
    }
}