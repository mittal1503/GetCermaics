import {models,model,Schema} from 'mongoose'

const ItemSchema  = new Schema({
    name:{type: String, required: true},
    price:{type: Number, required: true},
    description:{type: String},
    category:{type: String},
    image:{type: String, required: true},

})

const Item = models.Item || model("Item",ItemSchema)
export default Item;