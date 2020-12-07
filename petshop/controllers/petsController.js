const petsService = require('../services/petsService')

/**
 * Read Pets functionality
 *
 * @returns {object}
 */
exports.get = async () => {
    const pets = await petsService.getPets()

    return {
        statusCode: 200,
        body: JSON.stringify(pets)
    }
}

/**
 * Read Pets functionality
 *
 * @param {string} id
 * @returns {object}
 */
exports.getById = async (id) => {
    const pet = await petsService.getPetById(id)

    return {
        statusCode: 200,
        body: JSON.stringify(pet)
    }
}

/**
 * Create Pets functionality
 *
 * @param {object} data - Pet data
 * @param {object} user - User data
 * @returns {object}
 */
exports.create = async (data, user) => {
    data.createdBy = user.id

    const pet = await petsService.createPet(data)

    return {
        statusCode: 200,
        body: JSON.stringify(pet)
    }
}

/**
 * Update Pets functionality
 *
 * @param {string} id
 * @param {object} data - Pet data
 * @param {object} user - User data
 * @returns {object}
 */
exports.update = async (id, data, user) => {
    data.updatedBy = user.id

    const pet = await petsService.updatePetById(id, data)

    return {
        statusCode: 200,
        body: JSON.stringify(pet)
    }
}

/**
 * Delete Pets functionality
 *
 * @param {string} id
 * @returns {object}
 */
exports.delete = async (id) => {
    await petsService.deletePetById(id)

    return {
        statusCode: 200,
        body: 'OK'
    }
}
