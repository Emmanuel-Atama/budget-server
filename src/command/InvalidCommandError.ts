export default class InvalidCommandError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, InvalidCommandError.prototype);
    }
}