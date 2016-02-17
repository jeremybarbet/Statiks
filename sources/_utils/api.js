import React, {
  AlertIOS,
} from 'react-native';

import Storage from '../_utils/storage';


export function fetchy(uri, username, network, details) {
  const objNetwork = {};

  fetch(uri).then((res) => {
    if (res.ok) {
      details(res);
      objNetwork[network] = details(res);
      Storage.actualize('userData', objNetwork);
    } else if (res.status === 404) {
      AlertIOS.prompt(`${ username } not found.`, null, null, null, 'default');
    } else {
      const errorMessage = JSON.parse(res._bodyText).message;
      AlertIOS.prompt(`${ (errorMessage) ? errorMessage : 'Error scrappy scrapper.' }`, null, null, null, 'default');
    }
  }).catch((error) => {
    AlertIOS.prompt(`${ error.message } not found.`, null, null, null, 'default');
  });
}

export default api = {
  /**
  * Dribbble API connection
  */
  dribbble(network, username) {
    const uri = `https://api.dribbble.com/v1/users/${ username }?access_token=419f6f1f2113f0328d44c3269232d69a9d55c87dd04c939b2ca9f3416dd89d2c`;

    function details(res) {
      const data = JSON.parse(res._bodyText);

      return details = {
        username: data.username,
        followers: data.followers_count,
        following: data.followings_count,
        likes: data.likes_count,
        likesReceived: data.likes_received_count,
        shots: data.shots_count,
        projects: data.projects_count,
      }
    }

    fetchy(uri, username, network, details);
  },

  /**
  * Twitter API connection
  */
  twitter(network, username) {
    const uri = `https://twitter.com/${ username }`;

    function details(res) {
      const data = res._bodyText;
      const dataReplace = data.replace(/&quot;/g, '"');

      return details = {
        username: username,
        followers: parseInt((/\"followers_count\":([\d]+)/g).exec(dataReplace)[1]),
        following: parseInt((/\"friends_count\":([\d]+)/g).exec(dataReplace)[1]),
        tweets: parseInt((/\"statuses_count\":([\d]+)/g).exec(dataReplace)[1]),
        favorites: parseInt((/\"favourites_count\":([\d]+)/g).exec(dataReplace)[1]),
        listed: parseInt((/\"listed_count\":([\d]+)/g).exec(dataReplace)[1]),
      }
    }

    fetchy(uri, username, network, details);
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
    const uri = `https://www.behance.net/v2/users/${ username }?api_key=pEb2TjTxS31kT7fv2TPma6WK8WF8Mlgf`;

    function details(res) {
      const data = JSON.parse(res._bodyText).user;

      return details = {
        username: data.username,
        followers: data.stats.followers,
        following: data.stats.following,
        likes: data.stats.appreciations,
        comments: data.stats.comments,
        views: data.stats.views,
      }
    }

    fetchy(uri, username, network, details);
  },

  /**
  * 500px API connection
  */
  cinqcentpx(network, username) {
    const uri = `https://api.500px.com/v1/users/show?username=${ username }&consumer_key=GKHCkl4MdEE2rCFLVeIOWbYxhgk06s69xKnUzad3`;

    function details(res) {
      const data = JSON.parse(res._bodyText).user;

      return details = {
        username: data.username,
        followers: data.followers_count,
        following: data.friends_count,
        affection: data.affection,
        favorites: data.in_favorites_count,
        photos: data.photos_count,
      }
    }

    fetchy(uri, username, network, details);
  },

  /**
  * GitHub API connection
  */
  github(network, username) {
    const uri = `https://api.github.com/users/${ username }`;

    function details(res) {
      const data = JSON.parse(res._bodyText);

      return details = {
        username: data.login,
        followers: data.followers,
        following: data.following,
        repo: data.public_repos,
        gist: data.public_gists,
      }
    }

    fetchy(uri, username, network, details);
  },

  /**
  * Vimeo API connection
  */
  vimeo(network, username) {
    const uri = `http://vimeo.com/api/v2/${ username }/info.json`;

    function details(res) {
      const data = JSON.parse(res._bodyText);

      return details = {
        username: username,
        followers: data.total_contacts,
        // following: data.following,
        videos: data.total_videos_uploaded,
        likes: data.total_videos_liked,
        albums: data.total_albums
      }
    }

    fetchy(uri, username, network, details);
  },

  /**
  * Instagram API connection
  */
  instagram(network, username) {
    const uri = `http://instagram.com/${ username }`;

    function details(res) {
      const data = res._bodyText;
      const dataReplace = data.replace(/\\/g, '');

      return details = {
        username: username,
        followers: parseInt((/\"followed_by\":{\"count\":([\d]+)/g).exec(dataReplace)[1]),
        following: parseInt((/\"follows\":{\"count\":([\d]+)/g).exec(dataReplace)[1]),
        medias: parseInt((/\"media\":{\"count\":([\d]+)/g).exec(dataReplace)[1]),
      }
    }

    fetchy(uri, username, network, details);
  },

  /**
  * Pinterest API connection
  */
  pinterest(network, username) {
    const uri = `https://pinterest.com/${ username }`;

    function details(res) {
      const data = res._bodyText;
      const dataReplace = data.replace(/\\/g, '');

      return details = {
        username: username,
        followers: parseInt((/\"follower_count\": ([\d]+)/g).exec(dataReplace)[1]),
        following: parseInt((/\"following_count\": ([\d]+)/g).exec(dataReplace)[1]),
        pins: parseInt((/\"pin_count\": ([\d]+)/g).exec(dataReplace)[1]),
        boards: parseInt((/\"board_count\": ([\d]+)/g).exec(dataReplace)[1]),
        likes: parseInt((/\"like_count\": ([\d]+)/g).exec(dataReplace)[1]),
      }
    }

    fetchy(uri, username, network, details);
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
    const uri = `http://api.soundcloud.com/users/${ username }.json?client_id=6ff9d7c484c5e5d5517d1965ca18eca9`;

    function details(res) {
      const data = JSON.parse(res._bodyText);

      return details = {
        username: data.username,
        followers: data.followers_count,
        following: data.followings_count,
        tracks: data.track_count,
        playlist: data.playlist_count,
        favorites: data.public_favorites_count,
      }
    }

    fetchy(uri, username, network, details);
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
    const uri = `https://api.producthunt.com/v1/users/${ username }?access_token=4671783399e1265f34e04e335283fefe896bec9e3a5a7f89f41080adf155c034`;

    function details(res) {
      const data = JSON.parse(res._bodyText).user;

      return details = {
        username: username,
        followers: data.followers_count,
        following: data.followings_count,
        votes: data.votes_count,
        posts: data.posts_count,
        maker: data.maker_of_count,
        collections: data.collections_count,
      }
    }

    fetchy(uri, username, network, details);
  },
}
