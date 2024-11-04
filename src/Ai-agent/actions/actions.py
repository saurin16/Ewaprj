import mysql.connector
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionFetchUserData(Action):
    def name(self) -> Text:
        return "action_fetch_user_data"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Get the user's name from the slot
        user_name = tracker.get_slot("name")

        if not user_name:
            dispatcher.utter_message(text="Sorry, I didn't get your name. Could you please provide it?")
            return []

        # Establish connection to the database
        connection = mysql.connector.connect(
            host="localhost",  # Your host
            user="root",       # Your MySQL username
            password="andon123",  # Your MySQL password
            database="ewa-prj"  # Your database name
        )

        cursor = connection.cursor(dictionary=True)

        # Query to fetch user data by name
        cursor.execute(f"SELECT * FROM user_details WHERE name = %s", (user_name,))
        user_data = cursor.fetchone()

        # Close the database connection
        connection.close()

        if user_data:
            # Return the user details
            dispatcher.utter_message(text=f"Your details: Name: {user_data['name']}, "
                                          f"Income: {user_data['income']}, "
                                          f"Espenses: {user_data['expenses']}, "
                                          f"Savings: {user_data['savings']}")
        else:
            dispatcher.utter_message(text=f"Sorry, no details found for {user_name}")

        return []
    
class ActionRecommendProducts(Action):
    def name(self) -> Text:
        return "action_recommend_products"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        # Fetching name from the tracker slot
        user_name = tracker.get_slot("name")
        
        # Check if name exists
        if user_name is not None:
            # Fetch the user's savings based on their name from the database
            savings = self.fetch_savings_by_name(user_name)
            if savings is not None:
                try:
                    user_savings = float(savings)
                except ValueError:
                    dispatcher.utter_message(text="Sorry, I couldn't understand the savings amount from the database.")
                    return []
            else:
                dispatcher.utter_message(text=f"Sorry, no savings data found for {user_name}.")
                return []
        else:
            dispatcher.utter_message(text="Please provide your name to get recommendations.")
            return []

        # Based on savings, decide the type of products to recommend
        if user_savings >= 1000:
            dispatcher.utter_message(text=f"Based on your savings of ${user_savings}, here are some low-risk investment plans:")
            query = "SELECT id, name FROM financial_products WHERE risk_level='Low'"
        else:
            dispatcher.utter_message(text=f"Based on your savings of ${user_savings}, here are some high-risk investment plans:")
            query = "SELECT id, name FROM financial_products WHERE risk_level='High'"

        # Fetch products from the database
        products = self.fetch_products_from_db(query)
        
        # If products found, create buttons for them
        if products:
            buttons = []
            for product in products:
                product_name = product[1]
                product_link = f"http://localhost:3001/product/{product[0]}"
                buttons.append({
                    "title": product_name,
                    "payload":  product_link # use the product ID to create a dynamic route
                })
            
            dispatcher.utter_message(text="Here are the recommended products:", buttons=buttons)
        else:
            dispatcher.utter_message(text="Sorry, no products found for your current savings level.")
        
        return []

    def fetch_savings_by_name(self, name):
        # Logic for fetching savings based on the user's name from the MySQL database
        try:
            connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="andon123",
                database="ewa-prj"
            )
            cursor = connection.cursor()
            cursor.execute("SELECT savings FROM user_details WHERE name=%s", (name,))
            result = cursor.fetchone()
            if result:
                return result[0]  # Return savings
            else:
                return None
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return None
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def fetch_products_from_db(self, query):
        # Your logic for connecting to the MySQL database and executing the query
        try:
            connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="andon123",
                database="ewa-prj"
            )
            cursor = connection.cursor()
            cursor.execute(query)
            return cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return []
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()