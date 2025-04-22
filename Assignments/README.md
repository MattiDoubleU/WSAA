# This is the repository for the assignments for Web Services and Applications module.

## Assignment 02:

https://vlegalwaymayo.atu.ie/mod/assign/view.php?id=1131888 

    This is an API that simulates dealing a deck of cards

    Write a program that "deals" (prints out) 5 cards

    first you need to shuffle

    https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

    get the deck_id, 

    with the deck_id you can get the cards

    https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

    This example gets two cards

    From there you need to print the value and the suit of each card.

    save the file as assignment2-carddraw.py (or as a notebook)

    Create a repository for this module, and upload a link to where you will put your handups.

Summary: I initially thought this task would be quite difficult, but after reviewing the documentation and revisiting the lecture material, it turned out to be straightforward, and the code produced the expected result.

### References:

https://docs.python-requests.org
https://requests.readthedocs.io

	
## Assignment 03:

https://vlegalwaymayo.atu.ie/mod/page/view.php?id=1131905

    Write a program that retrieves the dataset for the "exchequer account (historical series)" from the CSO, and stores it into a file called "cso.json".

    Upload this program to the same repository you used for the first assignment
    Save this assignment as "assignment03-cso.py"
    This program should not be a long one
    I don't need you to reformat or analyse the data in any way
    It should be about 10ish lines long (I have not counted)
    You will need to find the dataset in CSO.ie, try economic and then finance, then finance indicators. yes it is difficult to find, that is part of the task, actually the easiest way to find it is search for it.


    Save your program in the repository you used for the first assignment (I will be correcting all these at the end of the semester)

    You do not need to over comment your code.

Summary:Like in the previous assignment, I based this code primarily on what was covered in the lectures. However, I wanted to enhance it further, so I added an ```if``` statement for basic error handling.

### References:

https://requests.readthedocs.io/en/latest/user/quickstart/#response-status-codes
https://docs.python.org/3/library/functions.html#open
https://docs.python.org/3/library/json.html#json.dump
https://stackoverflow.com/questions/713794/catching-an-exception-while-using-a-python-with-statement

## Assignment 04:

https://vlegalwaymayo.atu.ie/mod/page/view.php?id=1131912

    Write a program in python that will read a file from a repository, 

    The program should then replace all the instances of the text "Andrew" with your name. 

    The program should then commit those changes and push the file back to the repository (You will need authorisation to do this).

    I do not need to see your keys (see lab2)

    Handup: Push the program as assignment04-github.py to assignments repository.

    Marks: Marks will be given for the functionality and layout of the code; I do expect minimal comments to indicate you know what the program is doing.

Summary: For this assignment, I first created a private repository named "MattiDoubleU/Testrepository-for-WSAA" and added the source file "wsaa-andrew-code.txt". Initially, the code only replaced instances of 'Andrew' when it appeared as a standalone word. Using regular expressions I modified the logic to also replace any occurrence of 'Andrew', including case-insensitive matches and instances where it appeared as part of a larger word. Additionally, I created a separate config.py file, following the approach demonstrated in the lecture. Like in the previous assignment, I used an ```if``` statement for basic error handling and I have also pushed the output text wsaa-andrew-code.txt to the repo for demonstration purposes.

### References:

https://pygithub.readthedocs.io/en/latest/introduction.html
https://docs.python.org/3/library/re.html
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
