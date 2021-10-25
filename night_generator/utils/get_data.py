from typing import List

import pandas as pd
import requests
from bs4 import BeautifulSoup


def getMedias() -> List[dict]:
  mostPopularTvShowUrl = 'https://www.imdb.com/chart/tvmeter'
  mostPopularMovieUrl = 'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm'
  TopRatedTvShowUrl = 'https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250'
  topRatedMovieUrl = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250'

  urls = [
    mostPopularTvShowUrl,
    mostPopularMovieUrl,
    TopRatedTvShowUrl,
    topRatedMovieUrl
  ]
  data_dict = {
    'mostPopularTvShow': '',
    'mostPopularMovie': '',
    'TopRatedTvShow': '',
    'topRatedMovie': '',
  }

  json_data = {
    'MostPopularTvShows': '',
    'MostPopularMovies': '',
    'TopRatedTvShows': '',
    'TopRatedMovies': '',
  }

  i=0
  iterator_dict = {
    0:'MostPopularTvShows',
    1:'MostPopularMovies',
    2:'TopRatedTvShows',
    3:'TopRatedMovies',
  }
  output_list = []
  for url in urls:
    dic_name = iterator_dict[i]
    
    response = requests.get(url)
    html = BeautifulSoup(response.text, 'html.parser')

    posters = html.find_all('td', class_='posterColumn')

    posters_src = [rf"{poster.img['src']}" for poster in posters]
    
    titles = html.find_all('td', class_='titleColumn')
    titles_name = [rf'{title.a.text} {title.span.text}' for title in titles]
    ids = [title.a['href'].split('/')[2] for title in titles]

    ratings = html.find_all('td', class_='ratingColumn imdbRating')
    ratings_score = [rating.strong.text if rating.strong else 'None' for rating in ratings]

    out_dict = {
      'Id': ids,
      'Poster': posters_src,
      'Title': titles_name,
      'Rating': ratings_score
    }
    output_list.append(out_dict)

  return output_list
    # df = pd.DataFrame(df_data)
    # # print(df)
    # # df.to_csv(f'{dic_name}.csv', encoding='utf-8')
    # # json_data[dic_name] = data_dict[dic_name].to_json(f'{dic_name}.json', orient='records')
    # i+=1

    # TV = '{TV}'
    # nl = '\n'
    # with open(f'pages/api/{dic_name}.ts', 'w+') as f:
    #   f.truncate(0)
    #   f.write(
    #     "import {TV} from './FoodAndBeverages'; \n"
    #     f"export const {dic_name[0].lower() + dic_name[1:]}: TV[] = {df.to_json(orient='records')}"
    #   )

