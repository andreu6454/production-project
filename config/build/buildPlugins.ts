import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({paths, isDev, apiUrl, project}: BuildOptions): webpack.WebpackPluginInstance[] {

    const plugins = [
        new HTMLWebpackPlugin({
                template: paths.html
            }
        ),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project)
        }),
        new CopyPlugin({
            patterns: [
                {from: paths.locales, to: paths.buildLocales},
            ]
        })
    ]

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin())
        plugins.push(new ReactRefreshPlugin())
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }))
        plugins.push(new ReactRefreshPlugin())
    }
    return plugins
}