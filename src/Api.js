/* eslint-disable no-useless-escape */

import { removeTag, decode } from 'utils/api';

export function checkStatus(res, n, u) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else if (res.status === 404) {
    throw `${u} not found on ${n}.`; // eslint-disable-line
  } else {
    throw 'It seems something went wrong !'; // eslint-disable-line
  }
}

export function getResponse(res) {
  if (res.headers.get('Content-Type').indexOf('application/json') > -1) {
    return res.json();
  }

  return res.text();
}

export const api = {
  dribbble(username) {
    return `https://api.dribbble.com/v1/users/${username}?access_token=419f6f1f2113f0328d44c3269232d69a9d55c87dd04c939b2ca9f3416dd89d2c`;
  },

  twitter(username) {
    return `https://twitter.com/${username}`;
  },

  behance(username) {
    return `https://www.behance.net/v2/users/${username}?api_key=pEb2TjTxS31kT7fv2TPma6WK8WF8Mlgf`;
  },

  fivehundredpx(username) {
    return `https://api.500px.com/v1/users/show?username=${username}&consumer_key=GKHCkl4MdEE2rCFLVeIOWbYxhgk06s69xKnUzad3`;
  },

  github(username) {
    return `https://api.github.com/users/${username}`;
  },

  vimeo(username) {
    return `http://vimeo.com/api/v2/${username}/info.json`;
  },

  instagram(username) {
    return `https://www.instagram.com/${username}`;
  },

  pinterest(username) {
    return `https://pinterest.com/${username}`;
  },

  soundcloud(username) {
    return `https://api.soundcloud.com/users/${username}.json?client_id=6ff9d7c484c5e5d5517d1965ca18eca9`;
  },

  producthunt(username) {
    return `https://api.producthunt.com/v1/users/${username}?access_token=4671783399e1265f34e04e335283fefe896bec9e3a5a7f89f41080adf155c034`;
  },
};

