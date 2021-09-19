import { Command } from "./Command";

export interface IdentityCommand extends Command {
    get id(): number;
}