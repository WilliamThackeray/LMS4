/* RestStorageService Class template*/
/* Use this template as a starter and complete the items that say 'TODO' */
import StorageService from '../../../../src/services/Model/storage_service.js'

export default class RestStorageService extends StorageService {
    constructor(entity, entitySingle, options = {}, host) {
        super(null,null, entity, entitySingle, options);
        this.host = host;    //e.g, localhost:8080, from 'endPoint' in appViewModel
        this.isLocal = false
    }

    get apiName(){return this.entity;}
    get hostPrefix(){
        return `http://${this.host}`
    }
    get apiUrl(){
        return `${this.hostPrefix}/${this.apiName}`;
    }
    
    /* List function*/
    /* we'll give you this one */
    async list(options = this.model.options) {

        //note, this depends on the utility function getQueryString to create the query string
        // example:   ?SortCol=name&SortDir=asc&limit=5&offset=20
        let url = `${this.apiUrl}/${this.utils.getQueryString(options)}`;

        try {
            const response = await fetch(url);
            this.model.data = await response.json();
           
            return this.model.data;
        }
        catch (msg) {
            console.log(msg);
            throw (msg);
        }
    }

    async read(id) {
        try{
            //TODO:
            let tempData = await this.list(this.model.options)
            for (let item of tempData) {
                if (item.id == id) return item
            }
            return null
        }
        catch(err){
            console.log(err);
            throw(err);
        }
        
    }

    async update(id, postData) {
        
        //TODO:
        //Remember for update, you need to set the method to 'PUT' and headers to include
        //'Content-Type': 'application/json'
        //also remember to use JSON.stringify on the postData object before assigning to 'body'
        
    }

    async create(postData) {
        //TODO:
        //Remember for create, you need to set the method to 'POST' and headers to include
        //'Content-Type': 'application/json'
        //also remember to use JSON.stringify on the postData object before assigning to 'body'
       
    }

    async delete(id) {
        //TODO:
        
    }
    
    async getLookup(lookupName){
        let url = `${this.hostPrefix}/lookups/${lookupName}`;

        //TODO:
        //note that the lookup result is stored in:
        //super.lookups   (this is a getter in the super class, you must prefix with super...I know, dumb)
        //I would check if the lookupName is found in super.lookups first and return
        //otherwise, I would retrieve my lookup using the lookup api, then store in super.lookups
        
    }
    

}