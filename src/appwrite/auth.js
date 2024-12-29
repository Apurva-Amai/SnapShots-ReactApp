import conf from "../conf_variable/conf";
import {Client, Account, ID} from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectID)

    this.account = new Account(this.client);
  }

  async signUp({email, password, name}) {       // createAccount
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if(userAccount) {
            console.log("User Account Created: ", userAccount);
            return this.login({email,password})    // login after creating account
        } else {
            return userAccount;
        }
    } catch (error) {
        console.log("Appwrite Service :: Signup :: error", error)
        throw error;
    }
  }

  async login({email, password}) {
    try {
        const loggedUser = await this.account.createEmailPasswordSession(email, password)
        console.log("Logged User: ", loggedUser);
        return loggedUser;
    } catch (error) {
        console.log("Appwrite Service :: Login :: error", error)
        throw error;
    }
  }

  async getCurrentUser() {                 // Get the currently logged in user.
    try {
        const user =  await this.account.get()
        console.log("Currently Logged in User: ", user);
        return user;
    } catch (error) {
        console.log("Appwrite Service :: getCurrentUser :: error", error)
        throw error
    }
  }

  async logout() {
    try {
        const user = await this.account.deleteSessions()
        console.log("User Sessions Deleted: ", user);
        return user;
    } catch (error) {
        console.log("Appwrite Service :: Logout :: error", error)
        throw error
    }
  }
}

const authService = new AuthService();

export default authService;