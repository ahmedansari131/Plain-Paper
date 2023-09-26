import { Client, ID, Account } from "appwrite";
import conf from '../conf/conf'

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login(email, password);
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.log("Error occurred while creating the new account ", error);
        }
    } 

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Error occurred while login the user ", error);

        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error occurred while getting the current user ", error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error occurred while logging out the user ", error);

        }
    }
}

const authService = new AuthService();
export default authService;