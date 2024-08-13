import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./type/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const {isDev} = options;


    // if we don't use typescript, so we need install Babel
    // in our case we don't need babel
    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };
    const scssLoader =  {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                // "style-loader",


                // generate multiple css files in prod mode
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            auto: (resPath: string) => Boolean(resPath.includes('.module.')), // generate hash only for files which name contain ".module."
                            localIdentName: isDev
                                // generate different names for scss files in prod and dev mode
                                ? '[path][name]__[local]--[hash:base64:5]'
                                : '[hash:base64:8]',
                        },
                    },
                },
                // Compiles Sass to CSS
                "sass-loader",
            ],
        }
    return [
        typeScriptLoader,
        scssLoader
    ]
}