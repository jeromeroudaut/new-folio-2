module.exports = {
    js: {
        entry: 'src/static/js/main.js',
        dest: 'src/static/js/app.js',
        watch: [
            './src/static/js/app/**/*.js',
            './src/static/js/Bundle/**/*.js',
            './src/static/js/Engine/**/*.js',
            './src/static/js/app/Core/*.js',
            './src/static/js/lib/**/*.js',
            './src/static/js/main.js'
        ],
        //eslint: 'build/node/common/config/.eslintrc'
    },
    css: {
        entry: 'src/static/style/css/main.css',
        dest: 'src/static/style/css/app.css',
        watch: [
            './src/static/style/css/main.css',
            './src/static/style/css/app/**/*.css',
            './src/static/style/css/lib/**/*.css',
            './src/static/style/css/common/**/*.css',
            './src/static/style/css/issue/**/*.css',
            './src/static/style/css/page/**/*.css',
            './src/static/style/css/vars/**/*.css'

            
        ],
        autoprefixer: ['last 2 versions']
    },
    php: {
        watch: [
            './src/app/**/*.php',
            './src/engine/**/*.php'
        ]
    }
}
