const { src, dest, series, watch } = require(`gulp`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    cssLinter = require(`gulp-stylelint`),
    cssCompressor = require(`gulp-uglifycss`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

async function brave () {
    browserChoice = `brave browser`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function edge () {
    browserChoice = `microsoft-edge`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function opera () {
    browserChoice = `opera`;
}

async function safari () {
    browserChoice = `safari`;
}

async function vivaldi () {
    browserChoice = `vivaldi`;
}

async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `microsoft-edge`,
        `firefox`,
        `opera`,
        `safari`,
        `vivaldi`
    ];
}

let validateHTML = () => {
    return src(`*.html`)
        .pipe(htmlValidator(undefined));
};

let compressHTML = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let lintCSS = () => {
    return src(`css/*.css`)
        .pipe(cssLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let compressCSS = () => {
    return src(`css/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/css`));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `./`,
                `css`,
                `js`
            ]
        }
    });

    watch(`*.html`, validateHTML)
        .on(`change`, reload);

    watch(`css/*.css`, lintCSS)
        .on(`change`, reload);

    watch(`js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);
};

async function listTasks () {
    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write(`An error was likely generated when invoking ` +
                `the “exec” program in the default task.`);
        }

        if (`` !== stderr) {
            process.stdout.write(`Content has been written to the stderr stream ` +
                `when invoking the “exec” program in the default task.`);
        }

        process.stdout.write(`\n\tThis default task does ` +
            `nothing but generate this message. The ` +
            `available tasks are:\n\n${stdout}`);
    });
}

exports.brave = series(brave, serve);
exports.chrome = series(chrome, serve);
exports.edge = series(edge, serve);
exports.firefox = series(firefox, serve);
exports.opera = series(opera, serve);
exports.safari = series(safari, serve);
exports.vivaldi = series(vivaldi, serve);
exports.allBrowsers = series(allBrowsers, serve);

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;

exports.lintCSS = lintCSS;
exports.compressCSS = compressCSS;

exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;

exports.serve = series(
    validateHTML,
    lintJS,
    lintCSS,
    transpileJSForDev,
    serve
);

exports.build = series(
    compressCSS,
    compressHTML,
    transpileJSForProd
);

exports.default = series(
    lintJS,
    lintCSS,
    validateHTML,
    transpileJSForDev,
    serve
);

exports.listTasks = listTasks;
