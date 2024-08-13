import webpack from "webpack";
import {BuildOptions} from "./type/config";

export function buildResolvers(options: BuildOptions):webpack.ResolveOptions{
    return {
        extensions: ['.tsx', '.ts', '.js'], // extensions for import
        preferAbsolute: true, // imports absolute path priority
        modules:[options.paths.src, "node_modules"], // imports absolute path
        mainFiles: ['index'], // public api file for each module
        alias: {} // if we don't specify alias, we can import helper/classNames, not @helper/classNames,
    }
}