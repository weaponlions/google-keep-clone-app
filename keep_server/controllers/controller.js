import noteModel from "../models/model.js";
 

const note_ADD = async (req, res) => {
        const { title=null, description=null, id=null } = req.body;
    try {
        console.log(req.body);
        
        if (id == null || id == "") 
            return res.status(200).json({mes: 'id field required'}); 

        if ((title == null || title == "") && (description == null || description == ""))
            return res.status(200).json({mes: 'title & description are one field required'}); 

        const model = new noteModel(req.body);
        await model.save();
        
        return res.status(200).json({data: model})

    } catch (err) {
        console.log(err.message);
        return res.status(200).json({mes: 'Kao Kao'});
    } 

}


const note_REMOVE = async (req, res) => {
    const { id=null } = req.body;
    try {
        if (id == null || id == "") 
            return res.status(200).json({mes: 'id field required'});

        const model = await noteModel.findOneAndDelete({id})
        console.log(model);
        return res.status(200).json({mes: 'Ok update', data: model})

    } catch (err) {
        console.log(err.message);
        return res.status(200).json({mes: 'Kao Kao'});
    } 
}


const note_UPDATE = async (req, res) => {
    const { id=null } = req.body;
    try { 
        if (id == null || id == "") 
            return res.status(200).json({mes: 'id field required'});
            
        const model = await noteModel.findOneAndUpdate({id}, {...req.body})
        console.log(model);
        return res.status(200).json({mes: 'Ok update', data: model})

    } catch (err) {
        console.log(err.message);
        return res.status(200).json({mes: 'Kao Kao'});
    } 
}


const note_SEARCH = async (req, res) => { 
        const { value=null, page=1, limit=9 } = req.query;
    try { 
            let model = [];
            if(value != null && value != "null")
            {
                model = await noteModel.find({$or: [{ title: value }, {description: value}, {deleted: false}, {archive: false}] })
            }
            else{ 
                model = await noteModel.find({$or : [{deleted: false}, {archive: false}]})
            }

            const total_page = Math.ceil(model.length/limit);
            const start_index = (page == 1 || page == 0) ? 0 : ((page - 1) * limit) + 1;
            let data = []; 
                
            if (model.length < limit && (page < total_page)) 
                data = model; 
            else if (page > total_page)
                data = [];
            else 
                data = model.slice(start_index, limit);
                    
            return res.status(200).json({
                page: parseInt(page),
                data,
                total_page
            })

        } 
    catch (err) {
        console.log(err.message);
        return res.status(200).json({mes: 'Kao Kao'});
    } 
}



export { note_SEARCH, note_REMOVE, note_ADD, note_UPDATE };