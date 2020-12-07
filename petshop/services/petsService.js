const { Pets } = require('../models/Pets')
const { v4 } = require('uuid')

/**
 * Get pets functionality
 *
 * @return {Promise<ScanResponse<AnyDocument>>}
 */
exports.getPets = () => {
    return Pets.scan().exec()
}

/**
 * Get pets by id functionality
 *
 * @param {string} id
 * @return {Promise<AnyDocument>}
 */
exports.getPetById = async (id) => {
    return Pets.get(id)
}

/**
 * Create pet functionality
 *
 * @param {object} petData
 * @return {Promise<*>}
 */
exports.createPet = async (petData) => {
    petData.id = v4()

    const pet = new Pets(petData)
    await pet.save()
    return pet
}

/**
 * Update pet functionality
 *
 * @param {string} id
 * @param {object} petData
 * @return {Promise<AnyDocument>}
 */
exports.updatePetById = (id, petData) => {
    return Pets.update({ id }, petData)
}

/**
 * Delete pet functionality
 *
 * @param {string} id
 * @return {Promise<boolean>}
 */
exports.deletePetById = async (id) => {
    await Pets.delete(id)

    return true
}