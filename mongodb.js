const select = async (title, query = {}, sort = {}) => {
    const collection = await database.collection(title);  
    const cursor = await collection.find(query).sort(sort);  
    const count = await cursor.count();  
    return count;
}

const count = async (title, query = {}, sort = {}) => {
    const collection = await database.collection(title);  
    const count = await collection.estimatedDocumentCount();  
    return count;  
}

const pd = async (title, query = {}, sort = {}) => {
    const collection = await database.collection(title);
    const cursor = await collection.find(query).sort(sort);
    const result = await cursor.limit(1).next();
    if (result) {
        return true;
    } else {
        return false;
    }
}

const find = async (title, query = {}, sort = {}) => {
    const collection = await database.collection(title);
    const cursor = await collection.find(query).sort(sort);
    const result = await cursor.limit(1).next();
    return result;
}

const del = async (title, query = {}) => {
    const collection = await database.collection(title);
    const delpd = await collection.deleteMany(query);
    if (delpd.acknowledged) {
        if (cfg.inslog == true) { console.log(`[${title}]删除成功 -${delpd.deletedCount}`); }
        return delpd;
    } else {
        if (cfg.inslog == true) { console.log(`[${title}]修改失败`); }
        return delpd;
    }
}

const upd = async (title, query = {}, updata = {}) => {
    const collection = await database.collection(title);
    const inspd = await collection.updateOne(query, updata);
    if (inspd.acknowledged) {
        if (cfg.inslog == true) { console.log(`[${title}]修改成功`); }
        return inspd;
    } else {
        if (cfg.inslog == true) { console.log(`[${title}]修改失败`); }
        return inspd;
    }
}

const save = async (title, data) => {
    console.log('save');
    const collection = await database.collection(title);
    const inspd = await collection.insertOne(data);
    if (inspd.acknowledged) {
        if (cfg.inslog == true) { console.log(`[${title}]插入成功`); }
        return inspd;
    } else {
        if (cfg.inslog == true) { console.log(`[${title}]插入失败`); }
        return inspd;
    }
}

const saveall = async (title, data) => {
    if (data.length <= 0) {
        return false;
    } else {
        const collection = await database.collection(title);
        const inspd = await collection.insertMany(data);
        if (inspd.acknowledged) {
            if (cfg.inslog == true) {
                console.log(`[${title}]插入成功`);
            }
            return inspd;
        } else {
            if (cfg.inslog == true) {
                console.log(`[${title}]插入失败`);
            }
            return inspd;
        }
    }
}

module.exports = { count,select, find, save, saveall, pd, upd, del };