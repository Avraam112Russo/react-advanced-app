import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";
import webpack from "webpack";
import {BuildOptions, BuildPaths} from "./type/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[]{

    return [
        new HtmlWebpackPlugin({ // generate index.html in build output
            template: paths.html
        }),
        new webpack.ProgressPlugin(), // just show status build project (10%, 20%, 30% etc.)

        // separate multiple css files
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        }),
        new webpack.DefinePlugin({
            __IS_DEV__ : isDev //  use variable __IS_DEV in i18n
        }),
        new webpack.HotModuleReplacementPlugin() // accept code changes without refresh page
    ]
}