import {BuildOptions} from "./type/config";
import webpack from "webpack";
import path from "node:path";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildPlugins} from "./buildPlugins";
import {buildDevServer} from "./buildDevServer";

export function buildWebPackConfig(options: BuildOptions): webpack.Configuration {
    const {mode, paths, isDev} = options;
    return {

        mode: mode,
        entry: paths.entry, // start point our application
        output: {
            // output build app
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true // old output files will remove after refresh building project
        },
        module: {
            // rules - handle files which not .js (.css, .scss, .jpeg, .svg, .png, etc...)
            rules: buildLoaders(options)
        },


        // webpack combine all files in one file calling as bundle.js,
        // this props show where exactly an error occurred
        devtool: isDev ? 'inline-source-map' : undefined,

        // extensions for import
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devServer: buildDevServer(options),
    };
}