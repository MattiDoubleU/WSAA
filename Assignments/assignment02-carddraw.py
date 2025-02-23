import requests

# Shuffle deck & get deck ID.

def shuffle_deck():
    url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    response = requests.get(url)
    data = response.json()
    return data["deck_id"]

# Get the cards.

def draw_cards(deck_id, count=5):
    url = f"https://deckofcardsapi.com/api/deck/{deck_id}/draw/?count={count}"
    response = requests.get(url)
    data = response.json()
    return data["cards"]

# Print results.

def main():
    deck_id = shuffle_deck()
    cards = draw_cards(deck_id)
    
    print("Dealt Cards:")
    for card in cards:
        print(f"{card['value']} of {card['suit']}")

if __name__ == "__main__":
    main()
