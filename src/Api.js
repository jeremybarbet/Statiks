/* eslint-disable no-useless-escape */

import { removeTag, decode } from 'utils/api';

export function checkStatus(res, n, u) {
  if (res.status === 404 || res.url.includes('show_error=true')) {
    throw `${u} not found on ${n}.`; // eslint-disable-line
  } else if (res.status >= 200 && res.status < 300) {
    return res;
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
        followers: { count: res.followers_count },
        following: { count: res.followings_count },
        likes: { count: res.likes_count },
        'likes received': { count: res.likes_received_count },
        shots: { count: res.shots_count },
        projects: { count: res.projects_count },
      },
      user: {
        username: res.username,
        avatar: res.avatar_url,
        location: res.location,
        bio: removeTag(res.bio),
        name: res.name,
      },
    };
  },

  // REGEX hack
  twitter(res) {
    const data = res.replace(/&quot;/g, '"').match(/<input type="hidden" id="init-data".+>/g)[0];
    const name = data.match(/\"name\":"(.*?)"/g);
    const description = data.match(/\"description\":"(.*?)"/g);
    const lastMatch = v => v[v.length - 1];

    return {
      stats: {
        followers: { count: parseInt((/\"followers_count\":([\d]+)/g).exec(data)[1], 10) },
        following: { count: parseInt((/\"friends_count\":([\d]+)/g).exec(data)[1], 10) },
        tweets: { count: parseInt((/\"statuses_count\":([\d]+)/g).exec(data)[1], 10) },
        favorites: { count: parseInt((/\"favourites_count\":([\d]+)/g).exec(data)[1], 10) },
        listed: { count: parseInt((/\"listed_count\":([\d]+)/g).exec(data)[1], 10) },
      },
      user: {
        username: (((/\"screen_name\":"(.*?)"/g).exec(data)[1]).replace(/\\/g, '')).replace(/_normal/g, ''),
        avatar: (((/\"profile_image_url\":"(.*?)"/g).exec(data)[1]).replace(/\\/g, '')).replace(/_normal/g, ''),
        location: decode((/\"location\":"(.*?)"/g).exec(data)[1]),
        bio: decode(((/\"description\":"(.*?)"/g).exec(lastMatch(description))[1]).replace(/\\n/g, ' ')).replace(/\\/g, ''),
        name: decode((/\"name\":"(.*?)"/g).exec(lastMatch(name))[1]),
      },
    };
  },

  // API
  behance(res) {
    return {
      stats: {
        followers: { count: res.user.stats.followers },
        following: { count: res.user.stats.following },
        likes: { count: res.user.stats.appreciations },
        comments: { count: res.user.stats.comments },
        views: { count: res.user.stats.views },
      },
      user: {
        username: res.user.username,
        avatar: res.user.images['230'],
        location: res.user.location,
        bio: res.user.sections.About,
        name: res.user.display_name,
      },
    };
  },

  // API
  fivehundredpx(res) {
    return {
      stats: {
        followers: { count: res.user.followers_count },
        following: { count: res.user.friends_count },
        affection: { count: res.user.affection },
        favorites: { count: res.user.in_favorites_count },
        photos: { count: res.user.photos_count },
      },
      user: {
        username: res.user.username,
        avatar: res.user.userpic_url,
        city: res.user.city,
        country: res.user.country,
        bio: res.user.about,
        name: res.user.fullname,
      },
    };
  },

  // API
  github(res) {
    return {
      stats: {
        followers: { count: res.followers },
        following: { count: res.following },
        repository: { count: res.public_repos },
        gist: { count: res.public_gists },
      },
      user: {
        username: res.login,
        avatar: res.avatar_url,
        location: res.location,
        bio: res.bio,
        name: res.name,
      },
    };
  },

  // API
  vimeo(res, u) {
    return {
      stats: {
        followers: { count: res.total_contacts },
        // following: { count: res.following },
        videos: { count: res.total_videos_uploaded },
        channels: { count: res.total_channels },
        likes: { count: res.total_videos_liked },
        albums: { count: res.total_albums },
      },
      user: {
        username: u,
        avatar: res.portrait_huge,
        location: res.location,
        bio: res.bio,
        name: res.display_name,
      },
    };
  },

  // REGEX hack
  instagram(res) {
    return {
      stats: {
        followers: { count: parseInt((/\"followed_by\": {\"count\": ([\d]+)/g).exec(res)[1], 10) },
        following: { count: parseInt((/\"follows\": {\"count\": ([\d]+)/g).exec(res)[1], 10) },
        medias: { count: parseInt((/\}}], \"count\": ([\d]+)/g).exec(res)[1], 10) },
      },
      user: {
        username: ((/\"username\": "(.*?)"/g).exec(res)[1]).replace(/\\/g, ''),
        avatar: ((/\"profile_pic_url\": "(.*?)"/g).exec(res)[1]).replace(/\\/g, ''),
        bio: decode(((/\"biography\": "(.*?)"/g).exec(res)[1]).replace(/\\n/g, ' ')).replace(/\\/g, ''),
        name: decode((/\"full_name\": "(.*?)"/g).exec(res)[1]),
      },
    };
  },

  // REGEX hack
  pinterest(res) {
    return {
      stats: {
        followers: { count: (/followers" content="([\d]+)"/g).exec(res)[1] },
        following: { count: (/following" content="([\d]+)"/g).exec(res)[1] },
        pins: { count: (/pins" content="([\d]+)"/g).exec(res)[1] },
        boards: { count: (/boards" content="([\d]+)"/g).exec(res)[1] },
      },
      user: {
        username: (/og:title" content="(?:(.*)) \((.*)\)"/g).exec(res)[2],
        avatar: (/image:src" content="(.*?)"/g).exec(res)[1],
        bio: (/about" content="(.*?)"/g).exec(res)[1],
        name: ((/og:title" content="(.*?)"/g).exec(res)[1]).replace(/\s*\(.*?\)\s*/g, ''),
      },
    };
  },

  // API
  soundcloud(res) {
    return {
      stats: {
        followers: { count: res.followers_count },
        following: { count: res.followings_count },
        tracks: { count: res.track_count },
        playlist: { count: res.playlist_count },
        favorites: { count: res.public_favorites_count },
      },
      user: {
        username: res.username,
        avatar: res.avatar_url,
        city: res.city,
        country: res.country,
        bio: res.description,
        name: res.full_name,
      },
    };
  },

  // API
  producthunt(res) {
    return {
      stats: {
        followers: { count: res.user.followers_count },
        following: { count: res.user.followings_count },
        votes: { count: res.user.votes_count },
        posts: { count: res.user.posts_count },
        maker: { count: res.user.maker_of_count },
        collections: { count: res.user.collections_count },
      },
      user: {
        username: res.user.username,
        avatar: res.user.image_url['220px'],
        bio: res.user.headline,
        name: res.user.name,
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
