import { Client, ID, Storage } from "appwrite";
import conf from '../conf/conf'

class FileServices {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
            return true;
        } catch (error) {
            console.log("Error occurred while uploading the file ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Error occurred while deleting the file ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const fileService = new FileServices();
export default fileService;