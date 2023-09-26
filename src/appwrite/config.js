import { Client, ID, Databases, Query } from "appwrite";
import conf from '../conf/conf'

class Service {
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.database = new Databases(this.client);
    }

    async createPost({ title, slug, featuredImage, status, userId, content }) {
        try {
            return await this.database.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    userId,
                    featuredImage,
                }
            )
        } catch (error) {
            console.log("Error occurred while creating the post ", error);
        }
    }

    async updatePost(slug, { title, featuredImage, status, content }) {
        try {
            await this.database.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Error occurred while updating the post ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Error occurred while deleting the post ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Error occurred while getting the post ", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            );

        } catch (error) {
            console.log("Error occurred while getting all the posts ", error);
        }
    }
}




const service = new Service();
export default Service;