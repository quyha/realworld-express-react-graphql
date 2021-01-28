function toCursorHash (str: string): string {
    return Buffer.from(str).toString('base64');
}

function fromCursorHash (str: string): string {
    return Buffer.from(str, 'base64').toString('ascii');
}

export { toCursorHash, fromCursorHash };
