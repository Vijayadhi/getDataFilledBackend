import bussinessDetailModel from "../models/bussinessDetailModel.js";

const createBusssinessDetailModel = async (req, res) => {
    try {
        const { bussiness_title, bussiness_email, bussiness_phone, bussiness_building_num, bussiness_street, bussiness_gov_reg_num, bussiness_area, bussiness_district, bussiness_pincode, userId } = req.body;
        const bussinessDetail = new bussinessDetailModel({
            businessName: bussiness_title,
            email: bussiness_email,
            businessPhoneNumber: bussiness_phone,
            userId: userId,
            // bussiness_building_num: ,
            address: `${bussiness_building_num}, ${bussiness_street}, ${bussiness_area}, ${bussiness_district}, ${bussiness_pincode}`,
            // bussiness_street: ,
            registrationNumber: bussiness_gov_reg_num
            // bussiness_area: bussiness_area,
            // bussiness_district: bussiness_district,
            // bussiness_pincode: bussiness_pincode
        });
        await bussinessDetail.save();
        res.status(201).json({ message: "Bussiness Detail created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating Bussiness Detail" , error: error.message });
    }
};

export default { createBusssinessDetailModel };