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
You can determine the number of people unemployed in a certain county at the following URL:

*http://popstatsapi.com/occupation/[county]*

where you replace [county] with the county.

For example, the URL:

*http://popstatsapi.com/occupation/Galway*

will return a list of the population in Galway and their occupations.

##Example use of the API
This particular api could be used to check the various levels of highly qualified people in different counties. This could beneficial to foreign countries looking to set up in Ireland.


