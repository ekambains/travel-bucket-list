import mongoose from "mongoose";

const bucketListSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    visited: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const BucketList = mongoose.model('BucketList', bucketListSchema);

export default BucketList;    