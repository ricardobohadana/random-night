import requests
from bs4 import BeautifulSoup


def getMediaDetails(searchQuery: str) -> dict:

  url = 'https://www.imdb.com/title/' + str(searchQuery)

  response = requests.get(url)

  html = BeautifulSoup(response.text, 'html.parser')

  # poster
  poster = html.find('img', class_ = 'ipc-image')['src']

  # sinapse
  sinapse = html.find('span', class_ = 'GenresAndPlot__TextContainerBreakpointXL-cum89p-2 gCtawA').text


  # # selectors:
  # s1 = '.PrincipalCredits__PrincipalCreditsPanelWideScreen-hdn81t-0 > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)'
  # s2 = '.PrincipalCredits__PrincipalCreditsPanelWideScreen-hdn81t-0 > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)'
  # s3 = '.PrincipalCredits__PrincipalCreditsPanelWideScreen-hdn81t-0 > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)'
  # sels = [s1, s2, s3]
  # stars = [html.select(css)[0].text for css in sels]

  # genres
  genre_div = html.find('div', class_='ipc-chip-list GenresAndPlot__GenresChipList-cum89p-4 gtBDBL')
  genres = [a_tag.span.text for a_tag in genre_div]

  # types
  ul_types = html.find('ul', class_='ipc-inline-list ipc-inline-list--show-dividers TitleBlockMetaData__MetaDataList-sc-12ein40-0 dxizHm baseAlt')
  li_types = [li.a.text if li.find('a', recursive=False) else li.text for li in ul_types.children]

  # top_casts = html.find('div', class_='ipc-sub-grid ipc-sub-grid--page-span-2 ipc-sub-grid--wsraps-at-above-l ipc-shoveler__grid')

  default_avatar = 'https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png'

  top_casts = html.findAll('div', class_='StyledComponents__CastItemWrapper-y9ygcu-7 hTEaNu')

  top_cast = []
  for i, actor in enumerate(top_casts):
    new_actor = {}
    if i >= 5:
      break
    for idx, section in enumerate(actor):
      if idx == 0:
        if not section.div.div.find('img'):
          new_actor['avatar'] = default_avatar
        else:
          new_actor['avatar'] = section.div.div.img['src']
      elif idx == 1:
        new_actor['name'] = section.a .text
        new_actor['character'] = section.div.ul.li.a.span.text
      
    top_cast.append(new_actor)


  title = html.find('h1', class_='TitleHeader__TitleText-sc-1wu6n3d-0 dxSWFG').text

  rating = html.find('span', class_='AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV').text

  popularity = html.find('div', class_='TrendingButton__TrendingScore-bb3vt8-1 gfstID').text


  output_dict = { 
    'title': title,
    'poster': poster,
    'sinapse':sinapse,
    'rating': str(rating),
    'popularity': str(popularity),
    # 'stars': stars,
    'genres': genres,
    'types': li_types,
    'top_cast': top_cast
  }

  return output_dict
