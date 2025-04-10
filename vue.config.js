"use strict";
const path = require("path");

function resolve (dir) {
    return path.join(__dirname, dir);
    // eslint-disable-next-line no-extra-semi
};
const { defineConfig } = require("@vue/cli-service");
const productionGzipExtensions = /\.(js|css|json|txt|ico|png|jpg|svg)(\?.*)?$/i;

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    productionSourceMap: process.env.NODE_ENV !== "production",
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            "/api": {
                target: 'https://bsex.me', // 目标 API 服务器
                changeOrigin: true, // 允许跨域
                pathRewrite: { '^/api': '' }, // 重写路径
            },
            // "/api": {
            //     target: 'https://ubex.me', // 目标 API 服务器
            //     changeOrigin: true, // 允许跨域
            //     pathRewrite: { '^/api': '' }, // 重写路径
            // }
            // '/bsex-market': {
            //     target: 'http://192.168.110.23', // 目标 API 服务器
            //     changeOrigin: true, // 允许跨域
            //     pathRewrite: {'^/bsex-market': ''}, // 重写路径
            // },
            // '/api/bsex-market': {
            //     target: 'http://192.168.110.190:16000',
            //     changeOrigin: true,
            //     pathRewrite: {'^/api': '/bsex-market'},
            // },
        },
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
              @use "@/assets/style/config.scss" as *;
              @use "@/assets/style/mixin.scss" as *;
              `
            }
        }
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV !== "production") return;

        // [contenthash:8]  来生成包含 8 位哈希的文件名
        config.output.filename = `js/[name][contenthash:8].js`;
        config.output.chunkFilename = `js/[name][contenthash:8].js`;
        return {
            plugins: [
                new CompressionPlugin({
                    algorithm: "gzip", // 使用gzip压缩
                    test: productionGzipExtensions, // 匹配文件名
                    threshold: 512, // 只处理大于此大小的资产。以字节为单位
                    minRatio: 0.5, //只有压缩好这个比率的资产才能被处理
                    // filename: `[path].gz[query]`, // 压缩后的文件名(保持原文件名，后缀加.gz
                    deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
                }),
                //  new BundleAnalyzerPlugin()
            ],
            //开启分离 js
            optimization: {
                splitChunks: {
                    chunks: "all",
                    minSize: 1000,
                    minRemainingSize: 2,
                    minChunks: 3,
                    maxAsyncRequests: 20,
                    maxInitialRequests: 20,
                    enforceSizeThreshold: 2000,
                    cacheGroups: {
                        defaultVendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            reuseExistingChunk: true,
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                    },
                },
            },
        };
    },
    chainWebpack: (config) => {
        config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/assets/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();
        // config.entry("main").add("babel-polyfill"); //浏览器兼容
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
        pwa: {
            iconPaths: {
                favicon32: "./favicon.ico",
                favicon16: "./favicon.ico",
                appleTouchIcon: "./favicon.ico",
                maskIcon: "./favicon.ico",
                msTileImage: "./favicon.ico",
            },
        },
    },
});
