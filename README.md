project-skeleton
================

this github repo contains a simple PHP/Backbone project skeleton for small projects. Projects that only require a minimum of code. Feel free to use it, fork and update.

don't forget to update your project namespace in the files contained in the src folder, composer.json and Javascript files (you can completely drop the later one if you do not wish to use this js structure).

To get started run:

    phing install

For deployment to production server use:

    phing deploy

If you do not have phing installed go to http://www.phing.info/trac/wiki/Users/Installation

or if you don't want to use phing you can use the following:

    npm install
    bower install
    composer install
    grunt

For deployment use:

    grunt deploy

For generating the css & javascript on the fly you can run the following:

    grunt default watch