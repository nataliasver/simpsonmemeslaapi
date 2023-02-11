const _ = require("lodash");
const { model } = require("mongoose");
const Memes = require("./memes.model");
const Promise = require("bluebird")


class MemesService {

    _getTimeStamp(){
        let now = new Date();
        return ((now.getDate())+ '_' + (now.getMonth() + 1) + '_' + now.getFullYear() + "_" + now.getHours() + '_'
            + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + '_' + ((now.getSeconds() < 10) ? ("0" + now
                .getSeconds()) : (now.getSeconds())));
    }

    create(meme) {
        return Promise.resolve(this.countAllMemesSeasonEpisode(meme.season, meme.episode))
            .then(countMemes => this._getNewMemeId(meme, countMemes))
            .tap(newMemeId => meme.meme_id = newMemeId)
            .then(() => Memes.create(meme))
    };


    update(meme) {
        return this.findOne(meme.meme_id)
            .then(memeFind => {
               if(_.isEqual(meme, memeFind)) return memeFind
                memeFind.meme_img_url = _.get(meme, "meme_img_url") || memeFind.meme_img_url
                memeFind.title = meme.title
                memeFind.season = meme.season
                memeFind.episode = meme.episode
                memeFind.description = meme.description
                memeFind.characters = meme.characters
                return memeFind.save()
            })
    };


    _getNewMemeId(meme, countMemes){
        return (meme.season.toString()+ '_' + meme.episode.toString() + '_' + (countMemes+1).toString() + '_date_'+ this._getTimeStamp())
    }

    findAll() {
        return Memes.find({});
    };

    countAllMemesSeasonEpisode(season, episode){
        return Memes.count({season, episode})
    }

    findOne(memeId) {
        return Memes.findOne({ meme_id: memeId })
            .then((meme) => (!meme) ? Promise.reject( { name: "NotFound", statusCode: 404 }) : meme)
    };

    findOneQuery(memeId) {
        return Memes.findOne({ meme_id: {$regex: memeId, $options: 'i'} })
            .then((meme) => (!meme) ? Promise.reject( { name: "NotFound", statusCode: 404 }) : meme)
    };

    findAllByIdQuery(memeId) {
        return Memes.find({ meme_id: {$regex: memeId, $options: 'i'} })
    };
    deleteById(memeId) {
        return Memes.remove({ meme_id: memeId })
    };

    findAllByTitleQuery(memeTitle) {
        return Memes.find({ title: {$regex: memeTitle, $options: 'i'} })
    };
    findAllBySeason(memeSeason) {
        return Memes.find({ season: memeSeason })
    };
    findAllByEpisode(memeEpisode) {
        return Memes.find({ episode: memeEpisode })
    };
    findAllByCharacter(memeCharacter) {
        return Memes.find({characters: { $elemMatch: {$regex: memeCharacter, $options: 'i'} } } )
    }

}

module.exports = MemesService;

