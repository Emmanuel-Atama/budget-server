export class DuplicateEntityError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, DuplicateEntityError.prototype);
    }
}