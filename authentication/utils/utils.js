/**
 * Validate data from body by array keys
 *
 * @param {object} validation - Requires keys with type (E.g.: {foo: 'string'})
 * @param {object} data
 * @returns {array}
 */
exports.validateBody = (validation, data) => {
    return Object.keys(validation).reduce((acc, value) => {
        if(!data[value]){
            acc.push({
                validationError: `Field is empty or missing`,
                validationColumn:  value
            })
            return acc
        } else {
            if (validation[value] !== typeof data[value]) {
                acc.push({
                    validationError: `Wrong type`,
                    validationColumn: validation[value]
                })
                return acc
            }
        }

        return acc
    }, [])
}