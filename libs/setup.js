import * as mapHandler from '../libs/mapHandler';
import * as playerHandler from '../libs/playerHandler';
import * as formHandler from '../libs/formHandler';
import * as localStorageHandler from '../libs/localStorageHandler';

/**
 * Main function to load the library and setup things properly
 */
(function() {
    playerHandler.setupPlayerHandler(localStorageHandler);
    formHandler.setupFormHandler(playerHandler, localStorageHandler);
    mapHandler.setupMapHandler(playerHandler, formHandler);
})();