/**
 * Create a new `Ti.UI.TabGroup`.
 */
var tabGroup = Ti.UI.createTabGroup();

/**
 * Add the two created tabs to the tabGroup object.
 */
tabGroup.addTab(createTab("Tab 1", "I am Window 1", "assets/images/tab1.png"));
tabGroup.addTab(createTab("Tab 2", "I am Window 2", "assets/images/tab2.png"));
tabGroup.addTab(createTab("Tab 3", "I am Window 3", "assets/images/tab1.png"));

/**
 * Open the tabGroup
 */
tabGroup.open();

/**
 * Creates a new Tab and configures it.
 *
 * @param  {String} title The title used in the `Ti.UI.Tab` and it's included `Ti.UI.Window`
 * @param  {String} message The title displayed in the `Ti.UI.Label`
 * @return {String} icon The icon used in the `Ti.UI.Tab`
 */
function createTab(title, message, icon) {
    var win = Ti.UI.createWindow({
        title: title,
        backgroundColor: '#fff'
    });

    var label = Ti.UI.createLabel({
        text: message,
        color: "#333",
        font: {
            fontSize: 20
        }
    });

    var button = Ti.UI.createButton({
        title: 'Hello',
        top: 10,
        left: 10,
        width: '30%',
        height: 50,
        backgroundColor: "#f3f3f3",
        color: "#000"
    });

    button.addEventListener('click', function(e) {
        var alertDialog = Ti.UI.createAlertDialog({
            title: 'Hola que tal',
            cancel: 1,
            message: 'Do you want to display an alert?',
            buttonNames: ['Yes', 'No', 'Maybe']
        });

        alertDialog.addEventListener('click', function(evt) {
            switch (evt.index) {
                case 0: // Yes
                    alert("Thaks");
                    break;
                case evt.source.cancel:
                    alert("Ok");
                    break;
                case 2: // No
                    alert("fine");
                    break;

                default:
                    break;
            }
        });
        alertDialog.show();
    });



    win.add(label);
    win.add(button);

    var tab = Ti.UI.createTab({
        button: title,
        icon: icon,
        window: win
    });

    return tab;
}


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function() {
    var ACS = require('ti.cloud'),
        env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
        username = Ti.App.Properties.getString('acs-username-' + env),
        password = Ti.App.Properties.getString('acs-password-' + env);

    // if not configured, just return
    if (!env || !username || !password) { return; }
    /**
     * Appcelerator Cloud (ACS) Admin User Login Logic
     *
     * fires login.success with the user as argument on success
     * fires login.failed with the result as argument on error
     */
    ACS.Users.login({
        login: username,
        password: password,
    }, function(result) {
        if (env === 'development') {
            Ti.API.info('ACS Login Results for environment `' + env + '`:');
            Ti.API.info(result);
        }
        if (result && result.success && result.users && result.users.length) {
            Ti.App.fireEvent('login.success', result.users[0], env);
        } else {
            Ti.App.fireEvent('login.failed', result, env);
        }
    });
})();