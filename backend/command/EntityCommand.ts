import { Entity } from "../model/Entity";
import { Command } from "./Command";

export interface EntityCommand extends Command {
    get entity(): Entity;
}