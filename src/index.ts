function formatter(mask: string | string[], value: string, placeholderChar?: string) {
    if (!value || !mask) return;
    
    const splitted_value = value.split('');
    let finalMask = '';
  
    if (Array.isArray(mask)) {
      let bestMask = mask.map(m => m.replace(/[^#]/g, '').length).sort( (a,b) => Math.abs(a - splitted_value.length) - Math.abs(b - splitted_value.length));
    } else {
      finalMask = mask.toString();
    }
  
    let formatted = [];
  
    const splitted_mask = finalMask.split('');
  
    let skipLength = 0;
    for (let index = 0; index < splitted_mask.length; index++) {
        
      if (splitted_mask[index] !== '#') {
        formatted[index] = splitted_mask[index];
        skipLength++;
        continue;
      }
      formatted[index] = splitted_value[index - skipLength] ? splitted_value[index - skipLength] : placeholderChar || splitted_mask[index];
    }
  
    return formatted.join('');
  }

  function unmask(maskedValue: string): string {
    return maskedValue.replace(/[\D]/, '');
  }


  export {formatter, unmask}