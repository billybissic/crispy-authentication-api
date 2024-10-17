/* The purpose of this helper is to provide configuration
through the database or a json file. It connects to the
database or the json file and configure the settings before
the api starts.

you can set the following configurations:
    secret_key;
    salt_rounds;
    encrypted_password;
    password_length;
    password_numbers_enabled;
    special_characters_required_in_password
    validate_device_on_login;
    validate_browser_on_login;
    validate_ip_on_login;
    validate_mac_on_login;
    validate_emails_on_registration;
    allow_admin_credentials_to_be_remembered;
    is_validation_hyper;
    web_panel_token;
 */
import WebPanelRouter from "../router/web-panel/web-panel.router";

const webPanelRouter = new WebPanelRouter();

export class AuthenticationConfigurationHelper {
    secret_key;
    salt_rounds;
    encrypted_password;
    minumum_password_length;
    password_require_uppercase_letter;
    password_require_lowecase_letter;
    numbers_required_in_password;
    special_characters_required_in_password
    validate_device_on_login;
    validate_browser_on_login;
    validate_ip_on_login;
    validate_mac_on_login;
    validate_emails_on_registration;
    allow_admin_credentials_to_be_remembered;
    is_validation_hyper;
    web_panel_token;
    web_panel_port;
    authentication_api_port;
    require_2FA;
    max_failed_login_attempt;
    allow_user_registration;

    get_secret_key() {
        return this.secret_key;
    }

    set_secret_key(secret_key) {
        this.secret_key = secret_key;
    }

    get_salt_rounds() {
        return this.salt_rounds;
    }

    set_salt_rounds(salt_rounds) {
        this.salt_rounds = salt_rounds;
    }

    get_encrypted_password() {
        return this.encrypted_password;
    }

    set_encrypted_password(encrypted_password) {
        this.encrypted_password = encrypted_password;
    }

    get_minumum_password_length() {
        return this.minumum_password_length;
    }

    set_minumum_password_length(minumum_password_length) {
        this.minumum_password_length = minumum_password_length;
    }

    get_numbers_required_in_password() {
        return this.numbers_required_in_password;
    }

    set_numbers_required_in_password(numbers_required_in_password) {
        this.numbers_required_in_password = numbers_required_in_password;
    }

    set_password_require_uppercase_letter(password_require_uppercase_letter) {
        this.password_require_uppercase_letter = password_require_uppercase_letter;
    }

    get_password_require_uppercase_letter() {
        return this.password_require_uppercase_letter;
    }

    set_password_require_lowercase_letter(password_require_lowecase_letter) {
        this.password_require_lowecase_letter = password_require_lowecase_letter;
    }

    get_special_characters_required_in_password() {
        return this.special_characters_required_in_password;
    }

    set_special_characters_required_in_password(special_characters_required_in_password) {
        this.special_characters_required_in_password = special_characters_required_in_password;
    }

    get_validate_device_on_login() {
        return this.validate_device_on_login;
    }

    set_validate_device_on_login(validate_device_on_login) {
        this.validate_device_on_login = validate_device_on_login;
    }

    get_validate_browser_on_login() {
        return this.validate_browser_on_login;
    }

    set_validate_browser_on_login(validate_browser_on_login) {
        this.validate_browser_on_login = validate_browser_on_login;
    }

    get_validate_ip_on_login() {
        return this.validate_ip_on_login;
    }

    set_validate_ip_on_login(validate_ip_on_login) {
        this.validate_ip_on_login = validate_ip_on_login;
    }

    get_validate_mac_on_login() {
        return this.validate_mac_on_login;
    }

    set_validate_mac_on_login(validate_mac_on_login) {
        this.validate_mac_on_login = validate_mac_on_login;
    }

    get_validate_emails_on_registration() {
        return this.validate_emails_on_registration;
    }

    set_validate_emails_on_registration(validate_emails_on_registration) {
        this.validate_emails_on_registration = validate_emails_on_registration;
    }

    get_allow_admin_credentials_to_be_remembered() {
        return this.allow_admin_credentials_to_be_remembered;
    }

    set_allow_admin_credentials_to_be_remembered(allow_admin_credentials_to_be_remembered) {
        this.allow_admin_credentials_to_be_remembered = allow_admin_credentials_to_be_remembered;
    }

    get_is_validation_hyper() {
        return this.is_validation_hyper;
    }

    set_is_validation_hyper(is_validation_hyper) {
        this.is_validation_hyper = is_validation_hyper;
    }

    get_web_panel_token() {
        return this.web_panel_token;
    }

