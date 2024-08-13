
export type BuildMode = "development" | "production";
export interface BuildPaths{
    entry: string, // path to entry point
    build: string, // path to build folder
    html: string, // path to index.html
    src: string
}

export interface BuildEnv{
    mode: BuildMode,
    port: number
}

export interface BuildOptions{
    mode: BuildMode,
    paths:BuildPaths,
    isDev: boolean,
    port: number
}