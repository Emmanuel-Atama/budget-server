import { Command } from "./Command";

export interface GetManyCommand extends Command {
    get limit(): number | undefined;
}