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
        ['module-resolver', {
            alias: {
                "@bin": "./src/bin",
                "@controllers": "./src/controllers",
                "@database": "./src/database",
                "@errors": "./src/errors",
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