# Linked-Data-and-Semantic-Web

##John Lavin
Here is an api I created which lets you query two datasets. The datasets involved contain information on occupation status and the level of education achieved throughout Ireland.

## Datasets used
### Population aged 15 years and over by sex and highest level of education completed
*http://data.cso.ie/datasets/population-highest-education.html*

The population statistics on the highest level of education achieved by gender.
Organised by province, county and city/town. 

### Persons at work or unemployed by occupation and sex
*http://data.cso.ie/datasets/persons-occupation.html*

The population statistics on work/unemployment status by gender.
Organised by province, county and city/town.

## How to Query the API
You can see the different occupations of people organised by county and gender at the following URL:

*http://http://127.0.0.1:8888/occupation*

You can see the different levels of education of people organised by county and gender at the following URL:

*http://http://127.0.0.1:8888/education*

For example, the URL:

*http://127.0.0.1:8888/occArea/"Galway City"*

will return a list of the population in Galway and their occupations, arranged by occupation and gender.

*http://127.0.0.1:8888/eduArea/"Galway City"*

will return a list of the population in Galway and their level of education, arranged by level achieved and gender.

##Example use of the API
This particular api could be used to check the various levels of highly qualified people in different counties. This could be beneficial to foreign countries looking to set up in Ireland.
