import Entity from "../../model/Entity";
import Timestamped from "../../model/Timestamped";

export default class User implements Entity, Timestamped {
    private readonly _id: number;
    private readonly _username: string;
    private readonly _password: string;
    private readonly _timestamp: Date;

    constructor(id: number, username: string, password: string, timestamp: Date) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._timestamp = timestamp;
    }

    get id(): number {
        return this._id;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            timestamp: this.timestamp
        };
    }
}