// Simple NPM namespace helper
var npm = function() {
	for (var n in arguments) {
		npm[arguments[n]] = require(arguments[n]);
	}
}

npm("gulp", "gulp-plumber");

npm["gulp"].task("default", ["ts watch", "ejs watch", "stylus watch"]);

npm("gulp-typescript");

npm["gulp"].task("ts watch", ["ts compile"], function() {
	npm["gulp"].watch([
		"private/ts/*.ts",
		"private/ts/*/*.ts",
	], ["ts compile"]);
});

npm["gulp"].task("ts compile", function () {
	npm["gulp"].src("private/ts/*.ts")
	.pipe(npm["gulp-plumber"]())
	.pipe(npm["gulp-typescript"]({
		module: "amd"
	}))
	.pipe(npm["gulp"].dest("docs/js"));
});

npm("gulp-ejs", "gulp-minify-html");

npm["gulp"].task("ejs watch", ["ejs compile"], function() {
	npm["gulp"].watch([
		"private/ejs/*.ejs",
		"private/ejs/*/*.ejs",
	], ["ejs compile"]);
});

npm["gulp"].task("ejs compile", function () {
	npm["gulp"].src("private/ejs/*.ejs")
	.pipe(npm["gulp-plumber"]())
	.pipe(npm["gulp-ejs"]({
		ids: 0
	}))
	.pipe(npm["gulp-minify-html"]())
	.pipe(npm["gulp"].dest("docs"));
});

npm("gulp-stylus", "rupture", "jeet", "osws-selectors-styl", "osws-native-styl", "osws-helpers-styl", "osws-defaults-styl");

npm["gulp"].task("stylus watch", ["stylus compile"], function() {
	npm["gulp"].watch([
		"private/stylus/*.styl",
		"private/stylus/*/*.styl",
	], ["stylus compile"]);
});

npm["gulp"].task("stylus compile", function () {
	npm["gulp"].src("private/stylus/*.styl")
	.pipe(npm["gulp-plumber"]())
	.pipe(npm["gulp-stylus"]({
		use: [
			npm["rupture"](),
			npm["jeet"](),
			npm["osws-selectors-styl"](),
			npm["osws-native-styl"](),
			npm["osws-helpers-styl"](),
			npm["osws-defaults-styl"](),
		],
	}))
	.pipe(npm["gulp"].dest("docs/css"));
});

// Fast process exit
process.stdin.on("data", process.exit);

// rm ~/tmp created by npm module typescript-require
npm("fs-extra");
npm["fs-extra"].remove(__dirname + "/tmp");