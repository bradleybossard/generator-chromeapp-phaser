/* global Phaser */
<% _.forEach(gameStates, function(gameState) {  %>/* global <%= gameState.stateName %> */
<% }); %>

'use strict';
document.addEventListener('DOMContentLoaded', function() {
    var game = new Phaser.Game(<%= gameWidth %>, <%= gameHeight %>, Phaser.AUTO, '<%= _.slugify(appName) %>');

    // Game States

    <% _.forEach(gameStates, function(gameState) {  %>game.state.add('<%= gameState.shortName %>', <%= gameState.stateName %>);
    <% }); %>

    game.state.start('boot');

}, false);
