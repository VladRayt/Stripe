declare global {
    interface ErrorUtils {
        getGlobalHandler(): (error: Error, isFatal?: boolean) => void;
        setGlobalHandler(callback: (error: Error, isFatal?: boolean) => void): void;
    }

    var ErrorUtils: ErrorUtils | undefined;
}

export { };
