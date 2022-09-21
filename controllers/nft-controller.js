const Nft = require('../models/Nft');

const nftController = async(req, res) => {
    console.log(req.body);
    const {userId, title, price, category, imageUrl} = req.body;
    try {
        const nft = await Nft.findOne({ title });
        if (!nft) {
            const newNft = new Nft({ userId, title, price, category, imageUrl });
            await newNft.save();
            return res.status(201).json({
                message: "Nft Created succesfully",
                newNft
            })
        } else {
            return res.status(400).json({
                message: "Nft exists"
            })
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
       
    }
}

module.exports = { nftController }