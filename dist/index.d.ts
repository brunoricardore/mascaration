/**
 *
 * @param mask The mask to format the value: '###.###.###-##', if you give an array of masks, it found the best match by the mask size (including only maskChar), and use it to mask
 * @param value Value you'd like to mask
 * @param maskChar change the replacer char, instead of '#'
 * @param placeholderChar you can define an placeholder char to empty slots: '###.###.___-__'
 * @returns string
 */
declare function formatter(mask: string | string[], value: string, maskChar?: string, placeholderChar?: string): string;
/**
 *
 * @param maskedValue the masked value ''123.123.123.11'
 * @returns string 12312312311
 */
declare function unmask(maskedValue: string): string;
export { formatter, unmask };
