/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    //ensure each feed has correct attributes
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has defined URLs', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).not.toBe('');
                expect(feed.url).not.toBe(null);
                expect(feed.url).not.toBe(undefined);
            });
        });

        it('has defined names', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).not.toBe('');
                expect(feed.name).not.toBe(null);
                expect(feed.name).not.toBe(undefined);
            });
        });
    });

    //menu should be hidden by defualt
    describe('The Menu',function(){

        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('changes visibility when clicked', function(){
            $('.icon-list').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.icon-list').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //make sure loading of initial entries works
    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it('should get Initial feed', function(done){
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    //ensuring call to change feed works
    describe('New Feed Selection', function(){
        var firstText, secondText;

        beforeAll(function(done){
            loadFeed(1, function(){
                firstText = $('.entry').find('h2')[0].innerText;
                done();
            });
        });

        beforeAll(function(done){
            loadFeed(2, function(){
                secondText = $('.entry').find('h2')[0].innerText;
                done();
            });
        });

        it('should get a different feed',function(done){
            expect(firstText).not.toBe(secondText);
            done();
        });
    });
}());
