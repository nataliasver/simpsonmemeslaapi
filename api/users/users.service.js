const _ = require("lodash");
const { model } = require("mongoose");
const Users = require("./users.model");
const Promise = require("bluebird")


class UsersService {

    findAll() {
        return Users.find({});
    };

    create(user) {
        return Users.create(user);
    };

    findOne({ email }){
        return Users.findOne({ email })
            .then((user) => (!user) ? Promise.reject( { name: "NotFound", statusCode: 404 }) : user)
    }

    findOneById(_id){
        return Users.findOne({ _id })
            .then((user) => (!user) ? Promise.reject( { name: "NotFound", statusCode: 404 }) : user)
    }

    updateRefeshToken(user, refreshToken){
            return this.findOneById(user._id)
                .then(userFind => {
                    userFind.refreshToken = refreshToken
                    return userFind.save()
                })
    };

    findOneByRefeshToken(refreshToken) {
        return Users.findOne({ refreshToken })
            .then((user) => (!user) ? Promise.reject( { name: "NotFound", statusCode: 404 }) : user)
    }

    _getTimeStamp(){
        let now = new Date();
        return ((now.getDate())+ '_' + (now.getMonth() + 1) + '_' + now.getFullYear() + "_" + now.getHours() + '_'
            + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + '_' + ((now.getSeconds() < 10) ? ("0" + now
                .getSeconds()) : (now.getSeconds())));
    }

}

module.exports = UsersService;

