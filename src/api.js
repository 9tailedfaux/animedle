export async function getEntireList(username) {
    let mediaList = []
    let data = await getNthPageOfList(username, 1)
    let hasNext = data.data.Page.pageInfo.hasNextPage
    let index = 2
    mediaList.push(...data.data.Page.mediaList)
    while (hasNext) {
        data = await getNthPageOfList(username, index++)
        mediaList.push(...data.data.Page.mediaList)
        hasNext = data.data.Page.pageInfo.hasNextPage
    }
    /*mediaList = mediaList.filter((media) => {
        return media.media.status !== "NOT_YET_RELEASED"
    })*/
    console.log(mediaList)
    return mediaList
}

async function getNthPageOfList(username, page){
    const variables = {
        page: page,
        username: username
    }
    const response = await request(nthPageQuery, variables)
    return await response.json()
}

async function request(query, variables) {
    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
    return fetch(url, options)
}

const nthPageQuery = `
query ($page: Int, $username: String) {
    Page(page: $page) {
        mediaList(
          userName: $username, 
          type: ANIME, 
          sort: SCORE_DESC,
          status: COMPLETED
        ) {
          media {
            title {
              userPreferred
            }
            status
            format
            seasonYear
            studios {
              edges {
                id
              }
            }
            tags {
              id
            }
            genres
            episodes
          }
        }
        pageInfo {
          hasNextPage
        }
      }
  }
`