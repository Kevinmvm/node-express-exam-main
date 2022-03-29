import users from '../data/user.js';

class User {

    createUser(user) {
        console.log(`---> userModel::createUser ${user.username}`);
        
        users.push(user);
        return users.find(element => element.username == user.username);


    }

    loginUser(user) {
        console.log(`---> userModel::loginUser ${user.username}`);

        return users.find(element => (element.username == user.username))
    }

    getUsers(user){
        return users.find(element => (element.username == user.username))
    }

    addGrantsUser(user){
        //console.log(user);
        const userSearch = users.find(element => (element.username == user.username))
        const grants = {grants: user.grants}
        //const newUser = Object.assign(userSearch, grants)
        // console.log(grants)
        // console.log("newUser;", newUser);

        return users.find(element => (element.username == user.username),Object.assign(userSearch, grants))
    }

    deleteGrantsUser(user){
        //console.log(user);
        const userSearch = users.find(element => (element.username == user.username))
        const actualGrants = userSearch.grants;
        const grantsForDelete = {grants: user.grants}
        actualGrants.splice(grantsForDelete, 1);
        //console.log("GRANTS::", actualGrants);
        return users.find(element => (element.username == user.username))
    }

    updateGrantsUser(user){
        //console.log(user);
        const userSearch = users.find(element => (element.username == user.username))
        const actualGrants = userSearch.grants;
        const updateGrants = actualGrants.concat(user.grants);
        //console.log("GRANTS::", updateGrants);
        const grantsForUpdate = {grants: updateGrants}
        return users.find(element => (element.username == user.username),Object.assign(userSearch, grantsForUpdate))
    }

    deleteUsers(user){
        console.log(user);
        const userSearch = users.find(element => (element.username == user.username))
        delete userSearch.active;
        console.log("USERSEARCH",users);
        const actualActivate = {active: user.active}
        console.log('ACTUALACTIVATE:', actualActivate);
        // actualActivate.splice(1, 1);
        // const updateActive = user.active;
        return users.find(element => (element.username == user.username),Object.assign(userSearch, actualActivate))
        /*console.log("ACTIVE:", active)
        return users.find(element => (element.username == user.username),Object.assign(userSearch, active))*/
    }

    updateUsers(user){
        console.log(user);
        const userSearch = users.find(element => (element.username == user.username))
        delete userSearch.active;
        console.log("USERSEARCH",users);
        const actualActivate = {active: user.active}
        console.log('ACTUALACTIVATE:', actualActivate);
        // actualActivate.splice(1, 1);
        // const updateActive = user.active;
        return users.find(element => (element.username == user.username),Object.assign(userSearch, actualActivate))
        /*console.log("ACTIVE:", active)
        return users.find(element => (element.username == user.username),Object.assign(userSearch, active))*/
    }

}

export default new User();