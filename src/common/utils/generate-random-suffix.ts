export function generateRandomSuffix() {
    return Math.random().toString(36).substring(2, 8); // Isso vai deixar praticamente impossível uma slug colidir com outra
}