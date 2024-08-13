import path from "node:path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {buildPlugins} from "./config/build/buildPlugins";
import {buildLoaders} from "./config/build/buildLoaders";
import {buildResolvers} from "./config/build/buildResolvers";
import {buildWebPackConfig} from "./config/build/buildWebPackConfig";
import {BuildEnv, BuildMode, BuildPaths} from "./config/build/type/config";


export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        build: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, "src","index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src")
    }
    const PORT: number = env.port || 3000;
    const mode: BuildMode = env.mode || "development";
    const isDev: boolean = mode === "development";
    const config: webpack.Configuration = buildWebPackConfig({
        mode: mode,
        paths: paths,
        isDev: isDev,
        port: PORT
    })
    return config;
}
