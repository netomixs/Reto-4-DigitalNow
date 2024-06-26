import requests
import json
class AnimeGET:
    def getAnimeString(self,page):
        url=f"https://api.jikan.moe/v4/anime/?page={page}"
        response=requests.get(url)
        if (response.status_code==200):
            response.close
            return response.content.decode("utf-8")    
        else:
            return response.status_code
    def getAnime(self,page): 
        json_string=self.getAnimeString(page)
        if(isinstance(json_string,str)):
            json_objeto = json.loads(json_string)
        else : return json_string
        return json_objeto


 