
type KeyOptions = {
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number
}

type FontSizeOptions = {
    small: KeyOptions,
    tiny: KeyOptions,
    medium: KeyOptions,
    large: KeyOptions,
    extra: KeyOptions,
    normal: KeyOptions,
}

type SpacingOptions = {
    tiny: number,
    small: number,
    normal: number,
    medium: number,
    large: number,
    extra: number,
}


export const fontSizes: FontSizeOptions = {
    small: { xs: 10, sm: 12 },
    tiny: { xs: 8, sm: 10 },
    medium: { xs: 12, sm: 13 },
    large: { xs: 14, sm: 16 },
    extra: { xs: 20, md: 28 },
    normal: { xs: 13, md: 14 },
}

export const spacing: SpacingOptions = {
    tiny: .2,
    small: .5,
    normal: 1,
    medium: 1.5,
    large: 2,
    extra: 3,
}