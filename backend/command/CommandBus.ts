import { Command } from "./Command";
import { CommandRegistry } from "./CommandRegistry";

export class CommandBus {
    private registry: CommandRegistry;

    constructor(registry: CommandRegistry) {
        this.registry = registry;
    }

    async dispatch(command: Command): Promise<any> {
        return await this.registry.resolve(command).handle(command);
    }
}