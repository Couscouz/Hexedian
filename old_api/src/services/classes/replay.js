//-----------------------
/class check dans src/utils/classes/check.js



const jsonLogic = require('json-logic-js')
const { PreparedStatement: PS } = require('pg-promise');
const Manager = require('@app/database/index')

const views = require('@app/database/views')

const valuesNotReferenced = new Set()

const checkedCleanObjects = new Set()
const checkedInvalidObjects = new Set()

const masterObjects = [
    "fovfl",
    "fovcharacteristics",
    "fovmeasuringpoint",
    "fovmplanitem",
    "fovmplanobjlist",
    "fovmplanplan",
    "fovtasklcomponent",
    "fovtasklgrpcounter",
    "fovtaskloperation",
    "fovtasklprtdocument",
    "fovfldoc",
    "fovbom",
    "fovbomassignmen",
    "fovassemblies",
    "fovdocuments"
]

class Check {
    static errors = new Set()
    static unique = new Set()
    static uniqueCombination = new Set()

    constructor(models, objectDefinitions) {
        this.models = models
        this.objectDefinitions = objectDefinitions
    }

    static async checkDeleteCodeUsability(model, columnName, value, req, modelName) {
        const db = Manager.getPGPProjectDatabase(req.project)
        const findUnicity = new PS({ name: 'find-unicity', text: `SELECT "${columnName}" FROM sov_view_schema.${modelName} AS sov WHERE sov."${columnName}" = $1`, values: [value] });

        await db.one(findUnicity).then(object => {
        }).catch(error => {
            Check.errors.add(model.id)
            model.error.push(`Cannot delete inexistent object`)
            model.errorColumn.push(columnName)
        });
    }

    static async checkCreationCodeUsability(model, columnName, value, req, modelName) {
        const db = Manager.getPGPProjectDatabase(req.project)
        const findUnicity = new PS({ name: 'find-unicity', text: `SELECT "${columnName}" FROM sov_view_schema.${modelName} AS sov WHERE sov."${columnName}" = $1`, values: [value] });

        await db.one(findUnicity).then(object => {
            Check.errors.add(model.id)
            model.error.push(`Cannot create existent object`)
            model.errorColumn.push(columnName)
        }).catch(error => {
        });
    }

    static checkOldTagPresence(model, columnName, value) {
        if (value != "" && value != null) {
            Check.errors.add(model.id)
            model.error.push(`${columnName} can only be used for code m`)
            model.errorColumn.push(columnName)
        }
    }
}

module.exports = Check