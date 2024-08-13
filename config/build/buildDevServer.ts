import webpack from "webpack";
import {WebpackDevServerOptions} from "webpack-cli";
import {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "./type/config";


// dev server accept changes code in real-time without new build project
export function buildDevServer(options: BuildOptions): DevServerConfiguration {

    return {
        port: options.port,

        // auto open app in browser
        open: true,

        //  Allows to proxy requests through a specified index page (by default 'index.html'),
        // useful for Single Page Applications that utilise the HTML5 History API.
        historyApiFallback: true,
        hot: true // enable hotModuleReplacementPlugin
    }
}