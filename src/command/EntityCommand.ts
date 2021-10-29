import Entity from "../DAL/Entity";
import Command from "./Command";

export default interface EntityCommand extends Command {
    get entity(): Entity;
}