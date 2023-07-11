
export type BuiltMode = 'production' | 'development'

export interface BuildEnv {
    mode: BuiltMode,
    port: number
}
export interface BuildPaths {
    entry: string,
    build: string,
    html: string,
    src: string;
}
export interface BuildOptions {
    mode: BuiltMode;
    paths: BuildPaths;
    isDev: boolean,
    port: number
}