/* eslint-disable prettier/prettier */

function lchToLab(l: number, c: number, h: number) {
    const radianH = (h * Math.PI) / 180
    const a = c * Math.cos(radianH)
    const b = c * Math.sin(radianH)

    return { l, a, b }
}

function labToXyz(l: number, a: number, b: number) {
    const y = (l + 16) / 116
    const x = a / 500 + y
    const z = y - b / 200

    const labToXyzHelper = (value: number) => {
        const pow3 = Math.pow(value, 3);

        return pow3 > 0.008856 ? pow3 : (value - 16 / 116) / 7.787
    }

    const XYZx = labToXyzHelper(x) * 95.047
    const XYZy = labToXyzHelper(y) * 100.000
    const XYZz = labToXyzHelper(z) * 108.883

    return { XYZx, XYZy, XYZz }
}

function xyzToRgb(x: number, y: number, z: number) {
    const xPercent = x / 100
    const yPercent = y / 100
    const zPercent = z / 100

    const rgbHelper = (value: number) => {
        return value > 0.0031308 ? (1.055 * Math.pow(value, 0.41666667) - 0.055) : 12.92 * value
    };

    const r = rgbHelper(xPercent * 3.2406 + yPercent * -1.5372 + zPercent * -0.4986) * 255
    const g = rgbHelper(xPercent * -0.9689 + yPercent * 1.8758 + zPercent * 0.0415) * 255
    const b = rgbHelper(xPercent * 0.0557 + yPercent * -0.2040 + zPercent * 1.0570) * 255

    return {r, g, b}
}


function rgbToHsl(r: number, g: number, b: number) {

    function normalizeRgb(rgb_x: number) {
        return Math.min(1, Math.max(0, rgb_x / 255))
    }

    r = normalizeRgb(r)
    g = normalizeRgb(g)
    b = normalizeRgb(b)

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const lightness = (max + min) / 2;

    if (max === min) {
        return {hue: 0, saturation: 0, lightness};
    }

    const d = max - min;
    const saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

    let hue = 0;

    switch (max) {
        case r: hue = (g - b) / d + (g < b ? 6 : 0)
        break
        case g: hue = (b - r) / d + 2 
        break
        case b: hue = (r - g) / d + 4 
        break
    }

    hue /= 6;
    const h = Math.round(hue * 360)
    const s = Math.round(saturation * 100)
    const l = Math.round(lightness * 100)

    return {h, s, l};
}

export function lchToHsl(lch: string): string {
    const [l, c, h] = lch.match(/\d+(\.\d+)?/g)!.map(Number)
    //console.log('lch:', l, c, h)
    const lab = lchToLab(l, c, h)
    //console.log('lab:', lab.l, lab.a, lab.b)
    const xyz = labToXyz(lab.l, lab.a, lab.b)
    //console.log('xyz:', xyz.XYZx, xyz.XYZy, xyz.XYZz)
    const rgb = xyzToRgb(xyz.XYZx, xyz.XYZy, xyz.XYZz)
    //console.log('rgb:', rgb.r, rgb.g, rgb.b)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    //console.log('hsl:', hsl)

    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
}

export function getColorLightness (colorValue: string): number | null {
    const regex = /(lch|hsl)\(([^)]+)\)/;
    const match = colorValue.match(regex);
  
    if (match) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, notation, values] = match;
      const components = values.split(',').map(component => parseFloat(component.trim()))
  
      if (notation === 'lch') {
        // Assuming LCH format
        const lightness = components[0]

        return isNaN(lightness) ? null : lightness
      } else if (notation === 'hsl') {
        // Assuming HSL format
        const lightness = components[2]
        
        return isNaN(lightness) ? null : lightness
      }
    }
  
    return null
}


