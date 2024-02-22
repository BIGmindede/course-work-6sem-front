export function useClassNames(cls, additional) {
    return [
        cls,
        ...additional.filter(Boolean)
    ].join(' ')
}
