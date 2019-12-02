from .service import DataProcess
from .models import UsersData
from google.cloud import firestore
from sklearn.feature_extraction.text import TfidfVectorizer

import pandas as pd
from rake_nltk import Rake
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import json


class UserRecommend:

    @staticmethod
    def userRecommendations(email):

        def to_dict(x):

            return {"address": x.address, "bio": x.bio, "birthday": x.birthday, "createdAt": x.createdAt,
                    "email" : x.email, "gender": x.gender, "handle": x.handle,
                    "imageUrl": x.imageUrl, "interests": json.dumps(x.interests),
                    "location" : x.location, "userId": x.userId}

        users = DataProcess.getusers()
        usersdicts = list(map(lambda x: to_dict(x), users))
        print(usersdicts)
        
        
        df = pd.DataFrame(usersdicts)

        df['Key_words'] = ""

        for index, row in df.iterrows():
            Bio = row['bio']

            # instantiating Rake, by default is uses english stopwords from NLTK
            # and discard all puntuation characters
            r = Rake()

             # extracting the words by passing the text
            r.extract_keywords_from_text(Bio)

            # getting the dictionary whith key words and their scores
            key_words_dict_scores = r.get_word_degrees()

            # assigning the key words to the new column
            row['Key_words'] = list(key_words_dict_scores.keys())

            df.set_index('email', inplace=True)

            dr = df[['Key_words', 'interests','address']]

            dr['bag_of_words'] = ''
            columns = dr.columns
            for index, row in dr.iterrows():
                words = ''
                for col in columns:
                    if col != 'interests':
                        words = words + ' '.join(row[col]) + ' '
                    else:
                        words = words + row[col] + ' '
                        row['bag_of_words'] = words
                        

            dr.drop(columns=[col for col in dr.columns if col != 'bag_of_words'], inplace=True)


            # instantiating and generating the count matrix
            count = CountVectorizer()
            count_matrix = count.fit_transform(dr['bag_of_words'])

            # creating a Series for the event titles so they are associated to an ordered numerical
            # list I will use later to match the indexes
            indices = pd.Series(dr.index)

            #print(indices)
            # generating the cosine similarity matrix
            cosine_sim = cosine_similarity(count_matrix, count_matrix)

            recommended_users = []

            # gettin the index of the event that matches the users
            idx = indices[indices == email].index[0]
            print(idx)

            # creating a Series with the similarity scores in descending order
            score_series = pd.Series(cosine_sim[idx]).sort_values(ascending=False)

            # getting the indexes of the 5 most similar events
            top_5_indexes = list(score_series.iloc[1:6].index)
            # populating the list with the titles of the best 10 matching events
            for i in top_5_indexes:
                emailuser = list(dr.index)[i]
                print(emailuser)
                recommended_users.append(list(filter(lambda x: x['email'] == emailuser, usersdicts)))
            return recommended_users


