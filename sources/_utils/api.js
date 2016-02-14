import Storage from '../_utils/storage';


const api = {
  /**
  * Dribbble API connection
  */
  dribbble(network, username) {
    console.log('======== Dribbble ========');
    const uri = `https://api.dribbble.com/v1/users/${ username }?access_token=419f6f1f2113f0328d44c3269232d69a9d55c87dd04c939b2ca9f3416dd89d2c`;

    fetch(uri).then((res) => {
      const data = JSON.parse(res._bodyText);
      const objNetwork = {};

      const details = {
        username: data.username,
        followers: data.followers_count,
        following: data.followings_count,
        likes: data.likes_count,
        likesReceived: data.likes_received_count,
        shots: data.shots_count,
        projects: data.projects_count,
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    })
    .catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * Twitter API connection
  */
  twitter(network, username) {
    console.log('======== Twitter ========');
    const uri = `https://twitter.com/${ username }`;

    fetch(uri).then((res) => {
      const data = res._bodyText;
      const objNetwork = {};
      const dataReplace = data.replace(/&quot;/g, '"');

      const details = {
        username: username,
        followers: parseInt((/\"followers_count\":([\d]+)/g).exec(dataReplace)[1]),
        following: parseInt((/\"friends_count\":([\d]+)/g).exec(dataReplace)[1]),
        tweets: parseInt((/\"statuses_count\":([\d]+)/g).exec(dataReplace)[1]),
        favorites: parseInt((/\"favourites_count\":([\d]+)/g).exec(dataReplace)[1]),
        listed: parseInt((/\"listed_count\":([\d]+)/g).exec(dataReplace)[1]),
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    })
    .catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * Facebook API connection
  * TODO
  */
  facebook() {

  },

  /**
  * Behance API connection
  */
  behance(network, username) {
    console.log('======== Behance ========');
    const uri = `https://www.behance.net/v2/users/${ username }?api_key=pEb2TjTxS31kT7fv2TPma6WK8WF8Mlgf`;

    fetch(uri).then((res) => {
      const data = JSON.parse(res._bodyText).user;
      const objNetwork = {};

      const details = {
        username: data.username,
        followers: data.stats.followers,
        following: data.stats.following,
        likes: data.stats.appreciations,
        comments: data.stats.comments,
        views: data.stats.views,
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    })
    .catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * 500px API connection
  */
  cinqcentpx(network, username) {
    console.log('======== 500px ========');
    const uri = `https://api.500px.com/v1/users/show?username=${ username }&consumer_key=GKHCkl4MdEE2rCFLVeIOWbYxhgk06s69xKnUzad3`;

    fetch(uri).then((res) => {
      const data = JSON.parse(res._bodyText).user;
      const objNetwork = {};

      const details = {
        username: data.username,
        followers: data.followers_count,
        following: data.friends_count,
        affection: data.affection,
        favorites: data.in_favorites_count,
        photos: data.photos_count,
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    }).catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * GitHub API connection
  */
  github(network, username) {
    console.log('======== Gitub ========');
    const uri = `https://api.github.com/users/${ username }`;

    fetch(uri).then((res) => {
      const data = JSON.parse(res._bodyText);
      const objNetwork = {};

      const details = {
        username: data.login,
        followers: data.followers,
        following: data.following,
        repo: data.public_repos,
        gist: data.public_gists,
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    }).catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * Vimeo API connection
  */
  vimeo(network, username) {
    console.log('======== Vimeo ========');
    const uri = `http://vimeo.com/api/v2/${ username }/info.json`;

    fetch(uri).then((res) => {
      const data = JSON.parse(res._bodyText);
      const objNetwork = {};

      const details = {
        username: username,
        followers: data.total_contacts,
        // following: data.following,
        videos: data.total_videos_uploaded,
        likes: data.total_videos_liked,
        albums: data.total_albums
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    }).catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * Instagram API connection
  */
  instagram(network, username) {
    console.log('======== Instagram ========');
    const uri = `http://instagram.com/${ username }`;

    fetch(uri).then((res) => {
      const data = res._bodyText;
      const objNetwork = {};
      const dataReplace = data.replace(/\\/g, '');

      const details = {
        username: username,
        followers: parseInt((/\"followed_by\":{\"count\":([\d]+)/g).exec(dataReplace)[1]),
        following: parseInt((/\"follows\":{\"count\":([\d]+)/g).exec(dataReplace)[1]),
        medias: parseInt((/\"media\":{\"count\":([\d]+)/g).exec(dataReplace)[1]),
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    })
    .catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * Pinterest API connection
  */
  pinterest(network, username) {
    console.log('======== Pinterest ========');
    const uri = `https://pinterest.com/${ username }`;

    fetch(uri).then((res) => {
      const data = res._bodyText;
      const objNetwork = {};
      const dataReplace = data.replace(/\\/g, '');

      const details = {
        username: username,
        followers: parseInt((/\"follower_count\": ([\d]+)/g).exec(dataReplace)[1]),
        following: parseInt((/\"following_count\": ([\d]+)/g).exec(dataReplace)[1]),
        pins: parseInt((/\"pin_count\": ([\d]+)/g).exec(dataReplace)[1]),
        boards: parseInt((/\"board_count\": ([\d]+)/g).exec(dataReplace)[1]),
        likes: parseInt((/\"like_count\": ([\d]+)/g).exec(dataReplace)[1]),
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    })
    .catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * Youtube API connection
  * TODO
  */
  youtube(network, username) {

  },

  /**
  * Soundcloud API connection
  */
  soundcloud(network, username) {
    console.log('======== Soundcloud ========');
    const uri = `http://api.soundcloud.com/users/${ username }.json?client_id=6ff9d7c484c5e5d5517d1965ca18eca9`;

    fetch(uri).then((res) => {
      const data = JSON.parse(res._bodyText);
      const objNetwork = {};

      const details = {
        username: data.username,
        followers: data.followers_count,
        following: data.followings_count,
        tracks: data.track_count,
        playlist: data.playlist_count,
        favorites: data.public_favorites_count,
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    }).catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },

  /**
  * Deviantart API connection
  * TODO
  */
  deviantart(network, username) {

  },

  /**
  * Product Hunt API connection
  */
  producthunt(network, username) {
    console.log('======== Product Hunt ========');
    const uri = `https://api.producthunt.com/v1/users/${ username }?access_token=4671783399e1265f34e04e335283fefe896bec9e3a5a7f89f41080adf155c034`;

    fetch(uri).then((res) => {
      const data = JSON.parse(res._bodyText).user;
      const objNetwork = {};

      const details = {
        username: username,
        followers: data.followers_count,
        following: data.followings_count,
        votes: data.votes_count,
        posts: data.posts_count,
        maker: data.maker_of_count,
        collections: data.collections_count,
      }

      objNetwork[network] = details;
      Storage.actualize('userData', objNetwork);
    }).catch((err) => {
      console.log('Error :(');
      console.log(err);
    });
  },
}

export default api;
