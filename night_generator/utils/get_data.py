import json
from typing import List

import pandas as pd
import requests
from bs4 import BeautifulSoup


def getDataFromUrl(url: str) -> dict:

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
  
  return pd.DataFrame(out_dict).to_dict(orient='records')
  

def getMostPopularTVShow() -> dict:
  Url = 'https://www.imdb.com/chart/tvmeter'
  return getDataFromUrl(Url)


def getMostPopularMovie() -> dict:
  Url = 'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm'
  return getDataFromUrl(Url) 


def getTopRatedMovie() -> dict:
  Url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250'
  return getDataFromUrl(Url)


def getTopRatedTVShow() -> dict:
  Url = 'https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250'

  return getDataFromUrl(Url)
