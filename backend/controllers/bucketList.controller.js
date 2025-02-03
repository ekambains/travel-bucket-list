import BucketList from "../models/bucketList.model";

export const getBucket = async(req, res) => {
    try {
        const bucketList = await BucketList.find({userId: req.user.id});
        res.status(200).json({success: true, data: bucketList});
    } catch (error) {
        console.log("Error in fetching buckets: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createBucket = async(req, res) => {
    try {
        const bucket = req.body;
        if(!bucket.destination || !bucket.description || !bucket.visited) {
            return res.status(400).json({success: false, message: "Please provide all fields."});
        }
        const newBucket = new BucketList({userId: req.user.id, destination: bucket.destination, description: bucket.description, visited: bucket.visited});
        await newBucket.save();
        return res.status(201).json({success: true, data: newBucket});
    } catch(error) {
        console.error("Error in creating bucket: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const updatedBucket = async(req, res) => {
    const { id } = req.params;
    const bucket = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Bucket ID."});
    }

    try {
        const updatedBucket = await BucketList.findByIdAndUpdate(id, bucket, {new: true});
        res.status(200).json({success: true, data: updatedBucket});
    } catch (error) {
        console.error("Error in updating bucket is: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteBucket = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Bucket ID."});
    }

    try {
        await BucketList.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted Successfully."});
    } catch (error) {
        console.error("Error in deleting bucket: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}