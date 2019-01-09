const Challenge = require('./challenge.js');
const conn = require('mongoose').connection;

/** Represents a war. */
class War extends Challenge {
  /**
   * Create a chain war.
   * @param {Number} objectID - The unique ID of the war.
   * @param {Number} creator - The Discord ID of the creator.
   * @param {String} displayName - The name of the war.
   * @param {Number} initStamp - UNIX timestamp of creation time.
   * @param {Number} countdown - Time in minutes from creation to start.
   * @param {Number} duration - Duration in minutes.
   * @param {String} channel - Discord ID of start channel.
   * @param {Boolean} hidden - Flag for whether challenge is visible to users
   *  on other servers.
   * @param {Array} hookedChannels - A list of channels that have joined the
   *  war.
   * @param {Object} joinedUsers - A list of users who have joined the war.
   * @param {String} type - The type of the war.
   */
  constructor(
      objectID,
      creator,
      displayName,
      initStamp,
      countdown,
      duration,
      channel,
      hidden,
      hookedChannels,
      joinedUsers,
      type
  ) {
    if (type == undefined) {
      type = 'war';
    }
    super(
        objectID,
        creator,
        displayName,
        initStamp,
        countdown,
        duration,
        channel,
        type,
        hidden,
        hookedChannels,
        joinedUsers
    );

    const challengeData = {
      _id: this.objectID,
      creator: this.creator,
      name: this.displayName,
      startTime: this.initStamp,
      countdown: this.countdown,
      duration: this.duration,
      channel: this.channelID,
      hookedChannels: this.hookedChannels,
      joinedUsers: this.joinedUsers,
      state: this.state,
      type: 'war',
      hidden: this.hidden,
    };
    const array = [challengeData];

    conn.collection('challengeDB').insert(array, {}, function(e, docs) {});
  }
  /** Update the war at each tick. */
  update() {
    super.update();
  }
  /** Check to see whether the countdown is over, and start the war if so. */
  start() {
    super.start();
  }
  /** Construct the message displayed to users when a war begins. */
  startMsg() {
    super.startMsg();
  }
  /** Check to see whether the war is over, and end it if so. */
  end() {
    super.end();
  }
  /** Check to see whether the total period is over, and post the summary. */
  terminate() {
    this.cPost--;
    if (this.cPost <= 0) {
      for (const user in this.joinedUsers) {
        if (this.joinedUsers.hasOwnProperty(user)) {
          let dataToChange = '$inc: {';
          if (this.joinedUsers[user].countType == 'words') {
            dataToChange +=
              'lifetimeWarWords: parseInt(this.joinedUsers[user].countData),' +
              'lifetimeWordMinutes: parseFloat(this.duration),},';
          } else if (this.joinedUsers[user].countType == 'lines') {
            dataToChange +=
              'lifetimeWarLines: parseInt(this.joinedUsers[user].countData),' +
              'lifetimeLineMinutes: parseFloat(this.duration),},';
          } else if (this.joinedUsers[user].countType == 'pages') {
            dataToChange +=
              'lifetimeWarPages: parseInt(this.joinedUsers[user].countData),' +
              'lifetimePageMinutes: parseFloat(this.duration),},';
          } else if (this.joinedUsers[user].countType == 'minutes') {
            dataToChange += 'lifetimeWarMinutes: ' +
              'parseInt(this.joinedUsers[user].countData),},';
          }
          conn.collection('userDB').update(
              {_id: user},
              {
                dataToChange,
              },
              {upsert: true}
          );
        }
      }
      super.terminate();
    }
  }
}

module.exports = War;
