import mongoose from mongoose;

const serviceRequestSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
     priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM"
    },
     status: {
      type: String,
      enum: [
        "NEW",
        "ASSIGNED",
        "IN_PROGRESS",
        "ON_HOLD",
        "RESOLVED",
        "CLOSED",
        "REJECTED"
      ],
      default: "NEW"
    },
     createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
     assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
},{
    timestamps:true
})

const ServiceRequest = mongoose.model("ServiceRequest",serviceRequestSchema)

export default ServiceRequest;