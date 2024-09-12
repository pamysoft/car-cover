export function toTitleCase(str: string): string {
    if (!(str)) return str;
    return str
        .toLowerCase() // Convert the string to lowercase first
        .split(' ')    // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(' ');    // Join the words back into a string
}