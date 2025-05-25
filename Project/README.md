<img src="https://studenthub.atu.ie/assets/ATU_Logo.fa93bf0a.svg" alt="ATU Logo" width="300" height="100">

This is the project for the 2025 Web Services and Applications (WSAA) module. A description of the project can be found [here](https://vlegalwaymayo.atu.ie/pluginfile.php/1496651/mod_resource/content/15/WSAA%20Project%20Description.pdf). 

This web application enables users to track expenses across various categories. Entered data is stored in a SQL database (expenses.sql), and a Flask server API (WSAAProject.py) facilitates CRUD (Create, Read, Update, Delete) operations, allowing users to manage their past expenses through an AJAX-powered interface.

I spent quite a bit of time to make the UI look nice and finally came across Tailwind CSS, which helps to use its utility classes to style elements more easily.

The WebApp is hosted Luciernagas.pythonanywhere.com/expenses

**1. Repository Structure:**

- a. Readme: README.md
- b. CreateDb.py
- c. createtable.py
- d. ExpenseDAO.py
- e. WSAAProjectServer.py
- f. ajax.js
- g. Expenses.html

**2. Project challenges:**

I have encountered CORS restrictions in my browers and spent a long while on trying to find a workaround.
Finally I came across ```pip install flask-cors``` and added ```CORS(app)```  to my code to enable CORS for all routes by default.

**3. Database:**

I use a standard SQL database named expenses.sql, which is hosted locally using WampServer. 

**4. References & further reading:**

This project was built using the foundational code from the courseware and the andrewbeattycourseware/deploytopythonanywhere repository. While the core backend logic was adopted, I significantly revamped the user interface. This involved rewriting the frontend, incorporating modern CSS, and extensively modifying the JavaScript to render buttons as desired.

JavaScript:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

Tailwinds CSS:

https://tailwindcss.com/

CORS (Cross-Origin Resource Sharing):

https://requestly.com/blog/what-is-cors-and-how-to-bypass-it/
https://www.geeksforgeeks.org/http-access-control-cors/
https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask

AJAX (asynchronous JavaScript and XML): 

https://www.w3schools.com/xml/ajax_intro.asp
https://stackoverflow.com/questions/71092933/how-to-use-one-ajax-handler-for-multiple-purposes-with-callbacks
https://www.geeksforgeeks.org/how-to-use-simple-api-using-ajax/
https://www.geeksforgeeks.org/flask-app-routing/?ref=next_article

Html dropdown menu:

https://www.geeksforgeeks.org/html-dropdown/ 
https://www.wikihow.com/Create-a-Dropdown-Menu-in-HTML-and-CSS
https://www.w3schools.com/Css/css_dropdowns.asp

Python:

https://python-reference.readthedocs.io/en/latest/docs/str/formatting.html

AI:

I asked for potential improvements for each of the individual code blocks, initial function, get, create, modify & update. (prompt: How can I potentially improve this code: ). The answer delivered suggested to include *'try'* and *'except'* statements for error handling: 

```
try:

except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
except RuntimeError as err:
        return jsonify({"error": str(err)}), 500
```

