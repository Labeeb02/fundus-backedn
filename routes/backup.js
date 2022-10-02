const router=require('express').Router();
const User=require('../models/User');
const BKP=require('mongodb-snapshot');
const exec=require('child_process').exec;

mongoCString = 'mongodb+srv://labeeb02:labeeb02@cluster0.esilvbw.mongodb.net/image?retryWrites=true&w=majority';
dbName = 'image';

async function mongoSnap(path, restore = false) {
    const mongo_connector = new BKP.MongoDBDuplexConnector({
        connection: { uri: mongoCString, dbname: dbName }
    });
    const localfile_connector = new BKP.LocalFileSystemDuplexConnector({
        connection: { path: path }
    });
    const transferer = restore ? 
        new BKP.MongoTransferer({ source: localfile_connector, targets: [mongo_connector] }) : 
        new BKP.MongoTransferer({ source: mongo_connector, targets: [localfile_connector] }) ;
    for await (const { total, write } of transferer) { }
}

router.get('/store',async (req,res)=>{
    var flag=0;
    // await mongoSnap('./bkp');
    exec('mkdir jj');
    exec('cd ll', (err, stdout, stderr) => {
        if (err) {
            flag=1
            res.status(200).send(err);
            return;
        }
        res.status(200).send("Done");
    });
    
})

module.exports=router;