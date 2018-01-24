# coding:utf-8
# author:xiaofeng

from scipy.misc import imread
import os
import jieba
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from jieba import analyse

text = open('data.txt', 'r', encoding='utf-8').read()
# print(text)


def process_words(text):
    my_word_list = []
    seg_list = jieba.cut(text, cut_all=False)
    liststr = '/'.join(seg_list)
    for myword in liststr.split('/'):
        if len(myword.strip()) > 1:
            my_word_list.append(myword)
    return ' '.join(my_word_list)


if __name__ == '__main__':
    # print(process_words(text))
    final_words = process_words(text)
    tag = analyse.extract_tags(final_words)
    filename = 'alice.jpg'
    back_coloring = imread(filename)
    wordcloud = WordCloud(font_path='Envy Code R Italic.ttf', background_color='white',
                          width=1200, height=900, margin=2,
                          mask=back_coloring).generate(final_words)
    plt.figure(figsize=(10, 10))
    plt.imshow(wordcloud)
    plt.axis('off')
    plt.show()
