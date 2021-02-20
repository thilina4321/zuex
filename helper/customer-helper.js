const Vehicle = require("../model/vehicle-model");



exports.editVehicleHelper = async (id, data) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, {...data}, {
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
    const user = await Vehicle.findByIdAndDelete(id);
    if(!user){
      return {error:'No customer found'}
    }
    return {user}

  } catch (error) {
      return {error:error.message}
  }
};

