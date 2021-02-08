const Vehicle = require("../model/vehicle-model");

exports.editVehicleHelper = async (id, data) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return { updatedVehicle };
  } catch (error) {
    return { error: error.message };
  }
};

exports.deleteVehicleHelper = async (id) => {
  try {
    await Vehicle.findByIdAndDelete(id);

  } catch (error) {
      return {error:error.message}
  }
};

