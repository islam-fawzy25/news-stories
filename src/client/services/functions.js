import axios from 'axios';

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const topStoriesUrl = `${baseUrl}topstories.json/`;
const storyItemUrl = `${baseUrl}item/`;
const userUrl = `https://hacker-news.firebaseio.com/v0/user/`;

const randomArrayFromOriginalArray = (randomLength, originalArray) => {
  try {
    var arr = [];
    while (arr.length < randomLength) {
      var r = Math.floor(Math.random() * originalArray.length) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    const randomArray = arr.map(i => {
      return originalArray[i]
    })
    return randomArray
  } catch (error) {
    throw error
  }
}

export const getRandomTenTopStoriesIds = async () => {
  try {
    const result = await axios.get(topStoriesUrl);
    const data = result.data;
    const randomTenIds = randomArrayFromOriginalArray(10, data)
    const error = result.status !== 200
    return { data: randomTenIds, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

export const getTopStoriesItems = async () => {
  try {
    const topStoriesIds = await getRandomTenTopStoriesIds().then(data => data.data)
    const fetchStoriesItems = topStoriesIds.map((item) => {
      const result = axios.get(`${storyItemUrl}${item.toString()}.json`);
      return result
    })
    const resolveStoriesItems = await Promise.all(fetchStoriesItems)
    const storiesItemsData = resolveStoriesItems.map(item => { return item.data })
    return storiesItemsData
  } catch (err) {
    throw err
  }
}

export const getStoriesWithKarmaScore = async () => {
  try {
    const topStoriesItems = await getTopStoriesItems()
    const fetchKarmaScore = topStoriesItems.map((story) => {
      const result = axios.get(`${userUrl}${story.by}.json`);
      return result
    })
    const resolveKarmaScore = await Promise.all(fetchKarmaScore)
    for (let i = 0; i < 10; i++) {
      topStoriesItems[i].karma = resolveKarmaScore[i].data.karma
      topStoriesItems[i].time = new Date(topStoriesItems[i].time).toDateString()
    }
    return { data: topStoriesItems, error: false }
  } catch (err) {
    return { data: null, error: true }
  }
}

