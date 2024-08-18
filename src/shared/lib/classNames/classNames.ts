
export type Mods = Record<string, boolean | string>
export function classNames(mainClassName: string, mods: Mods = {}, additional: string[] = []): string{


     const str: string = [
        mainClassName,
        ...additional.filter(Boolean),
             ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            // filters for only true value in mods: Mods,
            .map(([key]) => key), // return only key (hovered: true) -> hovered: key, true:value
    ]
        .join(' ');
    return str;
}

// example
//  classNames('app', {hovered: true, selectable: true, red: false}, ['dark'])
//  replace
//  <div className={`app ${theme}`}>
