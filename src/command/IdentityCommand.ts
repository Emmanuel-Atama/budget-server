import Command from "./Command";

export default interface IdentityCommand extends Command {
    get id(): number;
}