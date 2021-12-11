export class StringHelper{

    /**
     * Converts CamelCase to kebab-case
     * https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case-in-javascript
     * @param str
     * @returns {*}
     */
    static kebabize(str){
        return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
    }

    static toCapitalizedWords(name) {
        const words = name.match(/[A-Za-z][a-z]*/g) || [];
        return words.map(StringHelper.capitalizeFirstLetter).join(" ");
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}