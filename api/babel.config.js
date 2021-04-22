module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        'babel-plugin-transform-typescript-metadata',
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }],
        ['module-resolver', {
            alias: {
                "@bin": "./src/bin",
                "@controllers": "./src/controllers",
                "@database": "./src/database",
                "@errors": "./src/errors",
                "@models": "./src/models",
                "@repositories": "./src/repositories",
                "@services": "./src/services",
                "@tests": "./src/tests",
                "@utils": "./src/utils",
                "@validators": "./src/validators/",
                "@routes": "./src/routes",
                "@app": "./src/app",
            }
        }]
    ],
    ignore: [
        '**/*.spec.js'
    ]
}