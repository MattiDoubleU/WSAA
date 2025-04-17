<img src="https://studenthub.atu.ie/assets/ATU_Logo.fa93bf0a.svg" alt="ATU Logo" width="300" height="100">

This is the project for the 2025 Web Services and Applications (WSAA) module. A description of the project can be found [here](https://vlegalwaymayo.atu.ie/pluginfile.php/1496651/mod_resource/content/15/WSAA%20Project%20Description.pdf). 

This web application enables users to track expenses across various categories. Entered data is stored in a SQL database (expenses.sql), and a Flask server API (WSAAProject.py) facilitates CRUD (Create, Read, Update, Delete) operations, allowing users to manage their past expenses through an AJAX-powered interface.

**1. Repository Structure:**

- a. Readme: README.md
- b. CreateDb.py
- c. createtable.py
- d. WSAAProject.py

**2. Project challenges:**

I have encountered CORS restrictions in my browers and spent a long while on trying to find a workaround.


**3. Database:**


**4. Referencing style:**

https://requestly.com/blog/what-is-cors-and-how-to-bypass-it/
https://www.geeksforgeeks.org/http-access-control-cors/


The referencing style chosen for this project is MLA in the Jupyter Notebook: Author(s). "Title of Web Page." Website Title, Publisher (if different from website title), Date of Publication, URL. 

https://www.geeksforgeeks.org/how-to-install-pymysql-in-python/
bootstrap.com

https://www.geeksforgeeks.org/how-to-use-simple-api-using-ajax/
https://www.geeksforgeeks.org/ajax-introduction/
https://www.geeksforgeeks.org/flask-app-routing/?ref=next_article

AI:

I asked for potential improvements for each of the individual code blocks, initial function, get, create, modify & update. (prompt: How can I potentially improve this code: ). The answer delivered suggested to include *'try'* and *'except'* statements for error handling: 

```
try:

except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
except RuntimeError as err:
        return jsonify({"error": str(err)}), 500
```

