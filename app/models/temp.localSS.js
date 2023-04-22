/* Class LocalStorageService- a class for persistant CRUD in LocalStorage
Some tips on order of implementation:
1.  Implement Utility Functions (cloneObject(done), getItemIndex)
2.  Implement 'size' and 'list' getters
3.  Implement localStorage functions 'reset', 'clear', 'store', 'retrieve'
4.  Implement 'read', 'create', 'update', 'delete'
5.  Implement 'sort', 'filter'
*/


export default class LocalStorageService {
  "use strict"
  constructor(data, key) {
     this.origModel = data;  // this is good for resetting to original data.
     this.key = key;

     console.log('local storage const.')
     
     //if data is NOT in local storage, init and sort using sortCol and sortDir from the model
     if(!this.retrieve()){   
        this.model = this.cloneObject(data);   //get copy of data (this is the team data)
        this.sort(this.sortCol, this.sortDir, true);   //apply default sort
     }
  }
  //Getters
  get sortCol(){
     return this.model.app.sortCol;
  }
  set sortCol(col){
     this.model.app.sortCol = col;
  }
  get sortDir(){
     return this.model.app.sortDir;
  }
  set sortDir(dir){
     this.model.app.sortDir = dir;
  }
  get filterStr() {
     return this.model.app.filterStr
  }
  set filterStr(str) {
     this.model.app.filterStr = str
  }
  get size() {
     return this.model.data.length
  }
  
  
  list() {
    this.sort(this.sortCol, this.sortDir, true)
    let filObj = {}
    if (this.filterStr) {
      filObj[this.sortCol] = this.filterStr
      return this.filter(filObj)
    }
    return this.model.data
  }
  
  //CRUD FUNCTIONS
  create(obj) {
     //append new object to data store
     this.model.data.push(obj)
     // persist in local storage by calling store()
     this.store()
  }
  read(getId) {
     // returns the item in the array with id=getId, null if it is not found
     let index = this.getItemIndex(getId)
     if (index !== -1) {
        return this.model.data[index]
     }
     return null
  }
  update(obj) {
     // find index of object in array
     // update object with new contents
     // persist in local storage by calling store()
     let index = this.getItemIndex(obj.id)
     if (index !== -1) {
        this.model.data[index] = obj
        this.store()
     }
  }

  delete(removeId) {
     //find index of object in array
     //remove object with specified id from model.data (splice?)
     // persist in local storage by calling store()
     let index = this.getItemIndex(removeId)
     if (index !== -1) {
        this.list().splice(index, 1)
        this.store()
     }
  }

  //LocalStorage Functions
  reset() {
    //should clear local storage 
    this.clear()
    //should restore model from origModel 
    //(use utility function 'cloneObject' at bottom of file)
    this.model = this.cloneObject(this.origModel)
    this.store()
  }
  clear() {
     // should clear local storage
     localStorage.removeItem(this.key)
     localStorage.clear();
  }
  store() {
     // should store your model in localStorage
     localStorage.setItem(this.key, JSON.stringify(this.model))
  }
  retrieve() {
      //should retrieve your model from localStorage using this.key
      //If data retrieved from LocalStorage, updates this.model
      //hint:  remember to 'parse' the LocalStorage string value back into an object!
      //return true if model retrieved from localStorage, false if key wasn't found in localStorage 
      let retreival = localStorage.getItem(this.key) // get model out of storage 
      if (retreival != null) { // if we have something in stored
        this.model = JSON.parse(retreival)
        return true
      }
      return false;  //returning false for now
  }

  //Sorting and Filtering Functions
  sort(col, direction, perm = false) {
     let sorted = this.cloneObject(this.model.data);
      sorted.sort( (a,b) => {
        let t1 = a[col]
        let t2 = b[col]

        // sorting prep
        if (typeof a[col] == 'string') {
           t1 = t1.toLowerCase()
           t2 = t2.toLowerCase()
        }

        // sorting done here 
        if (t1 > t2) {
           if (direction === 'asc') return 1
           return -1
        }
        if (t1 < t2) {
           if (direction === 'asc') return -1
           return 1
        }
        
        return 0
     })
     
     // if permanant, change the .app
     if (perm) {
        let cloneModel = this.cloneObject(this.model)
        cloneModel.app.sortCol = col
        cloneModel.app.sortDir = direction
        cloneModel.data = sorted
        this.model = cloneModel
        this.store()
     }
     
     return sorted;
     }
  
  filter(filterObj) {
     let copy = this.cloneObject(this.model.data)

     const filtered = copy.filter( (item) => {
        // loop through filterObj keys
        for (let k in filterObj) {
           // check if an item contains the filterObj key 
           let t1 = item[k].toString().toLowerCase()
           let t2 = filterObj[k].toString().toLowerCase()
           
           if (!t1.includes(t2)) return false
        }
        return true
     })
     return filtered
  }

  //Utility functions-IMPLEMENT THESE FIRST
  getItemIndex(id){
     //return index of team with given id
     //see MDN array 'find' documentation  
     //created separate function for this since multiple methods need to get the index of an item
     const index = this.model.data.findIndex( item => parseInt(item.id) === parseInt(id))
     return index
  }
  cloneObject(obj){
     //util function for returning a copy of an object
     return JSON.parse(JSON.stringify(obj));  //giving you this one as of class on Feb 4
  }
  

}