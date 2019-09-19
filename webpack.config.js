var path = require("path");

var webpack = require("webpack");

var package = require(path.join(__dirname, "/package.json"));

module.exports = (env, options) => {
    var mode = options.mode || process.env.NODE_ENV || "production";
    var pages = Object.keys(package.pages);
    var entries = {
        Service: [
            ...(
                mode == "development"
                    ? ["webpack-hot-middleware/client"]
                    : []
            ),
            path.join(__dirname, "/src/service/index.js")
        ]
    };
    pages.forEach((page) => {
        entries[page] = [
            ...(
                mode == "development"
                    ? ["webpack-hot-middleware/client"]
                    : []
            ),
            path.join(__dirname, "/src/page/" + page + "/index.js")
        ];
    });
    return {
        mode: mode,
        externals: {
            "service": "Service",
            "react": "React",
            "react-dom": "ReactDOM",
            "react-markdown": "ReactMarkdown",
            "@alifd/next": "Next",
            "moment": "moment",
            "echarts": "echarts"
        },
        entry: entries,
        output: {
            library: "[name]",
            libraryTarget: "umd",
            filename: "[name].js",
            path: path.join(__dirname, "/build"),
            publicPath: "/assets/" + package.version
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: [
                        /node_modules/
                    ],
                    use: [
                        ...(
                            mode == "development"
                                ? [
                                    {
                                        loader: "js-prettier-loader",
                                        options: {
                                            parser: "babylon"
                                        }
                                    }
                                ]
                                : []
                        ),
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        (
                                            mode == "development"
                                                ? {
                                                    "targets": {
                                                        "esmodules": true
                                                    },
                                                    "useBuiltIns": false
                                                }
                                                : {
                                                    "targets": {
                                                        "ie": 10
                                                    },
                                                    "useBuiltIns": false
                                                }
                                        )
                                    ],
                                    [
                                        "@babel/preset-react",
                                        {
                                            "development": false
                                        }
                                    ]
                                ],
                                plugins: [
                                    [
                                        "@babel/plugin-transform-runtime",
                                        {}
                                    ],
                                    [
                                        "@babel/plugin-proposal-class-properties",
                                        {
                                            "loose": true
                                        }
                                    ],
                                    [
                                        "@babel/plugin-proposal-decorators",
                                        {
                                            "legacy": true
                                        }
                                    ],
                                    [
                                        "import",
                                        {
                                            "libraryName": "antd",
                                            "libraryDirectory": "es"
                                        }
                                    ]
                                ]
                            }
                        },
                    ]
                },
                {
                    test: /\.css$/,
                    exclude: [
                    ],
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: [
                    ],
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader",
                            options: { javascriptEnabled: true }
                        }
                    ]
                }
            ]
        },
        plugins: [
            ...(
                mode == "development"
                    ? [new webpack.HotModuleReplacementPlugin()]
                    : []
            )
        ]
    };
};
