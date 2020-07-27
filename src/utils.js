import randomwords from "random-words";

export const generateSecret = () => {
    const words = randomwords({exactly: 2});
    return `${words[0]} ${words[1]}`;
}