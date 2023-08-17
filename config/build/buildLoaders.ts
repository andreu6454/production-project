import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";
import {buildBabelLoader} from "./loaders/buildBabelLoader";


export function buildLoaders({isDev,...options}: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }
    const fileLoader = {
        test: /\.(png|jpe?g|gif|w0ff2|woff)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }
    const codeBabelLoader = buildBabelLoader({...options,isDev, isTsx: false})
    const tsxBabelLoader = buildBabelLoader({...options,isDev, isTsx: true})

    const cssLoaders = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:8]'
                            : '[hash:base64:8]',
                    }
                }
            },
            "sass-loader",
        ],
    }
    return [
        codeBabelLoader,
        tsxBabelLoader,
        cssLoaders,
        svgLoader,
        fileLoader,
    ]
}