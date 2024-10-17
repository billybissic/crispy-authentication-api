import UIDGenerator from 'uid-generator';
import Generator from 'generate-password';
import  bcrypt from 'bcrypt';
const uidgen = new UIDGenerator();
import {user_devices} from "../models/init-models";
import {AuthenticationConfigurationHelper} from "./authenticationConfiguration.helper";
import os from 'os';


/*initModels(sequelizeInstances.configurationsSequelizer);
initModels(sequelizeInstances.userSequelizer);
*/

export class AuthenticationHelper {
    identity_token;
    secret_key;
    password;
    allow_numbers_in_password;
    allow_special_characters_in_password;
    required_password_length;
    salt_rounds;
    encrypted_password;
    password_length;
    password_numbers_enabled;
    validate_device_on_login;
    validate_browser_on_login;
    validate_ip_on_login;
    validate_mac_on_login;
    validate_emails_on_registration;
    allow_admin_credentials_to_be_remembered;
    is_validation_hyper;

    get_validate_device_on_login() {
        return this.validate_device_on_login;
    }

    set_validate_device_on_login(validate_device_on_login) {
        this.validate_device_on_login = validate_device_on_login
    }

    get_validate_browser_on_login() {
        return this.validate_browser_on_login;
    }

    set_validate_browser_on_login(validate_browser_on_login) {
        this.validate_browser_on_login = validate_browser_on_login
    }

    get_validate_ip_on_login() {
        return this.validate_ip_on_login;
    }

    set_validate_ip_on_login(validate_ip_on_login) {
        this.validate_ip_on_login = validate_ip_on_login
    }

    get_validate_mac_on_login() {
        return this.validate_mac_on_login;
    }

    set_validate_mac_on_login(validate_mac_on_login) {
        this.validate_mac_on_login = validate_mac_on_login
    }

    get_identity_token() {
        return this.identity_token;
    }

    set_identity_token(identity_token) {
        this.identity_token = identity_token
    }

    get_secret_key() {
        return this.secret_key;
    }

    set_secret_key(secret_key) {
        this.secret_key = secret_key;
    }

    get_password() {
        return this.password
    }

    set_password(password) {
        this.password = password
    }

    get_encrypted_password() {
        return this.encrypted_password
    }

    get_password_length() {
        return this.password_length
    }

    enable_numbers_in_passwords() {
        this.password_numbers_enabled = true;
    }

    disable_numbers_in_passwords() {
        this.password_numbers_enabled = false;
    }

    set_password_length(password_length) {
        this.password_length = password_length
    }

    set_encrypted_password(encrypted_password) {
        this.encrypted_password = encrypted_password
    }

    get_salt_rounds() {
        return this.salt_rounds
    }

    set_salt_rounds(salt_rounds) {
        this.salt_rounds = salt_rounds
    }

    constructor() {
    }

    // Method Generate Password
    generatePasswordToEncrypt() {
        console.log('Generating Password To Encrypt...')
        const encrypted_password = Generator.generate({
            length: 12,
            numbers: true
        });
        console.log("Encrypted Password: ", encrypted_password)
        return encrypted_password;
    }

