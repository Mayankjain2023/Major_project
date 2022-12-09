var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var now=new Date();
var projectSchema=new Schema({
    name:String,
    description:String,
    category:String,
    createAt:{
      type:String,
      default:now.toISOString()
    },
    updateAt:{
      type:String,
            default:now.toISOString()
    },

    projectManager:{
        username: {
            type: String,required: false
          },
          email: {
            type: String,required: false
          },
          userId:{
            type: mongoose.Schema.Types.ObjectId
          }
        //pm of that project
    },
    bugs:[{
            
            title:String,
            status:String,
            priority:String,
            listPosition:Number,
            description:String,
            estimate:Number,
            timeSpent:Number,
            timeRemainingl:Number,
            createdAt:String,
            updateAt:String,

        //
    }],
    users:[
        {
            username: {
                type: String,required: false
              },
              email: {
                type: String,required: false
              },
              teamname:{
                type:String,required:false
              }
        
    }]
})

var projects=mongoose.model("projects",projectSchema);
module.exports=projects;