    set_web_panel_token(web_panel_token) {
        this.web_panel_token = web_panel_token;
    }

    get_web_panel_port() {
        return this.web_panel_port;
    }

    set_web_panel_port(web_panel_port) {
        this.web_panel_port = web_panel_port;
    }

    get_authentication_api_port() {
        return this.authentication_api_port;
    }

    set_authentication_api_port(authentication_api_port) {
        this.authentication_api_port = authentication_api_port;
    }

    get_require_2FA() {
        return this.require_2FA;
    }

    set_require_2FA(require_2FA) {
        this.require_2FA = require_2FA;
    }

    get_max_failed_login_attempts() {
        return this.max_failed_login_attempt
    }

    set_max_failed_login_attempts(max_failed_login_attempt) {
        this.max_failed_login_attempt = max_failed_login_attempt
    }

    get_allow_user_registration() {
        return this.allow_user_registration;
    }
    set_allow_user_registration(allow_user_registration) {
        this.allow_user_registration = allow_user_registration;
    }

    constructor() {
        this.getAndSetAuthenticationConfigurations().then((response) => {
            if(response === true) {
                console.log('-- Authentication configurations have been set.')
            } else {
                console.log('-- Authentication configurations have not been set.')
            }
        } );
    }

    async getAndSetAuthenticationConfigurations(): Promise<boolean> {
        console.log('-- Gathering configuration data from the database and setting configurations.')
        /*get all configurations from the web panel router */
        await webPanelRouter.handleInternalGetAllConfigurations().then((response) =>{
           // console.log(response);
            const configurations = JSON.parse(response.body);
            //console.log(configurations)

            if (configurations === undefined ) {
                console.log('-- No configurations found in the database. Using default configurations.')
                return false;
            } else {
                console.log('-- Configurations found in the database. Setting configurations.')
            for (let i = 0; i < configurations.length; i++) {
                const configuration = configurations[i];
                switch (configuration.config_name.toLowerCase()) {
                    case "secret_key":
                        this.set_secret_key(configuration.config_value);
                        break;
                    case "salt_rounds":
                        this.set_salt_rounds(configuration.config_value);
                        break;
                    case "encrypted_password":
                        this.set_encrypted_password(configuration.config_value);
                        break;
                    case "minimum_password_length":
                        this.set_minumum_password_length(configuration.config_value);
                        break;
                    case "numbers_required_in_password":
                        this.set_numbers_required_in_password(configuration.config_value);
                        break;
                    case "special_characters_required_in_password":
                        this.set_special_characters_required_in_password(configuration.config_value);
                        break;
                    case "validate_device_on_login":
                        this.set_validate_device_on_login(configuration.config_value);
                        break;
                    case "validate_browser_on_login":
                        this.set_validate_browser_on_login(configuration.config_value);
                        break;
                    case "validate_ip_on_login":
                        this.set_validate_ip_on_login(configuration.config_value);
                        break;
                    case "validate_mac_on_login":
                        this.set_validate_mac_on_login(configuration.config_value);
                        break;
                    case "validate_emails_on_registration":
                        this.set_validate_emails_on_registration(configuration.config_value);
                        break;
                    case "allow_admin_credentials_to_be_remembered":
                        this.set_allow_admin_credentials_to_be_remembered(configuration.config_value);
                        break;
                    case "is_validation_hyper":
                        this.set_is_validation_hyper(configuration.config_value);
                        break;
                    case "web_panel_token":
                        this.set_web_panel_token(configuration.config_value);
                        break;
                    case "web_panel_port":
                        this.set_web_panel_port(configuration.config_value);
                        break;
                    case "authentication_api_port":
                        this.set_authentication_api_port(configuration.config_value);
                        break;
                    case "require_two_factor_authentication":
                        this.set_require_2FA(configuration.config_value);
                        break;
                    case "password_require_uppercase_letter":
                        this.set_password_require_uppercase_letter(configuration.config_value);
                        break;
                    case "password_require_lowercase_letter":
                        this.set_password_require_lowercase_letter(configuration.config_value);
                        break;
                    case "max_failed_login_attempts":
                        this.set_max_failed_login_attempts(configuration.config_value);
                        break;
                    case "allow_user_registration":
                        this.set_allow_user_registration(configuration.config_value);
                        break;
                    default:
                        // Handle unexpected configuration names
                        console.warn(`-- Unexpected configuration name - be sure to update the authentication
                        configuration helper file if you recently added values to the database.: ${configuration.config_name}`);
                        break;
                    }
                }
            }
        });
        return true;
    }
}


/* note the json file will be implemented later */