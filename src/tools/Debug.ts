const isDebugLogEnabled = true;

export function debugLog(message: any) {
    if (globalThis.isDebugLogEnabled) {
        console.log(message);
    }
}