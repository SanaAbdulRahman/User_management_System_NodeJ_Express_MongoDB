const mongoose=require('mongoose');
//const bcrypt=require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});
// userSchema.pre('save', async function (next) {
//     try {
//       if (this.isModified('password')) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
module.exports=mongoose.model("user",userSchema);