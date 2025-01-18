export function millisecondsToHuman(duration: number): string {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const humanized = [
        hours % 24,
        minutes % 60,
        seconds % 60
    ]
        .map((time) => time.toString().padStart(2, '0'))
        .join(':');
    return humanized;
}