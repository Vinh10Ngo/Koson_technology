

const mainModel = require(__path__schemas + 'items')

module.exports = {
    
    listItems: (params, options = null) => {
        let objWhere = {}

       return mainModel
        .find(objWhere)
        .select('title content')
    }, 
    getItems: (id) => {
      return mainModel.findById(id)
    }, 
  
    deleteItem: (id, options = null) => {
     if(options.task == 'delete-one') {
      return mainModel.deleteOne({_id: id})
     }
  },
  saveItem: (item, username, options = null) => {
    if (options.task == 'add') {
      return new mainModel(item).save()
    }
    if (options.task == 'edit') {
      return mainModel.updateOne({_id: item.id},
        { title: item.title,
          content:item.content
       })
    }
 },
}
