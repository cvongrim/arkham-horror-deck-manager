/* eslint-disable no-invalid-this */
// Constants and Styles
import CONSTANTS from '../constants';

/**
 * This function handles all the navigation events. Based on the event, it decides
 * what screen the user should see.
 * @param {object} event
 */
export default function onNavigatorEvent(event) {
    switch (event.type) {
        case 'NavBarButtonPress': {
            switch (event.id) {
                case 'menu': {
                    this.props.navigator.toggleDrawer({
                        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                    });
                    break;
                }
                case 'deckCreate': {
                    this.props.navigator.push({
                        screen: CONSTANTS.screens.deckCreate.screen,
                        title: CONSTANTS.screens.deckCreate.title,
                    });
                    break;
                }
            }
            break;
        }
        case 'DeepLink': {
            const parts = event.link.split('/'); // Link parts

            switch (parts[0]) {
                case CONSTANTS.screens.deckCreate.link: {
                    this.props.navigator.resetTo({
                        screen: CONSTANTS.screens.deckCreate.screen,
                        title: CONSTANTS.screens.deckCreate.title,
                    });
                    break;
                }
                case CONSTANTS.screens.deckList.link: {
                    this.props.navigator.resetTo({
                        screen: CONSTANTS.screens.deckList.screen,
                        title: CONSTANTS.screens.deckList.title,
                    });
                    break;
                }
            }
            break;
        }
    }
}