    async validate_password(password) {
        const _valid = true
        const _invalid = false
        let is_password_valid = false
        const authenticationConfigurationHelper = new AuthenticationConfigurationHelper();
        /* validate password meets security requirements
        *  1. Must be at least 12 characters long
        *  2. Must contain at least one number
        *  3. Must contain at least one special character
        *  4. Must contain at least one uppercase letter
        *  5. Must contain at least one lowercase letter
        *  6. Must not contain any spaces
        *  7. Must not contain the username
        *  8. Must not contain the identity token
        *  9. Must not contain the secret key
        * */


        /* logic gets a bit weird here. if the validations fail on the main conditional block the database gets checked
           to see if the requirements are set to false. If they are not required the is_password_valid will get set
           accordingly */

        /* the password minimum length is required to be set. */
        if (password.length < authenticationConfigurationHelper.get_minumum_password_length()) {

            is_password_valid = _invalid
            console.log('Password is too short...')
            return is_password_valid

        } else if (!password.match(/[0-9]/)) {

            /* this block checks to see if the password has numbers. */

            /* this condition will override the requirement, if set in the database to false */
            if(authenticationConfigurationHelper.get_numbers_required_in_password() === false) {
                is_password_valid = _valid
            } else {
                is_password_valid = _invalid
                console.log('Password does not contain a number...')
            }

            return is_password_valid
        } else if (!password.match(/[!@#$%^&*]/)) {

            /* this block checks to see if the password has special characters. */

            /* this condition will override the requirement, if set in the database to false */
            if(authenticationConfigurationHelper.get_special_characters_required_in_password()) {
                is_password_valid = _invalid
                console.log('Password does not contain a special character...')
                return is_password_valid
            } else {
                is_password_valid = _valid
                return is_password_valid;
            }

        } else if (!password.match(/[A-Z]/)) {

            /* this block checks to see if the password has uppercase letters. */

            /* this condition will override the requirement, if set in the database to false */
            if (authenticationConfigurationHelper.get_password_require_uppercase_letter()) {
                is_password_valid = _invalid
                console.log('Password does not contain an uppercase letter...')
                return is_password_valid
            } else {
                is_password_valid = _valid
                return is_password_valid
            }

        } else if (!password.match(/[a-z]/)) {

            /* this block checks to see if the password has lowercase letters. */

            /* this condition will override the requirement, if set in the database to false */
            if (authenticationConfigurationHelper.get_password_require_uppercase_letter()) {
                is_password_valid = _invalid
                console.log('Password does not contain a lowercase letter...')
                return is_password_valid
            } else {
                is_password_valid = _valid
                return is_password_valid
            }


        } else if (password.match(/\s/)) {

            /* no override, password cannot have spaces. */
            is_password_valid = _invalid
            console.log('Password contains a space...')
            return is_password_valid
        }
        /* check if username is not in password */

        return _valid
    }

    /* requires uuid and password to be set through the getters/setters */
    async encryptPasswordForStorage() {
        /* concatenate uuid & password */
        console.log('Concatenated unencrypted password to store')
        console.log("Identity Token: ", this.get_identity_token())
        console.log("Password: ", this.get_password())
        const concatenated_password = this.get_identity_token() + ':' + this.get_password()
        console.log('Concatenated password: ', concatenated_password)

        const current_salt_rounds = this.get_salt_rounds()
        console.log("Current Salt Rounds: ", current_salt_rounds)

        if (current_salt_rounds !== undefined) {
            const hashedPassword = await bcrypt.hash(concatenated_password, current_salt_rounds)
            if (hashedPassword !== undefined) {
                this.set_encrypted_password(hashedPassword)
                console.log("HashedPassword: ", this.get_encrypted_password())
                return hashedPassword;
            }
            else {
                const error = new Error('Error hashing password...')
                console.log(error)
                return error
            }
        } else {
            const error = new Error('Error, no salt rounds configured.')
            console.log(error)
            return error
        }
    }

    async hasUserUsedDeviceBefore(devices: user_devices, current_device: string) {
        console.log("current_device: ", current_device);

        let device_found = false;
        /* search for current_device in devices */
        for (let i = 0; i < devices["length"]; i++) {
            if (devices[i].device_mac_address === current_device) {
                device_found = true;
                console.log('Device found in database...')
                break;
            }
        }

        return device_found;
    }
    
    async generateIdentityToken() {
        console.log('Generating Identity Token...')
        const identity_token = await uidgen.generate()
        //console.log('Generated token: ', identity_token)
        return identity_token
    }

    /* THIS SHOULD BE IN THE INTERFACE OF THE APPLICATION, IT'S ONLY HERE TO GATHER TEST DATA FOR THE DATABASE
    * This function should be called when sending over the login reqeust. The login request should include the outward
    * facing network information.*/
    getOutwardFacingIPAndMAC(): { ip_address: string | undefined; mac_address: string | undefined } {
        const networkInterfaces = os.networkInterfaces();
        let outwardFacingIP: string | undefined;
        let outwardFacingMAC: string | undefined;

        // Find the outward facing IP address
        Object.values(networkInterfaces).forEach(interfaces => {
            interfaces.forEach(iface => {
                if (!iface.internal && iface.family === 'IPv4') {
                    outwardFacingIP = iface.address;
                }
            });
        });

        // Find the MAC address associated with the outward facing IP address
        Object.values(networkInterfaces).forEach(interfaces => {
            interfaces.forEach(iface => {
                if (iface.address === outwardFacingIP && iface.mac) {
                    outwardFacingMAC = iface.mac;
                }
            });
        });

        return { ip_address: outwardFacingIP, mac_address: outwardFacingMAC };
    }

}
