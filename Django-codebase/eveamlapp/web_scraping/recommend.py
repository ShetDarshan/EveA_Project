from .service import DataProcess
from .models import EventData
from google.cloud import firestore
from sklearn.feature_extraction.text import TfidfVectorizer

import pandas as pd
from rake_nltk import Rake
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer


class Recommend:

    @staticmethod
    def eventsrecommendations(title):

        def to_dict(x):
            print(x)
            return {"title": x.title, "time": x.time, "location": x.location, "summary": x.summary, "img": x.img,
                    "startdate": x.startdate, "enddate": x.enddate, "price": x.price, "read_more": x.read_more,
                    "category": x.category}
        
        # events = list()
        events = DataProcess.getevents()
        eventdicts = list(map(lambda x: to_dict(x), events))
        df = pd.DataFrame(eventdicts)

        df['Key_words'] = ""

        for index, row in df.iterrows():
            Description = row['summary']

            # instantiating Rake, by default is uses english stopwords from NLTK
            # and discard all puntuation characters
            r = Rake()

             # extracting the words by passing the text
            r.extract_keywords_from_text(Description)

            # getting the dictionary whith key words and their scores
            key_words_dict_scores = r.get_word_degrees()

            # assigning the key words to the new column
            row['Key_words'] = list(key_words_dict_scores.keys())

            df.set_index('title', inplace=True)

            dr = df[['Key_words', 'category']]

            dr['bag_of_words'] = ''
            columns = dr.columns
            for index, row in dr.iterrows():
                words = ''
                for col in columns:
                    if col != 'category':
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

            recommended_events = []

            # gettin the index of the event that matches the title
            idx = indices[indices == title].index[0]
            print(idx)

            # creating a Series with the similarity scores in descending order
            score_series = pd.Series(cosine_sim[idx]).sort_values(ascending=False)

            # getting the indexes of the 10 most similar events
            top_10_indexes = list(score_series.iloc[1:11].index)
            # populating the list with the titles of the best 10 matching events
            for i in top_10_indexes:
                recommended_events.append(list(dr.index)[i])

            return recommended_events
