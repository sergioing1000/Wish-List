# WishList

WishList is a SPA (Single  page application) that uses the main component CrudTable, which is a CRUD # (Create, Read, Update, Delete) table for managing a list of items in a collaborative way. 

Functionalities:

The component allows users to view, add, edit, and delete items in a table, with the ability to save the data to a BackEnd server.

Main Features
1.	Fetch Data from API – Retrieves a list of items from a backend server when the component loads.

2.	Display Items in a Table – Shows each item's description, quantity, and the user who added it.

3.	Add New Items – Users can add a new row with default values.

4.	Edit Items – Users can click the edit button to modify an item.

5.	Delete Items – Users can remove an item after confirming a deletion popup.

6.	Save Changes to the Server – When users click "Save," all modified data is sent to the backend.

7.	Loading Indicator – Displays a spinner while saving data.

8.	User Authentication – Uses Auth0 to get the current user’s name and associate it with new items.

9.	Alerts and Confirmations – Uses SweetAlert2 to provide popups for errors, success messages, and deletion confirmations.

How It Works
•	The table is dynamic, meaning it updates when items are added, edited, or deleted.
•	Edit mode allows modifying an item's description and quantity (but not the user).
•	Clicking the save button sends all current items to the backend.
•	If an action fails (like fetching or saving data), an error message appears.

Where It’s Used
This would typically be part of a wishlist or inventory management app, where users maintain a list of items they own or want to keep track of.