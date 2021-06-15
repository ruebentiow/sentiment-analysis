# sentiment-analysis

Developed by Rueben Tiow </br>
last modified on 6/15/2021

A simple web app that is built on Node.js to perform sentiment analysis using the AFINN-165 dataset.

The general method for sentiment analysis in this project is to parse a block of text, and build a score based the AFINN-165 dataset. This dataset contains a list of words with a corresponding positive or negative score. The overall score would determine whether the provided block of text is a positive or negative sentiment. This is a rudimentary approach for sentiment analysis but is acceptable for this project. One flaw in with this approach is with negation.

Take for example:
```
I am not sad. I am not unhappy. I am not feeling worse than yesterday."
```

In this scenario, it would result with a negative sentiment because words like ```sad```, ```unhappy``` and ```worse``` would be associated with a negative score. 

Seeing that, future work for this project will include bayesian classifcation and neural networks to determine sentiment analysis. Using a machine learning approach would circumvent the problem aforementioned and built a better model for sentiment analysis since we can train the models on text with negation.

Reference: 
</br>
AFINN-165 Dataset: https://github.com/fnielsen/afinn

