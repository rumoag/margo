//===
// IMPORTS
//===
const { series, parallel, src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const exec = require("gulp-exec");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const iconfont = require("gulp-iconfont");
const runTimestamp = Math.round(Date.now() / 1000);

const fontName = "icons";

//===
// VARIABLES
//===
const SRC_PATH = "src/assets";
const DEST_PATH = "public";

//===
// TASKS
//===

// Static server with reload
function initBrowserSync(cb) {
    browserSync.init({
        proxy: "localhost:8000"
    });
    return cb;
}

// Delete dist folder
function cleanOld() {
    return src(".")
        .pipe(exec("rm -rf public/fonts"))
        .pipe(exec("mkdir public/fonts"))
        .pipe(exec("rm -rf public/img"))
        .pipe(exec("mkdir public/img"))
        .pipe(exec("rm -rf public/css"))
        .pipe(exec("mkdir public/css"));
}

// Compile FONTs
function fonts() {
    return src(SRC_PATH + "/fonts/*")
        .pipe(dest(DEST_PATH + "/fonts/"))
        .pipe(browserSync.stream());
}
// Create font icons
function iconToFont() {
    return src([SRC_PATH + "/icons/*.svg"])
        .pipe(
            iconfont({
                fontName: fontName, // required
                prependUnicode: true, // recommended option
                formats: ["woff2"],
                normalize: true,
                timestamp: runTimestamp // recommended to get consistent builds when watching files
            })
        )
        .pipe(dest(SRC_PATH + "/fonts/"))
        .pipe(dest(DEST_PATH + "/fonts/"))
        .pipe(browserSync.stream());
}
// Compile IMGs
function img() {
    return src(SRC_PATH + "/img/**/*")
        .pipe(dest(DEST_PATH + "/img/"))
        .pipe(browserSync.stream());
}
// Compile SASS + sourcemaps
function sassCompile() {
    return src([SRC_PATH + "/sass/mobile.sass"])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({ extname: ".min.css" }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(DEST_PATH + "/css/"))
        .pipe(browserSync.stream());
}

//===
// COMMANDS
//===
const build = series(cleanOld, parallel(fonts, iconToFont, img, sassCompile));

// gulp dev
exports.dev = function() {
    build();
    watch(SRC_PATH + "/img/**/*", img);
    watch([SRC_PATH + "/sass/*.sass", SRC_PATH + "/sass/**/*.sass"], sassCompile);
    initBrowserSync();
};

// gulp
exports.default = build;
