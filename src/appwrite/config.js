import conf from "../conf_variable/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { nanoid } from "@reduxjs/toolkit";

class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
        
    }

    async createPost({title, description, imageID, status, userID}) {
        try {
            const post =  await this.databases.createDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                articleID = nanoid(),
                {
                    title, description, imageID, status, userID
                }
            )
            console.log("Post Created: ", post);
            return post;
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error)
            throw error
        }
    }

    async updatePost(articleID,{ title, description, imageID, status}) {
        try {
            return await this.databases.updateDocument(
            conf.appwriteDataBaseID,
            conf.appwriteCollectionID,
            articleID,
            {
                title, description, imageID, status
            }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error)
            throw error
        }
    }

    async deletePost(articleID) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                articleID
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error)
            throw error
            
        }
    }

    async getPost(articleID) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                articleID
            )
            console.log("Retrieved Post: ", post);
            return post;
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error)
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status", "Active")]) {
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                queries
                // [
                //     Query.select(["Status", "Active"])       // Another way to select fields
                // ]
            )
            console.log("Retrieved Posts: ", posts);
            return posts;
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error)
            throw error
        }
    }

    async uploadFile(fileData) {
        try {
            const file = await this.storage.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                fileData
            )
            console.log("File uploaded: ", file);
            return file;
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error)
            throw error
        }
    }

    async deleteFile(fileID) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error)
            throw error
        }
    }

    getFilePreview(fileID) {
        return this.storage.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }

    getFileView(fileID) {
        return this.storage.getFileView(
            conf.appwriteBucketID,
            fileID
        )
    }
}

const service = new Service();

export default service;