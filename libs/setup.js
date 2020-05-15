import * as mapHandler from '../libs/mapHandler';
import * as playerHandler from '../libs/playerHandler';
import * as formHandler from '../libs/formHandler';

/**
 * Main function to load the library and setup things properly
 */
(function() {
    playerHandler.setupPlayerHandler();
    formHandler.setupFormHandler(playerHandler);
    mapHandler.setupMapHandler(playerHandler, formHandler);
})();