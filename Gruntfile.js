module.exports = function(grunt)
{
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON("package.json"),
        aws: grunt.file.readJSON("aws.json"),
        s3:
        {
            options:
            {
                key: "<%= aws.key %>",
                secret: "<%= aws.secret %>",
                bucket: "<%= aws.bucket %>",
                access: "public-read",
                headers:
                {
                    // 30 Day Cache Policy
                    "Cache-Control": "max-age=2678400, public",
                    "Expires": new Date(Date.now() + 2678400).toUTCString()
                },
                gzip: true
            },
            dist:
            {
                sync:
                [
                    {
                        src: "dist/**",
                        dest: "/",
                        rel: "dist/",
                        options: { verify: true }
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-s3");

    grunt.registerTask("deploy", "s3:dist");

};