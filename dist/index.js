"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmask = exports.formatter = void 0;
/**
 *
 * @param mask The mask to format the value: '###.###.###-##', if you give an array of masks, it found the best match by the mask size (including only maskChar), and use it to mask
 * @param value Value you'd like to mask
 * @param maskChar change the replacer char, instead of '#'
 * @param placeholderChar you can define an placeholder char to empty slots: '###.###.___-__'
 * @returns string
 */
function formatter(mask, value, maskChar, placeholderChar) {
    if (maskChar === void 0) { maskChar = '#'; }
    if (!value || !mask)
        return '';
    var splitted_value = value.split('');
    var finalMask = '';
    var regex = new RegExp("[^".concat(maskChar, "]"), 'g');
    if (Array.isArray(mask)) {
        var mappedMasks = mask
            .map(function (m) {
            var onlyMaskChars = m.replace(regex, '');
            return {
                mask: m,
                clearedMask: onlyMaskChars,
                length: onlyMaskChars.length,
                lengthDistance: (onlyMaskChars.length - value.length)
            };
        });
        // console.log(mappedMasks);
        // console.log('--------------');
        var perfectMatchMask = mappedMasks.filter(function (m) { return m.lengthDistance === 0; })[0];
        var nextMask = mappedMasks.filter(function (m) { return m.lengthDistance >= 0; }).sort(function (a, b) { return a.lengthDistance - b.lengthDistance; })[0];
        var previousMask = mappedMasks.sort(function (a, b) { return b.lengthDistance - a.lengthDistance; })[0];
        // console.log({value, perfectMatchMask, nextMask, previousMask});
        // if(perfectMatchMask) finalMask = perfectMatchMask.mask;
        finalMask = (perfectMatchMask === null || perfectMatchMask === void 0 ? void 0 : perfectMatchMask.mask) || (nextMask === null || nextMask === void 0 ? void 0 : nextMask.mask) || (previousMask === null || previousMask === void 0 ? void 0 : previousMask.mask);
    }
    else {
        finalMask = mask.toString();
    }
    var formatted = [];
    var splitted_mask = finalMask.split('');
    var skipLength = 0;
    for (var index = 0; index < splitted_mask.length; index++) {
        if (splitted_mask[index] !== maskChar) {
            formatted[index] = splitted_mask[index];
            skipLength++;
            continue;
        }
        formatted[index] = splitted_value[index - skipLength] ? splitted_value[index - skipLength] : placeholderChar || splitted_mask[index];
    }
    return formatted.join('');
}
exports.formatter = formatter;
/**
 *
 * @param maskedValue the masked value ''123.123.123.11'
 * @returns string 12312312311
 */
function unmask(maskedValue) {
    return maskedValue.replace(/[^0-9]/g, '');
}
exports.unmask = unmask;
