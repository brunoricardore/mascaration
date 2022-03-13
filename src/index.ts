
/**
 * 
 * @param mask The mask to format the value: '###.###.###-##', if you give an array of masks, it found the best match by the mask size (including only maskChar), and use it to mask
 * @param value Value you'd like to mask
 * @param maskChar change the replacer char, instead of '#'
 * @param placeholderChar you can define an placeholder char to empty slots: '###.###.___-__'
 * @returns string
 */
function formatter(mask: string | string[], value: string, maskChar: string = '#', placeholderChar?: string): string {
  if (!value || !mask) return '';

  const splitted_value = value.split('');
  let finalMask = '';

  const regex = new RegExp(`[^${maskChar}]`, 'g');

  if (Array.isArray(mask)) {

    let mappedMasks = mask
      .map(m => {
        const onlyMaskChars = m.replace(regex, '');
        return {
          mask: m,
          clearedMask: onlyMaskChars,
          length: onlyMaskChars.length,
          lengthDistance: (onlyMaskChars.length - value.length)
        }
      });

      // console.log(mappedMasks);

      // console.log('--------------');

      const perfectMatchMask = mappedMasks.filter(m => m.lengthDistance === 0)[0];
      const nextMask = mappedMasks.filter(m => m.lengthDistance >= 0).sort((a,b) => a.lengthDistance - b.lengthDistance)[0];
      const previousMask = mappedMasks.sort((a,b) => b.lengthDistance - a.lengthDistance)[0];

      // console.log({value, perfectMatchMask, nextMask, previousMask});
    
      // if(perfectMatchMask) finalMask = perfectMatchMask.mask;

      finalMask = perfectMatchMask?.mask || nextMask?.mask || previousMask?.mask;


  } else {
    finalMask = mask.toString();
  }

  let formatted = [];

  const splitted_mask = finalMask.split('');

  let skipLength = 0;
  for (let index = 0; index < splitted_mask.length; index++) {

    if (splitted_mask[index] !== maskChar) {
      formatted[index] = splitted_mask[index];
      skipLength++;
      continue;
    }
    formatted[index] = splitted_value[index - skipLength] ? splitted_value[index - skipLength] : placeholderChar || splitted_mask[index];
  }

  return formatted.join('');
}

/**
 * 
 * @param maskedValue the masked value ''123.123.123.11'
 * @returns string 12312312311
 */
function unmask(maskedValue: string): string {
  return maskedValue.replace(/[^0-9]/g, '');
}


export { formatter, unmask }