export const handleResponse = {
  // API
  dribbble(res) {
    return {
      stats: {
        Followers: res.followers_count,
        Following: res.followings_count,
        Likes: res.likes_count,
        'Likes received': res.likes_received_count,
        Shots: res.shots_count,
        Projects: res.projects_count,
      },
      user: {
        Username: res.username,
        Avatar: res.avatar_url,
        Location: res.location,
        Bio: removeTag(res.bio),
        Name: res.name,
      },
    };
  },

  // REGEX hack
  twitter(res) {
    const data = res.replace(/&quot;/g, '"').match(/<input type="hidden" id="init-data".+>/g)[0];
    const name = data.match(/\"name\":"(.*?)"/g);
    const description = data.match(/\"description\":"(.*?)"/g);
    const lastMatch = value => value[value.length - 1];

    return {
      stats: {
        Followers: parseInt((/\"followers_count\":([\d]+)/g).exec(data)[1], 10),
        Following: parseInt((/\"friends_count\":([\d]+)/g).exec(data)[1], 10),
        Tweets: parseInt((/\"statuses_count\":([\d]+)/g).exec(data)[1], 10),
        Favorites: parseInt((/\"favourites_count\":([\d]+)/g).exec(data)[1], 10),
        Listed: parseInt((/\"listed_count\":([\d]+)/g).exec(data)[1], 10),
      },
      user: {
        Username: (((/\"screen_name\":"(.*?)"/g).exec(data)[1]).replace(/\\/g, '')).replace(/_normal/g, ''),
        Avatar: (((/\"profile_image_url\":"(.*?)"/g).exec(data)[1]).replace(/\\/g, '')).replace(/_normal/g, ''),
        Location: decode((/\"location\":"(.*?)"/g).exec(data)[1]),
        Bio: decode(((/\"description\":"(.*?)"/g).exec(lastMatch(description))[1]).replace(/\\n/g, ' ')).replace(/\\/g, ''),
        Name: decode((/\"name\":"(.*?)"/g).exec(lastMatch(name))[1]),
      },
    };
  },

  // API
  behance(res) {
    return {
      stats: {
        Followers: res.user.stats.followers,
        Following: res.user.stats.following,
        Likes: res.user.stats.appreciations,
        Comments: res.user.stats.comments,
        Views: res.user.stats.views,
      },
      user: {
        Username: res.user.username,
        Avatar: res.user.images['230'],
        Location: res.user.location,
        Bio: res.user.sections.About,
        Name: res.user.display_name,
      },
    };
  },

  // API
  fivehundredpx(res) {
    return {
      stats: {
        Followers: res.user.followers_count,
        Following: res.user.friends_count,
        Affection: res.user.affection,
        Favorites: res.user.in_favorites_count,
        Photos: res.user.photos_count,
      },
      user: {
        Username: res.user.username,
        Avatar: res.user.userpic_url,
        City: res.user.city,
        Country: res.user.country,
        Bio: res.user.about,
        Name: res.user.fullname,
      },
    };
  },

  // API
  github(res) {
    return {
      stats: {
        Followers: res.followers,
        Following: res.following,
        Repository: res.public_repos,
        Gist: res.public_gists,
      },
      user: {
        Username: res.login,
        Avatar: res.avatar_url,
        Location: res.location,
        Bio: res.bio,
        Name: res.name,
      },
    };
  },

  // API
  vimeo(res, u) {
    return {
      stats: {
        Followers: res.total_contacts,
        // Following: res.following,
        Videos: res.total_videos_uploaded,
        Channels: res.total_channels,
        Likes: res.total_videos_liked,
        Albums: res.total_albums,
      },
      user: {
        Username: u,
        Avatar: res.portrait_huge,
        Location: res.location,
        Bio: res.bio,
        Name: res.display_name,
      },
    };
  },

  // REGEX hack
  instagram(res) {
    return {
      stats: {
        Followers: parseInt((/\"followed_by\": {\"count\": ([\d]+)/g).exec(res)[1], 10),
        Following: parseInt((/\"follows\": {\"count\": ([\d]+)/g).exec(res)[1], 10),
        Medias: parseInt((/\}}], \"count\": ([\d]+)/g).exec(res)[1], 10),
      },
      user: {
        Username: ((/\"username\": "(.*?)"/g).exec(res)[1]).replace(/\\/g, ''),
        Avatar: ((/\"profile_pic_url\": "(.*?)"/g).exec(res)[1]).replace(/\\/g, ''),
        Bio: decode(((/\"biography\": "(.*?)"/g).exec(res)[1]).replace(/\\n/g, ' ')).replace(/\\/g, ''),
        Name: decode((/\"full_name\": "(.*?)"/g).exec(res)[1]),
      },
    };
  },

  // REGEX hack
  pinterest(res) {
    return {
      stats: {
        Followers: (/followers" content="([\d]+)"/g).exec(res)[1],
        Following: (/following" content="([\d]+)"/g).exec(res)[1],
        Pins: (/pins" content="([\d]+)"/g).exec(res)[1],
        Boards: (/boards" content="([\d]+)"/g).exec(res)[1],
      },
      user: {
        Username: (/og:title" content="(?:(.*)) \((.*)\)"/g).exec(res)[2],
        Avatar: (/image:src" content="(.*?)"/g).exec(res)[1],
        Bio: (/about" content="(.*?)"/g).exec(res)[1],
        Name: ((/og:title" content="(.*?)"/g).exec(res)[1]).replace(/\s*\(.*?\)\s*/g, ''),
      },
    };
  },

  // API
  soundcloud(res) {
    return {
      stats: {
        Followers: res.followers_count,
        Following: res.followings_count,
        Tracks: res.track_count,
        Playlist: res.playlist_count,
        Favorites: res.public_favorites_count,
      },
      user: {
        Username: res.username,
        Avatar: res.avatar_url,
        City: res.city,
        Country: res.country,
        Bio: res.description,
        Name: res.full_name,
      },
    };
  },

  // API
  producthunt(res) {
    return {
      stats: {
        Followers: res.user.followers_count,
        Following: res.user.followings_count,
        Votes: res.user.votes_count,
        Posts: res.user.posts_count,
        Maker: res.user.maker_of_count,
        Collections: res.user.collections_count,
      },
      user: {
        Username: res.username,
        Avatar: res.user.image_url['220px'],
        Bio: res.user.headline,
        Name: res.user.name,
      },
    };
  },
};

export const icons = [
  { name: 'dribbble', icon: require('./assets/images/dribbble.png') },
  { name: 'twitter', icon: require('./assets/images/twitter.png') },
  { name: 'behance', icon: require('./assets/images/behance.png') },
  { name: 'fivehundredpx', icon: require('./assets/images/500px.png') },
  { name: 'github', icon: require('./assets/images/github.png') },
  { name: 'vimeo', icon: require('./assets/images/vimeo.png') },
  { name: 'instagram', icon: require('./assets/images/instagram.png') },
  { name: 'pinterest', icon: require('./assets/images/pinterest.png') },
  { name: 'soundcloud', icon: require('./assets/images/soundcloud.png') },
  { name: 'producthunt', icon: require('./assets/images/producthunt.png') },
  { name: 'total', icon: require('./assets/images/total.png') },
];
