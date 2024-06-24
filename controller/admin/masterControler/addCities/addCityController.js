const fs = require("fs")
const AddCities = require("../../../../model/admin/master/addCities/addCityModal")


const addCities = async (req, res) => {
    try {
        const data = await fs.readFileSync(__dirname + "/../../../public/json/statescity.json", "utf-8")
        const cities = JSON.parse(data); // Parse the JSON data
        await AddCities.insertMany(cities);
        return res.json({
            message: "Cities Added Successfully",

        }).status(200)

    } catch (error) {
        console.log("error", error);

    }
}


module.exports = { addCities }