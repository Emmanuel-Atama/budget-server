import Entity from "../model/Entity";
import Command from "./Command";

export default interface EntityCommand extends Command {
    get entity(): Entity;
}