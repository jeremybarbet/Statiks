import { AlertIOS } from 'react-native';

import { removeTag, decode } from './_utils/utils';
import apiUtils from './_utils/apiUtils';

let _networksArray = [];

export function fetchy(uri, username, network, details, current, sync, total) {
  const objNetwork = {};
  const objHistory = {};

  let _timestampDiff = {};
  let _total = {};

  return fetch(uri)
  .then((response) => apiUtils.checkStatus(response, username, network))
  .then((response) => apiUtils.returnResponse(response))
  .then((response) => apiUtils.storeData(response, objNetwork, network, details, current, _networksArray, sync, total, _total, _timestampDiff, objHistory))
  .catch((error) => {
    AlertIOS.prompt(`${ error }`, null, null, null, 'default');
  });
}

export default api = {
  /**
  * Dribbble API connection
  */
  dribbble(network, username, current, sync, total) {
    const uri = `https://api.dribbble.com/v1/users/${ username }?access_token=419f6f1f2113f0328d44c3269232d69a9d55c87dd04c939b2ca9f3416dd89d2c`;

    function details(response) {
      console.log('%c --------DRIBBBLE--------', 'background: grey; color: white');
      console.log(response);

      console.log(current);
      console.log(sync);
      console.log(total);

      return details = {
        stats: {
          "Followers": response.followers_count,
          "Following": response.followings_count,
          "Likes": response.likes_count,
          "Likes received": response.likes_received_count,
          "Shots": response.shots_count,
          "Projects": response.projects_count,
        },
        user: {
          "Username": response.username,
          "Avatar": response.avatar_url,
          "Location": response.location,
          "Bio": removeTag(response.bio),
          "Name": response.name,
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * Twitter API connection
  */
  twitter(network, username, current, sync, total) {
    const uri = `https://twitter.com/${ username }`;

    function details(response) {
      const data = response.replace(/&quot;/g, '"');

      return details = {
        stats: {
          "Followers": parseInt((/\"followers_count\":([\d]+)/g).exec(data)[1]),
          "Following": parseInt((/\"friends_count\":([\d]+)/g).exec(data)[1]),
          "Tweets": parseInt((/\"statuses_count\":([\d]+)/g).exec(data)[1]),
          "Favorites": parseInt((/\"favourites_count\":([\d]+)/g).exec(data)[1]),
          "Listed": parseInt((/\"listed_count\":([\d]+)/g).exec(data)[1]),
        },
        user: {
          "Username": username,
          "Avatar": (((/\"profile_image_url\":"(.*?)"/g).exec(data)[1]).replace(/\\/g, '')).replace(/_normal/g, ''),
          "Location": (/\"location\":"(.*?)"/g).exec(data)[1],
          "Bio": decode(((/\"description\":"(.*?)"/g).exec(data)[1]).replace(/\\n/g, ' ')).replace(/\\/g, ''),
          "Name": decode((/\"name\":"(.*?)"/g).exec(data)[1]),
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * Facebook API connection
  * TODO
  *
  facebook() {

  },

  /**
  * Behance API connection
  */
  behance(network, username, current, sync, total) {
    const uri = `https://www.behance.net/v2/users/${ username }?api_key=pEb2TjTxS31kT7fv2TPma6WK8WF8Mlgf`;

    function details(response) {
      return details = {
        stats: {
          "Followers": response.user.stats.followers,
          "Following": response.user.stats.following,
          "Likes": response.user.stats.appreciations,
          "Comments": response.user.stats.comments,
          "Views": response.user.stats.views,
        },
        user: {
          "Username": response.user.username,
          "Avatar": response.user.images['230'],
          "Location": response.user.location,
          "Bio": response.user.sections.About,
          "Name": response.user.display_name,
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * 500px API connection
  */
  fivehundredpx(network, username, current, sync, total) {
    const uri = `https://api.500px.com/v1/users/show?username=${ username }&consumer_key=GKHCkl4MdEE2rCFLVeIOWbYxhgk06s69xKnUzad3`;

    function details(response) {
      return details = {
        stats: {
          "Followers": response.user.followers_count,
          "Following": response.user.friends_count,
          "Affection": response.user.affection,
          "Favorites": response.user.in_favorites_count,
          "Photos": response.user.photos_count,
        },
        user: {
          "Username": response.user.username,
          "Avatar": response.user.userpic_url,
          "City": response.user.city,
          "Country": response.user.country,
          "Bio": response.user.about,
          "Name": response.user.fullname,
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * GitHub API connection
  */
  github(network, username, current, sync, total) {
    const uri = `https://api.github.com/users/${ username }`;

    function details(response) {
      return details = {
        stats: {
          "Followers": response.followers,
          "Following": response.following,
          "Repository": response.public_repos,
          "Gist": response.public_gists,
        },
        user: {
          "Username": response.login,
          "Avatar": response.avatar_url,
          "Location": response.location,
          "Bio": response.bio,
          "Name": response.name,
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * Vimeo API connection
  */
  vimeo(network, username, current, sync, total) {
    const uri = `http://vimeo.com/api/v2/${ username }/info.json`;

    function details(response) {
      return details = {
        stats: {
          "Followers": response.total_contacts,
          // "Following": response.following,
          "Videos": response.total_videos_uploaded,
          "Channels": response.total_channels,
          "Likes": response.total_videos_liked,
          "Albums": response.total_albums,
        },
        user: {
          "Username": username,
          "Avatar": response.portrait_huge,
          "Location": response.location,
          "Bio": response.bio,
          "Name": response.display_name,
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * Instagram API connection
  */
  instagram(network, username, current, sync, total) {
    const uri = `http://instagram.com/${ username }`;

    function details(response) {
      return details = {
        stats: {
          "Followers": parseInt((/\"followed_by\":{\"count\":([\d]+)/g).exec(response)[1]),
          "Following": parseInt((/\"follows\":{\"count\":([\d]+)/g).exec(response)[1]),
          "Medias": parseInt((/\"media\":{\"count\":([\d]+)/g).exec(response)[1]),
        },
        user: {
          "Username": username,
          "Avatar": ((/\"profile_pic_url\":"(.*?)"/g).exec(response)[1]).replace(/\\/g, ''),
          "Bio": decode(((/\"biography\":"(.*?)"/g).exec(response)[1]).replace(/\\n/g, ' ')).replace(/\\/g, ''),
          "Name": decode((/\"full_name\":"(.*?)"/g).exec(response)[1]),
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * Pinterest API connection
  */
  pinterest(network, username, current, sync, total) {
    const uri = `https://pinterest.com/${ username }`;

    function details(response) {
      return details = {
        stats: {
          "Followers": (/followers" content="([\d]+)"/g).exec(response)[1],
          "Following": (/following" content="([\d]+)"/g).exec(response)[1],
          "Pins": (/pins" content="([\d]+)"/g).exec(response)[1],
          "Boards": (/boards" content="([\d]+)"/g).exec(response)[1],
        },
        user: {
          "Username": username,
          "Avatar": (/image:src" content="(.*?)"/g).exec(response)[1],
          "Bio": (/about" content="(.*?)"/g).exec(response)[1],
          "Name": ((/og:title" content="(.*?)"/g).exec(response)[1]).replace(/\s*\(.*?\)\s*/g, ''),
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * Youtube API connection
  * TODO
  *
  youtube() {

  },

  /**
  * Soundcloud API connection
  */
  soundcloud(network, username, current, sync, total) {
    const uri = `http://api.soundcloud.com/users/${ username }.json?client_id=6ff9d7c484c5e5d5517d1965ca18eca9`;

    function details(response) {
      return details = {
        stats: {
          "Followers": response.followers_count,
          "Following": response.followings_count,
          "Tracks": response.track_count,
          "Playlist": response.playlist_count,
          "Favorites": response.public_favorites_count,
        },
        user: {
          "Username": response.username,
          "Avatar": response.avatar_url,
          "City": response.city,
          "Country": response.country,
          "Bio": response.description,
          "Name": response.full_name,
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },

  /**
  * Deviantart API connection
  * TODO
  *
  deviantart() {

  },

  /**
  * Product Hunt API connection
  */
  producthunt(network, username, current, sync, total) {
    const uri = `https://api.producthunt.com/v1/users/${ username }?access_token=4671783399e1265f34e04e335283fefe896bec9e3a5a7f89f41080adf155c034`;

    function details(response) {
      return details = {
        stats: {
          "Followers": response.user.followers_count,
          "Following": response.user.followings_count,
          "Votes": response.user.votes_count,
          "Posts": response.user.posts_count,
          "Maker": response.user.maker_of_count,
          "Collections": response.user.collections_count,
        },
        user: {
          "Username": username,
          "Avatar": response.user.image_url['220px'],
          "Bio": response.user.headline,
          "Name": response.user.name,
        }
      }
    }

    return fetchy(uri, username, network, details, current, sync, total);
  },
}
