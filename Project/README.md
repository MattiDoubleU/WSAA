<img src="https://studenthub.atu.ie/assets/ATU_Logo.fa93bf0a.svg" alt="ATU Logo" width="300" height="100">

This is the project for the 2025 Web Services and Applications (WSAA) module. A description of the project can be found [here](https://vlegalwaymayo.atu.ie/pluginfile.php/1496651/mod_resource/content/15/WSAA%20Project%20Description.pdf). 

**1. Repository Structure:**

- a. Readme: README.md
- b. Jupyter Notebook: Project2024.ipynb
- c. Athenry weather dataset: mly1875.csv
- d. London weather dataset: london_weather_data_1979_to_2023.csv

Initially, I was going to do a project on aviation but struggled to find usable datasets that were free of charge. [Cirium.com](www.cirium.com), the world's most trusted source of aviation analytics for example provides top notch datasets, unfortunately none of them available for simple download. Same goes for [Iata](www.iata.org), International Air Transport Association or [CH-Aviation](https://www.ch-aviation.com), a subscription-based platform that provides accurate and reliable data and news on operators, aircraft, airports, and more. 

There are some aviation datasets available on [Kaggle](https://www.kaggle.com/) a brilliant platform for incipient data analysts but after all I decided to do the project on Irish weather data since we so often talk about the weather here in Ireland due to its erratic nature. As the saying goes: “If in the sky you see cliffs and towers, it won’t be long before there is a shower.” 

**2. Project challenges:**

For assignment 6, we analyzed weather data, which gave me the confidence to leverage that experience for this project. However, there were a few unexpected challenges along the way. The 'rain' column proved to be particularly problematic, causing recurring issues. For instance, after updating a code cell earlier in the notebook, the data type of 'rain' unexpectedly changed from *'float64'* to *'object'*, even though no changes were made that should have affected this column. I have yet to determine what makes the data in 'rain' so troublesome. At one point, I thought I had resolved the issue by resetting the index using `df.reset_index()` or by resetting and dropping the current index with `df = df.reset_index(drop=True)`, but the problem persisted. I decided to incorporate a second dataset, selecting weather data for London to compare with data from Ireland. Upon examining and contrasting the yearly rainfall figures, it appeared that the yearly average rainfall in London was higher than in the West of Ireland—a result that is clearly inaccurate. Yet, the monthly rainfall figures for Ireland are accurate, as they directly reflect the values provided in the CSV file under the 'rain' column. Therefore, the analysis of Irish weather is valid and aligns with findings from other studies conducted on this topic.

Another problem I encountered was ensuring that all values were converted to numeric and float data types. For example: `df['meant'] = pd.to_numeric(df['meant'], errors='coerce')` & `df['wdsp'] = df['wdsp'].astype('float64')`. The program kept throwing the following error: 

```
C:\Users\User\AppData\Local\Temp\ipykernel_17284\3082375943.py:8: SettingWithCopyWarning: 
A value is trying to be set on a copy of a slice from a DataFrame.
Try using .loc[row_indexer,col_indexer] = value instead

See the caveats in the documentation: https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#returning-a-view-versus-a-copy
```

The solution that successfully resolved the error was implemented as follows: `df.loc[:, 'wdsp'] = pd.to_numeric(df['wdsp'], errors='coerce')` & `df.loc[:, 'wdsp'] = df['wdsp'].astype('float64')`.

**3. Database:**

Weather data for the West of Ireland was collected at Athenry station and downloaded as monthly time series data from: https://www.met.ie/climate/available-data/historical-data.

As of January 5, 2025, data for December 2024 was still unavailable. Consequently, I chose to exclude the entire year 2024 from the analysis to ensure the most accurate results by focusing exclusively on complete years.

The London dataset was downloaded from: https://github.com/pc1991/London-Weather-Data-From-1979-To-2023/tree/main?tab=readme-ov-file. Courtesy: Klein Tank, A.M.G. and Coauthors, 2002.

**4. Referencing style:**

The referencing style chosen for this project is MLA in the Jupyter Notebook: Author(s). "Title of Web Page." Website Title, Publisher (if different from website title), Date of Publication, URL. 

https://www.geeksforgeeks.org/how-to-install-pymysql-in-python/