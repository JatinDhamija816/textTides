export const Username = (name: string): string => {
    const number = Math.floor(Math.random() * 9000 + 1000);
    const username = name.trim().toLowerCase() + number;

    return username;
}
