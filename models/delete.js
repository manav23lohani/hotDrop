const File = require('./file');
async function del(){
    try{
        // await File.deleteMany();
        console.log('run');
        await File.deleteMany();
    }
    catch(err){
        console.log(err);
    }
}

module.exports = del;