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
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).not.toBe('');
                expect(allFeeds[i].url).not.toBe(null);
                expect(allFeeds[i].url).not.toBe(undefined);
            }
        });

        it('has defined names', function(){
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).not.toBe('');
                expect(allFeeds[i].name).not.toBe(null);
                expect(allFeeds[i].name).not.toBe(undefined);
            }
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
            expect($('.feed').length).toBe(1);
            done();
        });
    });

    //ensuring call to change feed works
    describe('New Feed Selection', function(){
        var originalFirstText;

        beforeEach(function(done){
            originalFirstText = $('.entry').find('h2')[0].innerText;
            loadFeed(1, function(){
                done();
            });
        });

        it('should get a different feed',function(done){
            expect(originalFirstText).not.toBe($('.entry').find('h2')[0].innerText);
            done();
        });
    });    
}());
