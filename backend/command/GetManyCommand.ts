import Command from "./Command";

export default interface GetManyCommand extends Command {
    get limit(): number | undefined;
}