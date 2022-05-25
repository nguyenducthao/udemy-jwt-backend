import db from '../models/index'

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2))
        if (persists.length === 0) {
            return {
                EM: 'Nothings to update',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persists)
        return {
            EM: `Create succeeds ${persists.length} roles...`,
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}
const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            order: [['id', 'DESC']]
        })
        return {
            EM: `Get all Roles succeeds`,
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}
const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy()
        }

        return {
            EM: `Delete Role succeeds`,
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}
const getRoleByGroup = async (groupId) => {
    try {
        if (!groupId) {
            return {
                EM: `Not found any roles`,
                EC: 0,
                DT: []
            }
        }
        let roles = await db.Group.findOne({
            where: { id: groupId },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }
        })
        return {
            EM: `Get Role by Group succeeds`,
            EC: 0,
            DT: roles
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}
const assignRoleToGroup = async (data) => {
    try {
        // data = { groupId: 1, groupRoles: [{}, {}] }
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })
        await db.Group_Role.bulkCreate(data.groupRoles)
        return {
            EM: `Assign Role to Group succeeds. Please relogin to use new roles`,
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}
module.exports = {
    createNewRoles,
    getAllRoles,
    deleteRole,
    getRoleByGroup,
    assignRoleToGroup
}