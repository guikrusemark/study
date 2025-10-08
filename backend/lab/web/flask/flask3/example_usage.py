"""Example API usage with requests."""

import requests
from typing import Dict, Any, List

BASE_URL: str = "http://localhost:5000"


def test_api() -> None:
    """Test all API endpoints."""

    print("=" * 60)
    print("Testing Flask API")
    print("=" * 60)

    # Test health endpoint
    print("\n1. Testing Health Endpoint")
    response: requests.Response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")

    # Create users
    print("\n2. Creating Users")
    users_data: List[Dict[str, str]] = [
        {"username": "john_doe", "email": "john@example.com"},
        {"username": "jane_smith", "email": "jane@example.com"},
        {"username": "bob_wilson", "email": "bob@example.com"},
    ]

    user_ids: List[int] = []
    for user_data in users_data:
        response = requests.post(f"{BASE_URL}/api/users", json=user_data)
        print(f"Created user: {response.json()}")
        user_ids.append(response.json()["id"])

    # Get all users
    print("\n3. Getting All Users")
    response = requests.get(f"{BASE_URL}/api/users")
    users: List[Dict[str, Any]] = response.json()
    print(f"Found {len(users)} users:")
    for user in users:
        print(f"  - {user['username']} ({user['email']})")

    # Update a user
    print("\n4. Updating User")
    if user_ids:
        update_data: Dict[str, str] = {"email": "john.doe@newdomain.com"}
        response = requests.put(f"{BASE_URL}/api/users/{user_ids[0]}", json=update_data)
        print(f"Updated user: {response.json()}")

    # Create persons
    print("\n5. Creating Persons")
    persons_data: List[Dict[str, Any]] = [
        {
            "first_name": "Alice",
            "last_name": "Johnson",
            "age": 28,
            "email": "alice@example.com",
            "phone": "555-0101",
        },
        {
            "first_name": "Bob",
            "last_name": "Smith",
            "age": 35,
            "email": "bob.smith@example.com",
            "phone": "555-0102",
        },
        {
            "first_name": "Charlie",
            "last_name": "Brown",
            "age": 42,
        },
    ]

    person_ids: List[int] = []
    for person_data in persons_data:
        response = requests.post(f"{BASE_URL}/api/persons", json=person_data)
        print(
            f"Created person: {response.json()['first_name']} {response.json()['last_name']}"
        )
        person_ids.append(response.json()["id"])

    # Get all persons
    print("\n6. Getting All Persons")
    response = requests.get(f"{BASE_URL}/api/persons")
    persons: List[Dict[str, Any]] = response.json()
    print(f"Found {len(persons)} persons:")
    for person in persons:
        print(
            f"  - {person['first_name']} {person['last_name']} (Age: {person.get('age', 'N/A')})"
        )

    # Search persons by name
    print("\n7. Searching Persons by First Name")
    response = requests.get(f"{BASE_URL}/api/persons?first_name=Bob")
    persons = response.json()
    print(f"Found {len(persons)} persons matching 'Bob':")
    for person in persons:
        print(f"  - {person['first_name']} {person['last_name']}")

    # Update a person
    print("\n8. Updating Person")
    if person_ids:
        update_data_person: Dict[str, Any] = {"age": 29, "phone": "555-9999"}
        response = requests.put(
            f"{BASE_URL}/api/persons/{person_ids[0]}", json=update_data_person
        )
        print(f"Updated person: {response.json()}")

    # Get single person
    print("\n9. Getting Single Person")
    if person_ids:
        response = requests.get(f"{BASE_URL}/api/persons/{person_ids[0]}")
        person: Dict[str, Any] = response.json()
        print(f"Person details: {person['first_name']} {person['last_name']}")
        print(f"  Age: {person.get('age', 'N/A')}")
        print(f"  Email: {person.get('email', 'N/A')}")
        print(f"  Phone: {person.get('phone', 'N/A')}")

    # Delete a user
    print("\n10. Deleting User")
    if user_ids and len(user_ids) > 2:
        response = requests.delete(f"{BASE_URL}/api/users/{user_ids[2]}")
        print(f"Delete response: {response.json()}")

        # Verify deletion
        response = requests.get(f"{BASE_URL}/api/users")
        users = response.json()
        print(f"Remaining users: {len(users)}")

    # Delete a person
    print("\n11. Deleting Person")
    if person_ids and len(person_ids) > 2:
        response = requests.delete(f"{BASE_URL}/api/persons/{person_ids[2]}")
        print(f"Delete response: {response.json()}")

        # Verify deletion
        response = requests.get(f"{BASE_URL}/api/persons")
        persons = response.json()
        print(f"Remaining persons: {len(persons)}")

    print("\n" + "=" * 60)
    print("API Testing Complete!")
    print("=" * 60)


if __name__ == "__main__":
    try:
        test_api()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to API server.")
        print("Make sure the server is running: python run.py")
    except Exception as e:
        print(f"Error: {e}")
