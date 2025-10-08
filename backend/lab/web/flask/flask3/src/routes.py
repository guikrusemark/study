# pyright: reportUnusedFunction=false

"""API routes."""

from typing import Any, List

from flask import Blueprint, request, jsonify, Response
from pydantic import ValidationError

from src.dal import UserDAL, PersonDAL
from src.schemas import (
    UserCreate,
    UserUpdate,
    UserResponse,
    PersonCreate,
    PersonUpdate,
    PersonResponse,
)


def init_routes(app: Any, user_dal: UserDAL, person_dal: PersonDAL) -> None:
    """Initialize routes with DAL instances.

    Args:
        app: Flask application instance.
        user_dal: User Data Access Layer.
        person_dal: Person Data Access Layer.
    """

    # Create blueprints inside function to avoid reregistration issues
    users_bp: Blueprint = Blueprint("users", __name__, url_prefix="/api/users")
    persons_bp: Blueprint = Blueprint("persons", __name__, url_prefix="/api/persons")

    # User routes
    @users_bp.route("", methods=["GET"])
    def get_users() -> tuple[Response, int]:
        """Get all users."""
        users: List[UserResponse] = user_dal.get_all(UserResponse)
        return jsonify([user.model_dump(mode="json") for user in users]), 200

    @users_bp.route("/<int:user_id>", methods=["GET"])
    def get_user(user_id: int) -> tuple[Response, int]:
        """Get user by ID."""
        user: UserResponse | None = user_dal.get_by_id(user_id, UserResponse)
        if user is None:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user.model_dump(mode="json")), 200

    @users_bp.route("", methods=["POST"])
    def create_user() -> tuple[Response, int]:
        """Create a new user."""
        try:
            data: dict[str, Any] = request.get_json() or {}
            user_create: UserCreate = UserCreate.model_validate(data)

            # Check if username or email already exists
            if user_dal.get_by_username(user_create.username):
                return jsonify({"error": "Username already exists"}), 400
            if user_dal.get_by_email(user_create.email):
                return jsonify({"error": "Email already exists"}), 400

            user: UserResponse = user_dal.create(user_create, UserResponse)
            return jsonify(user.model_dump(mode="json")), 201
        except ValidationError as e:
            return jsonify({"error": "Validation error", "details": e.errors()}), 400

    @users_bp.route("/<int:user_id>", methods=["PUT"])
    def update_user(user_id: int) -> tuple[Response, int]:
        """Update a user."""
        try:
            data: dict[str, Any] = request.get_json() or {}
            user_update: UserUpdate = UserUpdate.model_validate(data)

            # Check if new username or email already exists
            if user_update.username:
                existing: UserResponse | None = user_dal.get_by_username(
                    user_update.username
                )
                if existing and existing.id != user_id:
                    return jsonify({"error": "Username already exists"}), 400

            if user_update.email:
                existing = user_dal.get_by_email(user_update.email)
                if existing and existing.id != user_id:
                    return jsonify({"error": "Email already exists"}), 400

            user: UserResponse | None = user_dal.update(
                user_id, user_update, UserResponse
            )
            if user is None:
                return jsonify({"error": "User not found"}), 404
            return jsonify(user.model_dump(mode="json")), 200
        except ValidationError as e:
            return jsonify({"error": "Validation error", "details": e.errors()}), 400

    @users_bp.route("/<int:user_id>", methods=["DELETE"])
    def delete_user(user_id: int) -> tuple[Response, int]:
        """Delete a user."""
        if user_dal.delete(user_id):
            return jsonify({"message": "User deleted successfully"}), 200
        return jsonify({"error": "User not found"}), 404

    # Person routes
    @persons_bp.route("", methods=["GET"])
    def get_persons() -> tuple[Response, int]:
        """Get all persons or search by name."""
        first_name: str | None = request.args.get("first_name")
        last_name: str | None = request.args.get("last_name")

        if first_name or last_name:
            persons: List[PersonResponse] = person_dal.search_by_name(
                first_name, last_name
            )
        else:
            persons = person_dal.get_all(PersonResponse)

        return jsonify([person.model_dump(mode="json") for person in persons]), 200

    @persons_bp.route("/<int:person_id>", methods=["GET"])
    def get_person(person_id: int) -> tuple[Response, int]:
        """Get person by ID."""
        person: PersonResponse | None = person_dal.get_by_id(person_id, PersonResponse)
        if person is None:
            return jsonify({"error": "Person not found"}), 404
        return jsonify(person.model_dump(mode="json")), 200

    @persons_bp.route("", methods=["POST"])
    def create_person() -> tuple[Response, int]:
        """Create a new person."""
        try:
            data: dict[str, Any] = request.get_json() or {}
            person_create: PersonCreate = PersonCreate.model_validate(data)
            person: PersonResponse = person_dal.create(person_create, PersonResponse)
            return jsonify(person.model_dump(mode="json")), 201
        except ValidationError as e:
            return jsonify({"error": "Validation error", "details": e.errors()}), 400

    @persons_bp.route("/<int:person_id>", methods=["PUT"])
    def update_person(person_id: int) -> tuple[Response, int]:
        """Update a person."""
        try:
            data: dict[str, Any] = request.get_json() or {}
            person_update: PersonUpdate = PersonUpdate.model_validate(data)
            person: PersonResponse | None = person_dal.update(
                person_id, person_update, PersonResponse
            )
            if person is None:
                return jsonify({"error": "Person not found"}), 404
            return jsonify(person.model_dump(mode="json")), 200
        except ValidationError as e:
            return jsonify({"error": "Validation error", "details": e.errors()}), 400

    @persons_bp.route("/<int:person_id>", methods=["DELETE"])
    def delete_person(person_id: int) -> tuple[Response, int]:
        """Delete a person."""
        if person_dal.delete(person_id):
            return jsonify({"message": "Person deleted successfully"}), 200
        return jsonify({"error": "Person not found"}), 404

    # Register blueprints
    app.register_blueprint(users_bp)
    app.register_blueprint(persons_bp)
