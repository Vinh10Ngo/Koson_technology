var express = require('express');
var router = express.Router ();

const controllerName = 'items'
// const util = require('util')
const mainModel = require(__path__models + controllerName)
const systemConfigs = require(__path__configs + 'system')
const { resourceLimits } = require('worker_threads');
const linkIndex = '/' + systemConfigs.prefixAdmin + `/${controllerName}/`

const pageTitleIndex = 'Item Manager::'
const pageTitleAdd = pageTitleIndex + 'Add'
const pageTitleEdit = pageTitleIndex + 'Edit'
const pageTitleList = pageTitleIndex + 'List'
const folderViewsAdmin = __path__views__admin + `pages/${controllerName}/`

/* GET users listing. */


//form
router.get('/form(/:id)?', function(req, res, next) {
  let id = req.params.id
  console.log('abc');
  let item = {title: '', content: ''}
  if(id !== '') {
    mainModel.getItems(id).then((item)=> {
      res.render(`${folderViewsAdmin}form`, { pageTitle: pageTitleEdit, controllerName, item });
    })
  } else {
    res.render(`${folderViewsAdmin}form`, { pageTitle: pageTitleAdd, controllerName, item});
  }
});

//SAVE
router.post('/save', (req, res, next) => {
  req.body = JSON.parse(JSON.stringify(req.body));
  let item = Object.assign(req.body)
  let taskCurrent = (item !== 'undefined' && item.id !== '') ? 'edit' : 'add'
  
    mainModel.saveItem(item, {task: taskCurrent}).then(result => {
      res.redirect(linkIndex)
    })
})


// List items
router.get('/', async (req, res, next) => {

  mainModel
    .listItems({})
    .then((items) => {
      res.render(`${folderViewsAdmin}list`, { 
        pageTitle: pageTitleList,
        items: items, 
        controllerName,
      });
    })


  //delete
  router.get('/delete/:id/', function(req, res, next) {
    let id = req.params.id
    mainModel.deleteItem(id, {task: 'delete-one'}).then(result => {
      res.redirect(linkIndex)
    });
  })

});


module.exports = router;


